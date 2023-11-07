import { NextRequest, NextResponse } from 'next/server';
import uploadNotionImagesToCloudinary from 'upload-notion-images-to-cloudinary';

const notionSecret = process.env.NOTION_SECRET;
const notionPageId = process.env.NOTION_3DVIEW_ID;
const cloudinaryURL = process.env.CLOUDINARY_URL;
const cloudinaryUploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER;

export async function GET(request: NextRequest) {
    try {
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
            !notionPageId ||
            !cloudinaryURL ||
            !cloudinaryUploadFolder
        )
            return NextResponse.json({
                revalidated: false,
                error: 'missing environment variable',
            });

        await uploadNotionImagesToCloudinary({
            notionToken: notionSecret,
            notionPageId: notionPageId,
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
