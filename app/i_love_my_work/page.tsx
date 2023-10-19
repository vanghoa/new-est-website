import AnimatePageComp from '@/components/AnimatePageComp';
import { HeaderLayout } from '@/components/SmallComponents';
import { SuspenseNotion } from '@/components/SuspenseFallback';
import { Word } from '@/components/WordProcessor';
import WorkPageClient from '@/components/WorkPageClient';
import {
    cache_fetchBlogPosts,
    cache_fetchNotion,
    cache_retrieveMultiSelect,
} from '@/lib/notionClient';

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
    const blogPosts: any = await cache_fetchNotion('fetchBlogPosts');
    const multiSelect: any = await cache_fetchNotion('retrieveMultiSelect');

    return (
        blogPosts &&
        multiSelect && (
            <WorkPageClient
                blogPosts={blogPosts}
                multiSelect={multiSelect}
            ></WorkPageClient>
        )
    );
}
