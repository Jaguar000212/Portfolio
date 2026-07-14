import {motion} from "framer-motion";
import Image from "next/image";
import {useMouseMove} from "../hooks/useMouseMove";
import {cardHoverShadow, cardHoverTransition} from "../constants/animations";
import ArrowLinkIcon from "./ArrowLinkIcon";

const CertificateTile = ({certificate}) => {
    const {elementRef, isHovered, mouseHandlers} = useMouseMove();

    return (<motion.div
        ref={elementRef}
        className={`card flex flex-col h-full relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-sm ${isHovered ? "gradient-border" : ""}`}
        whileHover={{
            y: -5, boxShadow: cardHoverShadow,
        }}
        initial={{boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)"}}
        transition={cardHoverTransition}
        onHoverStart={mouseHandlers.onMouseEnter}
        onHoverEnd={mouseHandlers.onMouseLeave}
        onMouseMove={mouseHandlers.onMouseMove}
    >
        <div className="relative h-36 w-full bg-gray-100 dark:bg-gray-800 z-0">
            <Image
                src={certificate.image || "/images/certificate-placeholder.svg"}
                alt={certificate.name}
                fill
                style={{objectFit: "contain"}}
                className="bg-white"
            />
        </div>

        <div className="p-5 z-0 flex flex-col flex-1 min-h-0">
            <h3 className="text-lg mb-1 font-heading">
                {certificate.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 font-body">
                {certificate.issuer} • {certificate.date}
            </p>

            <div className="mb-4 flex flex-wrap gap-2 mt-auto">
                {certificate.technologies.map((tech, index) => (<span
                    key={index}
                    className="font-body inline-block bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                                {tech}
                            </span>))}
            </div>

            <a
                href={certificate.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex mt-auto items-center text-primary hover:underline text-sm font-body"
            >
                <span>View Certificate</span>
                <ArrowLinkIcon/>
            </a>
        </div>
    </motion.div>);
};

export default CertificateTile;
