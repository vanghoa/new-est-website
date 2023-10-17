'use client';
import LazyLoad from 'react-lazy-load';

export function VideoFrame({ data }: { data: any }) {
    return (
        <div
            className="tw-w-full tw-max-h-[calc(100vh-10rem)]"
            style={{
                aspectRatio: `${data.external?.dim?.width ?? 0} / ${
                    data.external?.dim?.height ?? 0
                }`,
            }}
        >
            <LazyLoad className="tw-h-full" offset={300}>
                <iframe
                    id="landingvideo"
                    className="tw-w-full tw-h-full"
                    src={data.external?.url}
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                ></iframe>
            </LazyLoad>
        </div>
    );
}
