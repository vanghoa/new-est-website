import AnimatePageComp from '@/components/AnimatePageComp';
import { LineLoose } from '@/components/Line';
import { HeaderLayout } from '@/components/SmallComponents';
import { SuspenseNotion } from '@/components/SuspenseFallback';
import {
    tw_divider,
    tw_line_divider,
    tw_line_overflow,
} from '@/components/TailwindClass';
import { Half, Word } from '@/components/WordProcessor';
import WorkPageClient from '@/components/WorkPageClient';
import {
    cache_fetchBlogPosts,
    cache_fetchNotion,
    cache_retrieveMultiSelect,
} from '@/lib/notionClient';
import {
    retrieveMultiSelectT,
    BlogPost,
    Individual,
    Group,
} from '@/types/types';
import { ReactNode, Fragment } from 'react';

export const revalidate = false;
export const dynamic = 'force-static';
/*
export const fetchCache = 'force-cache';
*/
export default function page() {
    return (
        <AnimatePageComp>
            <SuspenseNotion>
                <WorkPageSuspense></WorkPageSuspense>
            </SuspenseNotion>
        </AnimatePageComp>
    );
}

async function WorkPageSuspense() {
    const blogPosts: (BlogPost | null)[] = await cache_fetchNotion(
        'fetchBlogPosts'
    );
    const multiSelect: retrieveMultiSelectT = await cache_fetchNotion(
        'retrieveMultiSelect'
    );
    const individual: (Individual | null)[] = await cache_fetchNotion(
        'fetchIndividuals'
    );
    const group: (Group | null)[] = await cache_fetchNotion('fetchGroups');
    return (
        blogPosts &&
        multiSelect &&
        individual &&
        group && (
            <>
                <WorkPageClient
                    blogPosts={blogPosts}
                    multiSelect={multiSelect}
                    individual={individual}
                ></WorkPageClient>
                <HeaderLayout elem={'div'}>
                    <Word elem={'h2'} className="tw-text-center h1">
                        credit directory
                    </Word>
                </HeaderLayout>
                <li
                    className={`tw-text-center !tw-mb-0 !tw-w-[70vw] ${tw_divider} ${tw_line_overflow} !tw-leading-[3.1em] [&>*]:tw-inline tw-border-l-0`}
                >
                    {individual.map((item, i) => (
                        <Fragment key={`${i}decorfrag`}>
                            <ul
                                key={`${i}decor`}
                                className="tw-break-all tw-break-words tw-flex-shrink after:!tw-text-transparent before:!tw-text-transparent after:tw-content-['----'] before:tw-content-['----'] sm:after:tw-content-['-----'] sm:before:tw-content-['-----']"
                            >
                                *
                            </ul>
                            <Half
                                elem="ul"
                                key={`${i}filter`}
                                className={`tw-whitespace-nowrap`}
                            >
                                {item?.name}
                            </Half>
                        </Fragment>
                    ))}
                    <ul
                        key={`decor`}
                        className="tw-break-all tw-break-words tw-flex-shrink before:!tw-text-transparent before:tw-content-['----'] sm:before:tw-content-['-----'] tw-whitespace-nowrap"
                    >
                        *
                    </ul>
                </li>
                <li
                    className={`tw-text-center !tw-mt-0 ${tw_divider} !tw-leading-[3.1em] [&>*]:tw-inline tw-border-l-0`}
                >
                    {group.map((item, i) => (
                        <Fragment key={`${i}decorfrag`}>
                            <ul
                                key={`${i}decor`}
                                className="tw-break-all tw-break-words tw-flex-shrink after:!tw-text-transparent before:!tw-text-transparent after:tw-content-['----'] before:tw-content-['----'] sm:after:tw-content-['-----'] sm:before:tw-content-['-----']"
                            >
                                *
                            </ul>
                            <Half
                                elem="ul"
                                key={`${i}filter`}
                                className={`tw-whitespace-nowrap`}
                            >
                                {item?.name}
                            </Half>
                        </Fragment>
                    ))}
                    <ul
                        key={`decor`}
                        className="tw-break-all tw-break-words tw-flex-shrink before:!tw-text-transparent before:tw-content-['----'] sm:before:tw-content-['-----'] tw-whitespace-nowrap"
                    >
                        *
                    </ul>
                </li>
            </>
        )
    );
}
