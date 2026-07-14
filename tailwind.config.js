/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                // Canonical values live in styles/globals.css (:root); these
                // read from the same CSS variables so Tailwind utilities
                // (bg-primary, text-primary, ...) and the raw CSS in
                // card-effects.css never drift apart.
                primary: "var(--color-primary)",
                secondary: "var(--color-secondary)",
                dark: "#111111",
                light: "#ffffff",
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
