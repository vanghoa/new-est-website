'use strict';
{
    // background morphing
    const bgimg_ = {
        c: 0,
        id: null,
        clear() {
            clearInterval(this.id);
        },
        activate() {
            const this_ = this;
            this.id = setInterval(() => {
                bgimg[this_.c].classList.remove('on');
                this_.c = this_.c >= bgimg.length - 1 ? 0 : this_.c + 1;
                bgimg[this_.c].classList.add('on');
            }, 5000);
        },
    };
    // local function //

    function nav_construct(id) {
        /*
        crrntnavlist = id;

        for (let item of navitemobj) {
            item.elem.style.display = 'none';
        }
        if (!touchable) {
            init_border('top');
            init_border('bot');
            init_border('left');
            init_border('right');

            function init_border(check) {
                border_3d[check].removeAttribute('style');
                border_3d[check].style.visibility = 'hidden';
            }
        }
        */
        let posarray = posarr_generate(id);

        for (let index in navitem[id]) {
            const item = navitem[id][index];
            const positem = posarray[index];
            const colcheck = positem.colcheck;
            const initcheck = positem.initcheck;
            const sidecheck = positem.sidecheck;

            item.removeAttribute('style');
            item.classList.remove(
                'col',
                'row',
                'left',
                'right',
                'top',
                'bot',
                'horizontal',
                'vertical',
                'horizontal_ani',
                'vertical_ani',
                'forward',
                'reverse',
                'tw-hidden'
            );
            item.style.display = 'auto';
            item.style.gridColumn = positem.col;
            item.style.gridRow = positem.row;
            item.style[`${colcheck ? 'alignSelf' : 'justifySelf'}`] = initcheck
                ? 'end'
                : 'start';
            item.classList.add(
                `${colcheck ? 'col' : 'row'}`,
                `${colcheck ? 'horizontal' : 'vertical'}`,
                `${colcheck ? 'horizontal_ani' : 'vertical_ani'}`,
                `${
                    colcheck
                        ? initcheck
                            ? 'forward'
                            : 'reverse'
                        : sidecheck == 'right'
                        ? 'forward'
                        : 'reverse'
                }`,
                `${colcheck ? (initcheck ? 'top' : 'bot') : 'row'}`,
                `${sidecheck}`
            );
            /*
            if (!touchable) {
                let divhover = item.querySelector('div.hovercontent');
                let class_ = item.className;
                ////////
                if (index == navitem[id].length - 1) {
                    hovercheck[id] = false;
                }
                ////////
                soon_border('top', 'col', 'Top', 'top');
                soon_border('left', 'row', 'Left', 'lr');
                soon_border('right', 'row', 'Right', 'lr');
                soon_border('bot', 'col', 'Bottom', 'bot');
                ////////
                if (divhover.dataset.src) {
                    setprop(
                        '--preloadcss',
                        `${getprop('--preloadcss')} url('/base/thumbnail/${
                            divhover.dataset.src
                        }.jpg')`
                    );
                    divhover.removeAttribute('data-src');
                }
                ////////
                function soon_border(check, check_, bor_name, alpha_name) {
                    if (class_.includes(check) && class_.includes(check_)) {
                        if (class_.includes('soon')) {
                            border_3d[check].style[
                                `border${bor_name}Color`
                            ] = `rgba(var(--color_arrow_rgb), var(--${alpha_name}_alpha)`;
                        }
                        border_3d[check].style.visibility = 'visible';
                    }
                }
            }
            */
        }
    }

    //
    function posarr_generate(index) {
        let soitemmin = Math.floor(navitem[index].length / 4);
        let soitemmax_1 = Math.floor(
            (navitem[index].length - soitemmin * 2) / 2
        );
        let soitemmax_2 = Math.ceil(
            (navitem[index].length - soitemmin * 2) / 2
        );

        if (innerHeight > innerWidth) {
            soitem[0] = soitem[1] = soitemmin;
            soitem[2] = soitemmax_1;
            soitem[3] = soitemmax_2;
        } else {
            soitem[2] = soitem[3] = soitemmin;
            soitem[0] = soitemmax_1;
            soitem[1] = soitemmax_2;
        }

        let postop = pos_generate(soitem[0], true, true);
        let posbot = pos_generate(soitem[1], true, false);
        let posleft = pos_generate(soitem[2], false, true);
        let posright = pos_generate(soitem[3], false, false);
        return postop.concat(posright, posbot.reverse(), posleft.reverse());
    }
    //
    function pos_generate(soitemmoicanh, colcheck, initcheck) {
        if (soitemmoicanh == 0) {
            return [];
        }

        let newarr = [2];
        let numbefore = 2 + minsz;
        for (let i = 2; i <= soitemmoicanh; i++) {
            numbefore = rnd_int(
                numbefore,
                colmax - (soitemmoicanh - (i - 1)) * minsz
            );
            newarr.push(numbefore);
            numbefore += minsz;
        }
        newarr.push(colmax);

        let rtarr = [];
        newarr.forEach((pos) => {
            rtarr.push({
                col: colcheck ? pos : initcheck ? 1 : colmax,
                row: colcheck ? (initcheck ? 1 : colmax) : pos,
                colcheck: colcheck ? true : false,
                initcheck: initcheck ? true : false,
            });
        });

        rtarr.forEach((pos, index) => {
            if (index == rtarr.length - 1) {
                return;
            }
            let pos_ = rtarr[index];
            let pos_next = rtarr[index + 1];
            let left = pos_.col == 2;
            let right = pos_next.col == colmax;

            if (colcheck) {
                pos_.sidecheck =
                    left && right
                        ? 'center_stretch'
                        : left
                        ? 'left'
                        : right
                        ? 'right'
                        : 'individual';

                pos_.col = `${pos.col} / ${pos_next.col}`;
                return;
            }
            pos_.sidecheck = pos_.col == 1 ? 'left' : 'right';
            pos_.row = `${pos.row} / ${pos_next.row}`;
        });

        rtarr.pop();
        return rtarr;
    }
    /*
    function color_border(check, target, init, axis) {
        setprop(
            `--${check}_color_be4`,
            init ? `255, 255, 255` : `var(--colortheme_rgb)`
        );
        setprop(
            `--${check}_color_aft`,
            `var(--${init ? axis : 'colortheme_rgb'})`
        );

        target.classList[init ? 'add' : 'remove'](
            `highlightsort_border_${check}`
        );
        target[`${init ? 'add' : 'remove'}EventListener`](
            'animationend',
            border_3d[`removehighlight_border_${check}`]
        );
    }
*/
    function onresizesortbtn(nav_gen) {
        let new_smallersd = innerWidth < innerHeight ? 1 : 2;
        let ratio = innerWidth / innerHeight;
        ratio = ratio < 1 ? 1 / ratio : ratio;
        let new_smallersd_min =
            ratio > 2 ? 1 : ratio > 1.3 ? 2 : sortbtn.length / 2;

        if (new_smallersd != smallersd && nav_gen) {
            //smallersd = new_smallersd;
            nav_construct(crrntnavlist);
        }

        if (new_smallersd_min != smallersd_min || new_smallersd != smallersd) {
            //smallersd_min = new_smallersd_min;

            let smsmall = $(`.seemore:nth-of-type(${new_smallersd})`);
            let smbig = $(`.seemore:nth-of-type(${3 - new_smallersd})`);
            sortbtn.forEach((item, key) => {
                if (key + 1 <= new_smallersd_min) {
                    smsmall.appendChild(item);
                    adddecor(item, new_smallersd == 1);
                } else {
                    smbig.appendChild(item);
                    adddecor(item, 3 - new_smallersd == 1);
                }
            });
        }

        if (new_smallersd != smallersd) {
            smallersd = new_smallersd;
        }

        if (new_smallersd_min != smallersd_min) {
            smallersd_min = new_smallersd_min;
        }

        function adddecor(item, sdcheck) {
            item.className = '';
            item.classList.add(sdcheck ? 'horizontal' : 'vertical');
        }
    }

    function rnd_int(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function getScrollbarWidth() {
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll';
        outer.style.msOverflowStyle = 'scrollbar';
        document.body.appendChild(outer);

        const inner = document.createElement('div');
        outer.appendChild(inner);

        const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
    }

    function viewportheight() {
        setprop('--vh', `${(innerHeight - 0.001) * 0.01}px`);
    }

    // custom settings //
    const minsz = 10;
    const soitemperscreen = 6;
    const soitem_tong = 16;

    // binding method
    const $ = document.querySelector.bind(document);
    const $$ = document.querySelectorAll.bind(document);

    // binding method
    const ulnav = $('ul#nav');
    const $ulnav = ulnav.querySelector.bind(ulnav);

    // binding method
    const root = document.querySelector(':root');
    const proproot = getComputedStyle(root);
    const getprop = proproot.getPropertyValue.bind(proproot);

    // binding method
    const rootstyle = root.style;
    const setprop = rootstyle.setProperty.bind(rootstyle);

    // css getprop
    const colmax = +getprop('--colmax') + 2;

    // locked settings //
    const soitem = new Array(4);
    let crrntnavlist = 0;
    let navitemobj = [];
    let navitem = [[], [], []];
    let availit_num;
    let smallersd;
    let smallersd_min;
    let soitem_soon;

    // query elements
    const sortbtn = $$('.seemore button');
    const ckbx = $ulnav('label#tglnav input');
    const bgimg = $$('#bgimg img');

    // border 3d object
    /*
    const border_3d = {
        top: $ulnav('#top_border'),
        bot: $ulnav('#bot_border'),
        left: $ulnav('#left_border'),
        right: $ulnav('#right_border'),
        removehighlight_border_top: function (e) {
            color_border('top', e.target, false, 'N/A');
        },
        removehighlight_border_bot: function (e) {
            color_border('bot', e.target, false, 'N/A');
        },
        removehighlight_border_left: function (e) {
            color_border('left', e.target, false, 'N/A');
        },
        removehighlight_border_right: function (e) {
            color_border('right', e.target, false, 'N/A');
        },
    };
*/
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

    // initialise //
    viewportheight();
    let scrlbrwd = getScrollbarWidth();
    setprop('--scrlbrwd', `${scrlbrwd}px`);

    // nav fetch //
    fetch('/base/item.json')
        .then((res) => res.json())
        .then((data) => {
            availit_num = data.length + last_obj.length;
            for (let item of last_obj) {
                data.push(item);
            }

            soitem_soon = soitem_tong - availit_num;
            for (let i = 1; i <= soitem_soon; i++) {
                data.push(soon_obj);
            }

            for (let key in data) {
                let item = data[key];
                const li = $ulnav(`#nav > li#_${+key + 1}`);
                navitemobj[key] = {
                    dg_pro: false,
                    print: false,
                    mo_gra: false,
                    illus: false,
                    spcl: false,
                    gr_co: false,
                    time: true,
                    soon: item.soon ? true : false,
                    elem: li,
                };
                for (let index in item.field) {
                    fieldcheck(item.field[index].class, navitemobj[key]);
                }
                navitem[Math.floor(key / soitemperscreen)].push(li);
            }

            // navbar construction //
            onresizesortbtn(false);
            ckbx.checked = false;
            nav_construct(0);

            function fieldcheck(class_, item) {
                if (fieldcheck_('dg_pro')) {
                    return;
                }
                if (fieldcheck_('print')) {
                    return;
                }
                if (fieldcheck_('mo_gra')) {
                    return;
                }
                if (fieldcheck_('illus')) {
                    return;
                }
                if (fieldcheck_('spcl')) {
                    return;
                }

                function fieldcheck_(check) {
                    item[check] = item[check] || class_ == check;
                    return class_ == check;
                }
            }
        })
        .catch((err) => console.error(err));

    // on resize //
    const debounce = {
        prev: innerHeight,
        first: true,
        timeout: null,
        _: function () {
            let this_ = this;
            if (this.first) {
                this.first = false;
            }

            if (this.timeout !== null) {
                clearTimeout(this.timeout);
            }
            this.timeout = setTimeout(function () {
                const offsetH = Math.abs(innerHeight - this_.prev);
                if (offsetH < 100 && touchCheck) {
                    this_.prev = innerHeight;
                    return;
                }
                this_.timeout = null;
                this_.first = true;
                // scrollbar width
                scrlbrwd = getScrollbarWidth();
                setprop('--scrlbrwd', `${scrlbrwd}px`);
                // ios vh fix
                viewportheight();
                // sort button reorganise + generate nav bar
                onresizesortbtn(true);
                this_.prev = innerHeight;
            }, 1000);
        },
    };
    window.onresize = () => {
        debounce._();
    };

    bgimg_.activate();
}
