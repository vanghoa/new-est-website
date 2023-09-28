import AnimatePageComp from '@/components/AnimatePageComp';
import { Line } from '@/components/Line';
import { HeaderLayout } from '@/components/SmallComponents';
import { tw_divider, tw_line_overflow } from '@/components/TailwindClass';
import { Rand, Word } from '@/components/WordProcessor';
import { getWorkFilter } from '@/constants/paths';
import Link from 'next/link';

export default function page() {
    return (
        <AnimatePageComp>
            <HeaderLayout>
                <Word elem={'h1'}>Info</Word>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    Hi there! My name is Bao Anh Bui.
                </Rand>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    Born and raised in Vietnam, I am now living in Singapore.
                    Here, I went to LASALLE College of the Arts to pursue my
                    study in Visual Communication Design, in which I was
                    absorbed in the wonder of graphic design, advertising &
                    media arts. In the process of which, I stumbled upon a
                    medium of interest - website development & programming.
                </Rand>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    My practice revolves around the usage of certain media in a
                    meaningful way, to convey the essence of that medium.
                    Whether it&apos;s through web-based platforms, in a book
                    format, digitally, or through analog means, my goal is to
                    communicate with people from the means of communication
                    itself.
                </Rand>
                <br></br>
                <h2 className="tw-w-[min(35rem,100%)]">
                    <Link href="/i_love_my_work">{`[ See my works ]`}</Link>
                </h2>
            </HeaderLayout>
            <Line className={`${tw_line_overflow} ${tw_divider}`}></Line>
            <section
                className={`tw-w-full tw-flex tw-flex-col tw-items-end ${tw_divider}`}
            >
                <Word elem={'h2'} className="tw-w-[min(35rem,100%)]">
                    How did I learn &apos;Development&apos; ?
                </Word>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    It all began with a request from an organization during my
                    second year of college. They needed a website for their
                    online magazine, but unfortunately, their budget
                    couldn&apos;t stretch to hire an additional web developer to
                    join me in the project. Faced with this challenge, they
                    asked if I could work with a provided web builder called
                    Semplice. This tool was primarily a drag-and-drop interface
                    with limited customization options. However, my desire to
                    infuse some captivating interactions into the website led me
                    down an uncharted path. I took it upon myself to learn
                    JavaScript, and I soon found myself tinkering with the code.
                    Looking back, I was quite impressed with what I had
                    accomplished, and that experience inspired me to pursue web
                    development in a more structured and comprehensive manner.
                </Rand>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    With litle experience in this particular field, I had a
                    pretty hard time initially. However, through a lot more
                    hands-on website projects, I navigated my pathway from using
                    merely web builder tools, to grasping the essential trio
                    HTML, CSS & Javascript, specifically delving into the
                    programming concepts via JS and later on, getting my hands
                    on popular web frameworks / tools / plugins. It kept
                    expanding to adapt whatever the need is. The vast majority
                    of my technical knowledge were self-sourced from the
                    Internet, punctuated by a healthy dose of trial and error,
                    given that most of my web projects were solo endeavors.
                </Rand>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    However, that does not imply that I did not have any
                    experience with group working. As a graphic designer by
                    nature, I had experiences working with fellow programmers
                    for app/web-based projects. Some of them graciously allowed
                    me to dabble in the coding aspects, an experience for which
                    I&apos;m immensely thankful. These opportunities in return
                    facilitates my understanding of working across multiple
                    disciplines with different sets of rules to follow
                    respectively.
                </Rand>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    While I readily admit that my technical prowess may not be
                    awe-inspiring and may contain its share of imperfections, I
                    firmly believe in my capacity to learn and the audacity to
                    embrace things that are not passively fed to my mouth.
                </Rand>
                <br></br>
                <h2 className="tw-w-[min(35rem,100%)]">
                    <Link
                        href={getWorkFilter('big~tag-Development')}
                    >{`[ See my code-based projects ]`}</Link>
                </h2>
            </section>
            <Line className={`${tw_line_overflow} ${tw_divider}`}></Line>
            <section className={`tw-w-full ${tw_divider}`}>
                <Word elem={'h2'} className="tw-w-[min(35rem,100%)]">
                    About my Graphic Design...
                </Word>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    Graphic design is what I am professionally qualified for and
                    is one of the first lenses through which I see the world. It
                    has sparked in me lots of ideas and desires, acted as an
                    entry point to explore other media and areas of knowledge to
                    reach goals that sometimes lie beyond visual communication.
                </Rand>
                <br></br>
                <Rand
                    min={5}
                    elem={'article'}
                    className="tw-max-w-[35rem] [&_a]:!tw-text-green-400"
                >
                    My skills encompass a range of design forms, from 2D to 3D,{' '}
                    <Link href={getWorkFilter('small~tag-Digital~tool')}>
                        digital
                    </Link>{' '}
                    to{' '}
                    <Link href={getWorkFilter('small~tag-Print~matter')}>
                        print
                    </Link>
                    ,{' '}
                    <Link href={getWorkFilter('small~tag-Website')}>
                        website
                    </Link>{' '}
                    to{' '}
                    <Link href={getWorkFilter('small~tag-Motion~graphic')}>
                        motion graphic
                    </Link>{' '}
                    and even{' '}
                    <Link href={getWorkFilter('small~tag-Illustration')}>
                        illustration
                    </Link>
                    . During my college years, I received recognition for my
                    efforts, including the LASALLE Scholarship for the academic
                    years 2020-2021 and 2022-2023. I also earned the Certificate
                    of Typographic Excellence from TDC67 by the Type Directors
                    Club in NYC, the Red Dot Junior Award in 2021, and the D&AD
                    New Blood Yellow Pencil in 2022. In 2023, I received a
                    SILVER award in the Creative Conscience Awards. Moreover, my
                    work has also been featured in Slanted Magazine #42 - BOOKS
                    in 2023, which has been a humbling experience that further
                    fuels my passion for design.
                </Rand>
                <br></br>
                <h2 className="tw-w-[min(35rem,100%)]">
                    <Link
                        href={getWorkFilter('big~tag-Design')}
                    >{`[ See my design works ]`}</Link>
                </h2>
            </section>
            <Line className={`${tw_line_overflow} ${tw_divider}`}></Line>
            <section
                className={`tw-w-full tw-flex tw-flex-col tw-items-end ${tw_divider}`}
            >
                <Word elem={'h2'} className="tw-w-[min(35rem,100%)]">
                    Thank you for visiting! Hope you have a nice time viewing
                    the site.
                </Word>
                <br></br>
                <Rand min={5} elem={'article'} className="tw-max-w-[35rem]">
                    If anything here sparks your interest or resonates with you,
                    please don&apos;t hesitate to reach out to me through social
                    media or via email. I would genuinely enjoy continuing the
                    conversation.
                </Rand>
                <br></br>
                <h2 className="tw-w-[min(35rem,100%)]">
                    <Link href="/contact">{`[ Contact me ]`}</Link>
                    <br></br>
                    <Link href="/">{`[ Sign the Guestbook ]`}</Link>
                </h2>
            </section>
        </AnimatePageComp>
    );
}
