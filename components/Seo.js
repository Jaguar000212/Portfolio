import Head from "next/head";

const SITE_URL = "https://www.jaguar000212.me";
const DEFAULT_IMAGE = "/images/others/Jaguar000212.png";

/**
 * Shared SEO head tags for all pages.
 * @param {object} props
 * @param {string} props.title - Page title (without site name suffix)
 * @param {string} props.description
 * @param {string} [props.path] - Route path, e.g. "/projects". Defaults to "/".
 * @param {string} [props.image] - Absolute or root-relative image path for social previews.
 */
export default function Seo({ title, description, path = "/", image = DEFAULT_IMAGE }) {
    const url = `${SITE_URL}${path}`;
    const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

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
        </Head>
    );
}
