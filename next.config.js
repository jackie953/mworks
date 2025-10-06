/** @type {import('next').NextConfig} */
const nextConfig = {
    // Existing configuration
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,

    // NEW CONFIGURATION: Custom Webpack setup to fix file system access errors
    webpack: (config, { isServer }) => {
        // This is a common fix for TinaCMS/Vercel conflicts.
        // It prevents the build from looking for the 'fs' (file system) module
        // where it's not needed, resolving the path/schema mismatch error.
        if (!isServer) {
            config.resolve.fallback.fs = false;
        }
        return config;
    }
};

module.exports = nextConfig;
