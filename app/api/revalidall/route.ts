import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { PATH_BLOG } from '@/constants/paths';

export async function GET(request: NextRequest) {
    try {
        revalidatePath(PATH_BLOG);
        revalidateTag('all');
        revalidateTag('multiselect');

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            tag: 'all-path',
        });
    } catch (e) {
        console.log('co loi in revalidate-all-path (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
