import {useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {resolveIcon} from "../constants/skillIcons";

const BOX = 500;
const CENTER = BOX / 2;
const RADIUS = 190;

// Hand-drawn line icons (same primitives-only approach as GitHubStats'
// icon set) standing in for the domains' plain-text glyphs ("◇", "ƒ", "Σ"…),
// which read as unfinished placeholders rather than a designed toolkit map.
const DOMAIN_ICON_PROPS = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

function MobileDomainIcon() {
    return (
        <svg {...DOMAIN_ICON_PROPS}>
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <line x1="10.5" y1="18" x2="13.5" y2="18" />
        </svg>
    );
}

function WebDomainIcon() {
    return (
        <svg {...DOMAIN_ICON_PROPS}>
            <polyline points="9,7 3.5,12 9,17" />
            <polyline points="15,7 20.5,12 15,17" />
        </svg>
    );
}

function BackendDomainIcon() {
    return (
        <svg {...DOMAIN_ICON_PROPS}>
            <rect x="3" y="4" width="18" height="6" rx="1.5" />
            <rect x="3" y="14" width="18" height="6" rx="1.5" />
            <circle cx="7" cy="7" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="7" cy="17" r="0.9" fill="currentColor" stroke="none" />
        </svg>
    );
}

function DataDomainIcon() {
    return (
        <svg {...DOMAIN_ICON_PROPS}>
            <ellipse cx="12" cy="5.5" rx="8" ry="3" />
            <path d="M4 5.5v13c0 1.66 3.58 3 8 3s8-1.34 8-3v-13" />
            <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </svg>
    );
}

function AutomationDomainIcon() {
    return (
        <svg {...DOMAIN_ICON_PROPS}>
            <path d="M20 12a8 8 0 10-2.9 6.16" />
            <polyline points="20,6.5 20,12 14.5,12" />
        </svg>
    );
}

function SystemsDomainIcon() {
    return (
        <svg {...DOMAIN_ICON_PROPS}>
            <rect x="7" y="7" width="10" height="10" rx="1.5" />
            <line x1="12" y1="2" x2="12" y2="7" />
            <line x1="12" y1="17" x2="12" y2="22" />
            <line x1="2" y1="12" x2="7" y2="12" />
            <line x1="17" y1="12" x2="22" y2="12" />
        </svg>
    );
}

function LanguagesDomainIcon() {
    return (
        <svg {...DOMAIN_ICON_PROPS}>
            <path d="M9 4.5c-1.8 0-2.8.95-2.8 2.8v2.4c0 1.15-.55 2.3-2.2 2.3 1.65 0 2.2 1.15 2.2 2.3v2.4c0 1.85 1 2.8 2.8 2.8" />
            <path d="M15 4.5c1.8 0 2.8.95 2.8 2.8v2.4c0 1.15.55 2.3 2.2 2.3-1.65 0-2.2 1.15-2.2 2.3v2.4c0 1.85-1 2.8-2.8 2.8" />
        </svg>
    );
}

const DOMAIN_ICONS = {
    mobile: MobileDomainIcon,
    web: WebDomainIcon,
    backend: BackendDomainIcon,
    data: DataDomainIcon,
    auto: AutomationDomainIcon,
    sys: SystemsDomainIcon,
    lang: LanguagesDomainIcon,
};

function DomainGlyph({domainKey}) {
    const DomainIcon = DOMAIN_ICONS[domainKey];
    return DomainIcon ? <DomainIcon /> : null;
}

function Icon({icon, className}) {
    const resolved = resolveIcon(icon);
    if (resolved.type === "svg") {
        return (
            <svg viewBox="0 0 24 24" className={className}>
                <path d={resolved.value}/>
            </svg>
        );
    }
    if (resolved.type === "img") {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={resolved.value} alt="" className={className}/>;
    }
    return null;
}

function isRealTech(skill) {
    return Boolean(skill.icon) && resolveIcon(skill.icon).type !== "dot";
}

function countTechs(domain) {
    return domain.groups.reduce(
        (sum, g) => sum + g.skills.filter(isRealTech).length,
        0
    );
}

export default function SkillOrbit({data, onReplayBoot}) {
    const {core, intro, domains} = data;
    const [selectedKey, setSelectedKey] = useState(null);
    const [hovered, setHovered] = useState(false);

    const selectedDomain = domains.find((d) => d.key === selectedKey) || null;
    const playState = hovered || selectedDomain ? "paused" : "running";

    const totalTech = useMemo(
        () => domains.reduce((sum, d) => sum + countTechs(d), 0),
        [domains]
    );

    const allLogos = useMemo(
        () =>
            domains
                .flatMap((d) => d.groups.flatMap((g) => g.skills))
                .filter(isRealTech),
        [domains]
    );

    const positions = useMemo(
        () =>
            domains.map((d, i) => {
                const angle =
                    (-90 + i * (360 / domains.length)) * (Math.PI / 180);
                return {
                    key: d.key,
                    x: CENTER + RADIUS * Math.cos(angle),
                    y: CENTER + RADIUS * Math.sin(angle),
                };
            }),
        [domains]
    );

    return (
        <div className="orbit-shell is-shown">
            <div className="orbit-card">
                <div className="orbit-card-head">
                    <div>
                        <div className="orbit-eyebrow orbit-mono">
                            Constellation view
                        </div>
                        <h2 className="text-2xl font-bold mb-6 font-heading">
                            The Stack, in Orbit
                        </h2>
                        <p>
                            Every domain circles the core — tap a planet to
                            unfold its toolkit.
                        </p>
                    </div>
                    {onReplayBoot && (
                        <button
                            type="button"
                            className="orbit-badge orbit-mono"
                            onClick={onReplayBoot}
                        >
                            ↻ Replay intro
                        </button>
                    )}
                </div>

                <div className="orbit-body">
                    <div
                        className="orbit-stage"
                        onMouseEnter={() => setHovered(true)}
                        onMouseLeave={() => setHovered(false)}
                    >
                        <div className="orbit-glow"/>
                        <div className="orbit-box-wrap">
                        <div className="orbit-box">
                            <div className="orbit-ring r1"/>
                            <div className="orbit-ring r2"/>

                            <div className="orbit-core-corona"/>
                            <button
                                type="button"
                                className="orbit-core"
                                onClick={() => setSelectedKey(null)}
                                aria-label="Show toolkit overview"
                            >
                                <div className="c-initial-ring">
                                    <span className="c-initial signature-text">
                                        {core.initial}
                                    </span>
                                </div>
                                <div className="c-name orbit-mono">
                                    {core.name}
                                </div>
                                <div className="c-role orbit-mono">
                                    {core.role}
                                </div>
                            </button>

                            <div
                                className="orbit-revolve"
                                style={{animationPlayState: playState}}
                            >
                                {domains.map((d, i) => {
                                    const p = positions[i];
                                    const active = d.key === selectedKey;
                                    return (
                                        <div
                                            className="orbit-planet-wrap"
                                            style={{
                                                left: `${p.x}px`,
                                                top: `${p.y}px`,
                                            }}
                                            key={d.key}
                                        >
                                            <div
                                                className="orbit-planet-counter"
                                                style={{
                                                    animationPlayState:
                                                    playState,
                                                }}
                                            >
                                                <button
                                                    type="button"
                                                    className={`orbit-planet${
                                                        active
                                                            ? " active"
                                                            : ""
                                                    }`}
                                                    onClick={() =>
                                                        setSelectedKey(d.key)
                                                    }
                                                >
                                                    <span className="p-glyph">
                                                        <DomainGlyph domainKey={d.key} />
                                                    </span>
                                                    <span className="p-label orbit-mono">
                                                        {d.short}
                                                    </span>
                                                    <span className="p-count orbit-mono">
                                                        {countTechs(d)}
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="orbit-detail">
                        <AnimatePresence mode="wait">
                            {selectedDomain ? (
                                <motion.div
                                    key={selectedDomain.key}
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -6}}
                                    transition={{duration: 0.3}}
                                >
                                    <div className="orbit-d-eyebrow is-domain orbit-mono">
                                        {selectedDomain.tag}
                                    </div>
                                    <div className="orbit-d-title font-heading">
                                        {selectedDomain.name}
                                    </div>
                                    <div className="orbit-d-count orbit-mono">
                                        {countTechs(selectedDomain)} technologies
                                    </div>
                                    <div className="orbit-groups">
                                        {selectedDomain.groups.map((g) => (
                                            <div key={g.label}>
                                                <div className="orbit-grp-lbl orbit-mono">
                                                    {g.label}
                                                </div>
                                                <div className="orbit-pills">
                                                    {g.skills.map((s) => {
                                                        const resolved =
                                                            resolveIcon(
                                                                s.icon
                                                            );
                                                        const hasLogo =
                                                            resolved.type !==
                                                            "dot";
                                                        return (
                                                            <span
                                                                className={`orbit-pill${
                                                                    hasLogo
                                                                        ? ""
                                                                        : " arch"
                                                                }`}
                                                                key={s.name}
                                                            >
                                                                {hasLogo ? (
                                                                    <span className="plogo">
                                                                        <Icon
                                                                            icon={
                                                                                s.icon
                                                                            }
                                                                        />
                                                                    </span>
                                                                ) : (
                                                                    <span className="pdot"/>
                                                                )}
                                                                {s.name}
                                                            </span>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="overview"
                                    initial={{opacity: 0, y: 10}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -6}}
                                    transition={{duration: 0.3}}
                                >
                                    <div className="orbit-d-eyebrow orbit-mono">
                                        {intro.eyebrow}
                                    </div>
                                    <div className="orbit-d-title font-heading">
                                        {intro.title}
                                    </div>
                                    <div className="orbit-d-sub">
                                        {intro.subtitle}
                                    </div>
                                    <div className="orbit-stats">
                                        <div>
                                            <div className="n">
                                                {totalTech}
                                            </div>
                                            <div className="l orbit-mono">
                                                Technologies
                                            </div>
                                        </div>
                                        <div>
                                            <div className="n is-pink">
                                                {domains.length}
                                            </div>
                                            <div className="l orbit-mono">
                                                Domains
                                            </div>
                                        </div>
                                    </div>
                                    <div className="orbit-showcase-lbl orbit-mono">
                                        Core stack
                                    </div>
                                    <div className="orbit-showcase">
                                        {allLogos.map((s) => (
                                            <span
                                                className="orbit-sc-logo"
                                                title={s.name}
                                                key={s.name}
                                            >
                                                <Icon icon={s.icon}/>
                                            </span>
                                        ))}
                                    </div>
                                    <div className="orbit-tap-pill orbit-mono">
                                        <span className="dot"/>
                                        Tap a planet to explore
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
}
