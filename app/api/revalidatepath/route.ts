import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { PATH_BLOG } from '@/constants/paths';

export async function GET(request: NextRequest) {
    try {
        const pathtorevalidate = request.nextUrl.searchParams.get('path');
        if (!pathtorevalidate)
            return NextResponse.json({
                revalidated: false,
                error: 'missing path',
            });

        revalidatePath(`${PATH_BLOG}/${pathtorevalidate}`);

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            path: pathtorevalidate,
        });
    } catch (e) {
        console.log('co loi in revalidatepath (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
