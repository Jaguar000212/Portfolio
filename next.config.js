/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "via.placeholder.com",
            "img.icons8.com",
            "developer.android.com",
        ],
        unoptimized: true,
    },
    output: "export",
    assetPrefix: "./",
};

module.exports = nextConfig;
