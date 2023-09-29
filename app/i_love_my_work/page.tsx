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
export const fetchCache = 'only-cache';

export default async function page() {
    const blogPosts = await cache_fetchBlogPosts();
    const multiSelect = await cache_retrieveMultiSelect();
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
