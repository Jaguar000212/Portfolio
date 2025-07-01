import Head from "next/head";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CertificateTile from "../components/CertificateTile";

export default function Certificates() {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/data/certificates.json');
                const data = await response.json();
                setCertificates(data.certificates);
            } catch (error) {
                console.error("Error loading certificates data:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <Head>
                <title>Certificates | Jaguar000212</title>
                <meta name="title" content="Certificates | Jaguar000212" />
                <meta
                    name="description"
                    content="Professional certifications in Android development, Python and other technologies"
                />
                <meta property="og:type" content="website" />
                <meta
                    property="og:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta
                    property="og:title"
                    content="Certificates | Jaguar000212"
                />
                <meta
                    property="og:description"
                    content="Professional certifications in Android development, Python and other technologies"
                />
                <meta property="og:image" content="/images/Jaguar000212.png" />
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content="https://www.jaguar000212.me/"
                />
                <meta
                    property="twitter:title"
                    content="Certificates | Jaguar000212"
                />
                <meta
                    property="twitter:description"
                    content="Professional certifications in Android development, Python and other technologies"
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
                        <h1 className="font font-heading text-3xl md:text-4xl font-bold mb-2">
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
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {certificates.map((certificate, index) => (
                                <motion.div
                                    key={certificate.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.5,
                                    }}
                                >
                                    <CertificateTile certificate={certificate} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
}
