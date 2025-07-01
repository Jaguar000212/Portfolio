import { motion } from "framer-motion";
import Image from "next/image";
import { useMouseMove } from "../hooks/useMouseMove";

const ProjectCard = ({ project }) => {
    const { elementRef, isHovered, mouseHandlers } = useMouseMove();

    return (
        <motion.div
            ref={elementRef}
            className={`card h-full relative bg-white dark:bg-gray-900 rounded-xl shadow-sm ${
                isHovered ? "gradient-border" : ""
            }`}
            whileHover={{
                y: -5,
                boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            initial={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}
            transition={{
                duration: 0.3,
                type: "tween",
                ease: "easeOut",
            }}
            onHoverStart={mouseHandlers.onMouseEnter}
            onHoverEnd={mouseHandlers.onMouseLeave}
            onMouseMove={mouseHandlers.onMouseMove}
        >
            <div className="relative h-56 w-full bg-gray-100 dark:bg-gray-800 z-0">
                <Image
                    src={project.image || "/images/project-placeholder.svg"}
                    alt={project.title}
                    layout="fill"
                    objectFit="contain"
                />
            </div>

            <div className="p-6 z-0">
                <h3 className="font-heading text-xl font-bold mb-2">
                    {project.title}
                </h3>
                <p className="font-body text-gray-700 dark:text-gray-300 mb-4">
                    {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                        <span
                            key={index}
                            className="font-body inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body inline-flex items-center text-primary hover:underline"
                >
                    <span>View on GitHub</span>
                    <svg
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </motion.div>
    );
};

export default ProjectCard;
