import { animate, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { cardHoverTransition } from "../constants/animations";
import SectionHeading from "./SectionHeading";

const GITHUB_PROFILE_URL = "https://github.com/Jaguar000212";

// GitHub-style quartile buckets, mapped to opacity over the theme's
// secondary color instead of GitHub's green (kept off Tailwind's
// bg-secondary/25 shorthand since colors.secondary resolves through a CSS
// var, which Tailwind can't decompose for its opacity modifier).
const LEVEL_OPACITIES = [0, 0.25, 0.45, 0.7, 1];

function levelFor(count) {
    if (count === 0) return 0;
    if (count <= 2) return 1;
    if (count <= 5) return 2;
    if (count <= 9) return 3;
    return 4;
}

const MONTH_LABELS = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];
const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];
const HEATMAP_COL_WIDTH = 13; // 10px cell + 3px gap
const WEEKDAY_COL_WIDTH = 24; // w-6
const HEATMAP_ROW_GAP = 4; // gap-1 between the weekday column and the grid

// weeks.length columns need (weeks.length - 1) inter-column gaps, not
// weeks.length of them.
function computeGridWidth(weekCount) {
    return weekCount > 0 ? weekCount * HEATMAP_COL_WIDTH - 3 : 0;
}

// Every size feeding this is a fixed Tailwind pixel value, so the row's
// rendered width can be computed exactly instead of measured — measuring it
// (via a ref + scrollWidth) turned out to be circular: the row lives inside
// a flex container that can itself flex-shrink to fit whatever cardMaxWidth
// already was, so on first paint (before the real width is known) it could
// get squeezed *before* we ever measured it.
function computeHeatmapRowWidth(weekCount) {
    return WEEKDAY_COL_WIDTH + HEATMAP_ROW_GAP + computeGridWidth(weekCount);
}

// The API truncates partial weeks at the range boundary rather than padding
// them (e.g. if Jan 1 falls on a Thursday, that first "week" is just
// Thu-Sat) — so a day's position within week.days isn't reliably its
// weekday. Re-slot each day into its actual Sun(0)-Sat(6) row so every
// week column lines up with the same weekday-label rows.
function slotWeekByWeekday(week) {
    const slots = Array(7).fill(null);
    week.days.forEach((day) => {
        const dow = new Date(`${day.date}T00:00:00Z`).getUTCDay();
        slots[dow] = day;
    });
    return slots;
}

function getMonthMarkers(weeks) {
    const markers = [];
    let lastMonth = -1;
    weeks.forEach((week, weekIndex) => {
        const first = week.days[0];
        if (!first) return;
        const month = new Date(`${first.date}T00:00:00Z`).getUTCMonth();
        if (month !== lastMonth) {
            markers.push({ weekIndex, label: MONTH_LABELS[month] });
            lastMonth = month;
        }
    });
    return markers;
}

// Dates come back as "YYYY-MM-DD"; format with an explicit UTC timeZone so
// the displayed day doesn't shift backward for timezones behind UTC.
function formatShortDate(dateStr) {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short", day: "numeric", timeZone: "UTC",
    });
}

// Hand-built from simple primitives (circles/lines/straight paths) rather
// than memorized icon-library curves, so correctness doesn't depend on
// recalling an exact bezier path.
const ICON_PROPS = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

function CommitIcon() {
    return (
        <svg {...ICON_PROPS}>
            <line x1="1" y1="12" x2="8" y2="12" />
            <circle cx="12" cy="12" r="4" />
            <line x1="16" y1="12" x2="23" y2="12" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg {...ICON_PROPS} strokeLinejoin="round">
            <polygon points="12,2 14.35,8.76 21.51,8.91 15.80,13.24 17.88,20.09 12,16 6.12,20.09 8.20,13.24 2.49,8.91 9.65,8.76" />
        </svg>
    );
}

function FolderIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M3 7h6l2 2h10v10H3z" />
        </svg>
    );
}

function PersonIcon() {
    return (
        <svg {...ICON_PROPS}>
            <circle cx="12" cy="8" r="3.5" />
            <path d="M5 19a7 7 0 0114 0" />
        </svg>
    );
}

function PullRequestIcon() {
    return (
        <svg {...ICON_PROPS}>
            <circle cx="7" cy="5" r="2" fill="currentColor" stroke="none" />
            <circle cx="7" cy="19" r="2" fill="currentColor" stroke="none" />
            <circle cx="17" cy="12" r="2" fill="currentColor" stroke="none" />
            <path d="M7 7v12M7 12h8" />
        </svg>
    );
}

function IssueIcon() {
    return (
        <svg {...ICON_PROPS}>
            <circle cx="12" cy="12" r="9" />
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="16.3" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    );
}

function MedalIcon() {
    return (
        <svg {...ICON_PROPS}>
            <path d="M8 3l2.5 6.5M16 3l-2.5 6.5" />
            <circle cx="12" cy="15" r="5" />
        </svg>
    );
}

// Animates on mount/whenever `value` resolves to a real number — not gated
// on scroll-into-view, since that previously relied on a ref that wasn't
// attached to any element until the data (and this row) existed in the
// first place, so the observer never had anything to watch.
function StatRow({ icon, label, value }) {
    const target = Number.isFinite(value) ? value : 0;
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        const controls = animate(0, target, {
            duration: 1.2,
            ease: "easeOut",
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [target]);

    return (
        <li className="flex items-center gap-2.5 text-sm">
            <span className="text-primary shrink-0 w-4 h-4">{icon}</span>
            <span className="orbit-mono text-white/60 w-32 shrink-0">{label}:</span>
            <span className="orbit-mono font-bold text-white">{display}</span>
        </li>
    );
}

function RankBadge({ rank }) {
    if (!rank) return null;
    const topPercent = Math.max(0, Math.round((100 - rank.percentile) * 10) / 10);

    return (
        <div className="flex flex-col items-center shrink-0 sm:pl-4">
            <div className="w-28 h-28 rounded-full flex items-center justify-center border-4 border-primary">
                <span className="text-3xl font-bold orbit-mono text-primary">
                    {rank.grade}
                </span>
            </div>
            <span className="text-xs text-white/40 orbit-mono mt-2 flex items-center gap-1">
                <span className="w-3 h-3 shrink-0">
                    <MedalIcon />
                </span>
                top {topPercent}%
            </span>
        </div>
    );
}

function LanguageBar({ languages }) {
    // Byte-weighted `percent` is the current schema; older cached data
    // (fetched before that field existed) only has a repo-count-based
    // `count`, so fall back to computing proportional width from that.
    const usePercent = languages.every((l) => Number.isFinite(l.percent));
    const total = usePercent ? 100 : languages.reduce((sum, l) => sum + (l.count || 0), 0);
    if (total === 0) return null;

    return (
        <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex h-2 rounded-full overflow-hidden bg-white/5">
                {languages.map((lang) => {
                    const width = usePercent ? lang.percent : (lang.count / total) * 100;
                    return (
                        <div
                            key={lang.name}
                            style={{ width: `${width}%`, backgroundColor: lang.color || "#999" }}
                            title={
                                usePercent ? `${lang.name}: ${lang.percent}%` : lang.name
                            }
                        />
                    );
                })}
            </div>
            <div className="grid grid-cols-3 gap-x-4 gap-y-1 mt-2 text-xs orbit-mono text-white/50">
                {languages.map((lang) => (
                    <span key={lang.name} className="inline-flex items-center gap-1.5">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: lang.color || "#999" }}
                        />
                        {lang.name}
                        {usePercent && ` · ${lang.percent}%`}
                    </span>
                ))}
            </div>
        </div>
    );
}

function ContributionHeatmap({
    weeks, currentStreak, longestStreak, longestStreakStart, longestStreakEnd,
    calendarYear, totalContributions,
}) {
    if (!weeks?.length) return null;
    const streakRange = longestStreakStart && longestStreakEnd
        ? `${formatShortDate(longestStreakStart)}–${formatShortDate(longestStreakEnd)}`
        : null;
    const monthMarkers = getMonthMarkers(weeks);
    const gridWidth = computeGridWidth(weeks.length);

    return (
        <div className="mt-6 pt-5 border-t border-white/10">
            <div className="flex items-center justify-between mb-1 orbit-mono text-xs text-white/40">
                <span>
                    $ contribution_log --year {calendarYear}
                    {Number.isFinite(totalContributions) &&
                        ` (${totalContributions})`}
                </span>
                <span className="text-secondary">
                    🔥 {currentStreak}d streak
                </span>
            </div>
            {streakRange && (
                <div className="text-right orbit-mono text-[0.65rem] text-white/30 mb-2">
                    best {longestStreak}d ({streakRange})
                </div>
            )}
            <div className="flex gap-1">
                <div className="flex flex-col gap-[3px] shrink-0 w-6 pt-[14px]">
                    {WEEKDAY_LABELS.map((label, i) => (
                        <div
                            key={i}
                            className="h-[10px] text-[0.6rem] leading-[10px] text-white/40 orbit-mono"
                        >
                            {label}
                        </div>
                    ))}
                </div>

                <div className="overflow-x-auto pb-1">
                    <div
                        className="relative h-[14px]"
                        style={{ width: gridWidth }}
                    >
                        {monthMarkers.map((marker) => (
                            <span
                                key={marker.weekIndex}
                                className="absolute top-0 text-[0.6rem] text-white/40 orbit-mono whitespace-nowrap"
                                style={{ left: marker.weekIndex * HEATMAP_COL_WIDTH }}
                            >
                                {marker.label}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-[3px]" style={{ width: gridWidth }}>
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="flex flex-col gap-[3px]">
                                {slotWeekByWeekday(week).map((day, dow) => {
                                    if (!day) {
                                        return (
                                            <div key={dow} className="w-[10px] h-[10px]" />
                                        );
                                    }
                                    const level = levelFor(day.count);
                                    return (
                                        <div
                                            key={dow}
                                            className={`w-[10px] h-[10px] rounded-sm shrink-0 ${
                                                level === 0 ? "bg-white/5" : ""
                                            }`}
                                            style={
                                                level > 0
                                                    ? {
                                                          backgroundColor:
                                                              "var(--color-secondary)",
                                                          opacity: LEVEL_OPACITIES[level],
                                                      }
                                                    : undefined
                                            }
                                            title={`${day.date}: ${day.count} contribution${
                                                day.count === 1 ? "" : "s"
                                            }`}
                                        />
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// gh-terminal-body's padding is 1.5rem (24px) per side and the outer
// wrapper's is px-4 (16px) per side, plus a little slack for border/rounding
// so the heatmap never gets forced into its own horizontal scrollbar.
const CARD_EXTRA_WIDTH = 48 + 32 + 16;

const GitHubStats = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch("/data/staticGithubData.json");
                const json = await response.json();
                if (json.stats) setStats(json.stats);
            } catch (error) {
                console.error("Error loading GitHub stats:", error);
            }
        }

        fetchStats();
    }, []);

    if (!stats) return null;

    // The card should never be wider than the heatmap (otherwise it's just
    // empty space) — computed analytically from the same fixed pixel values
    // the heatmap itself renders with, rather than measured via a ref: the
    // row lives inside a flex container that can flex-shrink to fit
    // whatever width the card already has, so measuring it after the fact
    // was circular and could report an already-squeezed width.
    const cardMaxWidth =
        computeHeatmapRowWidth(stats.contributionWeeks?.length || 0) +
        CARD_EXTRA_WIDTH;

    // Older cached data (fetched before a schema field was added) may be
    // missing newer keys — skip those rows rather than showing a
    // misleading "0" until the next scripted refresh backfills them.
    const rows = [
        { icon: <CommitIcon />, label: "Total Commits", value: stats.totalCommits },
        { icon: <StarIcon />, label: "Total Stars", value: stats.totalStars },
        { icon: <FolderIcon />, label: "Public Repos", value: stats.totalPublicRepos },
        { icon: <PersonIcon />, label: "Followers", value: stats.followers },
        { icon: <PullRequestIcon />, label: "PRs Opened", value: stats.totalPullRequests },
        { icon: <IssueIcon />, label: "Issues Opened", value: stats.totalIssues },
    ].filter((row) => Number.isFinite(row.value));

    return (
        <div
            className="mt-20 mx-auto px-4"
            style={{ maxWidth: `${cardMaxWidth}px` }}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
            >
                <SectionHeading
                    title="Open Source Activity"
                    subtitle="Pulled live from GitHub — commits, stars, and a streak of showing up."
                />
            </motion.div>

            <motion.a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.15 }}
            >
                <motion.div
                    className="gh-terminal"
                    whileHover={{ y: -4 }}
                    transition={cardHoverTransition}
                >
                    <div className="gh-terminal-bar">
                        <i className="r" />
                        <i className="y" />
                        <i className="g" />
                        <span>shryansh@github: ~/stats</span>
                    </div>

                    <div className="gh-terminal-body">
                        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
                            <ul className="space-y-2.5 sm:pr-4">
                                {rows.map((row) => (
                                    <StatRow key={row.label} {...row} />
                                ))}
                            </ul>

                            <RankBadge rank={stats.rank} />
                        </div>

                        {stats.topLanguages?.length > 0 && (
                            <LanguageBar languages={stats.topLanguages} />
                        )}

                        <ContributionHeatmap
                            weeks={stats.contributionWeeks}
                            currentStreak={stats.currentStreak}
                            longestStreak={stats.longestStreak}
                            longestStreakStart={stats.longestStreakStart}
                            longestStreakEnd={stats.longestStreakEnd}
                            calendarYear={stats.calendarYear}
                            totalContributions={stats.totalContributions}
                        />

                        <div className="text-center mt-5 pt-5 border-t border-white/10 text-xs orbit-mono text-white/40 group-hover:text-primary transition-colors">
                            $ open {GITHUB_PROFILE_URL}
                        </div>
                    </div>
                </motion.div>
            </motion.a>
        </div>
    );
};

export default GitHubStats;
