'use client';

import { getBlogPostPath } from '@/constants/paths';
import Link from 'next/link';
import React, { Fragment, ReactNode, useMemo, useState } from 'react';
import { LineConstruct, LineLooser, LineVariale } from './Line';
import { CoverImage } from './SmallComponents';
import { tw_divider, tw_line_overflow } from './TailwindClass';
import { BlogPost, retrieveMultiSelectT } from '@/types/types';
import { usePathname, useSearchParams } from 'next/navigation';
import createQueryString from '@/utils/createQueryString';
import { Suspense } from 'react';
import SuspenseFallback from './SuspenseFallback';
import { Char, Half, Word } from './WordProcessor';
import { motion } from 'framer-motion';

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

    const filter_ = searchParams.get('filter')?.split('-');
    const [filter, setFilter] = useState<{
        category: keyof BlogPost | string;
        name: string;
    }>(
        !filter_ || filter_.length != 2
            ? {
                  category: 'big tag',
                  name: 'Development',
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

    blogPosts = useMemo(() => {
        console.log('bip2');
        const front = [];
        const back = [];
        for (const item of blogPosts) {
            // @ts-ignore
            let a = item?.[filter.category];
            Array.isArray(a) && a?.includes(filter.name)
                ? front.push(item)
                : back.push(item);
        }
        return front.concat(back);
    }, [filter.name]);

    return (
        <Suspense fallback={<SuspenseFallback></SuspenseFallback>}>
            <li
                className={`tw-w-full [&>*]:tw-inline tw-text-center ${tw_divider} !tw-leading-[3.1em]`}
            >
                {(() => {
                    let result: ReactNode[] = [];
                    for (let k in multiSelect) {
                        let a = multiSelect[k];
                        a.forEach((item, i) => {
                            result.push(
                                <ul
                                    key={`${i}decor${k}`}
                                    className="tw-break-all tw-break-words tw-flex-shrink after:!tw-text-transparent before:!tw-text-transparent after:tw-content-['----'] before:tw-content-['----'] sm:after:tw-content-['------'] sm:before:tw-content-['------'] md:after:tw-content-['---------'] md:before:tw-content-['---------']"
                                >
                                    *
                                </ul>,
                                <Half
                                    elem="ul"
                                    key={`${i}filter${k}`}
                                    rest={{ onClick: () => filtering(k, item) }}
                                    className={`tw-whitespace-nowrap tw-cursor-pointer hover:after:!tw-text-white hover:before:!tw-text-white ${
                                        filter.name == item
                                            ? `after:tw-content-['__<-'] before:tw-content-['->__'] md:after:tw-content-['__<---'] sm:before:tw-content-['--->__']`
                                            : `after:!tw-text-transparent before:!tw-text-transparent sm:after:tw-content-['_<--_?'] sm:before:tw-content-['?_-->_']`
                                    }`}
                                >
                                    {item}
                                </Half>
                            );
                        });
                    }
                    result.push(
                        <ul
                            key={`decor`}
                            className="tw-break-all tw-break-words tw-flex-shrink after:!tw-text-transparent before:!tw-text-transparent after:tw-content-['----'] before:tw-content-['----'] sm:after:tw-content-['------'] sm:before:tw-content-['------'] md:after:tw-content-['---------'] md:before:tw-content-['---------']"
                        >
                            *
                        </ul>
                    );
                    return result;
                })()}
            </li>
            <section
                className={`${tw_line_overflow} tw-grid tw-grid-cols-[min-content_auto_min-content] tw-grid-rows-[1.1em_auto_min-content]`}
            >
                <p className={`tw-col-[1] tw-row-[1] !tw-leading-[1em]`}>@</p>
                <p className={`tw-col-[1] tw-row-[3/4] !tw-leading-[1em]`}>@</p>
                <p className={`tw-col-[3/4] tw-row-[1] !tw-leading-[1em]`}>@</p>
                <p
                    className={`tw-w-full tw-h-8 tw-col-[2/3] tw-row-[1/2] tw-whitespace-normal tw-break-words tw-break-all tw-text-center tw-overflow-hidden tw-mx-auto before:tw-content-['------------'] sm:before:tw-content-['------------------'] md:before:tw-content-['----------------------------'] lg:before:tw-content-['----------------------------------']`}
                >
                    <span className="!tw-italic">
                        ( filter: {filter.name.toLowerCase()} )
                    </span>
                    {`${Array.from(
                        { length: 20 },
                        () => '---------------*-------------------'
                    ).join('')}`}
                </p>
                <LineLooser className="tw-w-full tw-h-full tw-col-[1/2] tw-row-[2/3] tw-absolute [writing-mode:vertical-lr]"></LineLooser>
                <li className="tw-grid tw-grid-cols-1 sm:tw-grid-cols-2 lg:tw-grid-cols-3 2xl:tw-grid-cols-4 tw-col-[2/4] tw-row-[2/4]">
                    {blogPosts.map((item, i) => {
                        return (
                            item &&
                            item.slug && (
                                <motion.ol
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className={`tw-w-full tw-grid tw-grid-cols-[auto_1em] tw-grid-rows-[auto_1em] [&>*:last-child]:tw-col-[1/2] [&>*:last-child]:tw-row-[1/2] tw-overflow-visible tw-group`}
                                    key={`${i}${unq_key}workitem`}
                                >
                                    <LineConstruct className="group-hover:tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr]">
                                        {'-------~----------^-------~--------'}
                                    </LineConstruct>
                                    <LineConstruct className="group-hover:tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                                        {'-------~----------*-------~--------'}
                                    </LineConstruct>
                                    <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr]">
                                        {
                                            '&&&<>&&&~&&&&&&&&&&<>&&&&&&&~&&<>&&&&&'
                                        }
                                    </LineConstruct>
                                    <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                                        {
                                            '@@@@@@@~<>@@@@@@@@@<>@@@@@@@~@@@@@@@@'
                                        }
                                    </LineConstruct>
                                    <p
                                        className={`tw-col-[2] tw-row-[2] !tw-leading-[1em] tw-text-center tw-whitespace-nowrap tw-left-[-0.25em]`}
                                    >
                                        ( {i + 1} )
                                    </p>
                                    <Link
                                        key={`related${i}`}
                                        href={getBlogPostPath(item.slug)}
                                        className="tw-my-2"
                                    >
                                        <div className="tw-w-full tw-h-[30vh] lg:tw-h-[50vh] tw-relative tw-mb-3">
                                            <CoverImage
                                                blogPost={item}
                                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1536px) 33vw, 25vw"
                                                className="group-hover:tw-hidden"
                                            ></CoverImage>
                                            <div className="tw-h-full tw-w-full tw-hidden tw-justify-center tw-items-center tw-absolute tw-left-0 tw-top-0 tw-p-8 group-hover:tw-flex tw-flex-col tw-gap-3 tw-text-center">
                                                <span>{item.blurb}</span>
                                                <p>
                                                    {item['big tag']?.map(
                                                        (tag, i) => (
                                                            <Fragment
                                                                key={`bigtag${i}`}
                                                            >
                                                                <span className="tw-inline-block tw-mx-2">
                                                                    {tag}
                                                                </span>
                                                                |
                                                            </Fragment>
                                                        )
                                                    )}
                                                    {item['small tag']?.map(
                                                        (tag, i) => (
                                                            <Fragment
                                                                key={`smalltag${i}`}
                                                            >
                                                                <span className="tw-inline-block tw-mx-2">
                                                                    {tag}
                                                                </span>
                                                                {item[
                                                                    'small tag'
                                                                ]?.[i + 1] &&
                                                                    '|'}
                                                            </Fragment>
                                                        )
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                            <p>{item.title}</p>
                                            <p>{item.timestart}</p>
                                        </div>
                                    </Link>
                                </motion.ol>
                            )
                        );
                    })}
                </li>
            </section>
        </Suspense>
    );
}