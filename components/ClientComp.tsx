import { PlaceHolderImage } from './SmallComponents';
import { VimeoLazy } from './ClientVimeoPlayer';

export function VideoFrame({ data }: { data: any }) {
    return (
        <figure className="tw-w-full tw-h-auto">
            <div
                className="tw-w-full tw-max-h-[calc(100vh-10rem)]"
                style={{
                    aspectRatio: `${data.external?.dim?.width ?? 0} / ${
                        data.external?.dim?.height ?? 0
                    }`,
                }}
            >
                <VimeoLazy data={data} />
                <PlaceHolderImage external={data.external}></PlaceHolderImage>
            </div>
            {data.caption?.[0]?.plain_text && (
                <figcaption className="tw-w-full tw-p-2 tw-text-center">
                    {data.caption[0].plain_text}
                </figcaption>
            )}
        </figure>
    );
}
