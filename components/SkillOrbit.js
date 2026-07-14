import {useMemo, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {resolveIcon} from "../constants/skillIcons";

const BOX = 500;
const CENTER = BOX / 2;
const RADIUS = 190;

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
                        <h2 className="font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
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
                                <div className="c-initial">
                                    {core.initial}
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
                                <svg
                                    className="orbit-beams"
                                    viewBox={`0 0 ${BOX} ${BOX}`}
                                >
                                    {positions.map((p) => (
                                        <line
                                            key={p.key}
                                            className={`orbit-beam-line${
                                                p.key === selectedKey
                                                    ? " active"
                                                    : ""
                                            }`}
                                            x1={CENTER}
                                            y1={CENTER}
                                            x2={p.x}
                                            y2={p.y}
                                        />
                                    ))}
                                </svg>

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
                                                    <span className="p-glyph orbit-mono">
                                                        {d.glyph}
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
