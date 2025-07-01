import { motion } from "framer-motion";
import Image from "next/image";
import { useMouseMove } from "../hooks/useMouseMove";

const CertificateTile = ({ certificate }) => {
    const { elementRef, isHovered, mouseHandlers } = useMouseMove();

    return (
        <motion.div
            ref={elementRef}
            className={`card relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-sm ${
                isHovered ? "gradient-border" : ""
            }`}
            whileHover={{
                y: -5,
                boxShadow:
                    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            }}
            initial={{ boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)" }}
            transition={{
                duration: 0.3,
                type: "tween",
                ease: "easeOut",
            }}
            onHoverStart={mouseHandlers.onMouseEnter}
            onHoverEnd={mouseHandlers.onMouseLeave}
            onMouseMove={mouseHandlers.onMouseMove}
        >
            <div className="relative h-36 w-full bg-gray-100 dark:bg-gray-800 z-0">
                <Image
                    src={
                        certificate.image ||
                        "/images/certificate-placeholder.svg"
                    }
                    alt={certificate.name}
                    layout="fill"
                    objectFit="contain"
                    className="bg-white"
                />
            </div>

            <div className="p-5 z-0">
                <h3 className="text-lg mb-1 font-heading">
                    {certificate.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-body">
                    {certificate.issuer} • {certificate.date}
                </p>

                <a
                    href={certificate.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary hover:underline text-sm font-body"
                >
                    <span>View Certificate</span>
                    <svg
                        className="w-4 h-4 ml-1"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </a>
            </div>
        </motion.div>
    );
};

export default CertificateTile;
