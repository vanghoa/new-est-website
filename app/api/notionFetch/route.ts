import { NextRequest, NextResponse } from 'next/server';
import {
    fetchAllBlocks,
    fetchBlogPostBySlug,
    fetchBlogPosts,
    fetchBlogPostsRelated,
    retrieveMultiSelect,
} from '@/lib/notionClient';

export const revalidate = 0;

const cache = {
    fetchAllBlocks: fetchAllBlocks,
    fetchBlogPostBySlug: fetchBlogPostBySlug,
    fetchBlogPosts: fetchBlogPosts,
    fetchBlogPostsRelated: fetchBlogPostsRelated,
    retrieveMultiSelect: retrieveMultiSelect,
};

export type cacheType = keyof typeof cache;

export async function GET(request: NextRequest) {
    try {
        const type = request.nextUrl.searchParams.get('type') ?? '';
        const args = JSON.parse(
            request.nextUrl.searchParams.get('args') || '[]'
        );
        if (!type || !(type in cache)) {
            console.log('wrong type name');
            return NextResponse.json({
                succeed: false,
                message: 'wrong type name - fuck',
            });
        }
        // @ts-ignore
        let data = await cache[type](...args);
        console.log(`route API notionFetch: ${type} / ${args}`);
        return NextResponse.json({ succeed: true, message: data });
    } catch (e) {
        console.log('co loi in notionFetch/route (error): ', e);
        return NextResponse.json({ succeed: false, message: null });
    }
}
