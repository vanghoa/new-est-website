import React, { ReactNode } from 'react';
import { scultpclass } from './TailwindClass';
import prisma from '../lib/prisma';

export const SculpturePiece = ({
    style = {},
    min = 0,
    max = 100,
    left = Math.random() * (max - min) + min,
    top = Math.random() * (max - min) + min,
    children = '',
    className = '',
}: {
    style?: React.CSSProperties;
    left?: number;
    top?: number;
    min?: number;
    max?: number;
    children?: ReactNode;
    className?: string;
}) => {
    return (
        <div
            style={{
                left: `${Math.floor(left)}%`,
                top: `${Math.floor(top)}%`,
                ...style,
            }}
            className={className}
        >
            {children}
        </div>
    );
};

export const spiralGen = (
    i: number,
    cycle: number,
    minr: number,
    maxr: number,
    cen: number[] = [50, 50]
) => {
    const radians = (i / 10) * Math.PI;
    const angularDisplacement = 180 / cycle;
    const phaseShift = (i / angularDisplacement) * Math.PI;
    const radius = minr + (maxr - minr) * Math.sin(phaseShift);
    return [
        cen[0] + radius * Math.cos(radians),
        cen[1] + radius * Math.sin(radians),
    ];
};

export default async function GuestSpace() {
    const feed = await prisma.guestBook.findMany();
    return (
        feed && (
            <div
                className={`${scultpclass} tw-fixed translayer preserve3d tw-pointer-events-none`}
            >
                {Array.from(
                    { length: feed.length > 70 ? feed.length : 70 },
                    (_, i) => {
                        const [x, y] = spiralGen(i * 1.5, 5, 30, 40);
                        return (
                            <>
                                <SculpturePiece
                                    key={`${i}sculpt`}
                                    left={x}
                                    top={y}
                                ></SculpturePiece>
                                <SculpturePiece
                                    key={`${i}sculpt_ran`}
                                    className={`${
                                        feed?.[i] ? '!tw-bg-black' : ''
                                    }`}
                                >
                                    {feed?.[i] ? `< ${feed?.[i]?.name} >` : ''}
                                </SculpturePiece>
                            </>
                        );
                    }
                )}
            </div>
        )
    );
}
