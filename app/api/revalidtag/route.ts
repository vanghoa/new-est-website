import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
    try {
        const tagtorevalidate = request.nextUrl.searchParams.get('tag');
        if (!tagtorevalidate)
            return NextResponse.json({
                revalidated: false,
                error: 'missing tag',
            });

        revalidateTag(tagtorevalidate);

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            tag: tagtorevalidate,
        });
    } catch (e) {
        console.log('co loi in revalidatetag (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
