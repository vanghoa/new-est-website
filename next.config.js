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
            'prod-files-secure.s3.us-west-2.amazonaws.com', // Notion images
            'res.cloudinary.com', // Images moved to Cloudinary
        ],
        //minimumCacheTTL: 112492800, // 6 months. trying here that Next.js doesn't clear cache for iamges, as the Notion links are temporary
    },
};
module.exports = nextConfig;
