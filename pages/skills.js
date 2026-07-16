import {motion} from "framer-motion";
import dynamic from "next/dynamic";
import {useEffect, useState} from "react";
import Seo from "../components/Seo";
import SectionHeading from "../components/SectionHeading";

// Code-split these out of the shared app bundle: they (and their
// simple-icons dependency) are only ever needed on this page.
const BootIntro = dynamic(() => import("../components/BootIntro"), {
    ssr: false,
});
const SkillOrbit = dynamic(() => import("../components/SkillOrbit"), {
    ssr: false,
});

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
                // Decide showBoot in the same tick as setData (React batches
                // both into one commit) rather than a separate effect keyed
                // on `data` — that previously left a frame where data was
                // already set but showBoot hadn't caught up yet, so the
                // orbit was visible (uncovered) for a beat before the boot
                // overlay mounted on top of it.
                setData(json);
                const seen = window.sessionStorage.getItem(BOOT_SEEN_KEY);
                if (!seen) setShowBoot(true);
            } catch (error) {
                console.error("Error loading skills data:", error);
            }
        }

        fetchData();
    }, []);

    function finishBoot() {
        setShowBoot(false);
        window.sessionStorage.setItem(BOOT_SEEN_KEY, "1");
    }

    function replayBoot() {
        setBootKey((k) => k + 1);
        setShowBoot(true);
    }

    return (<>
            <Seo
                title="Skills | Jaguar000212"
                description="Technical skills in Android, Kotlin, Jetpack Compose and other technologies"
                path="/skills"
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
                            title="My Skills"
                            subtitle="Technologies and tools I use to bring ideas
                            to life, mapped as a living system rather
                            than a list."
                        />
                    </motion.div>

                    {data ? (<SkillOrbit data={data} onReplayBoot={replayBoot}/>) : (
                        <p className="text-gray-600 dark:text-gray-400">
                            Loading...
                        </p>)}
                </div>
            </section>

            {data && showBoot && (<BootIntro
                    key={bootKey}
                    domains={data.domains}
                    onFinish={finishBoot}
                />)}
        </>);
}
