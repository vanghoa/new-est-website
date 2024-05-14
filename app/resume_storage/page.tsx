import AnimatePageComp from '@/components/AnimatePageComp';
import { HeaderLayout } from '@/components/SmallComponents';
import { Word } from '@/components/WordProcessor';
import { resumePath } from '@/constants/paths';

export default function page() {
    return (
        <AnimatePageComp>
            <HeaderLayout>
                <iframe
                    className="tw-w-full tw-min-w-[100vw] tw-h-[100vw] tw-left-1/2 tw-transform tw-translate-x-[-50%]"
                    src={resumePath}
                ></iframe>
            </HeaderLayout>
        </AnimatePageComp>
    );
}
