import { BlogPost } from '@/types/types';
import { Fragment } from 'react';

export function TagArr({ item }: { item: BlogPost }) {
    return item['big tag'] && item['small tag'] ? (
        <>
            <span>{item.blurb}</span>
            <p>
                {item['big tag'].map((tag, i) => (
                    <Fragment key={`bigtag${i}`}>
                        <em className="tw-inline-block tw-mx-2">{tag}</em>|
                    </Fragment>
                ))}
                {item['small tag']
                    .slice(0, 7 - item['big tag'].length)
                    .map((tag, i, arr) => (
                        <Fragment key={`smalltag${i}`}>
                            <em className="tw-inline-block tw-mx-2">{tag}</em>
                            {arr?.[i + 1] && '|'}
                        </Fragment>
                    ))}
                {item['big tag'].length + item['small tag'].length > 7 ? (
                    <>
                        | <em className="tw-inline-block tw-mx-2">...</em>
                    </>
                ) : (
                    ''
                )}
            </p>
        </>
    ) : (
        <>bip</>
    );
}
