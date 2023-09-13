'use client';

export type DataItem = {
    name: string;
    date: string;
    field: {
        name: string;
        class: string;
    }[];
    description: string;
    soon: boolean;
    key_?: string;
};

const gotourl = (i: number) => {
    window.open(`http://vanghoa.github.io/#${i + 1}`);
};

export default function FirstWebsiteTab({ data }: { data: DataItem[] }) {
    return data.map((item: DataItem, key: number) => {
        let key_ = item.key_ ?? +key + 1;
        return (
            <li
                key={key}
                className={
                    (item.soon ? 'soon' : '') +
                    (+key == 0 ? ' current' : '') +
                    ' tw-hidden tw-pointer-events-auto tw-cursor-pointer'
                }
                id={`_${+key + 1}`}
                data-id_={key_}
                onClick={() => gotourl(key)}
            >
                <div className="text">
                    <h2>
                        <span>{item.name}</span>
                        {` `}
                        <span className="date">{item.date}</span>
                    </h2>
                    <p className="field">
                        {item.field.map((a, i) => (
                            <span
                                key={`${i}field`}
                                className={`field ${a.class}`}
                            >
                                {a.name}
                                {` `}
                            </span>
                        ))}
                    </p>
                    <p>{item.description}</p>
                </div>
                <div
                    className={`hovercontent${
                        item.soon
                            ? ''
                            : ` bg-[url('/base/thumbnail/${key_}.jpg')]`
                    }`}
                    data-src={item.soon ? false : `${key_}`}
                ></div>
            </li>
        );
    });
}

export function FirstWebsiteSneak({ data }: { data: DataItem[] }) {
    return data.map((item: DataItem, key: number) => {
        let key_ = item.key_ ?? +key + 1;
        return !item.soon ? (
            <li
                key={key + 'sneakpeek'}
                className="tw-pointer-events-auto tw-cursor-pointer"
            >
                <div onClick={() => gotourl(key)}>
                    <img
                        src={`/base/thumbnail/home/${key_}.jpg`}
                        alt={item.name}
                        className="tw-mb-2"
                    />
                    <h2>
                        <span>{`${+key + 1}/ ${item.name}`}</span>
                        {` `}
                        <span className="date">{item.date}</span>
                    </h2>
                </div>
            </li>
        ) : (
            ''
        );
    });
}
