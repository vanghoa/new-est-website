'use client';

import React, { Fragment, ReactNode } from 'react';
import { scultpclass } from './TailwindClass';
import { GuestBook } from '@prisma/client';
import { useRetrieveGuest } from './GuestBookContext';
import { spiralGen, SculpturePiece } from './SculptureConstruct';

export default function GuestSpace({ feed }: { feed: GuestBook[] }) {
    feed = feed.concat(useRetrieveGuest());
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
                            <SculpturePiece left={x} top={y}></SculpturePiece>
                            <SculpturePiece
                                className={`${feed?.[i] ? '!tw-bg-black' : ''}`}
                            >
                                {feed?.[i] ? `< ${feed?.[i]?.name} >` : ''}
                            </SculpturePiece>
                        </Fragment>
                    );
                }
            )}
        </div>
    );
}
