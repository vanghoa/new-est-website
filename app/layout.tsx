/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import './globals.css';
import type { Metadata } from 'next';
import { Work_Sans, Alegreya } from 'next/font/google';
import FirstWebsite from '@/components/FirstWebsite';
import Script from 'next/script';
import localFont from 'next/font/local';
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
import { DOMAIN } from '@/constants/paths';
import 'swiper/css';

const sans = Work_Sans({
    subsets: ['latin'],
    variable: '--font-sans',
});

const display = Alegreya({
    subsets: ['latin'],
    style: ['normal', 'italic'],
    variable: '--font-display',
});

const mono = localFont({
    weight: '100',
    src: '../public/font/SelectMono-Italic.woff',
    display: 'swap',
    variable: '--font-mono',
});

const metadata_template = {
    title: 'Bảo Anh',
    description: `Personal site/portfolio of Bảo Anh Bùi`,
    images: '/base/garage/2.jpg',
};

export const revalidate = 0;

export const metadata: Metadata = {
    title: metadata_template.title,
    metadataBase: new URL(DOMAIN),
    description: metadata_template.description,
    creator: 'Bao Anh Bui',
    publisher: 'Bui Nguyen Bao Anh',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    alternates: {
        canonical: DOMAIN,
        languages: {
            'vn-BIP': '/vn-BIP',
        },
    },
    openGraph: {
        title: metadata_template.title,
        description: metadata_template.description,
        url: DOMAIN,
        siteName: metadata_template.title,
        images: metadata_template.images,
        locale: 'vn_BIP',
        type: 'article',
        authors: ['Bao', 'Bui'],
    },
    twitter: {
        card: 'summary',
        title: metadata_template.title,
        description: metadata_template.description,
        creator: 'Bao Anh Bui',
        images: metadata_template.images,
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
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
                className={`${sans.variable} ${display.variable} ${mono.variable} tw-w-full tw-h-[var(--vh100)] tw-relative tw-bg-black tw-overflow-y-scroll`}
            >
                <Script
                    src="/beforeInteractive.js"
                    strategy="beforeInteractive"
                ></Script>
                {/* (
                    <Script
                        src="https://cdn.babylonjs.com/babylon.js"
                        strategy="beforeInteractive"
                    ></Script>
                ) */}
                <section className="[&_*]:tw-text-white [&_*]:tw-leading-relaxed reset-this tw-pointer-events-none tw-overflow-x-hidden">
                    <Navbar></Navbar>
                    <div
                        className={`reveal_child tw-px-11 tw-max-w-6xl tw-m-auto tw-relative tw-z-20 tw-pt-32 tw-overflow-visible tw-pointer-events-auto tw-min-h-[var(--vh100)] [&_>_:first-child:not(.suspense)_>:not(.rnr-image)]:tw-mx-auto [&_>_:first-child:not(.suspense)_>:not(.rnr-image)]:tw-max-w-3xl`}
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

                <FirstWebsite></FirstWebsite>
                <Suspense fallback={<p></p>}>
                    <GuestWrapper></GuestWrapper>
                </Suspense>
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
                <Script src="/base/base.js"></Script>
            </body>
        </html>
    );
}

async function GuestWrapper() {
    const feed: GuestBook[] = await getGuest();
    return <GuestSpace feed={feed}></GuestSpace>;
}
