'use client';

import React, { Fragment, ReactNode } from 'react';
import { scultpclass } from './TailwindClass';
import { GuestBook } from '@prisma/client';
//import { useRetrieveGuest } from './GuestBookContext';
import { spiralGen, SculpturePiece } from './SculptureConstruct';
import useFixedRandom from '@/hooks/fixedRandom';
import RandomItemFromArr from '@/utils/RandomItemFromAnArray';

export default function GuestSpace({ feed }: { feed: GuestBook[] }) {
    useFixedRandom();
    const colorlist = [
        '!tw-bg-black',
        '!tw-bg-red-900',
        '!tw-bg-green-900',
        '!tw-bg-blue-900',
        '!tw-bg-pink-900',
        '!tw-bg-purple-900',
        '!tw-bg-yellow-900',
    ];
    //feed = feed.concat(useRetrieveGuest());
    return (
        <div
            className={`${scultpclass} tw-fixed translayer preserve3d tw-pointer-events-none`}
        >
            {Array.from(
                { length: feed.length > 70 ? feed.length : 70 },
                (_, i) => {
                    const [x, y] = spiralGen(i * 1.5, 5, 30, 40);
                    return (
                        <Fragment key={`${i}sculpt`}>
                            <SculpturePiece
                                index={i}
                                left={x}
                                top={y}
                            ></SculpturePiece>
                            <SculpturePiece
                                index={i}
                                className={`${
                                    feed?.[i]
                                        ? `occupied ${
                                              i == feed.length - 1 &&
                                              new Date().getTime() -
                                                  new Date(
                                                      feed?.[i]?.createdAt
                                                  ).getTime() <=
                                                  24 * 3600000
                                                  ? '!tw-bg-pink-500 !tw-left-[50%] !tw-top-[50%] tw-transform tw-translate-x-[-50%] tw-translate-y-[-50%] tw-drop-shadow-glow'
                                                  : ''
                                          }`
                                        : ''
                                }`}
                            >
                                {feed?.[i] ? `${feed?.[i]?.name}` : ''}
                            </SculpturePiece>
                        </Fragment>
                    );
                }
            )}
        </div>
    );
}
