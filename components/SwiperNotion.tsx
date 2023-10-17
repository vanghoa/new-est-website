'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ImageFrame, ImageNoWidth } from './SmallComponents';
import { Line } from './Line';
import { notmaxszs } from './ImageSizes';

export default function SwiperNotion({ blocks }: { blocks: [] }) {
    return (
        <ImageFrame elem={Line} maxwidth={false}>
            <Swiper
                navigation={true}
                modules={[Navigation]}
                className="mySwiper tw-w-full !tw-overflow-hidden"
            >
                {blocks.map(
                    (
                        {
                            notionType,
                            content: {
                                caption,
                                type,
                                external: { url },
                            },
                        },
                        k
                    ) => {
                        return (
                            <SwiperSlide key={`${k}swipe`}>
                                {(() => {
                                    switch (notionType) {
                                        case 'image':
                                            return (
                                                <ImageNoWidth
                                                    alt={caption}
                                                    src={url}
                                                    sizes={notmaxszs}
                                                    type={type}
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
                            </SwiperSlide>
                        );
                    }
                )}
            </Swiper>
        </ImageFrame>
    );
}
