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
                tooltips: 'Welcome back',
            },
            {
                name: 'Works',
                href: '/i_love_my_work',
                tooltips: 'See my projects, my works here',
            },
            {
                name: 'Contact',
                href: '/contact',
                tooltips: '+65 8421 7539',
            },
        ],
        [
            {
                name: 'Info',
                href: '/info',
                tooltips:
                    'Find out everything about me, what I have been through and what I am capable of...',
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
            <div className="reveal_child tw-z-[-1] tw-max-w-3xl tw-flex tw-justify-around tw-w-fit tw-gap-5 sm:tw-gap-8 md:tw-gap-14 tw-bg-black tw-h-[3.3rem] tw-pointer-events-auto">
                {navlist[0].map(({ name, href, tooltips }, i) => (
                    <span
                        key={`navlist${i}`}
                        className="tw-h-full tw-flex tw-items-center tw-justify-center tw-group tw-min-w-[8rem]"
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
            <div className="reveal_child [&_a]:tw-bottom-[0.4rem] tw-z-[-2] tw-max-w-3xl tw-flex tw-justify-around tw-w-fit tw-gap-5 sm:tw-gap-8 md:tw-gap-14 tw-bg-black tw-h-11 tw-pointer-events-auto">
                <span className="tw-h-full tw-flex tw-items-center tw-justify-center tw-group tw-min-w-[8rem]">
                    <Char
                        elem={'a'}
                        rest={{
                            href: '/resume/baoanhbui-resume-181023.pdf',
                            target: '_blank',
                        }}
                    >
                        Resume
                        <Tooltips>a pdf file ~49kb</Tooltips>
                    </Char>
                </span>
                {navlist[1].map(({ name, href, tooltips }, i) => (
                    <span
                        key={`navlist${i}`}
                        className="tw-h-full tw-flex tw-items-center tw-justify-center tw-group tw-min-w-[8rem]"
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
            <div className="[&_a]:tw-bottom-1 tw-z-[-3] tw-max-w-3xl tw-flex tw-justify-around tw-w-fit tw-gap-5 sm:tw-gap-8 md:tw-gap-14 tw-bg-black tw-h-10 tw-pointer-events-auto tw-border-t-8 tw-border-black">
                <span className="tw-w-32 tw-h-full tw-flex tw-items-center tw-justify-center tw-group">
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
