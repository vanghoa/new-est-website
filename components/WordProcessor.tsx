import React, { ComponentPropsWithoutRef } from 'react';
import Link, { LinkProps } from 'next/link';
import useFixedRandom from '@/hooks/fixedRandom';

type WordProcessor = {
    children: React.ReactNode;
    isLink?: boolean;
    rest?: any; //LinkProps & ComponentPropsWithoutRef<any>
    elem?: string | React.FC<any>;
    className?: string;
    min?: number;
};

const W = (children: string) =>
    children
        .split(` `)
        .map((vl, i, arr) => (
            <span key={vl + i}>{vl + (i == arr.length - 1 ? '' : ` `)}</span>
        ));

const C = (children: string) =>
    children
        .split(``)
        .map((vl, i) => <span key={vl + i}>{vl == ` ` ? '\u00A0' : vl}</span>);

const R = (children: string, min: number = 1) => {
    const characters = children.split('');
    const result = [];

    while (characters.length > 0) {
        const chunkSize =
            Math.floor(Math.random() * (characters.length - min + 1)) + min;
        result.push(characters.splice(0, chunkSize).join(''));
    }

    return result.map((vl, i) => <span key={vl + i}>{vl}</span>);
};

const H = (children: string, n: number = 2) => {
    if (children.includes(` `)) return W(children);
    const stringLength = children.length;
    const partSize = Math.ceil(stringLength / n);
    const result = [];

    for (let i = 0; i < stringLength; i += partSize) {
        result.push(
            <span key={children + i}>{children.slice(i, i + partSize)}</span>
        );
    }
    return result;
};

const Mid = ({
    children,
    isLink = false,
    rest,
    elem: Element = 'div',
    className = '',
    min,
    func,
}: WordProcessor & {
    func: (children: string, min?: number) => React.JSX.Element[];
}) => {
    useFixedRandom();
    const children_ = React.Children.map(children, (child) => {
        if (typeof child === 'string') {
            return func(child, min);
        }
        return child;
    });
    className = className + ' preserve3d';
    if (isLink && rest) {
        return (
            <Link {...rest} className={className}>
                {children_}
            </Link>
        );
    }

    return (
        <Element {...rest} className={className}>
            {children_}
        </Element>
    );
};

export const Char = ({
    children,
    isLink = false,
    rest,
    elem = 'div',
    className = '',
}: WordProcessor) => (
    <Mid isLink={isLink} rest={rest} elem={elem} className={className} func={C}>
        {children}
    </Mid>
);

export const Word = ({
    children,
    isLink = false,
    rest,
    elem = 'div',
    className = '',
}: WordProcessor) => (
    <Mid isLink={isLink} rest={rest} elem={elem} className={className} func={W}>
        {children}
    </Mid>
);

export const Rand = ({
    children,
    isLink = false,
    rest,
    elem = 'div',
    className = '',
    min = 1,
}: WordProcessor & { min?: number }) => (
    <Mid
        isLink={isLink}
        rest={rest}
        elem={elem}
        className={className}
        min={min}
        func={R}
    >
        {children}
    </Mid>
);

export const Half = ({
    children,
    isLink = false,
    rest,
    elem = 'div',
    className = '',
    min = 2,
}: WordProcessor & { min?: number }) => (
    <Mid
        isLink={isLink}
        rest={rest}
        elem={elem}
        className={className}
        min={min}
        func={H}
    >
        {children}
    </Mid>
);
