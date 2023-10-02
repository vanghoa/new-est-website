import { ReactNode, Suspense } from 'react';
import { ImageFrame } from './SmallComponents';
import { LineVariale } from './Line';

function SuspenseFallback() {
    return (
        <ImageFrame
            elem={({ className }) => (
                <LineVariale
                    className={className}
                    variable="Wait a bit"
                ></LineVariale>
            )}
            className="tw-mt-16"
        >
            <div className="tw-w-full tw-h-[calc(100vh-20rem)] tw-flex tw-justify-center tw-items-center">
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
