import {AnimatePresence, motion} from "framer-motion";
import {useEffect, useState} from "react";
import CertificateTile from "../components/CertificateTile";
import SpecializationTile from "../components/SpecializationTile";
import Seo from "../components/Seo";
import {fadeIn} from "../constants/animations";

export default function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [specializations, setSpecializations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("courses");

    useEffect(() => {
        async function fetchData() {
            try {
                const [certificatesResponse, specializationsResponse] =
                    await Promise.all([
                        fetch("/data/certificates.json"),
                        fetch("/data/specializations.json"),
                    ]);
                const certificatesData = await certificatesResponse.json();
                const specializationsData =
                    await specializationsResponse.json();
                setCertificates(certificatesData.certificates);
                setSpecializations(specializationsData.specializations);
            } catch (error) {
                console.error("Error loading certificates data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    const tabs = [
        {id: "courses", label: "Courses"},
        {id: "specializations", label: "Specializations"},
    ];

    return (
        <>
            <Seo
                title="Certificates | Jaguar000212"
                description="Professional certifications in Android development, Python and other technologies"
                path="/certificates"
            />

            <section className="section-padding">
                <div className="container-custom">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 0.5}}
                        className="mb-12"
                    >
                        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">
                            My Certificates
                        </h1>
                        <p className="font-body text-gray-600 dark:text-gray-400">
                            Professional certifications and courses I've
                            completed
                        </p>
                    </motion.div>

                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <div className="inline-flex p-1 mb-8 rounded-lg bg-gray-100 dark:bg-gray-800">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        type="button"
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`font-heading px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                                            activeTab === tab.id
                                                ? "bg-white dark:bg-gray-900 text-primary shadow-sm"
                                                : "text-gray-600 dark:text-gray-400 hover:text-secondary dark:hover:text-secondary"
                                        }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === "courses" ? (
                                    <motion.div
                                        key="courses"
                                        variants={fadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    >
                                        {certificates.map((certificate, index) => (
                                            <motion.div
                                                key={certificate.id}
                                                initial={{opacity: 0, y: 20}}
                                                animate={{opacity: 1, y: 0}}
                                                transition={{
                                                    delay: index * 0.1,
                                                    duration: 0.5,
                                                }}
                                            >
                                                <CertificateTile
                                                    certificate={certificate}
                                                />
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="specializations"
                                        variants={fadeIn}
                                        initial="hidden"
                                        animate="visible"
                                        exit="hidden"
                                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                                    >
                                        {specializations.map(
                                            (specialization, index) => (
                                                <motion.div
                                                    key={specialization.id}
                                                    initial={{
                                                        opacity: 0,
                                                        y: 20,
                                                    }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                    }}
                                                    transition={{
                                                        delay: index * 0.1,
                                                        duration: 0.5,
                                                    }}
                                                >
                                                    <SpecializationTile
                                                        specialization={
                                                            specialization
                                                        }
                                                        certificates={
                                                            certificates
                                                        }
                                                    />
                                                </motion.div>
                                            )
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </>
                    )}
                </div>
            </section>
        </>
    );
}
