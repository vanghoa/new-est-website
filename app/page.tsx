import AnimatePageComp from '@/components/AnimatePageComp';
import { HeaderLayout } from '@/components/SmallComponents';
import { Word } from '@/components/WordProcessor';

export default function Home() {
    return (
        <AnimatePageComp>
            <HeaderLayout>
                <Word elem={'h1'}>Bao Anh is here and now!</Word>
                <Word elem={'article'} className="tw-max-w-[30rem]">
                    Hello! I like to learn and experiment with new ideas in art,
                    design and technology. Thank you for visiting.
                </Word>
            </HeaderLayout>
            {false && (
                <canvas
                    id="renderCanvas"
                    className="tw-bg-red-200 tw-h-[100vh] tw-w-full"
                ></canvas>
            )}
        </AnimatePageComp>
    );
}
