import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import GitHubProjectCard from "../components/GitHubProjectCard";
import DisplayLottie from "../components/DisplayLottie";
import androidLottie from "../assets/animations/projectsLottie.json";

export default function Projects() {
    const [projects, setProjects] = useState([]);
    const [githubProjects, setGithubProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                // Fetch projects data
                const projectsResponse = await fetch("/data/projects.json");
                const projectsData = await projectsResponse.json();

                // Fetch GitHub projects data
                const githubResponse = await fetch(
                    "/data/staticGithubData.json"
                );
                const githubData = await githubResponse.json();

                setProjects(projectsData.projects);
                setGithubProjects(githubData.repositories);
            } catch (error) {
                console.error("Error loading project data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    // Filter projects - main featured projects
    const bigProjects = projects.filter((project) => project.featured);
    // Other projects
    const otherProjects = projects.filter((project) => !project.featured);

    return (
        <>
            <Head>
                <title>Projects | Jaguar000212</title>
                <meta name="title" content="Projects | Jaguar000212" />
                <meta
                    name="description"
                    content="Showcase of Android application projects and other significant works of Shryansh"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta property="og:title" content="Projects | Jaguar000212" />
                <meta
                    property="og:description"
                    content="Showcase of Android application projects and other significant works of Shryansh"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta
                    property="twitter:title"
                    content="Projects | Jaguar000212"
                />
                <meta
                    property="twitter:description"
                    content="Showcase of Android application projects and other significant works of Shryansh"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
            </Head>

            <section className="section-padding lg:pt-0">
                <div className="container-custom">
                    <div className="grid md:grid-cols-2 md:gap-12 items-center">
                        <motion.div
                            className={
                                "md:justify-self-start justify-self-center"
                            }
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 font-heading">
                                My Projects
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 font-body">
                                From modern Android apps using Jetpack Compose
                                to Python-powered utilities, these projects
                                reflect both my core strengths and my
                                curiosity-driven learning journey as a
                                developer.
                            </p>
                        </motion.div>

                        <motion.div
                            className="order-1 md:order-2 md:w-1/2 w-2/3 md:justify-self-end justify-self-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            {<DisplayLottie animationData={androidLottie} />}
                        </motion.div>
                    </div>

                    {/* Big Projects Section */}
                    <div className="mb-16">
                        <motion.h2
                            className="text-2xl font-bold mb-6 font-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            Featured Projects
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 font-body">
                            {bigProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1 + 0.3,
                                        duration: 0.5,
                                    }}
                                >
                                    <ProjectCard project={project} />
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Open Source GitHub Projects */}
                    <div>
                        <motion.h2
                            className="text-2xl font-bold mb-6 font-heading"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                        >
                            Open Source Projects
                        </motion.h2>

                        {isLoading ? (
                            <div className="flex justify-center py-10">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : githubProjects.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {githubProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            delay: index * 0.1 + 0.5,
                                            duration: 0.5,
                                        }}
                                    >
                                        <GitHubProjectCard project={project} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
                                GitHub projects couldn't be loaded. Please check
                                back later.
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}
