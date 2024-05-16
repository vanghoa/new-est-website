import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { uploadCloudinaryNotionDTBWork } from '@/lib/uploadCloudinaryNotionDTBWork';

export async function GET(request: NextRequest) {
    try {
        const slug = request.nextUrl.searchParams.get('slug');
        if (!slug)
            return NextResponse.json({
                revalidated: false,
                error: 'missing slug',
            });

        // await uploadCloudinaryNotionDTBWork();
        revalidateTag(slug);
        revalidateTag('all');
        revalidateTag('multiselect');
        revalidateTag('group');
        revalidateTag('individual');

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            tag: slug,
        });
    } catch (e) {
        console.log('co loi in revalidatetag (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
