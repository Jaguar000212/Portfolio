/**
 * Common animation variants for use with Framer Motion
 */

// Simple fade in animation
export const fadeIn = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.6 },
    },
};

// Shared hover treatment for cards (project/certificate/education/skill
// tiles) — the lift shadow and transition timing are identical everywhere;
// only the y-offset varies by card size, so that stays a per-usage value.
export const cardHoverShadow =
    "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)";

export const cardHoverTransition = {
    duration: 0.3,
    type: "tween",
    ease: "easeOut",
};
