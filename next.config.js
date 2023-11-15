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
        minimumCacheTTL: 112492800,
    },
    experimental: {
        serverActions: true,
    },
};
module.exports = nextConfig;
