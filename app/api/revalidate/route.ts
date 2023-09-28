import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { PATH_BLOG } from '@/constants/paths';
import uploadNotionImagesToCloudinary from 'upload-notion-images-to-cloudinary';

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DTB_WORK_ID;
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
        revalidatePath(`${PATH_BLOG}/[slug]`);
        revalidatePath(PATH_BLOG);

        return NextResponse.json({ revalidated: true, now: Date.now() });
    } catch (e) {
        console.log('co loi in api/route (error): ', e);
        return NextResponse.json({ message: [] }, { status: 400 });
    }
}
