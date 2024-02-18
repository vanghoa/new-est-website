import { uploadCloudinaryNotionDTBWork } from '@/lib/uploadCloudinaryNotionDTBWork';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        await uploadCloudinaryNotionDTBWork();
        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (e) {
        console.log('co loi in img-to-cloudinary (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
