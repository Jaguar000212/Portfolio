import React, { createContext, useContext, useEffect, useState } from "react";

// Create Theme Context
const ThemeContext = createContext();

/**
 * Theme Provider Component
 * Manages theme state and provides context to the entire application
 */
export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    // Initialize theme from localStorage or system preference
    useEffect(() => {
        // Check if we're in the browser environment
        if (typeof window !== "undefined") {
            const savedTheme = localStorage.getItem("theme");
            const prefersDark = window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

            if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
                setIsDarkMode(true);
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }

            setIsLoaded(true);
        }
    }, []);

    // Toggle theme function
    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        if (!isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, isLoaded }}>
            {children}
        </ThemeContext.Provider>
    );
};

/**
 * Custom hook for accessing theme context
 * @returns {Object} Theme context value
 */
export const useTheme = () => useContext(ThemeContext);
