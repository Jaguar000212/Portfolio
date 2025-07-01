import { motion } from "framer-motion";
import Image from "next/image";
import { useMouseMove } from "../hooks/useMouseMove";

const EducationCard = ({ education }) => {
    const { elementRef, isHovered, mouseHandlers } = useMouseMove();

    return (
        <motion.div
            ref={elementRef}
            className={`card relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-sm ${
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
            <div className="p-6 z-0">
                <div className="flex items-start">
                    {/* Institution Logo */}
                    <div className="relative h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0 mr-4 overflow-hidden">
                        <Image
                            src={
                                education.logo ||
                                "/images/education-placeholder.svg"
                            }
                            alt={education.institution}
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1 font-heading">
                            {education.degree}
                        </h3>
                        <div className="flex flex-wrap items-center text-gray-600 dark:text-gray-400 mb-2">
                            <p className="font-medium font-body">
                                {education.institution}
                            </p>
                            <span className="mx-2 text-gray-400">•</span>
                            <p>{education.location}</p>
                        </div>
                        <p className="text-sm text-primary font-medium mb-3 font-body">
                            {education.duration}
                        </p>

                        {/* Highlights List */}
                        <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                            {education.highlights.map((highlight, index) => (
                                <li key={index} className="text-sm font-body">
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default EducationCard;
