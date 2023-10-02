import { Line, LineLoose, LineLooser } from './Line';
import { tw_line_overflow, tw_divider } from './TailwindClass';

export default function Footer() {
    return (
        <>
            <LineLooser
                className={`${tw_line_overflow} tw-mt-[20vh] md:tw-mt-[25vh]`}
            ></LineLooser>
            <section
                className={`tw-w-full tw-mt-6 tw-mb-8 [&_:is(span,a)]:tw-underline`}
            >
                Site is built upon{' '}
                <a href="https://github.com/9gustin/react-notion-render">
                    react-notion-render
                </a>{' '}
                by @9gustin and{' '}
                <a href="https://github.com/guillermodlpa/upload-notion-images-to-cloudinary">
                    upload-notion-images-to-cloudinary
                </a>{' '}
                by @guillermodlpa for taking care of the data from Notion API to
                rendering. Other dependencies include <span>React</span>,{' '}
                <span>Next</span>, <span>Typescript</span>,{' '}
                <span>Prisma + PostgreSQL</span>, <span>Framer Motion</span>,{' '}
                <span>Tailwind CSS</span>, <span>probe-image-size</span>,{' '}
                <span>seedrandom</span>,...
            </section>
        </>
    );
}
