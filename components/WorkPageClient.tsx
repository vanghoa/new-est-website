'use client';

import { getBlogPostPath } from '@/constants/paths';
import Link from 'next/link';
import React, { Fragment, ReactNode, useMemo, useState } from 'react';
import {
    Line,
    LineConstruct,
    LineLoose,
    LineLoose2,
    LineLooser,
    LineVariale,
    lineConstructClass,
} from './Line';
import { CoverImage, HeaderLayout, OLOverlay } from './SmallComponents';
import {
    tw_border_white_04,
    tw_divider,
    tw_grid_section,
    tw_line_divider,
    tw_line_overflow,
} from './TailwindClass';
import { BlogPost, Individual, retrieveMultiSelectT } from '@/types/types';
import { usePathname, useSearchParams } from 'next/navigation';
import createQueryString from '@/utils/createQueryString';
import { Char, Half, Word } from './WordProcessor';
import { motion } from 'framer-motion';
import { TagArr } from './GridComp';

let unq_key = 0;

export default function WorkPageClient({
    multiSelect,
    blogPosts,
}: {
    multiSelect: retrieveMultiSelectT;
    blogPosts: (BlogPost | null)[];
}) {
    unq_key++;
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const counter: [number] = [0];

    const filter_ = searchParams.get('filter')?.split('-');
    const [filter, setFilter] = useState<{
        category: keyof BlogPost | string;
        name: string;
    }>(
        !filter_ || filter_.length != 2
            ? {
                  category: 'general',
                  name: 'Latest',
              }
            : {
                  category: filter_[0].replace(`~`, ` `),
                  name: filter_[1].replace(`~`, ` `),
              }
    );
    const filtering = (category: keyof BlogPost | string, name: string) => {
        setFilter({ category, name });
        window.history.pushState(
            {},
            '',
            pathname +
                '?' +
                createQueryString(
                    searchParams,
                    'filter',
                    `${category.replace(` `, `~`)}-${name.replace(` `, `~`)}`
                )
        );
    };

    const blogPostsObj = useMemo(() => {
        let front: (BlogPost | null)[] = [];
        let back: (BlogPost | null)[] = [];
        let config = 'filter';
        if (filter.category == 'general') {
            config = 'sort';
            switch (filter.name) {
                case 'Latest':
                    front = blogPosts.sort(function (a, b) {
                        if (!a || !b || a.realtimestart == b.realtimestart) {
                            return 0;
                        } else if (a.realtimestart > b.realtimestart) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    break;
                case 'Oldest':
                    front = blogPosts.sort(function (a, b) {
                        if (!a || !b || a.realtimestart == b.realtimestart) {
                            return 0;
                        } else if (a.realtimestart < b.realtimestart) {
                            return -1;
                        } else {
                            return 1;
                        }
                    });
                    break;
                case 'Featured':
                    config = 'filter';
                    blogPosts.forEach((item) => {
                        item?.featured ? front.push(item) : back.push(item);
                    });
                    break;
                default:
                    break;
            }
        } else {
            for (const item of blogPosts) {
                // @ts-ignore
                let a = item?.[filter.category];
                Array.isArray(a) && a?.includes(filter.name)
                    ? front.push(item)
                    : back.push(item);
            }
        }
        return { front, back, config };
    }, [filter.name]);

    return (
        <>
            <HeaderLayout>
                <Word elem={'h1'} className="tw-text-center">
                    {filter.name.toLowerCase()} ... works
                </Word>
            </HeaderLayout>
            <li className={`tw-w-full tw-text-center ${tw_divider} rnr-image`}>
                {(() => {
                    let result: ReactNode[] = [];
                    let c = 0;
                    const length = Object.keys(multiSelect).length;
                    for (let k in multiSelect) {
                        let a = multiSelect[k];
                        result.push(
                            <Fragment key={k + 'frag'}>
                                <ul
                                    className={`!tw-leading-[3.1em] [&>*]:tw-inline tw-border-l-0`}
                                    key={k}
                                >
                                    {a.map((item, i) => (
                                        <Fragment key={`${i}decor${k}frag`}>
                                            <div
                                                key={`${i}decor${k}`}
                                                className="tw-break-all tw-break-words tw-flex-shrink after:!tw-text-transparent before:!tw-text-transparent after:tw-content-['----'] before:tw-content-['----'] sm:after:tw-content-['-----'] sm:before:tw-content-['-----']"
                                            >
                                                *
                                            </div>
                                            <Half
                                                elem="div"
                                                key={`${i}filter${k}`}
                                                rest={{
                                                    onClick: () =>
                                                        filtering(k, item),
                                                }}
                                                className={`tw-whitespace-nowrap tw-cursor-pointer hover:after:!tw-text-white hover:before:!tw-text-white hover:tw-opacity-100 ${
                                                    filter.name == item
                                                        ? `after:tw-content-['__<-'] before:tw-content-['->__'] md:after:tw-content-['__<---'] sm:before:tw-content-['--->__']`
                                                        : `after:!tw-text-transparent before:!tw-text-transparent sm:after:tw-content-['_<--_?'] sm:before:tw-content-['?_-->_'] tw-opacity-50`
                                                }`}
                                            >
                                                {item.toLowerCase()}
                                            </Half>
                                        </Fragment>
                                    ))}
                                    <div
                                        key={`decor`}
                                        className="tw-break-all tw-break-words tw-flex-shrink before:!tw-text-transparent before:tw-content-['----'] sm:before:tw-content-['-----'] tw-whitespace-nowrap"
                                    >
                                        *
                                    </div>
                                </ul>
                                {++c >= length ? (
                                    <></>
                                ) : (
                                    <LineLoose2
                                        key={k + 'line'}
                                        className={tw_line_divider}
                                    ></LineLoose2>
                                )}
                            </Fragment>
                        );
                    }
                    return result;
                })()}
            </li>
            <section className={`${tw_line_overflow} ${tw_grid_section}`}>
                <p className={`tw-col-[1] tw-row-[1] !tw-leading-[1em]`}>@</p>
                <p className={`tw-col-[1] tw-row-[3/4] !tw-leading-[1em]`}>@</p>
                <p className={`tw-col-[3/4] tw-row-[1] !tw-leading-[1em]`}>@</p>
                <p
                    className={`tw-w-full tw-col-[2/3] tw-row-[1/2] ${lineConstructClass} before:tw-content-['------^-----'] sm:before:tw-content-['---^----+---=-----'] md:before:tw-content-['---^--------=---------+-----'] lg:before:tw-content-['------^--------=----^-----+------']`}
                >
                    <span className="!tw-italic">
                        ( {blogPostsObj.config.toLowerCase()}:{' '}
                        {filter.name.toLowerCase()} /{' '}
                        {blogPostsObj.front.length} projects )
                    </span>
                    {`${Array.from(
                        { length: 20 },
                        () => '--------^------*-------=---+------'
                    ).join('')}`}
                </p>
                <p
                    className={`tw-w-full tw-h-full tw-col-[1/2] tw-row-[2/3] tw-absolute [writing-mode:vertical-lr] ${lineConstructClass} before:tw-content-['------^-----'] sm:before:tw-content-['---^----+---=-----'] md:before:tw-content-['---^--------=---------+-----'] lg:before:tw-content-['------^--------=----^-----+------']`}
                >
                    <span className="!tw-italic tw-transform tw-rotate-180 tw-inline-block">
                        ( total projects: {blogPosts.length} )
                    </span>
                    {`${Array.from(
                        { length: 100 },
                        () => '--------^------*-------=---+------'
                    ).join('')}`}
                </p>
                <li className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 xl:tw-grid-cols-3 tw-col-[2/4] tw-row-[2/4]">
                    <BlogPostsMap
                        blogPosts={blogPostsObj.front}
                        prev={0}
                    ></BlogPostsMap>
                    <BlogPostsMap
                        blogPosts={blogPostsObj.back}
                        opacity={0.4}
                        prev={blogPostsObj.front.length}
                    ></BlogPostsMap>
                </li>
            </section>
        </>
    );
}

function BlogPostsMap({
    blogPosts,
    className = '',
    prev,
    opacity = 1,
}: {
    blogPosts: (BlogPost | null)[];
    className?: string;
    prev: number;
    opacity?: number;
}) {
    let counter = prev;
    return blogPosts.map((item, i) => {
        return (
            item &&
            item.slug && (
                <motion.ol
                    initial={{ opacity: 0 }}
                    animate={{ opacity: opacity }}
                    transition={{
                        delay: counter++ * 0.2,
                    }}
                    className={`hover:!tw-opacity-100 tw-w-full tw-grid tw-grid-cols-[auto_1em] tw-grid-rows-[auto_1em] [&>*:last-child]:tw-col-[1/2] [&>*:last-child]:tw-row-[1/2] tw-overflow-visible tw-group ${className}`}
                    key={`${i + prev}${unq_key}workitem`}
                >
                    <LineConstruct className="group-hover:tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr]">
                        {'-------~----+-----^-------~----=---'}
                    </LineConstruct>
                    <LineConstruct className="group-hover:tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                        {'-------~--+---%---*-------~--=-----'}
                    </LineConstruct>
                    <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr] !tw-text-left">
                        *--.--=/`^`\=-...__...-=/`^`\=--.--*
                    </LineConstruct>
                    <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl] !tw-text-left">
                        *--.--/`^`\-...__...-/`^`\--.--*
                    </LineConstruct>
                    <p
                        className={`tw-col-[2] tw-row-[2] !tw-leading-[1em] tw-text-center tw-whitespace-nowrap tw-left-[-0.25em]`}
                    >
                        ( {i + 1 + prev} )
                    </p>
                    <Link
                        key={`related${i}`}
                        href={getBlogPostPath(item.slug)}
                        className="tw-my-2 tw-mx-1 !tw-min-h-[15em] tw-h-[29vh] md:tw-h-[38vh] tw-flex tw-flex-col tw-justify-center tw-items-center"
                    >
                        <div className="tw-w-full tw-flex-grow tw-relative tw-mb-3">
                            <CoverImage
                                blogPost={item}
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="group-hover:tw-hidden"
                            ></CoverImage>
                            <OLOverlay></OLOverlay>
                            <div className="tw-h-full tw-w-full tw-hidden tw-justify-center tw-items-center tw-absolute tw-left-0 tw-top-0 tw-p-8 group-hover:tw-flex tw-flex-col tw-gap-5 tw-text-center">
                                <TagArr item={item}></TagArr>
                            </div>
                        </div>
                        <div className="tw-w-full tw-text-center">
                            <h2 className="tw-mb-1">{item.title}</h2>
                            <p>{item.timestart}</p>
                        </div>
                    </Link>
                </motion.ol>
            )
        );
    });
}
