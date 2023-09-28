import AnimatePageComp from '@/components/AnimatePageComp';
import GuestBook from '@/components/GuestBook';
import { Line } from '@/components/Line';
import { HeaderLayout } from '@/components/SmallComponents';
import { tw_line_overflow } from '@/components/TailwindClass';
import { Word } from '@/components/WordProcessor';

export default function Home() {
    return (
        <AnimatePageComp>
            <HeaderLayout className="tw-min-h-[50vh]">
                <Word elem={'h1'}>Bao Anh is here and now!</Word>
                <Word elem={'article'} className="tw-max-w-[30rem]">
                    Hello! I like to learn and experiment with new ideas in art,
                    design and technology. Thank you for visiting.
                </Word>
            </HeaderLayout>
            <Line className={`${tw_line_overflow} tw-my-[5vh]`}></Line>
            <GuestBook></GuestBook>
            {false && (
                <canvas
                    id="renderCanvas"
                    className="tw-bg-red-200 tw-h-[100vh] tw-w-full"
                ></canvas>
            )}
        </AnimatePageComp>
    );
}
