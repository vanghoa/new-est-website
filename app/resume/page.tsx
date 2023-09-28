import AnimatePageComp from '@/components/AnimatePageComp';
import { HeaderLayout } from '@/components/SmallComponents';
import { Word } from '@/components/WordProcessor';

export default function page() {
    return (
        <AnimatePageComp>
            <HeaderLayout>
                <Word elem={'h1'}>Resume</Word>
                <Word elem={'article'} className="tw-max-w-[30rem]">
                    Some content
                </Word>
            </HeaderLayout>
        </AnimatePageComp>
    );
}
