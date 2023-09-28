'use server';

import prisma from '../lib/prisma';

export async function myAction(formData: FormData) {
    try {
        const name = formData.get('name');
        const Guest =
            typeof name == 'string' &&
            (await prisma.guestBook.create({
                data: {
                    name: name,
                },
            }));
        return { message: 'Success' };
    } catch (e) {
        return { message: 'Failed to create' };
    }
}
