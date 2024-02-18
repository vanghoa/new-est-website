import uploadNotionImagesToCloudinary from 'upload-notion-images-to-cloudinary';

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DTB_WORK_ID;
const cloudinaryURL = process.env.CLOUDINARY_URL;
const cloudinaryUploadFolder = process.env.CLOUDINARY_UPLOAD_FOLDER;

export async function uploadCloudinaryNotionDTBWork() {
    if (
        !notionSecret ||
        !notionDatabaseId ||
        !cloudinaryURL ||
        !cloudinaryUploadFolder
    )
        throw new Error('secret cloudinary not found');

    await uploadNotionImagesToCloudinary({
        notionToken: notionSecret,
        notionDatabaseId: notionDatabaseId,
        cloudinaryUrl: cloudinaryURL,
        cloudinaryUploadFolder: cloudinaryUploadFolder,
        logLevel: 'debug',
    });
}
