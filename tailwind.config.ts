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
        colors: {
            white: 'var(--text-color)',
            black: 'var(--background-color)',
            transparent: 'rgba(255,255,255,0)',
            yellow: 'var(--yellow)',
            blue: 'rgba(0, 116, 255, 0.8)',
        },
        fontFamily: {
            display: 'var(--font-display)',
            body: 'var(--font-sans)',
            mono: 'var(--font-mono)',
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
