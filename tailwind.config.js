/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0070f3",
                secondary: "#ff0080",
                dark: "#111111",
                light: "#ffffff",
            },
            fontFamily: {
                sans: ["Poppins", "sans-serif"],
                heading: ["Space Grotesk", "sans-serif"],
                signature: ["Dancing Script", "cursive"],
            },
        },
    },
    darkMode: "class",
    plugins: [],
};
