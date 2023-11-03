import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';
import CheckSecret from './utils/sEcRet';

export function middleware(req: NextRequest) {
    if (!CheckSecret(req.nextUrl.searchParams.get('secret') ?? '')) {
        return NextResponse.json(
            { message: 'Aha! Not so fast.' },
            { status: 401 }
        );
    }

    /*
    const url = req.nextUrl;
    const { pathname } = url;

    if (pathname.startsWith(`/api/`)) {
        if (
            !req.headers.get('referer')?.includes(process.env.APP_URL as string)
        ) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            );
        }
    }
*/
    return NextResponse.next();
}

export const config = {
    matcher: '/api/((?!notionFetch|prismaFetch).*)',
};
