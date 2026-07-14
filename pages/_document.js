import { Html, Head, Main, NextScript } from "next/document";

// Applies the dark class before hydration so there's no flash of the
// wrong theme on load. Runs synchronously as the very first thing parsed
// in <head>, ahead of any stylesheet or React code.
const themeInitScript = `
(function () {
    try {
        var theme = localStorage.getItem("theme");
        var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        if (theme === "dark" || (!theme && prefersDark)) {
            document.documentElement.classList.add("dark");
        }
    } catch (e) {}
})();
`;

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
