export async function getGuest() {
    try {
        const res = await (
            await fetch(`${process.env.FETCH_URL}/api/prismaFetch`, {
                cache: 'no-store',
            })
        ).json();
        return res.succeed ? res.message : [];
    } catch (e) {
        return [];
    }
}
