/*
import {
    cache_fetchAllBlocks,
    cache_fetchBlogPostBySlug,
    cache_fetchBlogPosts,
    cache_fetchBlogPostsRelated,
} from '@/lib/notionClient';
*/
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

export const dynamicParams = false;
export const revalidate = false;
export const dynamic = 'force-static';
/*
export const fetchCache = 'force-cache';
*/
export async function generateMetadata(
    { params }: DynamicProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug as string;

    //const blogPost = await cache_fetchBlogPostBySlug(slug);
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
    //const blogPosts = await cache_fetchBlogPosts();
    const blogPosts: any[] = (await cache_fetchNotion('fetchBlogPosts')) ?? [];

    return blogPosts.map((blogPost: { slug: any }) => {
        return {
            slug: blogPost?.slug,
        };
    });
}

export default function Page({ params }: DynamicProps) {
    return (
        <SuspenseNotion>
            <PageSuspense params={params} searchParams={{}}></PageSuspense>
        </SuspenseNotion>
    );
}

async function PageSuspense({ params }: DynamicProps) {
    const slug = params.slug as string;
    //const blogPost: BlogPost | null = await cache_fetchBlogPostBySlug(slug);
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
    //const blogPostsRelated = await cache_fetchBlogPostsRelated(field, slug);
    //const blocks = await cache_fetchAllBlocks(blogPost.id);
    const blogPostsRelated: any = await cache_fetchNotion(
        'fetchBlogPostsRelated',
        field,
        slug
    );
    const blocks: any = await cache_fetchNotion('fetchAllBlocks', blogPost.id);

    if (!blogPostsRelated || !blocks) {
        return <div>fail to load!</div>;
    }
    console.log(blogPost.backgroundColor, blogPost.textColor);
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
                        className={`tw-p-4 sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-x-10 sm:tw-gap-y-4 ${tw_border_white_04} [&_h3]:tw-mb-0`}
                    >
                        <ul className="">
                            <Rand
                                elem={'h3'}
                                className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                            >
                                Role
                            </Rand>
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
                            <Rand
                                elem={'h3'}
                                className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                            >
                                Date
                            </Rand>
                            {blogPost.timestart} → {blogPost.timeend}
                        </ul>
                        <ul>
                            <Rand
                                elem={'h3'}
                                className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                            >
                                Theme
                            </Rand>
                            {blogPost.themes}
                        </ul>
                        <ul>
                            <Rand
                                elem={'h3'}
                                className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                            >
                                Context
                            </Rand>
                            {blogPost.context}
                        </ul>
                    </li>
                </ImageFrame>
            </HeaderLayout>
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
                            className={`${tw_line_overflow} ${tw_divider}`}
                        ></Line>
                    ),
                }}
            />
            <div className="rnr-empty-block"></div>
            <ImageFrame elem={LineLooser} maxwidth={false}>
                <li
                    className={`tw-p-4 tw-w-full sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-x-10 sm:tw-gap-y-4 ${tw_border_white_04} [&_h3]:tw-mb-0`}
                >
                    <ul>
                        <Rand
                            elem={'h3'}
                            className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                        >
                            People Involved
                        </Rand>
                        <Link className="tw-mr-5 tw-w-fit sm:tw-block" href="/">
                            Bao Anh{' '}
                        </Link>
                        {blogPost.indiv?.map((item, i) => {
                            return (
                                <>
                                    <a
                                        className={`tw-mr-5 tw-w-fit sm:tw-block ${
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
                    {blogPost.group?.length && blogPost.group?.length > 0 && (
                        <ul>
                            <Rand
                                elem={'h3'}
                                className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                            >
                                At
                            </Rand>
                            {blogPost.group?.map((item, i) => {
                                return (
                                    <>
                                        <a
                                            className={`tw-mr-5 tw-w-fit sm:tw-block ${
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
                    )}
                </li>
            </ImageFrame>
            <Line className={`${tw_line_overflow} ${tw_divider}`}></Line>
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
                                        className="!tw-w-[min(250px,100%)] tw-group"
                                    >
                                        <Link
                                            key={`related${i}`}
                                            href={getBlogPostPath(item.slug)}
                                            className="tw-my-2 tw-mx-1"
                                        >
                                            <div className="tw-w-full tw-h-[30vh] tw-relative tw-mb-3">
                                                <CoverImage
                                                    blogPost={item}
                                                    sizes="(max-width: 250px) 100vw, 250px"
                                                    className="group-hover:tw-hidden"
                                                ></CoverImage>
                                                <OLOverlay></OLOverlay>
                                                <div className="tw-h-full tw-w-full tw-hidden tw-justify-center tw-items-center tw-absolute tw-z-20 tw-left-0 tw-top-0 tw-p-8 group-hover:tw-flex tw-flex-col tw-gap-3 tw-text-center">
                                                    <span>{item.blurb}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{item.title}</p>
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
