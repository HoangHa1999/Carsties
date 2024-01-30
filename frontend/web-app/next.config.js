/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["cdn.pixabay.com"],
    },
    output: "standalone",
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};

module.exports = nextConfig;
