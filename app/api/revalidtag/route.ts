import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export async function GET(request: NextRequest) {
    try {
        const tag = request.nextUrl.searchParams.get('tag');
        if (!tag)
            return NextResponse.json({
                revalidated: false,
                error: 'missing tag',
            });

        console.log(tag);
        revalidateTag(tag);

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
            tag: tag,
        });
    } catch (e) {
        console.log('co loi in revalidatetag (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
