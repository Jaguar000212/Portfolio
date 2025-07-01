import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import EducationCard from "../components/EducationCard";

export default function Education() {
    const [education, setEducation] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/data/education.json');
                const data = await response.json();
                setEducation(data.education);
            } catch (error) {
                console.error("Error loading education data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Education | Jaguar000212</title>
                <meta name="title" content="Education | Jaguar000212" />
                <meta
                    name="description"
                    content="Educational background and qualifications in computer science"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta property="og:title" content="Education | Jaguar000212" />
                <meta
                    property="og:description"
                    content="Educational background and qualifications in computer science"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta
                    property="twitter:title"
                    content="Education | Jaguar000212"
                />
                <meta
                    property="twitter:description"
                    content="Educational background and qualifications in computer science"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
            </Head>

            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-12"
                    >
                        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                            My Education
                        </h1>
                        <p className="font-body text-gray-600 dark:text-gray-400">
                            Academic background and specialized training in
                            mobile app development
                        </p>
                    </motion.div>

                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <motion.div
                                key={edu.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: index * 0.1,
                                    duration: 0.5,
                                }}
                            >
                                <EducationCard education={edu} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
