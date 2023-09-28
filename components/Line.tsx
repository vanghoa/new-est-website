import { ReactNode } from 'react';

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
            {`-----------------${variable}---------------`}
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

export function LineConstruct({
    className = '',
    children,
    ...props
}: {
    className?: string;
    children: ReactNode;
}) {
    return (
        <p
            className={`${className} tw-whitespace-normal tw-break-words tw-break-all tw-text-center tw-h-4 tw-overflow-hidden first-line:!tw-leading-[1em] tw-mx-auto`}
            {...props}
        >
            {Array.from({ length: 20 }, () => children).join('')}
        </p>
    );
}
