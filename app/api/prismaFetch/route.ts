import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const feed = await prisma.guestBook.findMany();
        return NextResponse.json({ succeed: true, message: feed });
    } catch (e) {
        console.log('co loi in prisma/route (error): ', e);
        return NextResponse.json({ succeed: false, message: e });
    }
}
