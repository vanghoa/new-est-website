/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                source: '/',
                headers: [
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ];
    },
    reactStrictMode: true,
    images: {
        domains: [
            'res.cloudinary.com', // Images moved to Cloudinary
        ],
        minimumCacheTTL: 60,
    },
    experimental: {
        serverActions: true,
    },
};
module.exports = nextConfig;
