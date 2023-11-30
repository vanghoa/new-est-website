'use client';
import LazyLoad from 'react-lazy-load';
import Player from '@vimeo/player';
import { useEffect, useRef, useState } from 'react';

export function VimeoLazy({ data }: { data: any }) {
    return (
        <LazyLoad
            className="tw-w-full tw-h-full tw-max-h-[calc(100vh-10rem)] tw-z-10"
            offset={300}
        >
            <Vimeo data={data} />
        </LazyLoad>
    );
}

function Vimeo({ data }: { data: any }) {
    const vimeoRef = useRef<HTMLIFrameElement | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (vimeoRef.current) {
            const player = new Player(vimeoRef.current);
            player.on('play', function () {
                setLoading(false);
                player.off('play');
            });
        }
    }, []);

    return (
        <>
            {loading && (
                <>
                    <div className="tw-animate-myspin tw-absolute tw-left-0 tw-right-0 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
                        @@
                        <span className="tw-inline-block tw-w-10"></span>
                        @@
                    </div>
                    <div className="tw-animate-myspin tw-absolute tw-left-0 tw-right-0 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center">
                        <span className="tw-transform tw-rotate-90">
                            @@
                            <span className="tw-inline-block tw-w-10"></span>
                            @@
                        </span>
                    </div>
                </>
            )}
            <iframe
                ref={vimeoRef}
                id="landingvideo"
                className="tw-w-full tw-h-full"
                src={data.external?.url}
                frameBorder="0"
                allow="autoplay; fullscreen"
            ></iframe>
        </>
    );
}
