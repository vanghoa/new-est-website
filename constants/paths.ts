export const PATH_BLOG = '/i_love_my_work';
export const getBlogPostPath = (slug: string) => `/i_love_my_work/${slug}`;
export const getWorkFilter = (filter: string) =>
    `/i_love_my_work?filter=${filter}`;

export const PATH = process.env.SITE_URL ?? '';
