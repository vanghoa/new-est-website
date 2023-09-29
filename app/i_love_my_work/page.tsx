import AnimatePageComp from '@/components/AnimatePageComp';
import { HeaderLayout } from '@/components/SmallComponents';
import { Word } from '@/components/WordProcessor';
import WorkPageClient from '@/components/WorkPageClient';
import {
    cache_fetchBlogPosts,
    cache_retrieveMultiSelect,
} from '@/lib/notionClient';

export const revalidate = false;
export const dynamic = 'force-static';
export const fetchCache = 'default-cache';

export default async function page() {
    //const blogPosts = await cache_fetchBlogPosts();
    //const multiSelect = await cache_retrieveMultiSelect();

    const { message: blogPosts } = await (
        await fetch(
            `${
                process.env.FETCH_URL
            }/api/notionFetch?type=${'fetchBlogPosts'}&args=${JSON.stringify(
                []
            )}`,
            { cache: 'force-cache' }
        )
    ).json();
    const { message: multiSelect } = await (
        await fetch(
            `${
                process.env.FETCH_URL
            }/api/notionFetch?type=${'retrieveMultiSelect'}&args=${JSON.stringify(
                []
            )}`,
            { cache: 'force-cache' }
        )
    ).json();

    return (
        <AnimatePageComp>
            <HeaderLayout>
                <Word elem={'h1'} className="tw-text-center">
                    Works
                </Word>
            </HeaderLayout>
            {blogPosts && multiSelect && (
                <WorkPageClient
                    blogPosts={blogPosts}
                    multiSelect={multiSelect}
                ></WorkPageClient>
            )}
        </AnimatePageComp>
    );
}
