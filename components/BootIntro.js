import {useEffect, useRef, useState} from "react";
import {resolveIcon} from "../constants/skillIcons";

function isRealTech(skill) {
    return Boolean(skill.icon) && resolveIcon(skill.icon).type !== "dot";
}

function buildLines(domains) {
    const totalTech = domains.reduce(
        (acc, d) =>
            acc +
            d.groups.reduce(
                (sum, g) => sum + g.skills.filter(isRealTech).length,
                0
            ),
        0
    );

    const lines = [
        {
            delay: 340,
            tokens: [
                {cls: "prompt", t: "shryansh@portfolio"},
                {t: ":~$ ./load-skillset --verbose"},
            ],
        },
        {
            delay: 300,
            tokens: [
                {cls: "arrow", t: ">"},
                {t: " initializing tech stack ..."},
            ],
        },
    ];

    domains.forEach((d) => {
        const allSkills = d.groups.flatMap((g) => g.skills);
        const techs = allSkills.filter(isRealTech);
        const names = (techs.length ? techs : allSkills)
            .slice(0, 3)
            .map((s) => s.name.toLowerCase());
        lines.push({
            delay: 150,
            tokens: [
                {cls: "ok", t: "✓"},
                {t: ` ${d.short.padEnd(13, " ")}`},
                {cls: "dim", t: `[ ${names.join(" · ")} ]`},
            ],
        });
    });

    lines.push({
        delay: 250,
        tokens: [
            {cls: "arrow", t: ">"},
            {
                t: ` ${totalTech} technologies · ${domains.length} domains mounted`,
            },
        ],
    });
    lines.push({
        delay: 430,
        tokens: [
            {cls: "arrow", t: ">"},
            {t: " entering orbit "},
            {cls: "ok", t: "▓▓▓▓▓▓▓▓▓▓"},
            {t: " 100%"},
        ],
    });

    return lines;
}

export default function BootIntro({domains, onFinish}) {
    const linesRef = useRef(buildLines(domains));
    const timersRef = useRef([]);
    const [visibleCount, setVisibleCount] = useState(0);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const lines = linesRef.current;

        function finish() {
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
            setDone(true);
            timersRef.current.push(setTimeout(() => onFinish?.(), 620));
        }

        const reduceMotion =
            typeof window !== "undefined" &&
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

        if (reduceMotion) {
            setVisibleCount(lines.length);
            finish();
            return undefined;
        }

        let delay = 250;
        lines.forEach((line, i) => {
            timersRef.current.push(
                setTimeout(
                    () => setVisibleCount((c) => Math.max(c, i + 1)),
                    delay
                )
            );
            delay += line.delay;
        });
        timersRef.current.push(setTimeout(finish, delay + 520));

        return () => {
            timersRef.current.forEach(clearTimeout);
            timersRef.current = [];
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function skip() {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
        setVisibleCount(linesRef.current.length);
        setDone(true);
        setTimeout(() => onFinish?.(), 300);
    }

    const lines = linesRef.current;

    return (
        <div className={`orbit-boot orbit-mono${done ? " is-done" : ""}`}>
            <div className="orbit-boot-win">
                <div className="orbit-boot-bar">
                    <i className="r"/>
                    <i className="y"/>
                    <i className="g"/>
                    <span>shryansh@portfolio: ~/skills</span>
                </div>
                <div className="orbit-boot-body">
                    {lines.slice(0, visibleCount).map((line, i) => (
                        <div className="line" key={i}>
                            {line.tokens.map((tok, j) => (
                                <span key={j} className={tok.cls}>
                                    {tok.t}
                                </span>
                            ))}
                        </div>
                    ))}
                    {!done && visibleCount >= lines.length && (
                        <span className="orbit-boot-cursor"/>
                    )}
                </div>
            </div>
            <button
                type="button"
                className="orbit-boot-skip orbit-mono"
                onClick={skip}
            >
                skip intro →
            </button>
        </div>
    );
}
