import {
    cache_fetchAllBlocks,
    cache_fetchBlogPostBySlug,
    cache_fetchBlogPosts,
    cache_fetchBlogPostsRelated,
} from '@/lib/notionClient';
import recursivelyNullifyUndefinedValues from '@/utils/recursivelyNullifyUndefinedValues';
import truncateString from '@/utils/truncateString';
import { Metadata, ResolvingMetadata } from 'next';
import { BlogPost, DynamicProps } from '@/types/types';
import { PATH, getBlogPostPath } from '@/constants/paths';
import { Render, withContentValidation } from '@9gustin/react-notion-render';
import {
    HeaderLayout,
    H1Notion,
    ImageNotion,
    ImageNoWidth,
    ImageFrame,
    CoverImage,
} from '@/components/SmallComponents';
import { Char, Rand, Word } from '@/components/WordProcessor';
import Image from 'next/image';
import Link from 'next/link';
import { Line, LineLoose } from '@/components/Line';
import { tw_line_overflow } from '@/components/TailwindClass';
import AnimatePageComp from '@/components/AnimatePageComp';

export const dynamicParams = true;
export const revalidate = false;
export const dynamic = 'force-static';
export const fetchCache = 'only-cache';

export async function generateMetadata(
    { params, searchParams }: DynamicProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug as string;
    const blogPost = await cache_fetchBlogPostBySlug(slug);
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
        metadataBase: new URL(PATH),
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
    const blogPosts = await cache_fetchBlogPosts();
    return blogPosts.map((blogPost) => {
        return {
            slug: blogPost?.slug,
        };
    });
}
/*
    indiv: RollUpandLink;
    group: RollUpandLink; */
export default async function Page({ params, searchParams }: DynamicProps) {
    const slug = params.slug as string;
    const blogPost: BlogPost | null = await cache_fetchBlogPostBySlug(slug);
    if (!blogPost) {
        return <div>fail to load!</div>;
    }
    const field = blogPost['big tag']?.includes('Development')
        ? 'Development'
        : blogPost['big tag']?.[0];
    const blogPostsRelated = await cache_fetchBlogPostsRelated(field, slug);
    const blocks = await cache_fetchAllBlocks(blogPost.id);
    //console.log(blogPostsRelated);
    const blogPostsRelated_: Array<BlogPost | null> = Array.from(
        { length: 5 },
        () => blogPostsRelated[0]
    );
    return (
        <AnimatePageComp>
            <HeaderLayout className="tw-flex tw-flex-col tw-gap-6 tw-mt-[5vh]">
                <ImageFrame elem={Line}>
                    <div className="rnr-image tw-w-full tw-h-[30vh] tw-relative">
                        <CoverImage
                            blogPost={blogPost}
                            sizes="(max-width: 1000px) 100vw, 800px"
                        ></CoverImage>
                    </div>
                </ImageFrame>
                <Word elem={'h1'} className="sm:tw-text-center !tw-m-0">
                    {blogPost.title}
                </Word>
                <Word
                    elem={'p'}
                    className="tw-max-w-[30rem] sm:tw-text-center sm:tw-mx-auto"
                >
                    {blogPost.blurb}
                </Word>
                <li className="tw-w-full sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-x-10 sm:tw-gap-y-4">
                    <ul>
                        <Rand
                            elem={'p'}
                            className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                        >
                            Context
                        </Rand>
                        {blogPost.context}
                    </ul>
                    <ul className="">
                        <Rand
                            elem={'p'}
                            className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                        >
                            Date
                        </Rand>
                        {blogPost.timestart} → {blogPost.timeend}
                    </ul>
                    <ul>
                        <Rand
                            elem={'p'}
                            className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                        >
                            Theme
                        </Rand>
                        {blogPost.themes}
                    </ul>
                    <ul className="">
                        <Rand
                            elem={'p'}
                            className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                        >
                            Role
                        </Rand>
                        {blogPost['big tag']?.map((tag, i) => {
                            return (
                                <>
                                    <span
                                        className="tw-mr-5 sm:tw-block"
                                        key={`${i}bigtag`}
                                    >
                                        {tag}{' '}
                                    </span>
                                </>
                            );
                        })}
                        {blogPost['small tag']?.map((tag, i) => {
                            return (
                                <>
                                    <span
                                        className="tw-mr-5 sm:tw-block"
                                        key={`${i}smalltag`}
                                    >
                                        {tag}{' '}
                                    </span>
                                </>
                            );
                        })}
                    </ul>
                </li>
            </HeaderLayout>
            <Render
                // @ts-ignore
                blocks={blocks}
                classNames
                emptyBlocks
                blockComponentsMapper={{
                    image: (block) => ImageNotion(block, blogPost.title),
                    heading_1: withContentValidation(H1Notion),
                }}
            />
            <li className="tw-w-full sm:tw-grid sm:tw-grid-cols-2 sm:tw-gap-x-10 sm:tw-gap-y-4">
                <ul>
                    <Rand
                        elem={'p'}
                        className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                    >
                        People Involved
                    </Rand>
                    {blogPost.indiv?.map((item, i) => {
                        return (
                            <>
                                <a
                                    className="tw-mr-5 tw-w-fit sm:tw-block"
                                    key={`${i}credit`}
                                    href={`${item.href}`}
                                >
                                    {item.name}{' '}
                                </a>
                            </>
                        );
                    })}
                </ul>
                <ul>
                    <Rand
                        elem={'p'}
                        className={`before:tw-content-['<'] tw-inline-block after:tw-content-['>'] tw-mr-6 sm:tw-m-0 sm:tw-m sm:tw-block sm:after:tw-content-['>']`}
                    >
                        At
                    </Rand>
                    {blogPost.group?.map((item, i) => {
                        return (
                            <>
                                <a
                                    className="tw-mr-5 tw-w-fit sm:tw-block"
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
            </li>
            <Line className={`${tw_line_overflow} tw-my-[5vh]`}></Line>
            <section className="tw-flex tw-flex-col tw-gap-6 tw-my-[5vh]">
                <Word elem={'h2'} className="tw-text-center tw-w-full">
                    Other works
                </Word>
                <div className="tw-px-11 tw-w-[100vw] tw-left-1/2 tw-transform tw-translate-x-[-50%]">
                    <div className="tw-w-full tw-flex tw-justify-center tw-gap-8 tw-flex-wrap">
                        {blogPostsRelated_.map((item, i) => {
                            return item && item.slug ? (
                                <ImageFrame
                                    elem={LineLoose}
                                    className="!tw-w-[min(250px,100%)]"
                                >
                                    <Link
                                        key={`related${i}`}
                                        href={getBlogPostPath(item.slug)}
                                        className="tw-my-2"
                                    >
                                        <div className="tw-w-full tw-h-[30vh] tw-relative tw-mb-3">
                                            <CoverImage
                                                blogPost={item}
                                                sizes="250px"
                                            ></CoverImage>
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
        </AnimatePageComp>
    );
}
