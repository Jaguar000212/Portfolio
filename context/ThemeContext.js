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

    // The inline script in _document.js already applies the "dark" class
    // before hydration (to avoid a flash of the wrong theme), so we just
    // read that decision back into state here instead of recomputing it.
    useEffect(() => {
        setIsDarkMode(document.documentElement.classList.contains("dark"));
        setIsLoaded(true);
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
