import AnimatePageComp from '@/components/AnimatePageComp';
import { LineLoose, LineLooser } from '@/components/Line';
import { Star } from '@/components/SculptureConstruct';
import { HeaderLayout, Tooltips } from '@/components/SmallComponents';
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

//export const revalidate = false;
//export const dynamic = 'force-static';
/*
export const fetchCache = 'force-cache';
*/
export default function page() {
    return (
        <>
            <AnimatePageComp>
                <SuspenseNotion>
                    <WorkPageSuspense></WorkPageSuspense>
                </SuspenseNotion>
            </AnimatePageComp>
            <Star qty={120} />
        </>
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
                ></WorkPageClient>
                <HeaderLayout elem={'div'}>
                    <Word
                        elem={'h2'}
                        className="tw-text-center h1"
                        rest={{ id: 'creditdirectory' }}
                    >
                        collaborators, colleagues, bosses, clients, college
                        profs, friends, family, relatives, former romantic
                        partners, internet passersby, people I met briefly, yet
                        who may no longer recall our interaction, ...
                    </Word>
                </HeaderLayout>
                {Array.isArray(group) && Array.isArray(individual) && (
                    <>
                        <li
                            className={`tw-text-center !tw-mb-0 rnr-image ${tw_divider} !tw-leading-[3.1em] [&>*]:tw-inline tw-border-l-0 tw-relative`}
                        >
                            {individual.map((item, i) => {
                                return (
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
                                            className={`tw-whitespace-nowrap tw-group hover:tw-z-50`}
                                        >
                                            {item?.name}
                                            <Tooltips>
                                                {item?.workcredit?.length &&
                                                item?.workcredit?.length > 0
                                                    ? item?.workcredit?.map(
                                                          (text, i, arr) => (
                                                              <Fragment
                                                                  key={`${i}work`}
                                                              >
                                                                  {text}
                                                                  {i <
                                                                      arr.length -
                                                                          1 && (
                                                                      <LineLooser className="!tw-text-black tw-mt-[-.2em] tw-mb-[.2em] !tw-h-3"></LineLooser>
                                                                  )}
                                                              </Fragment>
                                                          )
                                                      )
                                                    : ':)'}
                                            </Tooltips>
                                        </Half>
                                    </Fragment>
                                );
                            })}
                            <ul
                                key={`decor`}
                                className="tw-break-all tw-break-words tw-flex-shrink before:!tw-text-transparent before:tw-content-['----'] sm:before:tw-content-['-----'] tw-whitespace-nowrap"
                            >
                                *
                            </ul>
                        </li>
                        <li
                            className={`tw-text-center !tw-mt-0 rnr-image ${tw_divider} !tw-leading-[3.1em] [&>*]:tw-inline tw-border-l-0`}
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
                                        className={`tw-whitespace-nowrap tw-group hover:tw-z-50`}
                                    >
                                        {item?.name}
                                        <Tooltips>
                                            {item?.workcredit?.length &&
                                            item?.workcredit?.length > 0
                                                ? item?.workcredit?.map(
                                                      (text, i, arr) => (
                                                          <Fragment
                                                              key={`${i}work`}
                                                          >
                                                              {text}
                                                              {i <
                                                                  arr.length -
                                                                      1 && (
                                                                  <LineLooser className="!tw-text-black tw-mt-[-.2em] tw-mb-[.2em] !tw-h-3"></LineLooser>
                                                              )}
                                                          </Fragment>
                                                      )
                                                  )
                                                : ':)'}
                                        </Tooltips>
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
                )}
            </>
        )
    );
}
