import { Client, LogLevel } from '@notionhq/client';
import {
    BlockObjectResponse,
    DatabaseObjectResponse,
    GetBlockResponse,
    GetPageResponse,
    PageObjectResponse,
    PartialDatabaseObjectResponse,
    PartialPageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints';
import { BlogPost, RollUpandLink, retrieveMultiSelectT } from '../types/types';
import probeImageSize from './probeImageSize';
import { cache } from 'react';
import { cacheType } from '@/app/api/notionFetch/route';
import { getAPIRoutePath } from '@/constants/paths';
import VimeoSize from './VimeoSize';
//
// custom props
const PROPERTY = {
    title: 'title',
    slug: 'slug',
    blurb: 'blurb',
    bigtag: 'big tag',
    smalltag: 'small tag',
    themes: 'themes',
    timeframe: 'timeframe',
    context: 'context',
    indiv_link: 'indiv_link',
    group_link: 'group_link',
    in_progress: 'in progress',
    current: 'in progress',
    is_publish: 'is published?',
    is_featured: 'is featured?',
    time_create: 'created time',
    time_edit: 'last edited time',
    backgroundcolor: 'background color',
    textcolor: 'text color',
    upwght: 'font upweight',
};

function getTextValue(property: any): string | null {
    return property?.rich_text?.[0]?.plain_text ?? null;
}
function getDateValueStart(property: any): string | null {
    return property?.date?.start.slice(0, -3) ?? null;
}
function getDateValueEnd(property: any): string | null {
    return property?.date?.end.slice(0, -3) ?? null;
}
function getRealDateValueStart(property: any): Date {
    return new Date(property?.date?.start ? property.date.start : '2019-01-01');
}
function getMultiSelectValues(property: any): string[] | null {
    return (
        property.multi_select.map((item: { name: any }) => item.name) ?? null
    );
}
function getTitleValue(property: any): string | null {
    return (
        property?.title
            ?.map((item: { plain_text: any }) => item.plain_text)
            .join('') ?? null
    );
}
function getCover(page: any): { url: string; type: string } | null {
    if (!page.cover) {
        return null;
    }
    if (page.cover.type === 'external') {
        return {
            url: page.cover.external.url,
            type: 'external',
        };
    }
    if (page.cover.type === 'file') {
        console.log(`notion image caught: ${page.cover.file.url}`);
        return {
            url: page.cover.file.url,
            type: 'file',
        };
    }
    return null;
}
function getCheckbox(property: any): boolean | null {
    return property?.checkbox;
}
function getRollUpandLink(property: any): RollUpandLink {
    return property?.rollup?.array?.map(
        ({ rich_text: [{ plain_text: name, href }] }: any) => ({
            name,
            href,
        })
    );
}
//
function transformNotionPageIntoBlogPost(
    page:
        | PageObjectResponse
        | PartialPageObjectResponse
        | PartialDatabaseObjectResponse
        | DatabaseObjectResponse
): null | BlogPost {
    if (!('properties' in page)) {
        return null;
    }
    const current = getCheckbox(page.properties[PROPERTY.current]);
    return {
        title: getTitleValue(page.properties[PROPERTY.title]),
        id: page.id,
        slug: getTextValue(page.properties[PROPERTY.slug]),
        blurb: getTextValue(page.properties[PROPERTY.blurb]),
        context: getTextValue(page.properties[PROPERTY.context]),
        'big tag': getMultiSelectValues(page.properties[PROPERTY.bigtag]),
        'small tag': getMultiSelectValues(page.properties[PROPERTY.smalltag]),
        themes: getTextValue(page.properties[PROPERTY.themes]),
        timestart: getDateValueStart(page.properties[PROPERTY.timeframe]),
        realtimestart: getRealDateValueStart(
            page.properties[PROPERTY.timeframe]
        ),
        timeend: current
            ? 'now'
            : getDateValueEnd(page.properties[PROPERTY.timeframe]) ||
              'time is obscure',
        coverImg: getCover(page),
        indiv: getRollUpandLink(page.properties[PROPERTY.indiv_link]),
        group: getRollUpandLink(page.properties[PROPERTY.group_link]),
        timecreate: 'created_time' in page ? page.created_time : '',
        backgroundColor:
            getTextValue(page.properties[PROPERTY.backgroundcolor]) ?? 'black',
        textColor: getTextValue(page.properties[PROPERTY.textcolor]) ?? 'white',
        upwght: getCheckbox(page.properties[PROPERTY.upwght]) ?? false,
        featured: getCheckbox(page.properties[PROPERTY.is_featured]) ?? false,
    };
}

const notion = new Client({
    auth: process.env.NOTION_SECRET,
    logLevel:
        process.env.NODE_ENV === 'development' ? LogLevel.DEBUG : LogLevel.WARN,
});

export const retrieveMultiSelect = async function () {
    if (!process.env.NOTION_DTB_WORK_ID) return null;
    const obj = await notion.databases.retrieve({
        database_id: process.env.NOTION_DTB_WORK_ID,
    });
    const { properties } = obj;
    const result: retrieveMultiSelectT = {
        general: ['Latest', 'Oldest', 'Featured'],
    };
    result[PROPERTY.bigtag] = [];
    result[PROPERTY.smalltag] = [];
    for (let k in properties) {
        let a = properties[k];
        if (a.type == 'multi_select') {
            result[k] = a.multi_select.options.map(({ name }) => name);
        }
    }
    return result;
};

export const fetchBlogPosts = async function (
    featured = false
): Promise<(BlogPost | null)[]> {
    console.log('fetchBlogPosts_nocache');

    if (!process.env.NOTION_DTB_WORK_ID) return [null];
    const result = await notion.databases.query({
        //page_size: 100,
        database_id: process.env.NOTION_DTB_WORK_ID,
        filter: {
            and: [
                {
                    property: PROPERTY.is_publish,
                    checkbox: { equals: true },
                },
                ...(featured
                    ? [
                          {
                              property: PROPERTY.is_featured,
                              checkbox: { equals: true },
                          },
                      ]
                    : []),
            ],
        },
        sorts: [{ property: PROPERTY.time_create, direction: 'descending' }],
    });

    // @todo: add pagination support when we reach 100 posts
    const { results } = result;

    const blogPosts = results.map(transformNotionPageIntoBlogPost);

    return blogPosts;
};

export const fetchBlogPostsRelated = async function (
    tag: string | undefined,
    exclude: string | undefined
): Promise<(BlogPost | null)[]> {
    console.log('fetchBlogPostsRelated_nocache');
    if (!process.env.NOTION_DTB_WORK_ID || !tag || !exclude) return [null];
    const result = await notion.databases.query({
        page_size: 6,
        database_id: process.env.NOTION_DTB_WORK_ID,
        filter: {
            and: [
                {
                    property: PROPERTY.bigtag,
                    multi_select: {
                        contains: tag,
                    },
                },
                {
                    property: PROPERTY.is_publish,
                    checkbox: { equals: true },
                },
                {
                    property: PROPERTY.slug,
                    rich_text: {
                        does_not_equal: exclude,
                    },
                },
            ],
        },
        sorts: [{ property: PROPERTY.time_create, direction: 'descending' }],
    });

    // @todo: add pagination support when we reach 100 posts
    const { results } = result;

    const blogPosts = results.map(transformNotionPageIntoBlogPost);

    return blogPosts;
};

export const fetchBlogPostBySlug = async function (
    slug: string
): Promise<BlogPost | null> {
    console.log('fetchBlogPostBySlug_nocache');
    if (!process.env.NOTION_DTB_WORK_ID) return null;
    const result = await notion.databases.query({
        database_id: process.env.NOTION_DTB_WORK_ID,
        page_size: 1,
        filter: {
            and: [
                {
                    property: PROPERTY.slug,
                    rich_text: {
                        equals: slug,
                    },
                },
            ].filter(Boolean),
        },
    });
    if (result.results.length === 0) {
        return null;
    }
    const blogPost = transformNotionPageIntoBlogPost(result.results[0]);
    return blogPost;
};

async function addDimensionsToVideoBlocks(
    blocks: GetBlockResponse[]
): Promise<void[]> {
    return await Promise.all(
        blocks
            .filter((block) => 'type' in block && block.type === 'video')
            .map(async (block) => {
                // @ts-ignore
                const type = block.type;
                // @ts-ignore
                const value = block[type];
                const src =
                    value.type === 'external'
                        ? value.external.url
                        : value.type === 'file'
                        ? value.file.url
                        : null;
                if (value.type === 'file') {
                    //internal
                    console.log(`local video caught: ${value.file.url}`);
                }
                if (!src) {
                    return;
                }
                return VimeoSize(src)
                    .then(({ width, height }) => {
                        // @ts-ignore
                        block[type].external.dim = { width, height };
                    })
                    .catch((error) => {
                        console.warn(error);
                        return;
                    });
            })
    );
}

async function addDimensionsToImageBlocks(
    blocks: GetBlockResponse[]
): Promise<void[]> {
    return await Promise.all(
        blocks
            .filter((block) => 'type' in block && block.type === 'image')
            .map(async (block) => {
                // @ts-ignore
                const type = block.type;
                // @ts-ignore
                const value = block[type];
                const src =
                    value.type === 'external'
                        ? value.external.url
                        : value.type === 'file'
                        ? value.file.url
                        : null;
                if (value.type === 'file') {
                    //internal
                    console.log(`notion image caught: ${value.file.url}`);
                }
                if (!src) {
                    return;
                }
                return probeImageSize(src)
                    .then(({ width, height }) => {
                        // @ts-ignore
                        block[type].external.dim = { width, height };
                    })
                    .catch((error) => {
                        console.warn(error);
                        return;
                    });
            })
    );
}

export const fetchAllBlocks = async function (
    pageIdOrBlockId: string
): Promise<GetBlockResponse[]> {
    //
    async function refetchAllBlocks(cursor: string | false) {
        const result = await notion.blocks.children.list(
            cursor
                ? {
                      block_id: pageIdOrBlockId,
                      page_size: 100,
                      start_cursor: cursor,
                  }
                : {
                      block_id: pageIdOrBlockId,
                      page_size: 100,
                  }
        );
        let blocks = result.results;
        if (result.has_more && result.next_cursor) {
            blocks = blocks.concat(await refetchAllBlocks(result.next_cursor));
        }
        return blocks;
    }
    //
    console.log('fetchAllBlocks_nocache');
    //
    const blocks = await refetchAllBlocks(false);
    // Retrieve block children for nested blocks (one level deep), for example toggle blocks
    const childBlocks = await Promise.all(
        blocks
            .filter((block) => 'has_children' in block && block.has_children)
            .map(async (block) => {
                return {
                    id: block.id,
                    children: await fetchAllBlocks(block.id),
                };
            })
    );
    const blocksWithChildren = blocks.map((block) => {
        // Add child blocks if the block should contain children but none exists
        if (
            'has_children' in block &&
            block.has_children &&
            // @ts-ignore
            !block[block.type].children
        ) {
            // @ts-ignore
            block[block.type].children = childBlocks.find(
                ({ id }) => id === block.id
            )?.children;
        }
        return block;
    });

    await addDimensionsToVideoBlocks(blocksWithChildren);
    await addDimensionsToImageBlocks(blocksWithChildren);

    return blocksWithChildren;
};

export const fetchAllBlocks_nrn = async (
    pageIdOrBlockId: string
): Promise<BlockObjectResponse[]> => {
    pageIdOrBlockId = pageIdOrBlockId.replaceAll('-', '');

    const { results } = await notion.blocks.children.list({
        block_id: pageIdOrBlockId,
        page_size: 100,
    });

    // Fetches all child blocks recursively - be mindful of rate limits if you have large amounts of nested blocks
    // See https://developers.notion.com/docs/working-with-page-content#reading-nested-blocks
    const childBlocks = results.map(async (block) => {
        if ('has_children' in block) {
            const children = await fetchAllBlocks_nrn(block.id);
            return { ...block, children };
        }
        return block;
    });

    return await Promise.all(childBlocks).then((blocks) => {
        return blocks.reduce((acc: any, curr) => {
            if ('type' in curr && curr.type === 'bulleted_list_item') {
                if (acc[acc.length - 1]?.type === 'bulleted_list') {
                    acc[acc.length - 1][
                        acc[acc.length - 1].type
                    ].children?.push(curr);
                } else {
                    acc.push({
                        id: getRandomInt(10 ** 99, 10 ** 100).toString(),
                        type: 'bulleted_list',
                        bulleted_list: { children: [curr] },
                    });
                }
            } else if ('type' in curr && curr.type === 'numbered_list_item') {
                if (acc[acc.length - 1]?.type === 'numbered_list') {
                    acc[acc.length - 1][
                        acc[acc.length - 1].type
                    ].children?.push(curr);
                } else {
                    acc.push({
                        id: getRandomInt(10 ** 99, 10 ** 100).toString(),
                        type: 'numbered_list',
                        numbered_list: { children: [curr] },
                    });
                }
            } else {
                acc.push(curr);
            }
            return acc;
        }, []);
    });
};

export const cache_fetchAllBlocks = cache(fetchAllBlocks);
export const cache_fetchBlogPostBySlug = cache(fetchBlogPostBySlug);
export const cache_fetchBlogPosts = cache(fetchBlogPosts);
export const cache_fetchBlogPostsRelated = cache(fetchBlogPostsRelated);
export const cache_retrieveMultiSelect = cache(retrieveMultiSelect);

function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const cache_fetchNotion = cache(
    async (type: cacheType, ...rest: any[]) => {
        try {
            const { message: blogPost } = await (
                await fetch(
                    `${getAPIRoutePath(
                        'notionFetch'
                    )}?type=${type}&args=${JSON.stringify(rest)}`,
                    { cache: 'force-cache' }
                )
            ).json();
            console.log(`cache_fetchNotion: ${type} / ${rest}`);
            return blogPost;
        } catch (e) {
            console.log(`co loi o cache_fetchNotion: ${e}`);
            return null;
        }
    }
);
