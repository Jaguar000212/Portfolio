import { useRef, useState } from "react";

/**
 * Custom hook for handling hover effects on feature cards in the "What I Do" section
 * Provides consistent animation settings and mouse tracking for gradient borders
 */
export function useFeatureCards() {
    // State for each card's hover status
    const [hoveredCards, setHoveredCards] = useState({
        card1: false,
        card2: false,
        card3: false,
    });

    // Refs for each card to track mouse position
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);

    // Common animation settings
    const springConfig = {
        duration: 0.3,
        type: "tween",
        ease: "easeOut",
    };

    // Function to handle mouse movement on cards
    const handleMouseMove = (e, ref) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        ref.current.style.setProperty("--x", `${x}px`);
        ref.current.style.setProperty("--y", `${y}px`);
    };

    // Event handlers for each card
    const cardHandlers = {
        card1: {
            onHoverStart: () =>
                setHoveredCards((prev) => ({ ...prev, card1: true })),
            onHoverEnd: () =>
                setHoveredCards((prev) => ({ ...prev, card1: false })),
            onMouseMove: (e) => handleMouseMove(e, card1Ref),
        },
        card2: {
            onHoverStart: () =>
                setHoveredCards((prev) => ({ ...prev, card2: true })),
            onHoverEnd: () =>
                setHoveredCards((prev) => ({ ...prev, card2: false })),
            onMouseMove: (e) => handleMouseMove(e, card2Ref),
        },
        card3: {
            onHoverStart: () =>
                setHoveredCards((prev) => ({ ...prev, card3: true })),
            onHoverEnd: () =>
                setHoveredCards((prev) => ({ ...prev, card3: false })),
            onMouseMove: (e) => handleMouseMove(e, card3Ref),
        },
    };

    return {
        hoveredCards,
        card1Ref,
        card2Ref,
        card3Ref,
        springConfig,
        cardHandlers,
    };
}
