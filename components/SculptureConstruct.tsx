import { ReactNode } from 'react';

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
            suppressHydrationWarning
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
