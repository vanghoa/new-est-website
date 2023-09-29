export async function getGuest() {
    try {
        const res = await (
            await fetch(`${process.env.FETCH_URL}/api/prismaFetch`, {
                cache: 'no-store',
            })
        ).json();
        console.log(res.message);
        return res.succeed ? res.message : [];
    } catch (e) {
        console.log(e);
        return [];
    }
}
