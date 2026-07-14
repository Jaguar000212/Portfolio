import { motion } from "framer-motion";
import { useMouseMove } from "../hooks/useMouseMove";
import { cardHoverShadow, cardHoverTransition } from "../constants/animations";
import { GITHUB_PATH } from "../constants/brandIcons";
import ArrowLinkIcon from "./ArrowLinkIcon";

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
                boxShadow: cardHoverShadow,
            }}
            initial={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}
            transition={cardHoverTransition}
            onHoverStart={mouseHandlers.onMouseEnter}
            onHoverEnd={mouseHandlers.onMouseLeave}
            onMouseMove={mouseHandlers.onMouseMove}
        >
            <div className="p-5 z-0 flex flex-col h-full">
                <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center">
                        <svg
                            className="w-5 h-5 mr-2 text-gray-600 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d={GITHUB_PATH} />
                        </svg>
                        <h3 className="text-xl font-bold font-heading">
                            {project.name}
                        </h3>
                    </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 font-body">
                    {project.description}
                </p>

                <div className="mb-4 flex flex-wrap gap-2 mt-auto">
                    {project.topics.map((topics, index) => (
                        <span
                            key={index}
                            className="font-body inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                            {topics}
                        </span>
                    ))}
                </div>

                <div className="flex flex-wrap justify-between items-center mt-auto">
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
                        <ArrowLinkIcon />
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default GitHubProjectCard;
