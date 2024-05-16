import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { PATH_BLOG } from '@/constants/paths';
import { uploadCloudinaryNotionDTBWork } from '@/lib/uploadCloudinaryNotionDTBWork';

export const revalidate = 0;

export async function GET(request: NextRequest) {
    try {
        //await uploadCloudinaryNotionDTBWork();
        revalidateTag('all');
        revalidateTag('multiselect');
        revalidateTag('group');
        revalidateTag('individual');

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
