'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import prisma from '../lib/prisma';

export async function myAction(formData: FormData) {
    try {
        const name = formData.get('name');
        const guest =
            typeof name == 'string' &&
            (await prisma.guestBook.create({
                data: {
                    name: name,
                },
            }));
        //revalidatePath('/api/prismaFetch');
        revalidateTag('prismaFetch');
        return { message: 'Success', data: guest };
    } catch (e) {
        return { message: 'Failed to create', data: false };
    }
}
