import "../styles/globals.css";
import "../styles/animations.css";
import "../styles/fonts.css";
import "../styles/card-effects.css";
import "../styles/skills-orbit.css";
import "../styles/github-stats.css";
import {jetbrainsMono, poppins, spaceGrotesk} from "../lib/fonts";
import {MotionConfig} from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Head from "next/head";
import {ThemeProvider} from "../context/ThemeContext";

function MyApp({Component, pageProps}) {
    return (
        <ThemeProvider>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <meta
                    name="description"
                    content="Portfolio of Shryansh, a Mobile App Developer specializing in Android development."
                />
            </Head>
            {/* font-body sets the real default here, since <html> (rendered
                by _document.js) can't see these variables — next/font isn't
                supported there, and CSS vars only cascade downward. */}
            <MotionConfig reducedMotion="user">
                <div
                    className={`min-h-screen flex flex-col font-body ${poppins.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
                >
                    <Navbar/>
                    <main className="flex-grow">
                        <Component {...pageProps} />
                    </main>
                    <Footer/>
                </div>
            </MotionConfig>
        </ThemeProvider>
    );
}

export default MyApp;
