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
            keyframes: {
                reveal: {
                    from: { top: '-20px' },
                },
            },
            animation: {
                reveal: 'reveal 1.5s',
            },
            boxShadow: {
                glow: '0 0px 50px 20px white',
            },
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
