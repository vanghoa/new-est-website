export const dynamic = 'force-static';
export const fetchCache = 'force-cache';

export default async function useFetch() {
    const res = await fetch(`${process.env.FETCH_URL}/api/notion`);
    try {
        return await res.json();
    } catch (err) {
        console.log('co loi (error): ', err);
        return { message: [] };
    }
}
