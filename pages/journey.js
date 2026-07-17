import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import JourneyCard from "../components/JourneyCard";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";

export default function Journey() {
    const [journey, setJourney] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/data/journey.json");
                const data = await response.json();
                setJourney(data.journey);
            } catch (error) {
                console.error("Error loading journey data:", error);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Seo
                title="Journey | Jaguar000212"
                description="Professional experience and educational background — from engineering multi-tenant SaaS systems to computer science fundamentals"
                path="/journey"
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
                            title="My Journey"
                            subtitle="Where I've worked and studied — one timeline,
                            from classrooms to production systems."
                        />
                    </motion.div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Timeline rail */}
                        <div className="absolute left-2 top-2 bottom-2 w-px bg-gradient-to-b from-primary to-secondary opacity-40"/>

                        <div className="space-y-10">
                            {journey.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    className="relative pl-10"
                                    initial={{opacity: 0, y: 20}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                    }}
                                >
                                    {/* Timeline dot — work nodes take the
                                        secondary color, education the primary */}
                                    <span
                                        className={`absolute left-2 top-8 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 bg-white dark:bg-dark ${
                                            item.type === "work"
                                                ? "border-secondary"
                                                : "border-primary"
                                        }`}
                                    />
                                    <JourneyCard item={item}/>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
