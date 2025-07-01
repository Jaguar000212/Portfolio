/**
 * Common animation variants for use with Framer Motion
 * These help maintain consistency across the application
 */

// Simple fade in animation
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6 },
    },
};

// Fade in from bottom animation
export const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6 },
    },
};

// Scale in animation
export const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.6 },
    },
};

// Container for staggered animations
export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1,
        },
    },
};

// Item for use with staggerContainer
export const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 },
    },
};

// Hover animation preset
export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.2 },
};

// Hover animation with shadow
export const hoverCard = (y = true) => ({
    y: y ? -8 : 0,
    boxShadow:
        "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
});

// Spring animation configuration
export const springConfig = {
    type: "spring",
    stiffness: 500,
    damping: 15,
};
