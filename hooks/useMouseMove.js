import { useRef, useState } from "react";

/**
 * Hook for tracking mouse position on an element and applying it to CSS variables
 * Used for the gradient border effect on cards
 */
export const useMouseMove = () => {
    const elementRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e) => {
        if (!elementRef.current) return;

        const rect = elementRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        elementRef.current.style.setProperty("--x", `${x}px`);
        elementRef.current.style.setProperty("--y", `${y}px`);
    };

    const mouseHandlers = {
        onMouseMove: handleMouseMove,
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    return {
        elementRef,
        isHovered,
        mouseHandlers,
        setIsHovered,
    };
};
