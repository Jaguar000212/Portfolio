import React from "react";
import {motion} from "framer-motion";
import {FACEBOOK_PATH, GITHUB_PATH, GMAIL_PATH, INSTAGRAM_PATH, X_PATH,} from "../constants/brandIcons";

// LinkedIn has no simple-icons entry (removed upstream), so it renders as
// a plain "in" badge instead of a logo.
const socials = [
    {
        name: "github",
        path: GITHUB_PATH,
        url: "https://github.com/Jaguar000212",
        color: "hover:bg-gray-800 dark:hover:bg-gray-700",
    },
    {
        name: "linkedin",
        path: null,
        url: "https://www.linkedin.com/in/jaguar000212/",
        color: "hover:bg-blue-600 dark:hover:bg-blue-700",
    },
    {
        name: "email",
        path: GMAIL_PATH,
        url: "mailto:jaguar000212@gmail.com",
        color: "hover:bg-red-500 dark:hover:bg-red-600",
    },
    {
        name: "facebook",
        path: FACEBOOK_PATH,
        url: "https://www.facebook.com/profile.php?id=100088920641500",
        color: "hover:bg-blue-800 dark:hover:bg-blue-900",
    },
    {
        name: "instagram",
        path: INSTAGRAM_PATH,
        url: "https://www.instagram.com/jaguar000212/",
        color: "hover:bg-pink-600 dark:hover:bg-pink-700",
    },
    {
        name: "twitter",
        path: X_PATH,
        url: "https://twitter.com/Jaguar000212",
        color: "hover:bg-blue-400 dark:hover:bg-blue-500",
    },
];

const SocialMedia = ({className = ""}) => {
    return (
        <div className={`flex flex-wrap justify-center gap-4 ${className}`}>
            {socials.map((social) => (
                <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`icon-button ${social.name} w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 ${social.color} hover:text-white transition-all duration-300`}
                    whileHover={{scale: 1.1}}
                    whileTap={{scale: 0.95}}
                    aria-label={social.name}
                >
                    {social.path ? (
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                            <path d={social.path}/>
                        </svg>
                    ) : (
                        <span className="text-sm font-bold leading-none">in</span>
                    )}
                </motion.a>
            ))}
        </div>
    );
};

export default SocialMedia;
