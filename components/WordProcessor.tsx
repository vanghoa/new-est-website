import React, { ComponentPropsWithoutRef } from 'react';
import Link, { LinkProps } from 'next/link';

type WordProcessor = {
    children: string;
    isLink?: boolean;
    rest?: LinkProps & ComponentPropsWithoutRef<any>;
    elem?: string | React.FC<any>;
    className?: string;
};

const W = (children: string) =>
    children
        .split(` `)
        .map((vl, i, arr) => (
            <span key={vl + i}>{vl + (i == arr.length - 1 ? '' : ` `)}</span>
        ));

const C = (children: string) =>
    children.split(``).map((vl, i) => <span key={vl + i}>{vl}</span>);

const R = (children: string) => {
    const characters = children.split('');
    const result = [];

    while (characters.length > 0) {
        const chunkSize = Math.floor(Math.random() * characters.length) + 1;
        result.push(characters.splice(0, chunkSize).join(''));
    }

    return result.map((vl, i) => <span key={vl + i}>{vl}</span>);
};

const Mid = ({
    children,
    isLink = false,
    rest,
    elem: Element = 'div',
    className = '',
    func,
}: WordProcessor & { func: (x: string) => React.JSX.Element[] }) => {
    const children_ = func(children);
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
}: WordProcessor) => (
    <Mid isLink={isLink} rest={rest} elem={elem} className={className} func={R}>
        {children}
    </Mid>
);
