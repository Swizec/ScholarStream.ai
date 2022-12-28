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
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                port: "",
                pathname: "/dcyogyeng/**",
            },
        ],
    },
};

module.exports = nextConfig;
