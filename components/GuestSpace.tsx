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
        '!tw-bg-red-500',
        '!tw-bg-green-500',
        '!tw-bg-pink-500',
        '!tw-bg-purple-500',
        '!tw-bg-fuchsia-500',
        '!tw-bg-orange-500',
        '!tw-bg-amber-500',
        '!tw-bg-emerald-500',
        '!tw-bg-teal-500',
        '!tw-bg-cyan-500',
        '!tw-bg-sky-500',
        '!tw-bg-violet-500',
        '!tw-bg-indigo-500',
        '!tw-bg-rose-500',
    ];
    //feed = feed.concat(useRetrieveGuest());
    return (
        <div
            className={`${scultpclass} tw-fixed translayer preserve3d tw-pointer-events-none`}
        >
            {feed.length == 0 && (
                <SculpturePiece
                    index={0}
                    left={50}
                    top={50}
                    className={`tw-transform -tw-translate-x-1/2 -tw-translate-y-1/2 tw-shadow-glow reveal_ani occupied ${RandomItemFromArr(
                        colorlist
                    )}`}
                >
                    Something is wrong... Please try again in a minute!
                </SculpturePiece>
            )}
            {Array.from(
                { length: feed.length > 70 ? feed.length : 70 },
                (_, i) => {
                    const [x, y] = spiralGen(i * 1.5, 5, 30, 40);
                    const isRecent =
                        Boolean(feed?.[i]) &&
                        new Date().getTime() -
                            new Date(feed?.[i]?.createdAt).getTime() <=
                            2 * 3600000;
                    return (
                        <Fragment key={`${i}sculpt`}>
                            <SculpturePiece
                                index={i}
                                left={x}
                                top={y}
                            ></SculpturePiece>
                            <SculpturePiece
                                index={i}
                                isOccupied
                                className={`${
                                    feed?.[i]
                                        ? `occupied ${
                                              isRecent
                                                  ? `${RandomItemFromArr(
                                                        colorlist
                                                    )} tw-shadow-glow reveal_ani`
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
