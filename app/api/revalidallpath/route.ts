import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { PATH_BLOG } from '@/constants/paths';

export async function GET(request: NextRequest) {
    try {
        revalidatePath(PATH_BLOG);

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            tag: 'allpath',
        });
    } catch (e) {
        console.log('co loi in revalidatetag (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
