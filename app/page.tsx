import HeaderLayout from '@/components/Header';
import { Word } from '@/components/WordProcessor';

export default function Home() {
    return (
        <>
            <HeaderLayout>
                <Word elem={'h1'}>Bao Anh is here and now!</Word>
                <br></br>
                <br></br>
                <Word elem={'article'} className="tw-max-w-[30rem] tw-block">
                    Hello! I like to learn and experiment with new ideas in art,
                    design and technology. Thank you for visiting.
                </Word>
            </HeaderLayout>
        </>
    );
}
