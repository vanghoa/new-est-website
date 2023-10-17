import { ReactNode, Suspense } from 'react';
import { ImageFrame } from './SmallComponents';
import { LineVariale } from './Line';
import { tw_border_white_04 } from './TailwindClass';

function SuspenseFallback() {
    return (
        <ImageFrame
            elem={({ className }) => (
                <LineVariale
                    className={className}
                    variable="Wait a bit"
                ></LineVariale>
            )}
            className="tw-mt-16 suspense"
        >
            <div
                className={`tw-w-full tw-h-[calc(100vh-20rem)] tw-flex tw-justify-center tw-items-center ${tw_border_white_04}`}
            >
                Waiting...
            </div>
        </ImageFrame>
    );
}

export function SuspenseNotion({ children }: { children: ReactNode }) {
    return (
        <Suspense fallback={<SuspenseFallback></SuspenseFallback>}>
            {children}
        </Suspense>
    );
}
