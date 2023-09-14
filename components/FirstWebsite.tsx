import FirstWebsiteTab, {
    DataItem,
    FirstWebsiteSneak,
} from './FirstWebsiteTab';

export const dynamic = 'force-static';
export const fetchCache = 'force-cache';

export default async function FirstWebsite() {
    // extra objects
    const soon_obj = {
        name: 'Coming',
        date: 'soon',
        field: [
            {
                name: 'Intentionally',
                class: '',
            },
            {
                name: 'left',
                class: '',
            },
            {
                name: 'blank',
                class: '',
            },
        ],
        description: '',
        soon: true,
    };
    const last_obj = [
        {
            name: 'Misc projects',
            date: '1/2020 - present',
            field: [
                {
                    name: 'Communication design',
                    class: '',
                },
                {
                    name: 'Poster design',
                    class: 'illus',
                },
                {
                    name: 'NFT design',
                    class: 'dg_pro',
                },
            ],
            description:
                'Various small-scale projects, personal and full-time works',
            soon: false,
            key_: 'misc',
        },
    ];
    let data: DataItem[] = [];
    try {
        data = await (
            await fetch(`${process.env.FETCH_URL}/base/item.json`, {
                cache: 'force-cache',
            })
        ).json();
        for (let item of last_obj) {
            data.push(item);
        }

        for (let i = 1; i <= 3; i++) {
            data.push(soon_obj);
        }
    } catch (err) {
        console.log('errbucac3: ', err);
        return <></>;
    }
    return (
        <nav className="tw-pointer-events-none tw-w-full tw-h-full [&_:is(p,td,address)]:tw-leading-5 [&_:is(h1,h2,h3,h4,h5.h6)]:tw-font-bold">
            <div
                className="seemore show tw-z-10"
                style={{ gridColumn: '1 / 3', gridRow: 1 }}
            >
                <button
                    type="button"
                    style={{ backgroundColor: 'rgb(var(--time))' }}
                    className="tw-z-30"
                >
                    <span>Chronological</span>
                </button>
                <button
                    type="button"
                    style={{ backgroundColor: 'rgb(var(--dg_pro))' }}
                    className="tw-z-20"
                >
                    <span>Digital Product</span>
                </button>
                <button
                    type="button"
                    style={{ backgroundColor: 'rgb(var(--print))' }}
                    className="tw-z-10"
                >
                    <span>Print Matter</span>
                </button>
            </div>
            <div
                className="seemore show tw-z-10"
                style={{ gridColumn: 2, gridRow: 2 }}
            >
                <button
                    type="button"
                    style={{ backgroundColor: 'rgb(var(--mo_gra))' }}
                >
                    <span>Motion Graphic</span>
                </button>
                <button
                    type="button"
                    style={{ backgroundColor: 'rgb(var(--illus))' }}
                >
                    <span>Illustration</span>
                </button>
                <button
                    type="button"
                    style={{ backgroundColor: 'rgb(var(--spcl))' }}
                >
                    <span>Speculative</span>
                </button>
            </div>
            <ul id="nav" className="show tw-z-20">
                <li id="main">
                    <label
                        className="vertical ifr_button tw-block"
                        id="tglnav"
                        title="full window view"
                    >
                        <img
                            src="/base/icon/icon (5).png"
                            alt="fullscreen button"
                        />
                        <input type="checkbox" />
                    </label>
                    <section
                        id="welcome"
                        className="tw-overflow-auto tw-pointer-events-auto"
                    >
                        <div
                            id="landing_pg"
                            style={{
                                height: `calc(var(--fr_height) - var(--seemoresz) - calc(var(--pad_welcome) * 2))`,
                            }}
                        >
                            <h1>Archived site 2020 - 2022</h1>
                            <p id="description" className="activate">
                                Bao Anh (or Bao) is{` `}
                                <span
                                    style={{ color: 'rgb(var(--dg_pro))' }}
                                    title="filtering @digital_product"
                                >
                                    digital design &amp; development
                                </span>
                                ,{` `}
                                <span
                                    style={{ color: 'rgb(var(--mo_gra))' }}
                                    title="filtering @motion_graphic"
                                >
                                    motion graphic
                                </span>
                                ,{` `}
                                <span
                                    style={{ color: 'rgb(var(--illus))' }}
                                    title="filtering @illustration"
                                >
                                    illustration
                                </span>
                                ,{` `}
                                <span
                                    style={{ color: 'rgb(var(--print))' }}
                                    title="filtering @print_matter"
                                >
                                    print production
                                </span>
                                ,{` `}
                                <span
                                    style={{ color: 'rgb(var(--spcl))' }}
                                    title="filtering @speculative"
                                >
                                    experimental
                                </span>
                                {` `}
                                and{` `}
                                <span
                                    style={{ color: 'rgb(var(--time))' }}
                                    title="filtering @communication"
                                >
                                    communication design
                                </span>
                                .<br />
                                <br />
                                <b>**Edit</b>: Bao is moving to a new site.
                                Thank you for always supporting him. You can
                                still browse his old stuff from 2020 - 2022!
                                Goodbye!
                            </p>
                            <ul>
                                <li className="horizontal">
                                    <h2>My works</h2>
                                </li>
                                <li className="horizontal">
                                    <h2>Memory island</h2>
                                </li>
                                <li className="horizontal">
                                    <h2>Info/Resume</h2>
                                </li>
                            </ul>
                            <div id="bgimg">
                                <img
                                    src="/base/garage/1.jpg"
                                    alt="background image"
                                    className="on"
                                />
                                <img
                                    src="/base/garage/2.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/3.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/4.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/5.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/6.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/7.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/8.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/9.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/10.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/11.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/12.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/13.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/14.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/15.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/16.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/17.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/18.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/19.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/20.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/21.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/22.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/23.jpg"
                                    alt="background image"
                                />
                                <img
                                    src="/base/garage/24.jpg"
                                    alt="background image"
                                />
                            </div>
                        </div>
                        {/**/}
                        <h2 id="sneak_title" className="tw-block">
                            You can see my works below↓
                        </h2>
                        {/* */}
                        <ul id="sneak_peek">
                            <FirstWebsiteSneak data={data}></FirstWebsiteSneak>
                        </ul>
                        {/* */}
                        <div id="about" className="tw-block">
                            {/*<div className="vimeo">
                                <iframe
                                    src="https://player.vimeo.com/video/725335360?h=ef92648557&badge=0&autopause=0&player_id=0&app_id=58479"
                                    frameBorder={0}
                                    allow="autoplay; fullscreen; picture-in-picture"
                                    allowFullScreen
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                    }}
                                    title="both_1"
                                />
                                </div>*/}
                        </div>
                        {/* */}
                        <div
                            id="myresume"
                            className="tw-block"
                            style={{ paddingBottom: 'var(--pad_welcome)' }}
                        >
                            <h2 style={{ color: 'rgb(var(--print))' }}>
                                Contacts↓
                            </h2>
                            <address>
                                <a
                                    href="https://www.instagram.com/bao.anh.bui"
                                    target="_blank"
                                >
                                    instagram@bao.anh.bui
                                </a>
                                <br />
                                <a
                                    href="https://www.facebook.com/xucxichhaha/"
                                    target="_blank"
                                >
                                    facebook@xucxichhaha
                                </a>
                                <br />
                                <a
                                    href="https://www.linkedin.com/in/bao-anh-bui-025149167/"
                                    target="_blank"
                                >
                                    linkedin@bao-anh-bui-025149167
                                </a>
                                <br />
                                <a href="mailto:baoanh1buinguyen@gmail.com">
                                    baoanh1buinguyen@gmail.com
                                </a>
                                <br />
                                <a href="tel:+84779384331">(+84) 77 938 4331</a>
                            </address>
                            {/* */}
                            <br />
                            <h2 style={{ color: 'rgb(var(--dg_pro))' }}>
                                Education↓
                            </h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            08/2019 <br />
                                            →05/2023 <br />
                                            (expected)
                                        </td>
                                        <td>
                                            <h3>LASALLE COLLEGE OF THE ARTS</h3>
                                            <i>Singapore</i> <br />
                                            Diploma in Design for Communication
                                            and Experiences
                                            <br />
                                            <i>
                                                **For the AY 2021 - 2022, I take
                                                a gap year to return to my
                                                hometown, Vietnam. I will be
                                                coming back to Singapore this
                                                August 2022 to resume my
                                                study.**
                                            </i>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            09/2016 <br />
                                            →05/2019
                                        </td>
                                        <td>
                                            <h3>
                                                HIGHSCHOOL FOR THE GIFTED—VNUHCM
                                            </h3>
                                            <i>Vietnam</i> <br />
                                            High School Diploma
                                            <br />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* */}
                            <br />
                            <h2 style={{ color: 'rgb(var(--mo_gra))' }}>
                                Work Experiences↓
                            </h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            08/2022 <br />
                                            →10/2022
                                        </td>
                                        <td>
                                            <h3>PRACTICE THEORY</h3>
                                            <i>Graphic Design Intern</i> <br />
                                            – Communication &amp; Visual
                                            Designer for the Singapore-based
                                            creative studio
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            07/2021 <br />
                                            →12/2021
                                        </td>
                                        <td>
                                            <h3>THE LAB SAIGON</h3>
                                            <i>Junior Graphic Designer</i>
                                            <br />
                                            – Communication &amp; Visual
                                            Designer for the Saigon-based
                                            creative agency
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>05/2019</td>
                                        <td>
                                            <h3>INTEL PRODUCTS VIETNAM</h3>
                                            <i>
                                                Independent Freelance
                                                Illustrator
                                            </i>
                                            <br />
                                            – Stage Background Illustrator for
                                            the company’s year-end event.
                                            <br />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            2017 <br />
                                            →Now
                                        </td>
                                        <td>
                                            <h3>SMALL MEDIUM ENTERPRISES</h3>
                                            <i>Freelancer in Graphic Design</i>
                                            <br />
                                            – Responsible for the visual images,
                                            graphics, illustrations and concepts
                                            for clients’ needs.
                                            <br />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* */}
                            <br />
                            <h2 style={{ color: 'rgb(var(--illus))' }}>
                                Skills↓
                            </h2>
                            <table className="skills">
                                <tbody>
                                    <tr>
                                        <td>
                                            <h3>
                                                – Proficient with the following
                                                Digital Softwares:
                                            </h3>
                                            Adobe Creative Suite and Figma.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3>
                                                – Familiar with the following
                                                Digital Softwares:
                                            </h3>
                                            Cinema4D, Glyphs and Blender.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h3>– Technical Skills:</h3>
                                            Illustration, Publication
                                            Production, UI Design, HTML/CSS
                                            &amp; Javascript knowledge.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* */}
                            <br />
                            <h2 style={{ color: 'rgb(var(--spcl))' }}>
                                Activities↓
                            </h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>07/2022</td>
                                        <td>
                                            <h3>D&amp;AD New Blood Academy</h3>–
                                            Participant.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            01/2022 <br />
                                            →03/2022
                                        </td>
                                        <td>
                                            <h3>
                                                Google Developer Solution
                                                Challenge 2022
                                            </h3>
                                            – Participant.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            09/2021 <br />
                                            →04/2022
                                        </td>
                                        <td>
                                            <h3>
                                                Google Developer Student Club -
                                                UIT
                                            </h3>
                                            – Development team.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            05/2021 <br />
                                            →10/2021
                                        </td>
                                        <td>
                                            <h3>
                                                Project Vietnamme—a non-profit
                                                organisation dedicated to the
                                                relationship of young Vietnamese
                                                and the Arts.
                                            </h3>
                                            – Graphic Design Consultation.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            10/2020 <br />
                                            →01/2021
                                        </td>
                                        <td>
                                            <h3>
                                                Vietnamme
                                                Magazine—magazine.vietnamme.me,
                                                an online magazine dedicated to
                                                the contemporary arts in
                                                Vietnam.
                                            </h3>
                                            – Website Development, Graphic
                                            Design.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            10/2017 <br />
                                            →01/2018
                                        </td>
                                        <td>
                                            <h3>
                                                Human Library Vietnam—a
                                                non-profit organisation
                                                dedicated to raising awareness
                                                to societal issues.
                                            </h3>
                                            – Graphic Design, Illustration.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            08/2017 <br />
                                            →08/2018
                                        </td>
                                        <td>
                                            <h3>
                                                Project Sugar—a non-profit
                                                student-run organisation
                                                dedicated to underprivileged
                                                children
                                            </h3>
                                            – Graphic Design, Illustration, Art
                                            Direction.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* */}
                            <br />
                            <h2 style={{ color: 'rgb(var(--time))' }}>
                                Accolades↓
                            </h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>2022</td>
                                        <td>
                                            <h3>
                                                D&amp;AD NEW BLOOD YELLOW PENCIL
                                            </h3>
                                            – Awarded 2022 Yellow Pencil by
                                            D&amp;AD New Blood for the entry
                                            Duolingo: Non-fungible Efforts.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2021</td>
                                        <td>
                                            <h3>RED DOT JUNIOR AWARD</h3>–
                                            Awarded “Red Dot Junior Award” under
                                            Red Dot Award: Brands &amp;
                                            Communication Design by Red Dot
                                            Award in 2021.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2021</td>
                                        <td>
                                            <h3>
                                                CERTIFICATE OF TYPOGRAPHIC
                                                EXCELLENCE TDC67
                                            </h3>
                                            – Awarded “Certificate of
                                            Typographic Excellence” in TDC67 by
                                            Type Directors Club and will be
                                            included in the Annual of the Type
                                            Directors Club, The World’s Best
                                            Typography.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2020</td>
                                        <td>
                                            <h3>
                                                LASALLE SCHOLARSHIP 2020-2021
                                            </h3>
                                            – Awarded LASALLE Scholarship
                                            2020–2021 to cover my tuition fee
                                            for my great performance at LASALLE
                                            College of the Arts.
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2019</td>
                                        <td>
                                            <h3>LASALLE TUITION GRANT</h3>–
                                            Awarded 60% merit-based tuition
                                            grant for my tuition fee in the
                                            diploma at LASALLE College of the
                                            Arts.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {/* */}
                        <h2>Colophon↓</h2>
                        <p>
                            – Background image found in &apos;A Field Guide to
                            Roadside Wildflowers At Full Speed&apos; by {` `}
                            <em>Chris Helzer</em>. <br />– Site typefaces are
                            from <em>Google Font</em>: Alegreya designed by
                            <em>
                                Juan Pablo del Peral, Huerta Tipográfica
                            </em>{' '}
                            &amp; Work Sans by <em>Wei Huang</em>. <br />
                        </p>
                        <br />
                        <h2>Thanks for visiting</h2>
                        <p>
                            Website development and design by <em>Bao Anh</em> ©
                            2022 Bao Anh Bui. All Rights Reserved.
                        </p>
                    </section>
                    <a
                        className="vertical ifr_button"
                        id="opensep"
                        title="open this project in a separate window"
                        target="_blank"
                    >
                        <img
                            src="/base/icon/icon (6).png"
                            alt="open this project in a separate window"
                        />
                    </a>
                    <section id="iframe">
                        <iframe
                            data-hidecheck={1}
                            src="/base/project_pages/1/project.html"
                            title="see my project here"
                        ></iframe>
                        <iframe
                            className="hide"
                            data-hidecheck={0}
                            title="see my project here"
                        ></iframe>
                    </section>
                </li>
                {/* */}
                <li
                    className="btn vertical"
                    title="toggle homescreen"
                    style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}
                >
                    <img src="/base/icon/icon (2).png" alt="home button" />
                </li>
                {/* */}
                <li
                    className="btn vertical seemore_func"
                    title="sort & filter"
                    style={{
                        gridColumn: 'var(--colmaxreal_2) / var(--colmaxreal_3)',
                        gridRow: '1 / 2',
                    }}
                >
                    <img src="/base/icon/icon (1).png" alt="sorting button" />
                </li>
                {/* */}
                <li
                    className="btn vertical"
                    title="navigate backward"
                    style={{
                        gridColumn: '1 / 2',
                        gridRow: 'var(--colmaxreal_2) / var(--colmaxreal_3)',
                        backgroundColor: 'var(--color_arrow)',
                    }}
                >
                    <img src="/base/icon/icon (3).png" alt="left button" />
                </li>
                {/* */}
                <li
                    className="btn vertical"
                    title="navigate forward"
                    style={{
                        gridColumn: 'var(--colmaxreal_2) / var(--colmaxreal_3)',
                        gridRow: 'var(--colmaxreal_2) / var(--colmaxreal_3)',
                        backgroundColor: 'var(--color_arrow)',
                    }}
                >
                    <img src="/base/icon/icon (4).png" alt="right button" />
                </li>
                {/* */}
                <li id="top_border">
                    <div className="line_3d l_diag side_left" />
                    <div className="line_3d r_diag side_right" />
                </li>
                {/* */}
                <li id="bot_border">
                    <div className="line_3d r_diag side_left" />
                    <div className="line_3d l_diag side_right" />
                </li>
                {/* */}
                <li id="left_border">
                    <div className="line_3d l_diag side_top" />
                    <div className="line_3d r_diag side_bot" />
                </li>
                {/* */}
                <li id="right_border">
                    <div className="line_3d r_diag side_top" />
                    <div className="line_3d l_diag side_bot" />
                </li>
                {/* */}
                <li id="top_left" />
                <li id="top_right" />
                <li id="bot_left" />
                <li id="bot_right" />
                {/* */}
                <FirstWebsiteTab data={data}></FirstWebsiteTab>
            </ul>
        </nav>
    );
}
