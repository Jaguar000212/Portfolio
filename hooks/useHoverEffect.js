import { useState } from "react";

/**
 * A simplified hook for handling hover states
 * @returns {[boolean, {onMouseEnter: function, onMouseLeave: function}]}
 * Returns isHovered state and handlers
 */
export default function useHoverEffect() {
    const [isHovered, setIsHovered] = useState(false);

    const hoverHandlers = {
        onMouseEnter: () => setIsHovered(true),
        onMouseLeave: () => setIsHovered(false),
    };

    return [isHovered, hoverHandlers];
}
