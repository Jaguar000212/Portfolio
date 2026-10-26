import Link from "next/link";
import {motion} from "framer-motion";
import {useMouseMove} from "../hooks/useMouseMove";
import {cardHoverShadow, cardHoverTransition} from "../constants/animations";
import DisplayLottie from "../components/DisplayLottie";
import GitHubStats from "../components/GitHubStats";
import SectionHeading from "../components/SectionHeading";
import Seo from "../components/Seo";

export default function Home() {
    const container = {
        hidden: {opacity: 0},
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const item = {
        hidden: {opacity: 0, y: 20},
        show: {opacity: 1, y: 0},
    };

    const card1 = useMouseMove();
    const card2 = useMouseMove();
    const card3 = useMouseMove();

    return (
        <>
            <Seo
                title="Shryansh Parashar | Backend and Platform Engineer"
                description="Portfolio of Shryansh Parashar, a backend and platform engineer with applied AI, compiler, and Kotlin/Android depth."
                path="/"
                personSchema
            />

            <section
                className="section-padding bg-gradient-to-b from-white to-gray-50 dark:from-dark dark:to-gray-900 min-h-[calc(100vh-64px)] flex items-center">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            className="order-2 md:order-1"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.6}}
                        >
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
                                <span
                                    className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                    Hello, I'm Shryansh
                                </span>
                                <span className="ml-2 wave-emoji">👋</span>
                            </h1>
                            <p className="text-lg md:text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 font-heading">
                                Backend & Platform Engineer
                            </p>
                            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6">
                                I build asynchronous, data-intensive systems and applied-AI workflows. My public work also includes compiler tooling and native Android products in Kotlin.
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
                                        View selected work
                                    </Link>
                                </motion.div>

                                <motion.div variants={item}>
                                    <Link
                                        href="/skills"
                                        className="btn bg-white dark:bg-dark border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        Technical toolkit
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            className="order-1 md:order-2 flex justify-center"
                            initial={{opacity: 0, scale: 0.8}}
                            animate={{opacity: 1, scale: 1}}
                            transition={{duration: 0.8}}
                        >
                            {
                                <DisplayLottie animationPath="/animations/developerLottie.json"/>
                            }
                        </motion.div>
                    </div>

                    <motion.div
                        className="mt-20"
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{delay: 0.8, duration: 0.6}}
                    >
                        <SectionHeading
                            title="Engineering focus"
                            subtitle="Evidence-led systems work, with specialized depth in applied AI, compilers, and Kotlin/Android."
                        />

                        <div className="grid md:grid-cols-3 gap-8">
                            <motion.div
                                ref={card1.elementRef}
                                className={`card p-8 rounded-xl bg-white dark:bg-gray-900 shadow-sm relative overflow-hidden group ${
                                    card1.isHovered ? "gradient-border" : ""
                                }`}
                                whileHover={{
                                    y: -8,
                                    boxShadow: cardHoverShadow,
                                }}
                                initial={{y: 0}}
                                transition={cardHoverTransition}
                                onHoverStart={card1.mouseHandlers.onMouseEnter}
                                onHoverEnd={card1.mouseHandlers.onMouseLeave}
                                onMouseMove={card1.mouseHandlers.onMouseMove}
                            >
                                <div
                                    className="bg-gradient-to-br from-primary to-blue-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transform -rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-100">
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
                                    Backend & Platform Systems
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Designing APIs and worker-backed flows that separate request handling from durable state, background execution, and live progress.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        FastAPI
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                        Celery
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        PostgreSQL
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                                        Redis / SSE
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                ref={card2.elementRef}
                                className={`card p-8 rounded-xl bg-white dark:bg-gray-900 shadow-sm relative overflow-hidden group ${
                                    card2.isHovered ? "gradient-border" : ""
                                }`}
                                whileHover={{
                                    y: -8,
                                    boxShadow: cardHoverShadow,
                                }}
                                initial={{y: 0}}
                                transition={cardHoverTransition}
                                onHoverStart={card2.mouseHandlers.onMouseEnter}
                                onHoverEnd={card2.mouseHandlers.onMouseLeave}
                                onMouseMove={card2.mouseHandlers.onMouseMove}
                            >
                                <div
                                    className="bg-gradient-to-br from-secondary to-pink-600 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transform rotate-6 group-hover:rotate-0 group-hover:scale-110 transition-all duration-100">
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
                                    Applied AI & Data Rigor
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Building reproducible data workflows that make modeling assumptions, validation design, uncertainty, and operating trade-offs visible.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        Python
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                        Cross-validation
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Calibration
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                                        XGBoost
                                    </span>
                                </div>
                            </motion.div>

                            <motion.div
                                ref={card3.elementRef}
                                className={`card p-8 rounded-xl bg-white dark:bg-gray-900 shadow-sm relative overflow-hidden group ${
                                    card3.isHovered ? "gradient-border" : ""
                                }`}
                                whileHover={{
                                    y: -8,
                                    boxShadow: cardHoverShadow,
                                }}
                                initial={{y: 0}}
                                transition={cardHoverTransition}
                                onHoverStart={card3.mouseHandlers.onMouseEnter}
                                onHoverEnd={card3.mouseHandlers.onMouseLeave}
                                onMouseMove={card3.mouseHandlers.onMouseMove}
                            >
                                <div
                                    className="bg-gradient-to-br from-green-500 to-teal-500 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-md transform -rotate-3 group-hover:rotate-0 group-hover:scale-110 transition-all duration-100">
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
                                    Kotlin, Android & Compilers
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Implementing language tooling and Android products with testable domain logic, durable local data, and user-facing release paths.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                                        Kotlin
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                        Compose
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                        Compiler pipeline
                                    </span>
                                    <span
                                        className="text-xs font-medium px-2 py-1 rounded-full bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200">
                                        Room
                                    </span>
                                </div>
                            </motion.div>
                        </div>

                        <GitHubStats />

                        <div className="mt-16 max-w-3xl mx-auto px-4">
                            <div
                                className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
                                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center italic">
                                    “I use each project to make engineering decisions inspectable: what the system does, why it is designed that way, how it was tested, and where it still has limits.”
                                </p>
                                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                                    Start with the selected work for architecture and validation evidence; the Journey page adds the professional context.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </>
    );
}
