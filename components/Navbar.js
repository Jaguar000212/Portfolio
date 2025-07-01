import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ThemeToggle from "./ThemeToggle";
import { motion } from "framer-motion";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false);
    }, [router.pathname]);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "Projects", path: "/projects" },
        { name: "Skills", path: "/skills" },
        { name: "Education", path: "/education" },
        { name: "Certificates", path: "/certificates" },
    ];

    return (
        <nav className="bg-white dark:bg-dark shadow-sm sticky top-0 z-50">
            <div className="container-custom py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="flex items-center hover:scale-105 transition-transform duration-300 group"
                    >
                        <span className="text-4xl text-gray-500">&lt;</span>
                        <span className="text-2xl signature-text text-primary group-hover:text-secondary transition-colors duration-300">
                            Jaguar000212
                        </span>
                        <span className="text-4xl text-gray-500">/&gt;</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <ul className="flex space-x-6">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className={`font-medium font-heading transition-colors duration-300 ${
                                            router.pathname === item.path
                                                ? "text-primary"
                                                : "text-gray-700 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ThemeToggle />
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 ml-4 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12"></path>
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden py-4"
                    >
                        <ul className="flex flex-col space-y-4">
                            {navItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.path}
                                        className={`block font-medium font-heading px-3 py-2 rounded-md transition-colors duration-300 ${
                                            router.pathname === item.path
                                                ? "text-primary bg-gray-100 dark:bg-gray-800"
                                                : "text-gray-700 dark:text-gray-300 hover:text-secondary dark:hover:text-secondary"
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
