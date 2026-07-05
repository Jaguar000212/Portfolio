import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import BootIntro from "../components/BootIntro";
import SkillOrbit from "../components/SkillOrbit";
import DisplayLottie from "../components/DisplayLottie";
import skillsLottie from "../assets/animations/skillsLottie.json";

const BOOT_SEEN_KEY = "skills_boot_seen";

export default function Skills() {
    const [data, setData] = useState(null);
    const [showBoot, setShowBoot] = useState(false);
    const [bootKey, setBootKey] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/data/skills.json");
                const json = await response.json();
                setData(json);
            } catch (error) {
                console.error("Error loading skills data:", error);
            }
        }

        fetchData();
    }, []);

    useEffect(() => {
        if (!data) return;
        const seen = window.sessionStorage.getItem(BOOT_SEEN_KEY);
        if (!seen) setShowBoot(true);
    }, [data]);

    function finishBoot() {
        setShowBoot(false);
        window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
    }

    function replayBoot() {
        setBootKey((k) => k + 1);
        setShowBoot(true);
    }

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
                                Technologies and tools I use to bring ideas
                                to life, mapped as a living system rather
                                than a list.
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

                    {data ? (
                        <SkillOrbit data={data} onReplayBoot={replayBoot} />
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            Loading...
                        </p>
                    )}
                </div>
            </section>

            {data && showBoot && (
                <BootIntro
                    key={bootKey}
                    domains={data.domains}
                    onFinish={finishBoot}
                />
            )}
        </>
    );
}
