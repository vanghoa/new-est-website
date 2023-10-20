import { ReactNode } from 'react';
import { tw_line_divider } from './TailwindClass';

export function Line({ className = '', ...props }: { className?: string }) {
    return (
        <LineConstruct className={className} {...props}>
            *--.--&apos;``&apos;-...__...-&apos;``&apos;--.--*
        </LineConstruct>
    );
}

export function LineVariale({
    className = '',
    variable,
    ...props
}: {
    variable: string;
    className?: string;
}) {
    return (
        <LineConstruct className={className} {...props}>
            {`--^~-----^~--${variable}-^~~--_---^~-`}
        </LineConstruct>
    );
}

export function LineLooser({
    className = '',
    ...props
}: {
    className?: string;
}) {
    return (
        <LineConstruct className={className} {...props}>
            ---~------~----~-----~~-------~-
        </LineConstruct>
    );
}

export function LineSpikeLoose({
    className = '',
    ...props
}: {
    className?: string;
}) {
    return (
        <LineConstruct className={className} {...props}>
            --^~-----^~--_-~----^~~--_---^~-
        </LineConstruct>
    );
}

export function LineLoose({
    className = '',
    ...props
}: {
    className?: string;
}) {
    return (
        <LineConstruct className={className} {...props}>
            *--&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;.--.&nbsp;&nbsp;&nbsp;&nbsp;._.&nbsp;&nbsp;&nbsp;&nbsp;.--.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;--*
        </LineConstruct>
    );
}

export function WelcomeLine({
    className = '',
    ...props
}: {
    className?: string;
}) {
    return (
        <LineConstruct className={`${className} ${tw_line_divider}`} {...props}>
            *--.-------------------;welcome-...to my
            site...-----------------;--.--*
        </LineConstruct>
    );
}

export function LineConstruct({
    className = '',
    children,
    ...props
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <p className={`${className} ${lineConstructClass}`} {...props}>
            {Array.from({ length: 20 }, () => children).join('')}
        </p>
    );
}

export const lineConstructClass =
    'tw-whitespace-nowrap tw-break-words tw-break-all tw-text-center tw-h-4 tw-overflow-hidden !tw-leading-[1em] tw-mx-auto';
