import { _useFixedRandomWSeed } from '@/hooks/fixedRandom';
import { ReactNode } from 'react';

export const SculpturePiece = ({
    style = {},
    min = 0,
    max = 100,
    left,
    top,
    children = '',
    className = '',
    index,
    isOccupied,
}: {
    style?: React.CSSProperties;
    left?: number;
    top?: number;
    min?: number;
    max?: number;
    children?: ReactNode;
    className?: string;
    index: number;
    isOccupied?: boolean;
}) => {
    if (!left || !top) {
        _useFixedRandomWSeed(index);
        left = Math.floor(Math.random() * (max - min) + min);
        top = Math.floor(Math.random() * (max - min) + min);
    }

    return (
        <div
            suppressHydrationWarning
            style={{
                left: `${left}%`,
                top: `${top}%`,
                ...(isOccupied
                    ? {
                          transform: `translateY(${-top}%) translateX(${-left}%)`,
                      }
                    : {}),
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

function scale(
    number: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
) {
    return ((number - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}
