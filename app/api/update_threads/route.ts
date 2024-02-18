import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

export const revalidate = 0;

export async function GET(request: NextRequest) {
    try {
        revalidateTag('threads');

        return NextResponse.json({
            revalidated: true,
            now: Date.now(),
        });
    } catch (e) {
        console.log('co loi in revalidatetag (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
