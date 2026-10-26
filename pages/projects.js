import {motion} from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";
import ArrowLinkIcon from "../components/ArrowLinkIcon";
import projectData from "../public/data/projects.json";

export default function Projects() {
    const featured = projectData.projects.filter((project) => project.featured);
    const supporting = projectData.projects.filter((project) => !project.featured);

    return (
        <>
            <Seo
                title="Selected Work | Shryansh Parashar"
                description="Evidence-backed backend systems, applied AI, compiler, and Android engineering work by Shryansh Parashar."
                path="/projects"
            />

            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="mb-12"
                    >
                        <SectionHeading
                            title="Selected Work"
                            subtitle="Four projects that show how I reason about system boundaries, data quality, validation, and user-facing delivery."
                        />
                    </motion.div>

                    <div className="mb-16">
                        <motion.h2
                            className="text-2xl font-bold mb-6 font-heading"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.2}}
                        >
                            Featured projects
                        </motion.h2>
                        <div className="grid grid-cols-1 items-stretch md:grid-cols-2 lg:grid-cols-2 gap-8 font-body">
                            {featured.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{
                                        delay: index * 0.1 + 0.3,
                                        duration: 0.5,
                                    }}
                                >
                                    <ProjectCard project={project}/>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <section aria-labelledby="more-work-heading">
                        <motion.h2
                            className="text-2xl font-bold mb-6 font-heading"
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.4}}
                            id="more-work-heading"
                        >
                            More work
                        </motion.h2>
                        <p className="max-w-2xl text-gray-600 dark:text-gray-400 mb-7">
                            Additional public repositories that show Android product work and Python library development.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {supporting.map((project) => (
                                <article key={project.id} className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 p-5 flex flex-col">
                                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary mb-2">{project.category}</p>
                                    <h3 className="font-heading text-lg font-bold mb-2">{project.title}</h3>
                                    <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 mb-4">{project.summary}</p>
                                    <div className="mt-auto flex gap-4 text-sm font-medium">
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">Source <ArrowLinkIcon/></a>
                                        <a href={project.evidence} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary hover:underline">Details <ArrowLinkIcon/></a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
}
