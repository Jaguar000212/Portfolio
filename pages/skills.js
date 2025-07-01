import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import SkillBadge from "../components/SkillBadge";
import { useMouseMove } from "../hooks/useMouseMove";
import {
    hoverCard,
    springConfig,
    staggerContainer,
    staggerItem,
} from "../constants/animations";
import DisplayLottie from "../components/DisplayLottie";
import skillsLottie from "../assets/animations/skillsLottie.json";

export default function Skills() {
    const [skills, setSkills] = useState({ languages: [], tools: [], fronterd: [], backend: []});
    const [loading, setLoading] = useState(true);
    const { handleMouseMove, mousePosition } = useMouseMove();
    const categories = Object.keys(skills);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/data/skills.json");
                const data = await response.json();
                setSkills(data.skills);
            } catch (error) {
                console.error("Error loading skills data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    // Create separate mouseMove hooks for each category
    const categoryHooks = {};

    categories.forEach((category) => {
        categoryHooks[category] = useMouseMove();
    });

    return (
        <>
            <Head>
                <title>Skills | Jaguar000212</title>
                <meta name="title" content="Skills | Jaguar000212" />
                <meta
                    name="description"
                    content="Technical skills in Android, Kotlin, Jetpack Compose and other technologies"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta property="og:title" content="Skills | Jaguar000212" />
                <meta
                    property="og:description"
                    content="Technical skills in Android, Kotlin, Jetpack Compose and other technologies"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta
                    property="twitter:title"
                    content="Skills | Jaguar000212"
                />
                <meta
                    property="twitter:description"
                    content="Technical skills in Android, Kotlin, Jetpack Compose and other technologies"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
            </Head>

            <section className="section-padding">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 md:gap-12 items-center mb-12">
                        <motion.div
                            className="md:justify-self-start justify-self-center"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading">
                                My Skills
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-lg">
                                Technologies and tools I use to bring mobile
                                ideas to life. I'm constantly learning and
                                expanding my toolkit to deliver exceptional
                                mobile experiences.
                            </p>
                        </motion.div>
                        <motion.div
                            className="order-1 md:order-2 md:w-1/2 w-2/3 md:justify-self-end justify-self-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {<DisplayLottie animationData={skillsLottie} />}
                        </motion.div>
                    </div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        {categories.map((category, catIndex) => {
                            const { elementRef, isHovered, mouseHandlers } =
                                categoryHooks[category];
                            return (
                                <motion.div
                                    ref={elementRef}
                                    key={category}
                                    variants={staggerItem}
                                    className={`card relative p-6 h-full rounded-xl shadow-sm ${
                                        isHovered ? "gradient-border" : ""
                                    }`}
                                    whileHover={hoverCard(false)}
                                    initial={{
                                        boxShadow:
                                            "0 1px 3px rgba(0, 0, 0, 0.05)",
                                    }}
                                    transition={springConfig}
                                    onHoverStart={mouseHandlers.onMouseEnter}
                                    onHoverEnd={mouseHandlers.onMouseLeave}
                                    onMouseMove={mouseHandlers.onMouseMove}
                                >
                                    <h2 className="text-2xl font-bold mb-6 capitalize font-heading border-b pb-2 border-gray-200 dark:border-gray-700">
                                        {category === "frontend"
                                            ? "Frontend Technologies"
                                            : category === "backend"
                                            ? "Backend & Databases"
                                            : category === "mobile"
                                            ? "Mobile Development"
                                            : category.charAt(0).toUpperCase() +
                                              category.slice(1)}
                                    </h2>

                                    <div className="space-y-5">
                                        {skills[category].map(
                                            (skill, skillIndex) => (
                                                <SkillBadge
                                                    key={`${category}-${skillIndex}`}
                                                    skill={{
                                                        ...skill,
                                                        icon: skill.icon,
                                                    }}
                                                    skillIndex={skillIndex}
                                                    catIndex={catIndex}
                                                />
                                            )
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </>
    );
}
