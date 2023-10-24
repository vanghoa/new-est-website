'use client';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { Tooltips } from './SmallComponents';
import { Char, Rand } from './WordProcessor';

export default function Navbar() {
    const pathname = `/${usePathname().split('/')[1]}`;
    const navlist = [
        [
            {
                name: 'Home',
                href: '/',
                tooltips:
                    'Landing page ... You can also leave some words on this site ...',
            },
            {
                name: 'Works',
                href: '/i_love_my_work',
                tooltips:
                    'I have been working on a few projects, from client, full-time to self-initiated ones.',
            },
            {
                name: 'Contact',
                href: '/contact',
                tooltips: (
                    <>
                        +65 8421 7539 , baoanh1buinguyen@gmail.com , <br></br>{' '}
                        at Toa Payoh, Singapore
                    </>
                ),
            },
        ],
        [
            {
                name: 'Info',
                href: '/info',
                tooltips: 'Some info about wu I am, and what I am made out of.',
            },
        ],
    ];
    const [current, setCur] = useState(pathname);

    useEffect(() => {
        setCur(pathname);
    }, [pathname]);

    function togglereveal(event: React.MouseEvent<HTMLElement>) {
        event.preventDefault();
        document.body.classList.toggle('reveal');
    }

    return (
        <nav className="tw-flex tw-flex-col tw-items-center tw-h-fit tw-fixed tw-w-full  tw-z-40 [&_*]:tw-font-display tw-overflow-visible tw-pointer-events-none">
            <div className="reveal_child tw-z-[-1] tw-max-w-3xl tw-flex tw-justify-around tw-w-fit tw-gap-2 sm:tw-gap-8 md:tw-gap-14 tw-bg-black tw-h-16 tw-pointer-events-auto tw-pt-2">
                {navlist[0].map(({ name, href, tooltips }, i) => (
                    <span
                        key={`navlist${i}`}
                        className="tw-h-full tw-flex tw-items-center tw-justify-center tw-group tw-min-w-[8.5rem]"
                    >
                        <Char
                            isLink
                            rest={{ href: href }}
                            className={` ${
                                current == href
                                    ? `after:tw-content-['_<--'] before:tw-content-['-->_']`
                                    : ''
                            }`}
                        >
                            {name}
                            <Tooltips>{tooltips}</Tooltips>
                        </Char>
                    </span>
                ))}
            </div>
            <div className="reveal_child [&_a]:tw-bottom-[0.4rem] tw-z-[-2] tw-max-w-3xl tw-flex tw-justify-around tw-w-fit tw-gap-2 sm:tw-gap-8 md:tw-gap-14 tw-bg-black tw-h-12 tw-pointer-events-auto">
                <span className="tw-h-full tw-flex tw-items-center tw-justify-center tw-group tw-min-w-[8.5rem]">
                    <Char
                        elem={'a'}
                        rest={{
                            href: '/resume/baoanhbui-resume-221023.pdf',
                            target: '_blank',
                        }}
                    >
                        Resume
                        <Tooltips>
                            a pdf file ~60kb breaking down my professional and
                            academic experiences.
                        </Tooltips>
                    </Char>
                </span>
                {navlist[1].map(({ name, href, tooltips }, i) => (
                    <span
                        key={`navlist${i}`}
                        className="tw-h-full tw-flex tw-items-center tw-justify-center tw-group tw-min-w-[8.5rem]"
                    >
                        <Char
                            isLink
                            rest={{ href: href }}
                            className={` ${
                                current == href
                                    ? `after:tw-content-['_<--'] before:tw-content-['-->_']`
                                    : ''
                            }`}
                        >
                            {name}
                            <Tooltips>{tooltips}</Tooltips>
                        </Char>
                    </span>
                ))}
            </div>
            <div className="[&_a]:tw-bottom-1 tw-z-[-3] tw-max-w-3xl tw-flex tw-justify-around tw-w-fit tw-gap-2 sm:tw-gap-8 md:tw-gap-14 tw-bg-black tw-h-10 tw-pointer-events-auto tw-border-t-[15px] tw-border-black tw-border-b-8">
                <span className="tw-w-36 tw-h-full tw-flex tw-items-center tw-justify-center tw-group">
                    <Rand
                        elem={'a'}
                        min={4}
                        className="display_none tw-font-bold tw-cursor-pointer"
                        rest={{ onClick: togglereveal }}
                    >
                        {"``'-...__...-'``"}
                        <Tooltips className="tw-max-w-none tw-font-black">
                            {"_..-''''```''''-.._"}
                        </Tooltips>
                    </Rand>
                    <Rand
                        elem={'a'}
                        min={4}
                        className="display_on tw-hidden tw-font-bold tw-cursor-pointer"
                        rest={{ onClick: togglereveal }}
                    >
                        {"_..-''''```''''-.._"}
                        <Tooltips className="tw-max-w-none tw-font-black">
                            {"``'-...__...-'``"}
                        </Tooltips>
                    </Rand>
                </span>
            </div>
        </nav>
    );
}
