import Link from "next/link";
import SocialMedia from "./SocialMedia";

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-dark py-8 border-t border-gray-200 dark:border-gray-800">
            <div className="container-custom">
                <div className="flex flex-col items-center">
                    <Link
                        href="/"
                        className="font-heading font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                    >
                        Shryansh's Portfolio
                    </Link>

                    <SocialMedia className="mb-6" />

                    <div className="flex flex-wrap justify-center gap-8 mb-6 font-body">
                        <Link
                            href="/"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-duration-300"
                        >
                            Home
                        </Link>
                        <Link
                            href="/projects"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-duration-300"
                        >
                            Projects
                        </Link>
                        <Link
                            href="/skills"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-duration-300"
                        >
                            Skills
                        </Link>
                        <Link
                            href="/education"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-duration-300"
                        >
                            Education
                        </Link>
                        <Link
                            href="/certificates"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-duration-300"
                        >
                            Certificates
                        </Link>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Shryansh Parashar | All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
