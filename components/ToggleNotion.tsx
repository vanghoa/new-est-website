import { Fragment } from 'react';
import { logosz, notmaxszs } from './ImageSizes';
import { Line, LineLooser } from './Line';
import { ImageFrame, ImageNoWidth } from './SmallComponents';
import { VideoFrame } from './ClientComp';
import SwiperNotion from './SwiperNotion';
import { tw_border_white_04, tw_line_overflow } from './TailwindClass';

export type ToggleBlockType = {
    notionType: any;
    content: {
        caption: any;
        type: any;
        external: any;
    };
};

export function ToggleNotion(block: any) {
    const {
        block: {
            items: [data],
        },
    } = block;
    const datainfo = data?.content?.text?.[0]?.plain_text
        .substring(1)
        .replaceAll('”', '"');
    if (!data || !datainfo) {
        return <div>Somethings wrong</div>;
    }
    const info = JSON.parse(datainfo);
    switch (info.type) {
        case 'carousel':
            return <SwiperNotion blocks={data.items}></SwiperNotion>;
            break;
        case 'flex':
            return (
                <FlexNotion
                    blocks={data.items}
                    childw={info.childw}
                ></FlexNotion>
            );
            break;
        case 'col':
            return (
                <ColNotion
                    blocks={data.items}
                    num={info.num}
                    fitwidth={info.fitwidth}
                ></ColNotion>
            );
            break;
        case 'fitwidth':
            return <FitWidthNotion blocks={data.items}></FitWidthNotion>;
        case 'tgt':
            return <TogetherNotion blocks={data.items}></TogetherNotion>;
        case 'fitheight':
            return <FitHeightNotion blocks={data.items}></FitHeightNotion>;
        case 'pdf':
            return <PDFNotion info={info}></PDFNotion>;
        default:
            return <div>Somethings wrong</div>;
    }

    return <></>;
}

function PDFNotion({
    info: { width, height, url },
}: {
    info: { width: number; height: number; url: string };
}) {
    console.log(width, height, url);
    return (
        <ImageFrame elem={Line} maxwidth={false}>
            <iframe
                src={url}
                className="tw-w-full tw-max-h-[calc(100vh-10rem)]"
                style={{ aspectRatio: `${width} / ${height}` }}
            ></iframe>
        </ImageFrame>
    );
}

function FitHeightNotion({ blocks }: { blocks: [] }) {
    return (
        <ImageFrame elem={Line} maxwidth={false}>
            <div>
                {blocks.map(
                    (
                        {
                            notionType,
                            content: { caption, type, external },
                        }: ToggleBlockType,
                        k
                    ) => {
                        switch (notionType) {
                            case 'image':
                                return (
                                    <ImageNoWidth
                                        alt={caption[0]?.plain_text}
                                        sizes={notmaxszs}
                                        type={type}
                                        divclass="!tw-w-auto !tw-h-[calc(100vh-10rem)]"
                                        external={external}
                                    ></ImageNoWidth>
                                );
                                break;
                            case 'video':
                                return (
                                    <VideoFrame
                                        data={{
                                            external,
                                        }}
                                    ></VideoFrame>
                                );
                                break;
                            default:
                                return <div>Somethings wrong</div>;
                        }
                    }
                )}
            </div>
        </ImageFrame>
    );
}

function FlexNotion({
    blocks,
    childw,
}: {
    blocks: [];
    childw: string | undefined;
}) {
    return (
        <div className="tw-flex tw-justify-center tw-items-center tw-gap-4">
            {blocks.map(
                (
                    {
                        notionType,
                        content: { caption, type, external },
                    }: ToggleBlockType,
                    k
                ) => (
                    <ImageFrame
                        key={`flex${k}`}
                        elem={Line}
                        maxwidth={false}
                        className="!tw-w-auto tw-flex-shrink"
                    >
                        {(() => {
                            switch (notionType) {
                                case 'image':
                                    return (
                                        <ImageNoWidth
                                            alt={caption[0]?.plain_text}
                                            external={external}
                                            sizes={
                                                childw == 'logo'
                                                    ? logosz
                                                    : notmaxszs
                                            }
                                            type={type}
                                            divclass={
                                                childw == 'logo'
                                                    ? '!tw-w-fit !tw-h-28'
                                                    : ''
                                            }
                                        ></ImageNoWidth>
                                    );
                                    break;
                                case 'video':
                                    return <div>Somethings wrong</div>;
                                    break;
                                default:
                                    return <div>Somethings wrong</div>;
                            }
                        })()}
                    </ImageFrame>
                )
            )}
        </div>
    );
}

function ColNotion({
    blocks,
    num = 1,
    fitwidth,
}: {
    blocks: [];
    num: 1 | 2 | 3 | 4;
    fitwidth: boolean;
}) {
    const grid = {
        1: 'tw-grid-cols-1',
        2: 'tw-grid-cols-1 md:tw-grid-cols-2',
        3: 'tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3',
        4: 'tw-grid-cols-1 md:tw-grid-cols-3 lg:tw-grid-cols-4',
    };
    const grissizes = {
        1: '(max-width: 768px) 100vw, 700px',
        2: '(max-width: 768px) 100vw, 40vw',
        3: '(max-width: 768px) 100vw, (max-width: 1024px) 40vw, 30vw',
        4: '(max-width: 768px) 100vw, (max-width: 1024px) 30vw, 20vw',
    };
    return (
        <div
            className={`${
                num > 1 && !fitwidth ? tw_line_overflow : ''
            } tw-grid tw-items-start tw-justify-center ${grid[num]}`}
        >
            {blocks.map(
                (
                    {
                        notionType,
                        content: { caption, type, external },
                    }: ToggleBlockType,
                    k
                ) => {
                    switch (notionType) {
                        case 'image':
                            return (
                                <ImageFrame
                                    key={`flex${k}`}
                                    elem={Line}
                                    maxwidth={false}
                                >
                                    <ImageNoWidth
                                        alt={caption[0]?.plain_text}
                                        sizes={grissizes[num]}
                                        type={type}
                                        external={external}
                                    ></ImageNoWidth>
                                </ImageFrame>
                            );
                            break;
                        case 'video':
                            return (
                                <ImageFrame
                                    key={`flex${k}`}
                                    elem={Line}
                                    maxwidth={false}
                                >
                                    <VideoFrame
                                        data={{
                                            external,
                                        }}
                                    ></VideoFrame>
                                </ImageFrame>
                            );
                            break;
                        default:
                            return <></>;
                    }
                }
            )}
        </div>
    );
}

function FitWidthNotion({ blocks }: { blocks: [] }) {
    return blocks.map(
        (
            {
                notionType,
                content: { caption, type, external },
            }: ToggleBlockType,
            k
        ) => (
            <ImageFrame key={`flex${k}`} elem={Line} maxwidth={false}>
                {(() => {
                    switch (notionType) {
                        case 'image':
                            return (
                                <ImageNoWidth
                                    alt={caption[0]?.plain_text}
                                    sizes={notmaxszs}
                                    type={type}
                                    external={external}
                                ></ImageNoWidth>
                            );
                            break;
                        case 'video':
                            return (
                                <VideoFrame
                                    data={{
                                        external,
                                    }}
                                ></VideoFrame>
                            );
                            break;
                        default:
                            return <div>Somethings wrong</div>;
                    }
                })()}
            </ImageFrame>
        )
    );
}

function TogetherNotion({ blocks }: { blocks: [] }) {
    return (
        <ImageFrame elem={Line} maxwidth={false}>
            <div>
                {blocks.map(
                    (
                        {
                            notionType,
                            content: { caption, type, external },
                        }: ToggleBlockType,
                        k
                    ) => {
                        switch (notionType) {
                            case 'image':
                                return (
                                    <ImageNoWidth
                                        alt={caption[0]?.plain_text}
                                        sizes={notmaxszs}
                                        type={type}
                                        external={external}
                                    ></ImageNoWidth>
                                );
                                break;
                            case 'video':
                                return <div>Somethings wrong</div>;
                                break;
                            default:
                                return <div>Somethings wrong</div>;
                        }
                    }
                )}
            </div>
        </ImageFrame>
    );
}

export function CodeNotion(block: any) {
    const {
        block: {
            content: { text },
        },
    }: {
        block: {
            content: { text: [] };
        };
    } = block;
    return (
        <ImageFrame elem={LineLooser} maxwidth={false}>
            <div
                className={`tw-p-4 ${tw_border_white_04} [&_*]:tw-font-mono [&_*]:tw-text-[0.9em]`}
            >
                {text.map(
                    (
                        {
                            plain_text,
                        }: {
                            plain_text: String;
                        },
                        k
                    ) => {
                        return (
                            <div key={k}>
                                {plain_text.split('\n').map((str, k) => {
                                    return (
                                        <p key={k}>
                                            {str.split(` `).map((str, k) => {
                                                if (str == '')
                                                    return (
                                                        <Fragment key={k}>
                                                            &nbsp;&nbsp;
                                                        </Fragment>
                                                    );
                                                return (
                                                    <Fragment key={k}>
                                                        {str}
                                                        {` `}
                                                    </Fragment>
                                                );
                                            })}
                                        </p>
                                    );
                                })}
                            </div>
                        );
                    }
                )}
            </div>
        </ImageFrame>
    );
}

export function CalloutNotion(block: any) {
    const {
        block: { items },
    }: {
        block: {
            items: [];
        };
    } = block;
    return (
        <ImageFrame elem={LineLooser} maxwidth={false}>
            <div className={`tw-p-4 ${tw_border_white_04}`}>
                {items.map(
                    ({ content: { text } }: { content: { text: [] } }, k) => {
                        const txtarr = text.map(({ plain_text }) => plain_text);
                        return (
                            <p
                                className={
                                    txtarr.length == 0 ? 'rnr-empty-block' : ''
                                }
                                key={`${k}txt`}
                            >
                                {txtarr}
                            </p>
                        );
                    }
                )}
            </div>
        </ImageFrame>
    );
}

export function QuotetNotion(block: any) {
    const {
        block: {
            content: { text },
        },
    }: {
        block: {
            content: { text: [] };
        };
    } = block;
    return (
        <ImageFrame
            top={false}
            right={false}
            bottom={false}
            topright={false}
            botright={false}
            elem={LineLooser}
            maxwidth={false}
        >
            <p
                className={`tw-p-4 ${tw_border_white_04} tw-border-t-0 tw-border-r-0 tw-border-b-0`}
            >
                {text.map(
                    (
                        {
                            plain_text,
                            annotations: {
                                bold,
                                italic,
                                strikethrough,
                                underline,
                            },
                        },
                        k
                    ) => {
                        if (bold) return <strong key={k}>{plain_text}</strong>;
                        if (italic)
                            return (
                                <em className="rnr-italic" key={k}>
                                    {plain_text}
                                </em>
                            );
                        return <span key={k}>{plain_text}</span>;
                    }
                )}
            </p>
        </ImageFrame>
    );
}
