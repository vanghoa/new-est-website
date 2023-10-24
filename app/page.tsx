import AnimatePageComp from '@/components/AnimatePageComp';
import { TagArr } from '@/components/GridComp';
import GuestBookForm from '@/components/GuestBookForm';
import {
    Line,
    LineConstruct,
    LineLooser,
    WelcomeLine,
    lineConstructClass,
} from '@/components/Line';
import {
    CoverImage,
    HeaderLayout,
    OLOverlay,
} from '@/components/SmallComponents';
import {
    tw_divider,
    tw_grid_section,
    tw_line_overflow,
} from '@/components/TailwindClass';
import { Word } from '@/components/WordProcessor';
import { PATH_BLOG, getBlogPostPath } from '@/constants/paths';
import { cache_fetchNotion } from '@/lib/notionClient';
import { BlogPost } from '@/types/types';
import Link from 'next/link';
import { Fragment, ReactNode, Suspense } from 'react';

export default function Home() {
    return (
        <AnimatePageComp>
            <HeaderLayout className="tw-min-h-[calc(80vh-12.5rem)] tw-items-center tw-flex tw-flex-col">
                <Word
                    elem={'h1'}
                    className="tw-text-center tw-w-[min(20rem,100%)]"
                >
                    Bao Anh ... everyday ... bananas ... two
                </Word>
                <section className="tw-flex tw-flex-col tw-items-center tw-grow tw-justify-between tw-h-full tw-text-center">
                    <Word
                        elem={'article'}
                        className="tw-max-w-[30rem] [word-spacing:.2em]"
                    >
                        visitors Hello! I like to learn and experiment new ideas
                        in art, design and technology.
                    </Word>
                    <article className="tw-w-fit preserve3d">
                        <Link href={PATH_BLOG}>
                            <p className="tw-w-full tw-flex tw-justify-center">
                                ___
                            </p>
                            <p className="tw-w-full tw-flex tw-justify-center">
                                ____//
                                <span className="!tw-text-transparent selection:!tw-text-white tw-inline-block tw-w-1"></span>
                                ___
                                <span className="!tw-text-transparent selection:!tw-text-white tw-inline-block tw-w-1"></span>
                                \\____
                            </p>
                            <p className="tw-w-full tw-flex tw-justify-around">
                                <span>/</span>
                                <span className="!tw-text-transparent selection:!tw-text-white">
                                    __I_love_you__
                                </span>
                                <span>\</span>
                            </p>
                            <p className="tw-w-full preserve3d tw-flex tw-justify-around">
                                <span>{`|`}</span>
                                <span className="!tw-text-transparent selection:!tw-text-white">
                                    ___
                                </span>
                                <span className=" selection:!tw-text-transparent">
                                    see
                                    <span className="!tw-text-transparent selection:!tw-text-white">
                                        _for_
                                    </span>
                                    works
                                </span>
                                <span className="!tw-text-transparent selection:!tw-text-white">
                                    ___
                                </span>
                                <span>{`|`}</span>
                            </p>
                            <p className="tw-w-full tw-flex tw-justify-around">
                                <span>\</span>
                                <span className="!tw-text-transparent selection:!tw-text-white">
                                    ___being_here_!___
                                </span>
                                <span>/</span>
                            </p>
                            <p className="tw-w-full tw-flex tw-justify-center">
                                <span style={{ transform: 'rotate(-25deg)' }}>
                                    \
                                </span>
                                <span className="tw-mx-3">___________</span>
                                <span style={{ transform: 'rotate(25deg)' }}>
                                    /
                                </span>
                            </p>
                        </Link>
                    </article>
                </section>
            </HeaderLayout>
            <WelcomeLine
                className={`${tw_line_overflow} ${tw_divider}`}
            ></WelcomeLine>
            <GuestBookForm></GuestBookForm>
            <WelcomeLine
                className={`${tw_line_overflow} ${tw_divider}`}
            ></WelcomeLine>
            <div className="rnr-image tw-w-full tw-flex tw-flex-col tw-gap-6 tw-justify-end tw-items-center">
                <h2>
                    <Link href={PATH_BLOG}>{`Works worth seeing`}</Link>
                </h2>
                <section className={tw_grid_section}>
                    <p
                        className={`tw-w-full tw-text-center tw-col-[1] tw-row-[1] !tw-leading-[1em]`}
                    >
                        ??
                    </p>
                    <p
                        className={`tw-w-full tw-text-center tw-col-[1] tw-row-[3/4] !tw-leading-[1em]`}
                    >
                        ??
                    </p>
                    <p
                        className={`tw-w-full tw-text-center tw-col-[3/4] tw-row-[1] !tw-leading-[1em]`}
                    >
                        ??
                    </p>
                    <p
                        className={`tw-w-full tw-h-full tw-col-[1/2] tw-row-[2/3] tw-absolute [writing-mode:vertical-lr] ${lineConstructClass}`}
                    >
                        {`${Array.from(
                            { length: 100 },
                            () => '---------------*-------------------'
                        ).join('')}`}
                    </p>
                    <LineLooser
                        className={`tw-w-full tw-col-[2/3] tw-row-[1/2]`}
                    ></LineLooser>
                    <li className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-col-[2/4] tw-row-[2/4]">
                        <Suspense fallback={<WaitSuspense></WaitSuspense>}>
                            <HomeSuspense></HomeSuspense>
                        </Suspense>
                        <OlGroup nthno="( -> )" href={PATH_BLOG}>
                            {`-> see -> more`}
                            <br></br>
                            {`-> of -> my`}
                            <br></br>
                            {`-> works`}
                            <br></br>
                            {`-> ...`}
                            <br></br>
                            {`-> ..`}
                            <br></br>
                            {`-> .`}
                            <br></br>
                        </OlGroup>
                    </li>
                </section>
            </div>
            {false && (
                <canvas
                    id="renderCanvas"
                    className="tw-bg-red-200 tw-h-[100vh] tw-w-full"
                ></canvas>
            )}
        </AnimatePageComp>
    );
}

async function HomeSuspense() {
    const blogPosts: (BlogPost | null)[] = await cache_fetchNotion(
        'fetchBlogPosts',
        true
    );
    return blogPosts.map((item, i) => {
        return (
            item &&
            item.slug && (
                <OlGroup
                    key={`${i}workitem`}
                    nthno={`( ${i + 1} )`}
                    href={getBlogPostPath(item.slug)}
                >
                    <div className="tw-w-full tw-flex-grow tw-relative tw-mb-3 preserve3d">
                        <CoverImage
                            blogPost={item}
                            sizes="(max-width: 640px) 100vw, 400px"
                            className="group-hover:tw-hidden"
                        ></CoverImage>
                        <OLOverlay></OLOverlay>
                        <div className="tw-h-full tw-w-full tw-hidden tw-justify-center tw-items-center tw-absolute tw-z-20 tw-left-0 tw-top-0 tw-p-8 group-hover:tw-flex tw-flex-col tw-gap-6 tw-text-center">
                            <TagArr item={item}></TagArr>
                        </div>
                    </div>
                    <div className="tw-w-full">
                        <Word elem={'h3'} className="!tw-m-0">
                            {item.title}
                        </Word>
                        <Word elem={'p'}>{item.timestart}</Word>
                    </div>
                </OlGroup>
            )
        );
    });
}

function WaitSuspense() {
    return (
        <OlGroup nthno="( ... )" href={PATH_BLOG}>
            Waiting...
        </OlGroup>
    );
}

function OlGroup({
    children,
    nthno,
    href,
}: {
    children: ReactNode;
    nthno: string;
    href: string;
}) {
    return (
        <ol
            className={`tw-w-full tw-h-full tw-grid tw-grid-cols-[auto_1em] tw-grid-rows-[auto_1em] [&>*:last-child]:tw-col-[1/2] [&>*:last-child]:tw-row-[1/2] tw-overflow-visible tw-group`}
        >
            <LineConstruct className="group-hover:tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr]">
                {'-------~----------^-------~--------'}
            </LineConstruct>
            <LineConstruct className="group-hover:tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                {'-------~----------*-------~--------'}
            </LineConstruct>
            <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr]">
                *--.--&apos;``&apos;-...__...-&apos;``&apos;--.--*
            </LineConstruct>
            <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                *--.--&apos;``&apos;-...__...-&apos;``&apos;--.--*
            </LineConstruct>
            <p
                className={`tw-col-[2] tw-row-[2] !tw-leading-[1em] tw-text-center tw-whitespace-nowrap tw-left-[-0.25em]`}
            >
                {nthno}
            </p>
            <Link
                href={href}
                className="!tw-min-h-[15em] tw-h-[29vh] md:tw-h-[38vh] tw-my-2 tw-mx-[0.2em] tw-flex tw-flex-col tw-justify-center tw-items-center"
            >
                {children}
            </Link>
        </ol>
    );
}
