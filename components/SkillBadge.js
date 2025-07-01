import { motion } from "framer-motion";
import Image from "next/image";
import useHoverEffect from "../hooks/useHoverEffect";

/**
 * Skill badge component showing skill name, level and icon
 * @param {object} props
 * @param {object} props.skill - Skill data containing name, level and icon
 * @param {number} props.skillIndex - Index for animation staggering
 * @param {number} props.catIndex - Category index for theming variations
 */
const SkillBadge = ({ skill, skillIndex, catIndex }) => {
    const [isHovered, hoverHandlers] = useHoverEffect();

    return (
        <motion.div
            key={skillIndex}
            className={`flex items-center gap-4 shadow-sm rounded-lg p-2 ${
                isHovered ? "bg-gray-50 dark:bg-gray-800" : ""
            }`}
            whileHover={{
                y: -3,
                transition: { duration: 0.2 },
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.05 * skillIndex },
            }}
            {...hoverHandlers}
        >
            <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                    src={skill.icon}
                    alt={skill.name}
                    width={40}
                    height={40}
                    className="object-contain"
                    loading="lazy"
                />
            </div>
            <div className="flex-grow">
                <div className="flex items-center justify-between mb-1">
                    <span className="font-medium font-body">{skill.name}</span>
                    <span
                        className="text-xs font-body text-gray-500 dark:text-gray-400"
                        aria-label={`${skill.level} percent proficiency`}
                    >
                        {skill.level}%
                    </span>
                </div>
                <div
                    className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"
                    role="progressbar"
                    aria-valuenow={skill.level}
                    aria-valuemin="0"
                    aria-valuemax="100"
                >
                    <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                    ></div>
                </div>
            </div>
        </motion.div>
    );
};

export default SkillBadge;
