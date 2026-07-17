import {motion} from "framer-motion";
import Image from "next/image";
import {useMouseMove} from "../hooks/useMouseMove";
import {cardHoverShadow, cardHoverTransition} from "../constants/animations";

// Same primitives-only approach as the other hand-drawn icon sets on the
// site — used when an entry has no logo image (work entries).
const ICON_PROPS = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round",
    strokeLinejoin: "round",
};

function BriefcaseIcon() {
    return (
        <svg {...ICON_PROPS} className="w-6 h-6">
            <rect x="3" y="8" width="18" height="12" rx="2"/>
            <path d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2"/>
            <path d="M3 13h18"/>
        </svg>
    );
}

function GraduationCapIcon() {
    return (
        <svg {...ICON_PROPS} className="w-6 h-6">
            <path d="M2 9.5L12 5l10 4.5-10 4.5L2 9.5z"/>
            <path d="M6.5 11.5v4.5c0 1.2 2.46 2.5 5.5 2.5s5.5-1.3 5.5-2.5v-4.5"/>
            <path d="M22 9.5v5"/>
        </svg>
    );
}

const JourneyCard = ({item}) => {
    const {elementRef, isHovered, mouseHandlers} = useMouseMove();
    const isWork = item.type === "work";

    return (
        <motion.div
            ref={elementRef}
            className={`card relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-sm ${
                isHovered ? "gradient-border" : ""
            }`}
            whileHover={{
                y: -5,
                boxShadow: cardHoverShadow,
            }}
            initial={{boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"}}
            transition={cardHoverTransition}
            onHoverStart={mouseHandlers.onMouseEnter}
            onHoverEnd={mouseHandlers.onMouseLeave}
            onMouseMove={mouseHandlers.onMouseMove}
        >
            <div className="p-6 z-0">
                <div className="flex items-start">
                    {/* Organization logo, or a drawn icon when there isn't one */}
                    <div
                        className={`relative h-12 w-12 rounded-full flex-shrink-0 mr-4 overflow-hidden flex items-center justify-center ${
                            isWork
                                ? "bg-blue-50 text-primary dark:bg-blue-950"
                                : "bg-gray-100 dark:bg-gray-800"
                        }`}
                    >
                        {item.logo ? (
                            <Image
                                src={item.logo}
                                alt={item.organization}
                                fill
                                style={{objectFit: "contain"}}
                            />
                        ) : isWork ? (
                            <BriefcaseIcon/>
                        ) : (
                            <GraduationCapIcon/>
                        )}
                    </div>

                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                            <h3 className="text-xl font-bold font-heading">
                                {item.title}
                            </h3>
                            {item.current && (
                                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"/>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"/>
                                    </span>
                                    Present
                                </span>
                            )}
                        </div>
                        <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-2">
                            <p className="font-medium font-body">
                                {item.organization}
                            </p>
                            <span className="mx-2 text-gray-400">•</span>
                            <p>{item.location}</p>
                        </div>
                        <p className="text-sm text-primary font-medium mb-3 font-body">
                            {item.duration}
                        </p>

                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            {item.highlights.map((highlight, index) => (
                                <li key={index} className="text-sm font-body">
                                    {highlight}
                                </li>
                            ))}
                        </ul>

                        {item.stack?.length > 0 && (
                            <div className="mt-4 flex flex-wrap gap-2">
                                {item.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default JourneyCard;
