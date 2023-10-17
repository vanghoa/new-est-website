export default async function VimeoSize(url: string) {
    const data = await (
        await fetch(`https://vimeo.com/api/oembed.json?url=${url}`, {
            cache: 'force-cache',
        })
    ).json();
    return {
        width: data.width,
        height: data.height,
    };
}
