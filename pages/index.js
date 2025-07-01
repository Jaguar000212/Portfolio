import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";
import { useFeatureCards } from "../hooks/useFeatureCards";
import DisplayLottie from "../components/DisplayLottie";
import developerLottie from "../assets/animations/developerLottie";

export default function Home() {
    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 },
    };

    // Use our custom hook for feature card animations
    const {
        hoveredCards,
        card1Ref,
        card2Ref,
        card3Ref,
        springConfig,
        cardHandlers,
    } = useFeatureCards();

    return (
        <>
            <Head>
                <title>Shryansh | Software Developer</title>
                <meta name="title" content="Shryansh | Software Developer" />
                <meta
                    name="description"
                    content="Portfolio website for Shryansh, a mobile app developer specializing in Android, Kotlin, and Java"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta
                    property="og:title"
                    content="Shryansh | Software Developer"
                />
                <meta
                    property="og:description"
                    content="Portfolio website for Shryansh, a mobile app developer specializing in Android, Kotlin, and Java"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta
                    property="twitter:title"
                    content="Shryansh | Software Developer"
                />
                <meta
                    property="twitter:description"
                    content="Portfolio website for Shryansh, a mobile app developer specializing in Android, Kotlin, and Java"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-gray-900 min-h-[calc(100vh-64px)] flex items-center">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="order-2 md:order-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    Hello, I'm Shryansh
                                </span>
                                <span className="ml-2 wave-emoji">👋</span>
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-4">
                                A passionate Software Developer. 🧑🏻‍💻
                            </p>
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
                                Skilled in development strategies, actively
                                seeking thrilling opportunities. Currently
                                focused on Android application development using
                                Java and Kotlin.
                            </p>

                            <motion.div
                                className="flex flex-wrap gap-4"
                                variants={container}
                                initial="hidden"
                                animate="show"
                            >
                                <motion.div variants={item}>
                                    <Link
                                        href="/projects"
                                        className="btn btn-primary"
                                    >
                                        View My Projects
                                    </Link>
                                </motion.div>

                                <motion.div variants={item}>
                                    <Link
                                        href="/skills"
                                        className="btn bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        My Skills
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="order-1 md:order-2 flex justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {<DisplayLottie animationData={developerLottie} />}
                        </motion.div>
                    </div>

                    <motion.div
                        className="mt-20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    >
                        <div className="text-center mb-12">
                            <h2 className="text-2xl md:text-4xl font-bold mb-4 font-heading inline-block bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                What I Do
                            </h2>
                            <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary rounded-full mx-auto"></div>
                            <p className="text-center text-lg mt-6 max-w-3xl mx-auto font-medium">
                                CRAZY SOFTWARE DEVELOPER WHO WANTS TO EXPLORE
                                EVERY TECH STACK
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                ref={card1Ref}
                                className={`card p-8 rounded-xl bg-white dark:bg-gray-900 shadow-sm relative overflow-hidden group ${
                                    hoveredCards.card1 ? "gradient-border" : ""
                                }`}
                                whileHover={{
                                    y: -8,
                                    boxShadow:
                                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                initial={{ y: 0 }}
                                transition={springConfig}
                                onHoverStart={cardHandlers.card1.onHoverStart}
                                onHoverEnd={cardHandlers.card1.onHoverEnd}
                                onMouseMove={cardHandlers.card1.onMouseMove}
                            >
                                <div className="bg-gradient-to-br from-primary to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-100">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-heading">
                                    Android App Development
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Building modern, responsive mobile
                                    applications with Java, Kotlin, and Jetpack
                                    Compose with focus on clean architecture and
                                    user experience.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        Kotlin
                                    </span>
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Jetpack Compose
                                    </span>
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                        Android
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                ref={card2Ref}
                                className={`card p-8 rounded-xl bg-white dark:bg-gray-900 shadow-sm relative overflow-hidden group ${
                                    hoveredCards.card2 ? "gradient-border" : ""
                                }`}
                                whileHover={{
                                    y: -8,
                                    boxShadow:
                                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                initial={{ y: 0 }}
                                transition={springConfig}
                                onHoverStart={cardHandlers.card2.onHoverStart}
                                onHoverEnd={cardHandlers.card2.onHoverEnd}
                                onMouseMove={cardHandlers.card2.onMouseMove}
                            >
                                <div className="bg-gradient-to-br from-secondary to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transform rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-100">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-heading">
                                    Java Backend & APIs
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Developing robust backend services and
                                    RESTful APIs to power applications using
                                    Spring Boot, Firebase, and modern database
                                    solutions.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                        Java
                                    </span>
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                        Spring
                                    </span>
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                                        Firebase
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                ref={card3Ref}
                                className={`card p-8 rounded-xl bg-white dark:bg-gray-900 shadow-sm relative overflow-hidden group ${
                                    hoveredCards.card3 ? "gradient-border" : ""
                                }`}
                                whileHover={{
                                    y: -8,
                                    boxShadow:
                                        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                initial={{ y: 0 }}
                                transition={springConfig}
                                onHoverStart={cardHandlers.card3.onHoverStart}
                                onHoverEnd={cardHandlers.card3.onHoverEnd}
                                onMouseMove={cardHandlers.card3.onMouseMove}
                            >
                                <div className="bg-gradient-to-br from-green-500 to-teal-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transform -rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-100">
                                    <svg
                                        className="w-10 h-10 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                        ></path>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold mb-3 font-heading">
                                    Python Scripting
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Creating automation solutions and data
                                    processing tools using Python and its
                                    extensive library ecosystem for efficient
                                    workflows.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        Python
                                    </span>
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200">
                                        Data Science
                                    </span>
                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Automation
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        <div className="mt-16 max-w-3xl mx-auto px-4">
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center italic">
                                    "Everything where I can write code, I am
                                    there. From Python to Java, I have tried my
                                    hands on many languages and technologies. I
                                    am always open to learning new technologies
                                    and frameworks."
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                                    I have a strong foundation in Data
                                    Structures and Algorithms, and I am always
                                    ready to take on new challenges.
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 text-center">
                                    <span className="text-primary font-medium">
                                        Fun fact:
                                    </span>{" "}
                                    Gaming is my favorite side quest. 👾
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
