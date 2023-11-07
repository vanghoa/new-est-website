import RandomItemFromArr from '@/utils/RandomItemFromAnArray';
import Image from 'next/image';
import { CSSProperties, ReactNode } from 'react';
import { Line } from './Line';
import { BlogPost } from '@/types/types';
import { tw_divider } from './TailwindClass';
import SwiperNotion from './SwiperNotion';
import { maxszs } from './ImageSizes';
import { VideoFrame } from './ClientComp';

export function Tooltips({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <div className={`tooltips group-hover:tw-block ${className}`}>
            {children}
        </div>
    );
}

export function HeaderLayout({
    children,
    className = '',
    elem: Element = 'header',
}: {
    children: ReactNode;
    className?: string;
    elem?: string | React.FC<any>;
}) {
    return (
        <Element
            className={`[&>h1]:tw-mb-[5vh] md:[&>h1]:tw-mb-[10vh] tw-mt-[10vh] ${tw_divider} ${className}`}
        >
            {children}
        </Element>
    );
}

export function ImageFrame({
    children,
    elem: Element,
    className = '',
    maxwidth = true,
    left = true,
    top = true,
    right = true,
    bottom = true,
    topleft = true,
    topright = true,
    botleft = true,
    botright = true,
    samecorner = false,
}: {
    children: ReactNode;
    elem: React.FC<any>;
    className?: string;
    maxwidth?: boolean;
    left?: boolean;
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    topleft?: boolean;
    topright?: boolean;
    botleft?: boolean;
    botright?: boolean;
    samecorner?: boolean;
}) {
    const r = () => Math.random() > 0.5;
    const c = () =>
        `${r() ? 'tw-whitespace-nowrap' : ''} ${
            r() ? '[writing-mode:vertical-lr]' : ''
        } ${r() ? '[direction:rtl]' : ''}`;
    const same = '@';
    return (
        <div
            className={`${className} ${
                maxwidth ? 'rnr-image' : ''
            } tw-w-full tw-grid tw-grid-cols-[max-content_auto_max-content] tw-grid-rows-[max-content_auto_max-content] [&>*:last-child]:tw-col-[2/3] [&>*:last-child]:tw-row-[2/3] tw-overflow-visible`}
        >
            {top && (
                <Element className="tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] [direction:rtl] tw-absolute"></Element>
            )}
            {bottom && (
                <Element className="tw-w-full tw-h-full tw-col-[2/3] tw-row-[3/4] tw-transform tw-rotate-180 tw-absolute"></Element>
            )}
            {left && (
                <Element className="tw-w-full tw-h-full tw-col-[1/2] tw-row-[2/3] tw-absolute [writing-mode:vertical-lr] tw-transform tw-rotate-180"></Element>
            )}
            {right && (
                <Element className="tw-w-full tw-h-full tw-col-[3/4] tw-row-[2/3] tw-absolute [writing-mode:vertical-lr]"></Element>
            )}
            {topleft && (
                <p
                    suppressHydrationWarning
                    className={`!tw-leading-[1em] tw-text-center tw-col-[1] tw-row-[1] ${c()}`}
                >
                    {samecorner
                        ? same
                        : RandomItemFromArr(['@', '[+]', '-/\\', '(&)'])}
                </p>
            )}
            {botleft && (
                <p
                    suppressHydrationWarning
                    className={`!tw-leading-[1em] tw-text-center tw-col-[1] tw-row-[3] ${c()}`}
                >
                    {samecorner
                        ? same
                        : RandomItemFromArr(['@', '[=]', '-/\\', '(%)'])}
                </p>
            )}
            {topright && (
                <p
                    suppressHydrationWarning
                    className={`!tw-leading-[1em] tw-text-center tw-col-[3] tw-row-[1] ${c()}`}
                >
                    {samecorner
                        ? same
                        : RandomItemFromArr(['@', '[!]', '-/\\', '($)'])}
                </p>
            )}
            {botright && (
                <p
                    suppressHydrationWarning
                    className={`!tw-leading-[1em] tw-text-center tw-col-[3] tw-row-[3] ${c()}`}
                >
                    {samecorner
                        ? same
                        : RandomItemFromArr(['@', '[*]', '-/\\', '(#)'])}
                </p>
            )}
            {children}
        </div>
    );
}

export function ImageNotion(block: any, altsuffix: string | null) {
    const {
        block: { content: data },
    } = block;
    return (
        <ImageFrame
            elem={Line}
            className="tw-left-1/2 tw-transform tw-translate-x-[-50%]"
        >
            <ImageNoWidth
                alt={data.caption?.[0]?.plain_text}
                external={data.external}
                sizes={maxszs}
                type={data.type}
            ></ImageNoWidth>
        </ImageFrame>
    );
}

export const H1Notion = ({
    plainText,
    className = '',
}: {
    plainText: string;
    className?: string;
}) => {
    return <h2 className={`rnr-heading_2 ${className}`}>{plainText}</h2>;
};

export const H3Notion = ({ plainText }: { plainText: string }) => {
    return <h3 className="rnr-heading_3">{plainText}</h3>;
};

export function VideoNotion(block: any) {
    const {
        block: { content: data },
    } = block;
    return (
        <ImageFrame
            elem={Line}
            className="tw-left-1/2 tw-transform tw-translate-x-[-50%]"
        >
            <VideoFrame data={data}></VideoFrame>
        </ImageFrame>
    );
}

export function ImageNoWidth({
    alt,
    src,
    sizes,
    divclass = '',
    type,
    external,
}: {
    alt: string | undefined | null;
    src?: string;
    sizes: string;
    divclass?: string;
    type: string;
    external?: {
        url: string;
        dim?: {
            width: number;
            height: number;
        };
    };
}) {
    if (!external) {
        if (!src) return <div>no source</div>;
        external = {
            url: src,
        };
    }

    return (
        <figure className={`tw-h-auto tw-w-full ${divclass}`}>
            <div className={`tw-h-auto tw-w-full ${divclass}`}>
                {type == 'external' ? (
                    <Image
                        alt={alt ?? 'no alt'}
                        src={external.url}
                        quality={100}
                        width={0}
                        height={0}
                        sizes={sizes}
                        style={{
                            aspectRatio: external.dim
                                ? `${external.dim.width} / ${external.dim.height}`
                                : 'unset',
                        }}
                        className={`tw-h-auto tw-w-full tw-z-10 ${divclass}`}
                    ></Image>
                ) : (
                    <div className={`tw-h-auto tw-w-full tw-z-10 ${divclass}`}>
                        Internal image
                    </div>
                )}
                <PlaceHolderImage external={external}></PlaceHolderImage>
            </div>
            {alt && (
                <figcaption className="tw-w-full tw-p-2 tw-text-center">
                    {alt}
                </figcaption>
            )}
        </figure>
    );
}

export const PlaceHolderImage = ({
    external,
}: {
    external?: {
        url: string;
        dim?: {
            width: number;
            height: number;
        };
        rotate?: number;
    };
}) => {
    if (external?.dim) {
        external.rotate =
            90 -
            Math.atan(external.dim.width / external.dim.height) *
                (180 / Math.PI);
    }
    return (
        <div className="group-hover:tw-hidden tw-h-full tw-w-full tw-overflow-hidden tw-absolute tw-left-0 tw-top-0">
            <div
                className="tw-origin-center tw-left-[50%] tw-top-[50%] tw-absolute"
                style={{
                    transform: `translate(-50%,-50%) rotate(${
                        external?.dim && external?.rotate
                            ? external.rotate
                            : '90'
                    }deg)`,
                }}
            >
                <Line></Line>
            </div>
            <div
                className="tw-origin-center tw-left-[50%] tw-top-[50%] tw-absolute"
                style={{
                    transform: `translate(-50%,-50%) rotate(${
                        external?.dim && external?.rotate
                            ? 180 - external.rotate
                            : '0'
                    }deg)`,
                }}
            >
                <Line></Line>
            </div>
        </div>
    );
};

export const CoverImage = ({
    blogPost,
    sizes,
    className = '',
}: {
    blogPost: BlogPost;
    sizes: string;
    className?: string;
}) => {
    return (
        <>
            {blogPost.coverImg &&
                (blogPost.coverImg.type == 'external' ? (
                    <Image
                        alt={blogPost.title + ' Cover Photo'}
                        src={blogPost?.coverImg?.url}
                        sizes={sizes}
                        quality={100}
                        fill={true}
                        className={`tw-object-cover tw-z-10 tw-w-full tw-h-full ${className}`}
                    ></Image>
                ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        alt={blogPost.title + ' Cover Photo'}
                        src={blogPost?.coverImg?.url}
                        className={`tw-object-cover tw-z-10 tw-w-full tw-h-full ${className}`}
                    ></img>
                ))}
            <PlaceHolderImage></PlaceHolderImage>
        </>
    );
};

export function OLOverlay() {
    return (
        <div
            className="tw-h-full tw-z-10 tw-w-full tw-absolute"
            style={{
                background:
                    'linear-gradient(to right, var(--background-color) 0%, transparent 10%, transparent 90%, var(--background-color) 100%), linear-gradient(to bottom, var(--background-color) 0%, transparent 10%, transparent 90%, var(--background-color) 100%)',
            }}
        ></div>
    );
}
