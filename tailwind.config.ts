import type { Config } from 'tailwindcss';

const config: Config = {
    future: {
        hoverOnlyWhenSupported: true,
    },
    prefix: 'tw-',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        fontFamily: {
            display: 'var(--font-display)',
            body: 'var(--font-sans)',
        },
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [],
    variants: {
        extend: {
            backgroundColor: ['group-hover'],
        },
    },
};
export default config;
