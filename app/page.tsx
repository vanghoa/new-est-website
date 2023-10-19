import AnimatePageComp from '@/components/AnimatePageComp';
import GuestBookForm from '@/components/GuestBookForm';
import {
    Line,
    LineConstruct,
    LineLooser,
    WelcomeLine,
} from '@/components/Line';
import {
    CoverImage,
    HeaderLayout,
    OLOverlay,
} from '@/components/SmallComponents';
import { tw_divider, tw_line_overflow } from '@/components/TailwindClass';
import { Word } from '@/components/WordProcessor';
import { PATH_BLOG, getBlogPostPath } from '@/constants/paths';
import { cache_fetchNotion } from '@/lib/notionClient';
import { BlogPost } from '@/types/types';
import Link from 'next/link';
import { Fragment, ReactNode, Suspense } from 'react';

export default function Home() {
    return (
        <AnimatePageComp>
            <HeaderLayout className="tw-min-h-[calc(80vh-11rem)] tw-flex tw-flex-col">
                <Word elem={'h1'}>Bao Anh is here and now!</Word>
                <section className="tw-flex tw-flex-col tw-grow tw-justify-between tw-h-full">
                    <Word elem={'article'} className="tw-max-w-[30rem]">
                        Hello! I like to learn and experiment with new ideas in
                        art, design and technology. Thank you for visiting.
                    </Word>
                    <h2 className="tw-w-[min(35rem,100%)]">
                        <Link href={PATH_BLOG}>{`[ See my works ]`}</Link>
                    </h2>
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
                    <Link href={PATH_BLOG}>{`Featured works`}</Link>
                </h2>
                <section
                    className={`tw-grid tw-grid-cols-[1em_auto_1em] tw-grid-rows-[min-content_auto_min-content]`}
                >
                    <p
                        className={`tw-w-full tw-text-center tw-col-[1] tw-row-[1] !tw-leading-[1em]`}
                    >
                        ?
                    </p>
                    <p
                        className={`tw-w-full tw-text-center tw-col-[1] tw-row-[3/4] !tw-leading-[1em]`}
                    >
                        ?
                    </p>
                    <p
                        className={`tw-w-full tw-text-center tw-col-[3/4] tw-row-[1] !tw-leading-[1em]`}
                    >
                        ?
                    </p>
                    <LineLooser
                        className={`tw-w-full tw-col-[2/3] tw-row-[1/2]`}
                    ></LineLooser>
                    <LineLooser className="tw-w-full tw-h-full tw-col-[1/2] tw-row-[2/3] tw-absolute [writing-mode:vertical-lr]"></LineLooser>
                    <li className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 tw-col-[2/4] tw-row-[2/4]">
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
                    <div className="tw-w-full tw-flex-grow tw-relative tw-mb-3">
                        <CoverImage
                            blogPost={item}
                            sizes="(max-width: 640px) 100vw, 400px"
                            className="group-hover:tw-hidden"
                        ></CoverImage>
                        <OLOverlay></OLOverlay>
                        <div className="tw-h-full tw-w-full tw-hidden tw-justify-center tw-items-center tw-absolute tw-z-20 tw-left-0 tw-top-0 tw-p-8 group-hover:tw-flex tw-flex-col tw-gap-3 tw-text-center">
                            <span>{item.blurb}</span>
                            <p>
                                {item['big tag']?.map((tag, i) => (
                                    <Fragment key={`bigtag${i}`}>
                                        <span className="tw-inline-block tw-mx-2">
                                            {tag}
                                        </span>
                                        |
                                    </Fragment>
                                ))}
                                {item['small tag']?.map((tag, i) => (
                                    <Fragment key={`smalltag${i}`}>
                                        <span className="tw-inline-block tw-mx-2">
                                            {tag}
                                        </span>
                                        {item['small tag']?.[i + 1] && '|'}
                                    </Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                    <div className="tw-w-full">
                        <h3 className="!tw-m-0">{item.title}</h3>
                        <p>{item.timestart}</p>
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
                {'???<>???~??????????<>???????~??<>?????'}
            </LineConstruct>
            <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                {'%%%%%%%~<>%%%%%%%%%<>%%%%%%%~%%%%%%%%'}
            </LineConstruct>
            <p
                className={`tw-col-[2] tw-row-[2] !tw-leading-[1em] tw-text-center tw-whitespace-nowrap tw-left-[-0.25em]`}
            >
                {nthno}
            </p>
            <Link
                href={href}
                className="tw-h-[50vh] tw-my-2 tw-mx-[0.2em] tw-flex tw-flex-col tw-justify-center tw-items-center"
            >
                {children}
            </Link>
        </ol>
    );
}
