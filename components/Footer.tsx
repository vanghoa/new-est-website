import { Line, LineLoose, LineLooser, LineSpikeLoose } from './Line';
import { ImageFrame } from './SmallComponents';
import {
    tw_line_overflow,
    tw_divider,
    tw_border_white_04,
} from './TailwindClass';

export default function Footer() {
    return (
        <>
            <ImageFrame
                elem={LineSpikeLoose}
                className="tw-mt-[20vh] md:tw-mt-[25vh] tw-mb-[10vh] tw-opacity-60"
            >
                <section
                    className={`tw-w-full tw-p-4 [&_:is(span,a)]:tw-underline tw-flex tw-flex-col tw-gap-4 ${tw_border_white_04}`}
                >
                    <p>
                        <FooterText></FooterText>
                    </p>
                    <p>
                        Typeface is <span>Alegreya</span> designed by Juan Pablo
                        del Peral, Huerta Tipográfica. Mono typeface is{' '}
                        <span>Select Mono</span> designed by MICHAEL McMASTER.
                    </p>
                    <p>
                        The idea of the site can be observed via the{' '}
                        <span>3D View</span> of the developer tool of Microsoft
                        Edge.
                    </p>
                </section>
            </ImageFrame>
        </>
    );
}

export function FooterText() {
    return (
        <>
            Site is built on <span>Next.js</span> with <span>Tailwind CSS</span>
            . CMS is from <span>Notion API</span> with{' '}
            <a
                target="_blank"
                href="https://github.com/9gustin/react-notion-render"
            >
                react-notion-render
            </a>{' '}
            by @9gustin for data rendering and{' '}
            <a
                target="_blank"
                href="https://github.com/guillermodlpa/upload-notion-images-to-cloudinary"
            >
                upload-notion-images-to-cloudinary
            </a>{' '}
            by @guillermodlpa for hosting images form Notion to Cloudinary. You
            can view the database on Notion here{' '}
            <a
                target="_blank"
                href="https://prickle-robe-9ad.notion.site/B-o-Anh-s-personal-website-database-74c4132872904ed9855e05567cb116c3"
            >
                notion link
            </a>
            {'. '}
            Other dependencies include <span>Prisma + PostgreSQL</span>,{' '}
            <span>Framer Motion</span>, <span>probe-image-size</span>,{' '}
            <span>seedrandom</span>, <span>react-lazy-load</span>, ... See the
            Github repository of the site here{' '}
            <a
                target="_blank"
                href="https://github.com/vanghoa/new-est-website"
            >
                github link
            </a>
            .
        </>
    );
}
