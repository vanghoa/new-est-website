import { LineVariale } from '@/components/Line';
import { ImageFrame } from '@/components/SmallComponents';
import { tw_border_white_04 } from '@/components/TailwindClass';

export default function NotFound() {
    return (
        <ImageFrame
            elem={({ className }) => (
                <LineVariale
                    className={className}
                    variable="page not found :(("
                ></LineVariale>
            )}
            className="tw-mt-16 suspense"
        >
            <div
                className={`tw-w-full tw-h-[calc(100vh-20rem)] tw-flex tw-justify-center tw-items-center ${tw_border_white_04}`}
            >
                page not found...
            </div>
        </ImageFrame>
    );
}
