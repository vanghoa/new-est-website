export async function getGuest() {
    try {
        const res = await (
            await fetch(`${process.env.FETCH_URL}/api/prismaFetch`, {
                cache: 'no-store',
            })
        ).json();
        res.succeed
            ? console.log('prismaFetch thanh cong')
            : console.log(`loi cua prismaFetch: ${res.message}`);
        return res.succeed ? res.message : [];
    } catch (e) {
        console.log(`co loi o getGuest: ${e}`);
        return [];
    }
}
