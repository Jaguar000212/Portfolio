import {motion} from "framer-motion";
import Image from "next/image";
import {useMouseMove} from "../hooks/useMouseMove";
import {cardHoverShadow, cardHoverTransition} from "../constants/animations";
import ArrowLinkIcon from "./ArrowLinkIcon";

const ProjectCard = ({project}) => {
    const {elementRef, isHovered, mouseHandlers} = useMouseMove();

    return (<motion.div
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
        <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-800 z-0">
            <Image
                src={project.image || "/images/project-placeholder.svg"}
                alt={project.title}
                fill
                style={{ objectFit: "contain" }}
            />
        </div>

        <div className="p-6 z-0 flex flex-col flex-1 min-h-0">
            <h3 className="font-heading text-xl font-bold mb-2">
                {project.title}
            </h3>
            <p className="font-body text-gray-700 dark:text-gray-300 mb-4">
                {project.description}
            </p>

            <div className="mb-4 flex flex-wrap gap-2 mt-auto">
                {project.technologies.map((tech, index) => (<span
                    key={index}
                    className="font-body inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                                {tech}
                            </span>))}
            </div>

            <div className="flex flex-wrap justify-between items-center mt-auto">
                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body inline-flex items-center text-primary hover:underline"
                >
                    <span>View on GitHub</span>
                    <ArrowLinkIcon />
                </a></div>
        </div>
    </motion.div>);
};

export default ProjectCard;
