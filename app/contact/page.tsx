import AnimatePageComp from '@/components/AnimatePageComp';
import { LineConstruct, LineLooser } from '@/components/Line';
import { HeaderLayout } from '@/components/SmallComponents';
import { tw_grid_section } from '@/components/TailwindClass';
import { Rand, Word } from '@/components/WordProcessor';

export default function page() {
    const linklist = [
        {
            name: 'baoanh1buinguyen@gmail.com',
            href: 'mailto:baoanh1buinguyen@gmail.com',
        },
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/xucxichhaha/',
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/bao.anh.bui/',
        },
        {
            name: 'Github',
            href: 'https://github.com/vanghoa',
        },
        {
            name: 'Are.na',
            href: 'https://www.are.na/bao-anh-bui',
        },
        {
            name: 'Mastodon sunny.garden',
            href: 'https://sunny.garden/@baoanhbui',
        },
        {
            name: 'Mastodon typo.social',
            href: 'https://typo.social/@baoanhbui',
        },
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/in/bao-anh-bui-025149167/',
        },
        {
            name: 'Tiong Bahru',
            href: 'https://maps.app.goo.gl/5jHNqUEkH99LVXoP8',
        },
        {
            name: 'Tân Bình district',
            href: 'https://maps.app.goo.gl/nbAVeHRQnEK5eKfV9',
        },
    ];
    return (
        <AnimatePageComp>
            <HeaderLayout>
                <Word elem={'h1'}>You can find me here</Word>
            </HeaderLayout>
            <Rand min={5} elem={'article'} className={`tw-max-w-[35rem]`}>
                Let&apos;s talk!
            </Rand>
            <br></br>
            <section className={tw_grid_section}>
                <p className={`tw-col-[1] tw-row-[1] !tw-leading-[1em]`}>@</p>
                <p className={`tw-col-[1] tw-row-[3/4] !tw-leading-[1em]`}>@</p>
                <p className={`tw-col-[3/4] tw-row-[1] !tw-leading-[1em]`}>@</p>
                <LineLooser className="tw-w-full tw-col-[2/3] tw-row-[1/2]"></LineLooser>
                <LineLooser className="tw-w-full tw-h-full tw-col-[1/2] tw-row-[2/3] tw-absolute [writing-mode:vertical-lr]"></LineLooser>
                <li className="tw-grid tw-grid-cols-1 lg:tw-grid-cols-2 tw-col-[2/4] tw-row-[2/4]">
                    {linklist.map((item, i) => (
                        <ol
                            key={`${i}linklist`}
                            className={`tw-w-full tw-grid tw-grid-cols-[auto_1em] tw-grid-rows-[auto_1em] [&>*:last-child]:tw-col-[1/2] [&>*:last-child]:tw-row-[1/2] tw-overflow-visible tw-group`}
                        >
                            <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr]">
                                {'&&&<>&&&~&&&&&&&&&&<>&&&&&&&~&&<>&&&&&'}
                            </LineConstruct>
                            <LineConstruct className="group-hover:tw-block tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                                {'@@@@@@@~<>@@@@@@@@@<>@@@@@@@~@@@@@@@@'}
                            </LineConstruct>
                            <LineConstruct className="group-hover:tw-hidden tw-w-full tw-h-full tw-col-[2/3] tw-row-[1/2] tw-absolute [writing-mode:vertical-lr]">
                                {'---<>---~----------<>-------~--<>-----'}
                            </LineConstruct>
                            <LineConstruct className="group-hover:tw-hidden tw-w-full tw-col-[1/2] tw-row-[2/3] [direction:rtl]">
                                {'-------~<>---------<>-------~--------'}
                            </LineConstruct>
                            <p
                                className={`tw-col-[2] tw-row-[2] !tw-leading-[1em] tw-text-center tw-whitespace-nowrap tw-left-[-0.25em]`}
                            >
                                / {i + 1} \
                            </p>
                            <a
                                className="tw-w-full tw-h-11 tw-justify-center tw-flex tw-items-center"
                                target="_blank"
                                rel="me"
                                href={item.href}
                            >
                                <Rand
                                    elem="span"
                                    className={`group-hover:after:tw-content-['_<---'] group-hover:before:tw-content-['--->_']`}
                                >
                                    {item.name}
                                </Rand>
                            </a>
                        </ol>
                    ))}
                </li>
            </section>
        </AnimatePageComp>
    );
}
