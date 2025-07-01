import { motion } from "framer-motion";
import { useMouseMove } from "../hooks/useMouseMove";

const GitHubProjectCard = ({ project }) => {
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
            <div className="p-5 z-0">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <h3 className="text-xl font-bold font-heading">
                            {project.name}
                        </h3>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 font-body">
                    {project.description}
                </p>

                <div className="flex flex-wrap justify-between items-center">
                    <div className="flex items-center space-x-4">
                        {project.primaryLanguage &&
                            project.primaryLanguage.name && (
                                <div className="flex items-center">
                                    <span
                                        className="w-3 h-3 rounded-full mr-1"
                                        style={{
                                            backgroundColor:
                                                project.primaryLanguage.color,
                                        }}
                                    ></span>
                                    <span className="text-sm text-gray-600 dark:text-gray-400 font-body">
                                        {project.primaryLanguage.name}
                                    </span>
                                </div>
                            )}

                        {project.stargazerCount > 0 && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-sm font-body">
                                    {project.stargazerCount}
                                </span>
                            </div>
                        )}

                        {project.forkCount > 0 && (
                            <div className="flex items-center text-gray-600 dark:text-gray-400">
                                <svg
                                    className="w-4 h-4 mr-1"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9.5 3.25a2.25 2.25 0 1 1 3 2.122V6A2.5 2.5 0 0 1 10 8.5H6a1 1 0 0 0-1 1v1.128a2.251 2.251 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.5 0v1.836A2.493 2.493 0 0 1 6 7h4a1 1 0 0 0 1-1v-.628A2.25 2.25 0 0 1 9.5 3.25Zm-6 0a.75.75 0 1 0 1.5 0 .75.75 0 0 0-1.5 0Zm8.25-.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM4.25 12a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z"
                                    ></path>
                                </svg>
                                <span className="text-sm font-body">
                                    {project.forkCount}
                                </span>
                            </div>
                        )}
                    </div>

                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline text-sm flex items-center transition-all font-body"
                    >
                        <span>View Repo</span>
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
            </div>
        </motion.div>
    );
};

export default GitHubProjectCard;
