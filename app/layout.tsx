/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans, Alegreya } from 'next/font/google';
import FirstWebsite from '@/components/FirstWebsite';
import Script from 'next/script';
import Link from 'next/link';
import { Char } from '@/components/WordProcessor';

const sans = Work_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
});

const display = Alegreya({
    weight: '700',
    subsets: ['latin'],
    variable: '--font-display',
});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

const scultpclass = 'tw-w-full tw-h-full tw-bg-transparent tw-left-0 tw-top-0';
const build =
    process.env.FETCH_URL == 'http://baoanhbui.vercel.app' ||
    process.env.FETCH_URL == 'http://localhost:3000';

const GenerateNestedDivs = ({ levels }: { levels: number }) => (
    <div>
        {levels <= 0 ? (
            <div></div>
        ) : (
            <GenerateNestedDivs levels={levels - 1}></GenerateNestedDivs>
        )}
    </div>
);

const SculpturePiece = ({
    style = {},
    key,
    min = 0,
    max = 100,
    left = Math.random() * (max - min) + min,
    top = Math.random() * (max - min) + min,
}: {
    style?: React.CSSProperties;
    key?: string;
    left?: number;
    top?: number;
    min?: number;
    max?: number;
}) => {
    return (
        <div
            key={key}
            style={{
                left: `${Math.floor(left)}%`,
                top: `${Math.floor(top)}%`,
                ...style,
            }}
        ></div>
    );
};

const spiralGen = (
    i: number,
    cycle: number,
    minr: number,
    maxr: number,
    cen: number[] = [50, 50]
) => {
    const radians = (i / 10) * Math.PI;
    const angularDisplacement = 180 / cycle;
    const phaseShift = (i / angularDisplacement) * Math.PI;
    const radius = minr + (maxr - minr) * Math.sin(phaseShift);
    return [
        cen[0] + radius * Math.cos(radians),
        cen[1] + radius * Math.sin(radians),
    ];
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className="tw-w-full tw-bg-black"
            style={{ height: `calc(100*var(--vh))` }}
        >
            <body
                className={`${sans.variable} ${display.variable} tw-w-full tw-h-full tw-relative tw-bg-black`}
            >
                <Script
                    src="/beforeInteractive.js"
                    strategy="beforeInteractive"
                ></Script>

                <nav className="tw-max-w-5xl tw-m-auto tw-px-[10vw] [&_*]:tw-text-white tw-flex tw-h-[8vh] tw-justify-between tw-items-center tw-fixed tw-left-0 tw-right-0 tw-bg-black tw-z-40">
                    <Char isLink rest={{ href: '/' }}>
                        : home :
                    </Char>
                    <Char isLink rest={{ href: '/my_info' }}>
                        : info :
                    </Char>
                    <Char isLink rest={{ href: '/i_love_my_work' }}>
                        : works :
                    </Char>
                    <Char isLink rest={{ href: '/resume' }}>
                        : resume :
                    </Char>
                </nav>
                <main
                    className={`${scultpclass} tw-px-[10vw] [&_*]:tw-text-white tw-overflow-auto reset-this tw-max-w-5xl tw-m-auto tw-relative tw-z-20 [&_*]:tw-leading-normal tw-pt-[8vh]`}
                >
                    {children}
                </main>
                {build && <FirstWebsite></FirstWebsite>}
                {build && (
                    <div
                        className={`${scultpclass} tw-absolute tw-pointer-events-none translayer preserve3d`}
                    >
                        {Array.from({ length: 50 }, (_, i) => {
                            const [x, y] = spiralGen(i * 1.5, 5, 30, 40);
                            return (
                                <>
                                    <SculpturePiece
                                        key={`${i}sculpt`}
                                        left={x}
                                        top={y}
                                    ></SculpturePiece>
                                    <SculpturePiece
                                        key={`${i}sculpt_ran`}
                                    ></SculpturePiece>
                                </>
                            );
                        })}
                    </div>
                )}
                {build && (
                    <div
                        className={`${scultpclass} tw-absolute tw-pointer-events-none blacklayer preserve3d`}
                    >
                        {Array.from({ length: 25 }, (_, i) => {
                            const [x, y] = spiralGen(
                                i * 3,
                                1,
                                13.5,
                                68,
                                [35, 35]
                            );
                            return (
                                <SculpturePiece
                                    key={`${i}sculpt`}
                                    left={x}
                                    top={y}
                                ></SculpturePiece>
                            );
                        })}
                    </div>
                )}
                {build && <Script src="/base/base.js"></Script>}
            </body>
        </html>
    );
}
