/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans, Alegreya } from 'next/font/google';
import FirstWebsite from '@/components/FirstWebsite';
import Script from 'next/script';
import Link from 'next/link';
import { Char, Rand } from '@/components/WordProcessor';
import { Tooltips } from '@/components/SmallComponents';
import Navbar from '@/components/Navbar';
import { scultpclass } from '@/components/TailwindClass';
import GuestSpace from '@/components/GuestSpace';
import { Suspense } from 'react';
import { getGuest } from '@/hooks/getGuest';
import { GuestBook } from '@prisma/client';
//import GuestBookContext from '@/components/GuestBookContext';
import { spiralGen, SculpturePiece } from '@/components/SculptureConstruct';
import Footer from '@/components/Footer';

const sans = Work_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
});

const display = Alegreya({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    variable: '--font-display',
});

export const metadata: Metadata = {
    title: 'Bảo Anh Bùi',
    description: 'personal site of Bảo Anh',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
};

const build = true;

const GenerateNestedDivs = ({ levels }: { levels: number }) => (
    <div>
        {levels <= 0 ? (
            <div></div>
        ) : (
            <GenerateNestedDivs levels={levels - 1}></GenerateNestedDivs>
        )}
    </div>
);

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="tw-w-full tw-bg-black tw-h-[var(--vh100)]">
            <body
                className={`${sans.variable} ${display.variable} tw-w-full tw-h-[var(--vh100)] tw-relative tw-bg-black tw-overflow-y-scroll`}
            >
                <Script
                    src="/beforeInteractive.js"
                    strategy="beforeInteractive"
                ></Script>
                {false ?? (
                    <Script
                        src="https://cdn.babylonjs.com/babylon.js"
                        strategy="beforeInteractive"
                    ></Script>
                )}
                <section className="[&_*]:tw-text-white [&_*]:tw-leading-relaxed reset-this tw-pointer-events-none tw-overflow-x-hidden">
                    <Navbar></Navbar>
                    <div
                        className={`reveal_child tw-px-11 tw-max-w-6xl tw-m-auto tw-relative tw-z-20 tw-pt-32 tw-overflow-visible tw-pointer-events-auto tw-min-h-[var(--vh100)] [&_>_*:not(.rnr-image)]:tw-mx-auto [&_>_*:not(.rnr-image)]:tw-max-w-3xl`}
                    >
                        {children}
                        <Footer></Footer>
                    </div>
                </section>
                {/*
                    <div id="fb-root"></div>
                    <div id="fb-customer-chat" className="fb-customerchat"></div>
                    <Script id="facebookscript">
                                    {`var chatbox = document.getElementById('fb-customer-chat');
                    chatbox.setAttribute("page_id", "104245369195652");
                    chatbox.setAttribute("attribution", "biz_inbox");
                    window.fbAsyncInit = function() {
                        FB.init({
                        xfbml            : true,
                        version          : 'v18.0'
                        });
                    };

                    (function(d, s, id) {
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) return;
                        js = d.createElement(s); js.id = id;
                        js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));`}
                                </Script>    
                    */}

                {build && <FirstWebsite></FirstWebsite>}
                {build && (
                    <Suspense fallback={<p></p>}>
                        <GuestWrapper></GuestWrapper>
                    </Suspense>
                )}
                {build && (
                    <div
                        className={`${scultpclass} tw-fixed blacklayer reveal_child preserve3d tw-pointer-events-none`}
                    >
                        {Array.from({ length: 25 }, (_, i) => {
                            const [x, y] = spiralGen(
                                i * 3,
                                1,
                                13.9,
                                68,
                                [37.6, 37.6]
                            );
                            return (
                                <SculpturePiece
                                    key={`${i}sculpt`}
                                    index={i}
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

async function GuestWrapper() {
    const feed: GuestBook[] = await getGuest();
    return <GuestSpace feed={feed}></GuestSpace>;
}
