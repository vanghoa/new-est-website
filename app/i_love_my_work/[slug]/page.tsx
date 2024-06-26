import truncateString from '@/utils/truncateString';
import { Metadata, ResolvingMetadata } from 'next';
import { BlogPost, DynamicProps } from '@/types/types';
import { DOMAIN, PATH, getBlogPostPath } from '@/constants/paths';
import { Render, withContentValidation } from '@9gustin/react-notion-render';
import {
    HeaderLayout,
    H1Notion,
    ImageNotion,
    ImageFrame,
    CoverImage,
    VideoNotion,
    H3Notion,
    OLOverlay,
} from '@/components/SmallComponents';
import { Char, Rand, Word } from '@/components/WordProcessor';
import Link from 'next/link';
import { Line, LineLoose, LineLooser } from '@/components/Line';
import {
    tw_border_white_04,
    tw_divider,
    tw_line_divider,
    tw_line_overflow,
} from '@/components/TailwindClass';
import AnimatePageComp from '@/components/AnimatePageComp';
import { cache_fetchNotion } from '@/lib/notionClient';
import { SuspenseNotion } from '@/components/SuspenseFallback';
import { notmaxszs } from '@/components/ImageSizes';
import {
    CalloutNotion,
    CodeNotion,
    QuotetNotion,
    ToggleNotion,
} from '@/components/ToggleNotion';
import { Fragment } from 'react';
import { Star } from '@/components/SculptureConstruct';

export const dynamicParams = false;
//export const revalidate = false;
//export const dynamic = 'force-static';
/*
export const fetchCache = 'force-cache';
*/
export async function generateMetadata(
    { params }: DynamicProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug as string;

    const blogPost: any = await cache_fetchNotion('fetchBlogPostBySlug', slug);

    if (!blogPost) {
        return { title: 'no shit' };
    }
    const truncatedContent = truncateString(
        blogPost.blurb ?? `${blogPost.title} - Bao Anh Bui's work`,
        155 //description limit
    );
    const title = `${blogPost.title} - Bao Anh Bui's work`;
    const previousImages = (await parent).openGraph?.images || [];
    const images = blogPost.coverImg
        ? [blogPost.coverImg, ...previousImages]
        : [...previousImages];

    return {
        title: title,
        metadataBase: new URL(DOMAIN),
        description: truncatedContent,
        creator: 'Bao Anh Bui',
        publisher: 'Bui Nguyen Bao Anh',
        formatDetection: {
            email: false,
            address: false,
            telephone: false,
        },
        alternates: {
            canonical: blogPost.slug ? getBlogPostPath(blogPost.slug) : '/',
            languages: {
                'vn-BIP': '/vn-BIP',
            },
        },
        openGraph: {
            title: title,
            description: truncatedContent,
            url: PATH,
            siteName: title,
            images: images,
            locale: 'vn_BIP',
            type: 'article',
            publishedTime: blogPost.timecreate,
            authors: ['Bao', 'Bui'],
            tags: blogPost['small tag'],
        },
        twitter: {
            card: 'summary',
            title: title,
            description: truncatedContent,
            creator: 'Bao Anh Bui',
            images: images,
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
}

export async function generateStaticParams() {
    const blogPosts: (BlogPost | null)[] =
        (await cache_fetchNotion('fetchBlogPosts')) ?? [];

    return blogPosts.map((blogPost: BlogPost | null) => {
        return {
            slug: blogPost?.slug,
        };
    });
}

export default function Page({ params }: DynamicProps) {
    return (
        <>
            <SuspenseNotion>
                <PageSuspense params={params} searchParams={{}}></PageSuspense>
            </SuspenseNotion>
            <Star qty={130} style={{ zIndex: '-1' }} />
        </>
    );
}

async function PageSuspense({ params }: DynamicProps) {
    const slug = params.slug as string;
    // @ts-ignore
    const blogPost: BlogPost | null = await cache_fetchNotion(
        'fetchBlogPostBySlug',
        slug
    );

    if (!blogPost) {
        return <div>fail to load!</div>;
    }
    const field = blogPost['big tag']?.includes('Development')
        ? 'Development'
        : blogPost['big tag']?.[0];
    const blogPostsRelated: any = await cache_fetchNotion(
        'fetchBlogPostsRelated',
        field,
        slug
    );
    const blocks: any = await cache_fetchNotion(
        'fetchAllBlocks',
        blogPost.id,
        slug
    );
    const blogPosts: (BlogPost | null)[] =
        (await cache_fetchNotion('fetchBlogPosts')) ?? [];

    const blogPostprevnext: [BlogPost | null, BlogPost | null] | undefined =
        (() => {
            for (const i in blogPosts) {
                if (blogPosts[i]?.slug == slug) {
                    return [
                        blogPosts[+i - 1] || blogPosts[blogPosts.length - 1],
                        blogPosts[+i + 1] || blogPosts[0],
                    ];
                }
            }
        })();

    if (!blogPostsRelated || !blocks || !blogPostprevnext) {
        return <div>fail to load!</div>;
    }

    return (
        <AnimatePageComp
            backgroundColor={blogPost.backgroundColor}
            textColor={blogPost.textColor}
            upwght={blogPost.upwght}
        >
            <HeaderLayout className="tw-flex tw-flex-col tw-gap-6 tw-mt-[5vh]">
                <ImageFrame elem={Line}>
                    <div className="rnr-image tw-w-full tw-h-[30vh] tw-relative">
                        <CoverImage
                            blogPost={blogPost}
                            sizes={notmaxszs}
                        ></CoverImage>
                    </div>
                </ImageFrame>
                <Word elem={'h1'} className="tw-text-center !tw-m-0">
                    {blogPost.title}
                </Word>
                <Word
                    elem={'p'}
                    className="tw-max-w-[30rem] tw-text-center tw-mx-auto"
                >
                    {blogPost.blurb}
                </Word>
                <ImageFrame elem={LineLooser}>
                    <li
                        className={`tw-p-4 sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-x-10 sm:tw-gap-y-4 ${tw_border_white_04} [&_h3]:tw-mb-0 [&_h3]:before:tw-content-['<'] [&_h3]:tw-inline-block [&_h3]:after:tw-content-['>'] [&_h3]:tw-mr-6 [&_h3]:sm:tw-m-0 [&_h3]:sm:tw-block [&_h3]:after:tw-ml-0.5 [&_h3]:before:tw-mr-0.5`}
                    >
                        <ul className="">
                            <Rand elem={'h3'}>Role</Rand>
                            {blogPost['big tag']?.map((tag, i) => {
                                return (
                                    <>
                                        <span key={`${i}bigtag`}>{tag}, </span>
                                    </>
                                );
                            })}
                            {blogPost['small tag']?.map((tag, i, arr) => {
                                return (
                                    <>
                                        <span key={`${i}smalltag`}>
                                            {tag}
                                            {i < arr.length - 1 ? ', ' : '.'}
                                        </span>
                                    </>
                                );
                            })}
                        </ul>
                        <ul className="">
                            <Rand elem={'h3'}>Date</Rand>
                            {blogPost.timestart} → {blogPost.timeend}
                        </ul>
                        <ul>
                            <Rand elem={'h3'}>Theme</Rand>
                            {blogPost.themes}
                        </ul>
                        <ul>
                            <Rand elem={'h3'}>Context</Rand>
                            {blogPost.context}
                        </ul>
                    </li>
                </ImageFrame>
            </HeaderLayout>
            {(
                <Render
                    // @ts-ignore
                    blocks={blocks}
                    classNames
                    emptyBlocks
                    blockComponentsMapper={{
                        image: (block) => ImageNotion(block, blogPost.title),
                        heading_1: withContentValidation(H1Notion),
                        heading_2: withContentValidation(H1Notion),
                        heading_3: withContentValidation(H3Notion),
                        video: (block) => VideoNotion(block),
                        code: (block) => CodeNotion(block),
                        toggle: (block) => ToggleNotion(block),
                        callout: (block) => CalloutNotion(block),
                        quote: (block) => QuotetNotion(block),
                        divider: () => (
                            <Line
                                className={`${tw_line_overflow} ${tw_divider} ${tw_line_divider}`}
                            ></Line>
                        ),
                    }}
                />
            ) || <div>Failed to render</div>}
            <div className="rnr-empty-block"></div>
            <ImageFrame
                elem={LineLooser}
                maxwidth={false}
                bottom={false}
                botleft={false}
                botright={false}
                samecorner
            >
                <li
                    className={`tw-p-4 tw-w-full sm:tw-grid sm:tw-grid-cols-[1fr_1.1em_1fr] sm:tw-gap-x-10 sm:tw-gap-y-4 ${tw_border_white_04} sm:tw-text-center !tw-border-b-0 [&_h3]:tw-mb-0 [&_h3]:before:tw-content-['<'] [&_h3]:tw-inline-block [&_h3]:after:tw-content-['>'] [&_h3]:tw-mr-6 [&_h3]:sm:tw-m-0 [&_h3]:sm:tw-block [&_h3]:after:tw-ml-1 [&_h3]:before:tw-mr-1`}
                >
                    <ul
                        className={
                            blogPost.group?.length && blogPost.group?.length > 0
                                ? ''
                                : 'sm:tw-col-span-3'
                        }
                    >
                        <Rand elem={'h3'}>Individual Credits</Rand>
                        <Link
                            className="tw-mr-5 tw-w-fit sm:tw-w-full sm:tw-block"
                            href="/"
                        >
                            Bao Anh{' '}
                        </Link>
                        {blogPost.indiv?.map((item, i) => {
                            return (
                                <>
                                    <a
                                        className={`tw-mr-5 tw-w-fit sm:tw-w-full sm:tw-block ${
                                            item.href == 'null' || !item.href
                                                ? 'tw-pointer-events-none'
                                                : ''
                                        }`}
                                        key={`${i}credit`}
                                        href={`${item.href}`}
                                        target="_blank"
                                    >
                                        {item.name}{' '}
                                    </a>
                                </>
                            );
                        })}
                    </ul>
                    {blogPost.group?.length && blogPost.group?.length > 0 ? (
                        <ul>
                            <Line className="tw-hidden tw-w-full tw-h-full tw-absolute [writing-mode:vertical-lr] sm:tw-block tw-transform tw-rotate-180"></Line>
                        </ul>
                    ) : (
                        ''
                    )}
                    {blogPost.group?.length && blogPost.group?.length > 0 ? (
                        <ul>
                            <Rand elem={'h3'}>Group Credits</Rand>
                            {blogPost.group?.map((item, i) => {
                                return (
                                    <>
                                        <a
                                            className={`tw-mr-5 tw-w-fit sm:tw-w-full sm:tw-block ${
                                                item.href == 'null' ||
                                                !item.href
                                                    ? 'tw-pointer-events-none'
                                                    : ''
                                            }`}
                                            key={`${i}credit`}
                                            href={`${item.href}`}
                                            target="_blank"
                                        >
                                            {item.name}{' '}
                                        </a>
                                    </>
                                );
                            })}
                        </ul>
                    ) : (
                        ''
                    )}
                </li>
            </ImageFrame>
            <ImageFrame elem={LineLooser} maxwidth={false} samecorner>
                <li
                    className={`tw-p-4 tw-w-full tw-grid tw-grid-cols-[1fr_1.1em_1fr] tw-gap-x-10 tw-gap-y-4 ${tw_border_white_04} tw-text-center [&_h3]:tw-mb-0 !tw-border-t-0 [&_h3]:before:tw-content-['<'] [&_h3]:after:tw-content-['>'] [&_h3]:after:tw-ml-1 [&_h3]:before:tw-mr-1`}
                >
                    <ul>
                        <Rand elem={'h3'}>Previous</Rand>
                        <Link
                            href={getBlogPostPath(
                                blogPostprevnext[0]?.slug ?? ''
                            )}
                            title={blogPostprevnext[0]?.blurb ?? ''}
                            className="tw-underline"
                        >
                            {blogPostprevnext[0]?.title}
                        </Link>
                    </ul>
                    <ul>
                        <Line className="tw-w-full tw-h-full tw-absolute [writing-mode:vertical-lr] tw-transform tw-rotate-180"></Line>
                    </ul>
                    <ul>
                        <Rand elem={'h3'}>Next</Rand>
                        <Link
                            href={getBlogPostPath(
                                blogPostprevnext[1]?.slug ?? ''
                            )}
                            title={blogPostprevnext[1]?.blurb ?? ''}
                            className="tw-underline"
                        >
                            {blogPostprevnext[1]?.title}
                        </Link>
                    </ul>
                </li>
            </ImageFrame>
            <Line
                className={`${tw_line_overflow} ${tw_divider} ${tw_line_divider}`}
            ></Line>
            {blogPostsRelated.length > 0 && (
                <section
                    className={`tw-flex tw-flex-col tw-gap-6 ${tw_divider}`}
                >
                    <Word elem={'h2'} className="tw-text-center tw-w-full">
                        Other works
                    </Word>
                    <div className="tw-px-11 tw-w-[100vw] tw-left-1/2 tw-transform tw-translate-x-[-50%]">
                        <div className="tw-w-full tw-flex tw-justify-center tw-gap-8 tw-flex-wrap">
                            {blogPostsRelated.map((item: any, i: any) => {
                                return item && item.slug ? (
                                    <ImageFrame
                                        elem={LineLoose}
                                        className="!tw-w-[min(300px,100%)] tw-group"
                                    >
                                        <Link
                                            key={`related${i}`}
                                            href={getBlogPostPath(item.slug)}
                                            className="tw-my-2 tw-mx-1"
                                        >
                                            <div className="tw-w-full tw-h-[40vh] tw-relative tw-mb-3">
                                                <CoverImage
                                                    blogPost={item}
                                                    sizes="(max-width: 300px) 100vw, 300px"
                                                    className="group-hover:tw-hidden"
                                                ></CoverImage>
                                                <OLOverlay></OLOverlay>
                                                <div className="tw-h-full tw-w-full tw-hidden tw-justify-center tw-items-center tw-absolute tw-z-20 tw-left-0 tw-top-0 tw-p-8 group-hover:tw-flex tw-flex-col tw-gap-3 tw-text-center">
                                                    <span>{item.blurb}</span>
                                                </div>
                                            </div>
                                            <div className="tw-text-center">
                                                <h2 className="tw-mb-1">
                                                    {item.title}
                                                </h2>
                                                <p>{item.timestart}</p>
                                            </div>
                                        </Link>
                                    </ImageFrame>
                                ) : (
                                    ''
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </AnimatePageComp>
    );
}
