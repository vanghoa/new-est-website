import { Line, LineLoose, LineLooser, LineSpikeLoose } from './Line';
import { ImageFrame } from './SmallComponents';
import { tw_line_overflow, tw_divider } from './TailwindClass';

export default function Footer() {
    return (
        <>
            <ImageFrame
                elem={LineSpikeLoose}
                className="tw-mt-[20vh] md:tw-mt-[25vh] tw-mb-[10vh] tw-opacity-60"
            >
                <section
                    className={`tw-w-full tw-p-4 [&_:is(span,a)]:tw-underline tw-flex tw-flex-col tw-gap-4`}
                >
                    <p>
                        Site is built on <span>Next.js</span> with{' '}
                        <span>Tailwind CSS</span>. CMS is from{' '}
                        <span>Notion API</span> with{' '}
                        <a href="https://github.com/9gustin/react-notion-render">
                            react-notion-render
                        </a>{' '}
                        by @9gustin for data rendering and{' '}
                        <a href="https://github.com/guillermodlpa/upload-notion-images-to-cloudinary">
                            upload-notion-images-to-cloudinary
                        </a>{' '}
                        by @guillermodlpa for hosting images form Notion to
                        Cloudinary. Other dependencies include{' '}
                        <span>Prisma + PostgreSQL</span>,{' '}
                        <span>Framer Motion</span>,{' '}
                        <span>probe-image-size</span>, <span>seedrandom</span>,
                        ...
                    </p>
                    <p>
                        Typeface is <span>Alegreya</span> designed by Juan Pablo
                        del Peral, Huerta Tipográfica. The idea of the site is
                        based on the <span>3D View</span> of the developer tool
                        of Microsoft Edge.
                    </p>
                </section>
            </ImageFrame>
        </>
    );
}
