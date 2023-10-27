export default function CheckSecret(secret: string) {
    const revalidatesecret = process.env.REVALIDATE_SECRET;
    return revalidatesecret && secret == revalidatesecret;
}
