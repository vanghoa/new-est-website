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
    H1Notion,
    H3Notion,
    HeaderLayout,
    ImageNotion,
    ImageNotionDottedBorder,
    OLOverlay,
    VideoNotion,
} from '@/components/SmallComponents';
import { SuspenseNotion } from '@/components/SuspenseFallback';
import {
    tw_divider,
    tw_grid_section,
    tw_line_overflow,
} from '@/components/TailwindClass';
import {
    CodeNotion,
    ToggleNotion,
    CalloutNotion,
    QuotetNotion,
} from '@/components/ToggleNotion';
import { Word } from '@/components/WordProcessor';
import { PATH_BLOG, getBlogPostPath } from '@/constants/paths';
import { scale } from '@/lib/generalFn';
import { cache_fetchNotion } from '@/lib/notionClient';
import { BlogPost } from '@/types/types';
import { Render, withContentValidation } from '@9gustin/react-notion-render';
import Link from 'next/link';
import { Fragment, ReactNode, Suspense } from 'react';
import { createNoise2D } from 'simplex-noise';

export default function Home() {
    return (
        <>
            <AnimatePageComp>
                <HeaderLayout className="tw-h-[calc(80vh-12.5rem)] tw-items-center tw-justify-between tw-flex tw-flex-col">
                    <Word
                        elem={'h1'}
                        className="tw-text-center tw-w-[min(25rem,100%)] !tw-my-0"
                    >
                        I am Bảo Anh, I love to experiment with design, art and
                        technology
                    </Word>
                    <article className="tw-shrink tw-overflow-clip tw-break-all tw-w-32 tw-h-full tw-text-center tw-pt-6 !tw-leading-5">
                        <p className="tw-text-left">*</p>
                        <p>*</p>
                        <p className="tw-text-right">*</p>
                        <p className="tw-text-left">*</p>
                        <p className="tw-text-right">*</p>
                        <p>*</p>
                        <p className="tw-text-right">*</p>
                        <p>*</p>
                        <p className="tw-text-right">*</p>
                        <p>*</p>
                        <p className="tw-text-left">*</p>
                        <p>*</p>
                        <p className="tw-text-right">*</p>
                        <p className="tw-text-left">*</p>
                        <p className="tw-text-right">*</p>
                        <p>*</p>
                        <p className="tw-text-left">*</p>
                        <p className="tw-text-right">*</p>
                        <p className="tw-text-left">*</p>
                    </article>
                    <article className="tw-w-fit preserve3d">
                        <Link href={PATH_BLOG}>
                            <p className="tw-w-full tw-flex tw-justify-center">
                                ____
                            </p>
                            <p className="tw-w-full tw-flex tw-justify-center">
                                ____//
                                <span className="!tw-text-transparent selection:!tw-text-white tw-inline-block tw-w-1"></span>
                                ____
                                <span className="!tw-text-transparent selection:!tw-text-white tw-inline-block tw-w-1"></span>
                                \\____
                            </p>
                            <p className="tw-w-full tw-flex tw-justify-around">
                                <span>/</span>
                                <span className="!tw-text-transparent selection:!tw-text-white">
                                    ___I_love_you___
                                </span>
                                <span>\</span>
                            </p>
                            <p className="tw-w-full preserve3d tw-flex tw-justify-around">
                                <span>{`|`}</span>
                                <span className="!tw-text-transparent selection:!tw-text-white">
                                    ___
                                </span>
                                <span>
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
                                    ___being_here___
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
                                () => '-------^------*------+---*-------'
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
                <WelcomeLine
                    className={`${tw_line_overflow} ${tw_divider}`}
                ></WelcomeLine>
                <SuspenseNotion>
                    <ThreeDViewSuspense></ThreeDViewSuspense>
                </SuspenseNotion>
            </AnimatePageComp>
            <div className="tw-absolute tw-left-1/2 tw-w-screen tw-transform -tw-translate-x-1/2 tw-h-full tw-overflow-hidden tw-pointer-events-none tw-top-0 [&_*]:tw-top-[10rem]">
                <Suspense fallback={<></>}>
                    <Threads />
                </Suspense>
            </div>
        </>
    );
}

function H1NotionCenter({ plainText }: { plainText: string }) {
    return (
        <H1Notion plainText={plainText} className="tw-text-center"></H1Notion>
    );
}

async function Threads() {
    const noise2D = createNoise2D();
    const blocks: any = await cache_fetchNotion(
        'fetchAllBlocks',
        '9f3a32fe-0e41-434c-997a-a75cd3f975c3',
        'threads'
    );

    if (!blocks) {
        return <div>fail to load!</div>;
    }

    return (
        (
            <>
                <p className="tw-relative tw-left-[5%] tw-w-fit tw-pointer-events-auto">
                    Ctrl/Cmd + A
                </p>
                <Render
                    // @ts-ignore
                    blocks={blocks}
                    classNames
                    emptyBlocks
                    blockComponentsMapper={{
                        paragraph: withContentValidation(({ plainText }) => {
                            return plainText.split(` `).map((str, key) => {
                                const coord = scale(
                                    noise2D(key, key),
                                    -1,
                                    1,
                                    0,
                                    100
                                );
                                return (
                                    <p
                                        key={key}
                                        className="tw-relative !tw-text-transparent selection:!tw-text-white tw-w-fit"
                                        style={{
                                            left: `${coord}%`,
                                            transform: `translateX(-${coord}%)`,
                                        }}
                                    >
                                        {str}
                                    </p>
                                );
                            });
                        }),
                        image: () => <></>,
                        heading_1: () => <></>,
                        heading_2: () => <></>,
                        heading_3: () => <></>,
                        video: () => <></>,
                        code: () => <></>,
                        toggle: () => <></>,
                        callout: () => <></>,
                        quote: () => <></>,
                        divider: () => <></>,
                    }}
                />
            </>
        ) || <div>Failed to render</div>
    );
}

async function ThreeDViewSuspense() {
    const blocks: any = await cache_fetchNotion(
        'fetchAllBlocks',
        'd820fbc1-32ea-4577-aa4c-4440803dd42a',
        '3dview'
    );

    if (!blocks) {
        return <div>fail to load!</div>;
    }

    return (
        (
            <Render
                // @ts-ignore
                blocks={blocks}
                classNames
                emptyBlocks
                blockComponentsMapper={{
                    image: (block) => ImageNotionDottedBorder(block, '3D View'),
                    heading_1: withContentValidation(H1NotionCenter),
                    heading_2: withContentValidation(H1Notion),
                    heading_3: withContentValidation(H3Notion),
                    video: (block) => VideoNotion(block),
                    code: (block) => CodeNotion(block),
                    toggle: (block) => ToggleNotion(block),
                    callout: (block) => CalloutNotion(block),
                    quote: (block) => QuotetNotion(block),
                    divider: () => (
                        <Line
                            className={`${tw_line_overflow} ${tw_divider}`}
                        ></Line>
                    ),
                }}
            />
        ) || <div>Failed to render</div>
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
                {'-------~----+-----^-------~---=----'}
            </LineConstruct>
            <LineConstruct className="group-hover:tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                {'-------~---%------*-------~---=----'}
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
