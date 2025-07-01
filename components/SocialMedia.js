import React from "react";
import { motion } from "framer-motion";

const SocialMedia = ({ className = "" }) => {
    const socials = [
        {
            name: "github",
            icon: "fab fa-github",
            url: "https://github.com/Jaguar000212",
            color: "hover:bg-gray-800 dark:hover:bg-gray-700",
        },
        {
            name: "linkedin",
            icon: "fab fa-linkedin-in",
            url: "https://www.linkedin.com/in/jaguar000212/",
            color: "hover:bg-blue-600 dark:hover:bg-blue-700",
        },
        {
            name: "email",
            icon: "fas fa-envelope",
            url: "mailto:jaguar000212@gmail.com",
            color: "hover:bg-red-500 dark:hover:bg-red-600",
        },
        {
            name: "facebook",
            icon: "fab fa-facebook-f",
            url: "https://www.facebook.com/profile.php?id=100088920641500",
            color: "hover:bg-blue-800 dark:hover:bg-blue-900",
        },
        {
            name: "instagram",
            icon: "fab fa-instagram",
            url: "https://www.instagram.com/jaguar000212/",
            color: "hover:bg-pink-600 dark:hover:bg-pink-700",
        },
        {
            name: "twitter",
            icon: "fab fa-twitter",
            url: "https://twitter.com/Jaguar000212",
            color: "hover:bg-blue-400 dark:hover:bg-blue-500",
        },
    ];

    return (
        <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
            {socials.map((social) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`icon-button ${social.name} w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} hover:text-white transition-all duration-300`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                >
                    <i className={social.icon}></i>
                </motion.a>
            ))}
        </div>
    );
};

export default SocialMedia;
