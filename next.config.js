/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        appDir: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "oaidalleapiprodscus.blob.core.windows.net",
                port: "",
                pathname:
                    "/private/org-6t32pgO9hoQTUHGtr6cyRnQG/user-U4u31xrmnwsEljqBMUN07HJS/**",
            },
        ],
    },
};

module.exports = nextConfig;
