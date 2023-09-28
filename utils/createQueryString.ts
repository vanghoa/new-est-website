import { ReadonlyURLSearchParams } from 'next/navigation';

export default function createQueryString(
    searchParams: ReadonlyURLSearchParams,
    name: string,
    value: string
) {
    const params = new URLSearchParams(searchParams);
    params.set(name, value);

    return params.toString();
}
