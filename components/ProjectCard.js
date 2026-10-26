import {motion} from "framer-motion";
import {useMouseMove} from "../hooks/useMouseMove";
import {cardHoverShadow, cardHoverTransition} from "../constants/animations";
import ArrowLinkIcon from "./ArrowLinkIcon";

const ProjectCard = ({project}) => {
    const {elementRef, isHovered, mouseHandlers} = useMouseMove();
    const details = [
        ["Problem", project.problem],
        ["Built", project.ownership],
        ["Design", project.architecture],
        ["Evidence", project.validation],
        ["Scope", project.limitation],
    ];

    return (<motion.article
        ref={elementRef}
        className={`card flex flex-col h-full relative bg-white dark:bg-gray-900 rounded-xl shadow-sm ${isHovered ? "gradient-border" : ""}`}
        whileHover={{
            y: -5, boxShadow: cardHoverShadow,
        }}
        initial={{boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"}}
        transition={cardHoverTransition}
        onHoverStart={mouseHandlers.onMouseEnter}
        onHoverEnd={mouseHandlers.onMouseLeave}
        onMouseMove={mouseHandlers.onMouseMove}
    >
        <div className="p-6 md:p-7 z-0 flex flex-col flex-1 min-h-0">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary mb-3">
                {project.category}
            </p>
            <h3 className="font-heading text-2xl font-bold mb-3">
                {project.title}
            </h3>
            <p className="font-body text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {project.summary}
            </p>

            <dl className="space-y-4 border-y border-gray-100 dark:border-gray-800 py-5">
                {details.map(([label, value]) => (
                    <div key={label}>
                        <dt className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">{label}</dt>
                        <dd className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">{value}</dd>
                    </div>
                ))}
            </dl>

            <div className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (<span
                    key={tech}
                    className="font-body inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                                {tech}
                            </span>))}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body inline-flex items-center text-primary hover:underline"
                >
                    <span>Source</span>
                    <ArrowLinkIcon/>
                </a>
                <a
                    href={project.evidence}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body inline-flex items-center text-primary hover:underline"
                >
                    <span>Technical evidence</span>
                    <ArrowLinkIcon/>
                </a>
                {project.demo && <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body inline-flex items-center text-primary hover:underline"
                >
                    <span>Release / demo</span>
                    <ArrowLinkIcon/>
                </a>}
            </div>
        </div>
    </motion.article>);
};

export default ProjectCard;
