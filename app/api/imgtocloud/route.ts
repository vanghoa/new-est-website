import CheckSecret from '@/utils/sEcRet';
import { NextRequest, NextResponse } from 'next/server';
import uploadNotionImagesToCloudinary from 'upload-notion-images-to-cloudinary';

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DTB_WORK_ID;
const cloudinaryURL = process.env.CLOUDINARY_URL;
const cloudinaryUploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER;

export async function GET(request: NextRequest) {
    try {
        if (!CheckSecret(request.nextUrl.searchParams.get('secret') ?? '')) {
            return NextResponse.json(
                { message: 'Invalid secret' },
                { status: 401 }
            );
        }
        //console.log('bip');
        /*
    const secret = request.nextUrl.searchParams.get('secret');
    if (secret !== process.env.REVALIDATE_SECRET) {
        return NextResponse.json(
            { message: 'Invalid secret' },
            { status: 401 }
        );
    }*/
        if (
            !notionSecret ||
            !notionDatabaseId ||
            !cloudinaryURL ||
            !cloudinaryUploadFolder
        )
            return NextResponse.json({
                revalidated: false,
                error: 'missing environment variable',
            });

        await uploadNotionImagesToCloudinary({
            notionToken: notionSecret,
            notionDatabaseId: notionDatabaseId,
            cloudinaryUrl: cloudinaryURL,
            cloudinaryUploadFolder: cloudinaryUploadFolder,
            logLevel: 'debug',
        });

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (e) {
        console.log('co loi in img-to-cloudinary (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
