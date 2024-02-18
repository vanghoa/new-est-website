import { LineVariale } from '@/components/Line';
import { ImageFrame } from '@/components/SmallComponents';
import { tw_border_white_04 } from '@/components/TailwindClass';
import Link from 'next/link';

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
                className={`tw-w-full tw-h-[calc(100vh-20rem)] tw-flex tw-flex-col tw-justify-center tw-items-center ${tw_border_white_04}`}
            >
                <article className="tw-w-fit preserve3d">
                    <a href="https://baoanhpro.vip">
                        <p className="tw-w-full tw-flex tw-justify-center">
                            ___
                        </p>
                        <p className="tw-w-full tw-flex tw-justify-center">
                            _______//
                            <span className="!tw-text-transparent selection:!tw-text-white tw-inline-block tw-w-1"></span>
                            _____
                            <span className="!tw-text-transparent selection:!tw-text-white tw-inline-block tw-w-1"></span>
                            \\_______
                        </p>
                        <p className="tw-w-full tw-flex tw-justify-around">
                            <span>/</span>
                            <span className="!tw-text-transparent selection:!tw-text-white">
                                ___
                            </span>
                            <span>{`page not found`}</span>
                            <span className="!tw-text-transparent selection:!tw-text-white">
                                ___
                            </span>
                            <span>\</span>
                        </p>
                        <p className="tw-w-full preserve3d tw-flex tw-justify-around">
                            <span>{`|`}</span>
                            <span className="!tw-text-transparent selection:!tw-text-white">
                                ____________
                            </span>
                            <span className=" tw-transform tw-rotate-180">
                                {`^`}
                            </span>
                            <span className="!tw-text-transparent selection:!tw-text-white">
                                ____________
                            </span>
                            <span>{`|`}</span>
                        </p>
                        <p className="tw-w-full tw-flex tw-gap-2 tw-justify-around">
                            <span>\</span>
                            <span>{` >`}</span>
                            <span className="">{`back to home`}</span>
                            <span>{`< `}</span>
                            <span>/</span>
                        </p>
                        <p className="tw-w-full tw-flex tw-justify-center">
                            <span style={{ transform: 'rotate(-25deg)' }}>
                                \
                            </span>
                            <span className="tw-mx-3">________^________</span>
                            <span style={{ transform: 'rotate(25deg)' }}>
                                /
                            </span>
                        </p>
                    </a>
                </article>
            </div>
        </ImageFrame>
    );
}
