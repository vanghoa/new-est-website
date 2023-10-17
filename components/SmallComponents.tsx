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
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <header
            className={`[&>h1]:tw-mb-[5vh] md:[&>h1]:tw-mb-[10vh] tw-mt-[10vh] ${tw_divider} ${className}`}
        >
            {children}
        </header>
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
}) {
    const r = () => Math.random() > 0.5;
    const c = () =>
        `${r() ? 'tw-whitespace-nowrap' : ''} ${
            r() ? '[writing-mode:vertical-lr]' : ''
        } ${r() ? '[direction:rtl]' : ''}`;
    return (
        <div
            className={`${className} ${
                maxwidth ? 'rnr-image' : ''
            } tw-w-full tw-grid tw-grid-cols-[min-content_auto_min-content] tw-grid-rows-[min-content_auto_min-content] [&>*:last-child]:tw-col-[2/3] [&>*:last-child]:tw-row-[2/3] tw-overflow-visible`}
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
                    {RandomItemFromArr(['@', '[+]', '-/\\', '(&)'])}
                </p>
            )}
            {botleft && (
                <p
                    suppressHydrationWarning
                    className={`!tw-leading-[1em] tw-text-center tw-col-[1] tw-row-[3] ${c()}`}
                >
                    {RandomItemFromArr(['@', '[=]', '-/\\', '(%)'])}
                </p>
            )}
            {topright && (
                <p
                    suppressHydrationWarning
                    className={`!tw-leading-[1em] tw-text-center tw-col-[3] tw-row-[1] ${c()}`}
                >
                    {RandomItemFromArr(['@', '[!]', '-/\\', '($)'])}
                </p>
            )}
            {botright && (
                <p
                    suppressHydrationWarning
                    className={`!tw-leading-[1em] tw-text-center tw-col-[3] tw-row-[3] ${c()}`}
                >
                    {RandomItemFromArr(['@', '[*]', '-/\\', '(#)'])}
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
                alt={
                    (data.caption[0]?.plain_text ?? 'alt missing') +
                    ` - ${altsuffix ?? 'Bao Anh Bui website'}`
                }
                src={data?.external?.url}
                sizes={maxszs}
                type={data.type}
            ></ImageNoWidth>
        </ImageFrame>
    );
}

export const H1Notion = ({ plainText }: { plainText: string }) => {
    return <h2 className="rnr-heading_2">{plainText}</h2>;
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
}: {
    alt: string;
    src: string;
    sizes: string;
    divclass?: string;
    type: string;
}) {
    return (
        <div className={`tw-h-auto tw-w-full ${divclass}`}>
            {type == 'external' ? (
                <Image
                    alt={alt}
                    src={src}
                    quality={100}
                    width={0}
                    height={0}
                    sizes={sizes}
                    className={`tw-h-auto tw-w-full ${divclass}`}
                ></Image>
            ) : (
                <div className={`tw-h-auto tw-w-full ${divclass}`}>
                    Internal image
                </div>
            )}
        </div>
    );
}

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
        blogPost.coverImg &&
        (blogPost.coverImg.type == 'external' ? (
            <Image
                alt={blogPost.title + ' Cover Photo'}
                src={blogPost?.coverImg?.url}
                sizes={sizes}
                quality={100}
                fill={true}
                className={`tw-object-cover tw-w-full tw-h-full ${className}`}
            ></Image>
        ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                alt={blogPost.title + ' Cover Photo'}
                src={blogPost?.coverImg?.url}
                className={`tw-object-cover tw-w-full tw-h-full ${className}`}
            ></img>
        ))
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
