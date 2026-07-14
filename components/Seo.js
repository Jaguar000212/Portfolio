import Head from "next/head";

const SITE_URL = "https://jaguar000212.github.io";
const DEFAULT_IMAGE = "/images/others/Jaguar000212.png";

const PERSON_SCHEMA = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shryansh Parashar",
    url: SITE_URL,
    jobTitle: "Software Engineer",
    sameAs: [
        "https://github.com/Jaguar000212",
        "https://www.linkedin.com/in/jaguar000212/",
        "https://www.instagram.com/jaguar000212/",
        "https://twitter.com/Jaguar000212",
        "https://www.facebook.com/profile.php?id=100088920641500",
    ],
};

/**
 * Shared SEO head tags for all pages.
 * @param {object} props
 * @param {string} props.title - Page title (without site name suffix)
 * @param {string} props.description
 * @param {string} [props.path] - Route path, e.g. "/projects". Defaults to "/".
 * @param {string} [props.image] - Absolute or root-relative image path for social previews.
 * @param {boolean} [props.personSchema] - Include the site-wide Person JSON-LD (homepage only).
 */
export default function Seo({
    title,
    description,
    path = "/",
    image = DEFAULT_IMAGE,
    personSchema = false,
}) {
    const url = `${SITE_URL}${path}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />
            <link rel="canonical" href={url} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={imageUrl} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={imageUrl} />

            {personSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(PERSON_SCHEMA),
                    }}
                />
            )}
        </Head>
    );
}
