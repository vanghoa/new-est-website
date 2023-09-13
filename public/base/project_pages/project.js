document.addEventListener('DOMContentLoaded', function () {
    var lazyloadImages;

    if ('IntersectionObserver' in window) {
        lazyloadImages = document.querySelectorAll('.lazy');
        var imageObserver = new IntersectionObserver(function (
            entries,
            observer
        ) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.classList.remove('lazy');
                    imageObserver.unobserve(image);
                }
            });
        });

        lazyloadImages.forEach(function (image) {
            imageObserver.observe(image);
        });
    } else {
        var lazyloadThrottleTimeout;
        lazyloadImages = document.querySelectorAll('.lazy');

        function lazyload() {
            if (lazyloadThrottleTimeout) {
                clearTimeout(lazyloadThrottleTimeout);
            }

            lazyloadThrottleTimeout = setTimeout(function () {
                var scrollTop = window.pageYOffset;
                lazyloadImages.forEach(function (img) {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                    }
                });
                if (lazyloadImages.length == 0) {
                    document.removeEventListener('scroll', lazyload);
                    window.removeEventListener('resize', lazyload);
                    window.removeEventListener('orientationChange', lazyload);
                }
            }, 20);
        }

        document.addEventListener('scroll', lazyload);
        window.addEventListener('resize', lazyload);
        window.addEventListener('orientationChange', lazyload);
    }
});

// binding method
const $create = document.createElement.bind(document);

// page index
let h1 = document.querySelector('h1');
let index_pg = window.location.pathname.split('/')[3];
let index_last;
let index_misc;
let index_first;
const item_soon = {
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
const item_misc = {
    name: 'Miscellaneous projects',
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
    description: 'Various small-scale projects, personal and full-time works',
    soon: false,
};

// nav fetch //
fetch('/base/item.json')
    .then((res) => res.json())
    .then((data) => {
        index_last = data.length - 1;
        index_misc = index_last + 1;
        index_pg = index_pg == 'misc' ? index_misc : +index_pg - 1;
        index_first = 0;

        if (index_pg == index_misc) {
            field_date(item_misc);
            nav_construct(data);
        } else if (index_pg > index_misc) {
            field_date(item_soon);
        } else {
            field_date(data[index_pg]);
            nav_construct(data);
        }
    })
    .catch((err) => console.error(err));

function nav_construct(data) {
    let nav = $create('nav');
    h1.parentNode.insertBefore(nav, h1);

    if (window.top !== window.self) {
        nav.style.position = 'fixed';
        return;
    }
    // not iframe //
    let index_pg_ = {};
    let item_ = {};

    index_pg_.bf = index_pg - 1 < index_first ? index_last : index_pg - 1;
    item_.bf = data[index_pg_.bf];

    // check misc //
    if (index_pg - 1 == index_first - 1) {
        // pass 1
        index_pg_.bf = 'misc';
        item_.bf.name = item_misc.name;
    } else {
        index_pg_.bf++;
    }

    index_pg_.af = index_pg + 1 > index_last ? 0 : index_pg + 1;
    item_.af = data[index_pg_.af];

    // check misc //
    if (index_pg + 1 == index_misc) {
        // pass 1
        index_pg_.af = 'misc';
        item_.af.name = item_misc.name;
    } else {
        index_pg_.af++;
    }

    document.head.innerHTML += `<!-- favicon --> 
                              <link rel="apple-touch-icon" sizes="180x180" href="../../favicon/apple-touch-icon.png">
                              <link rel="icon" type="image/png" sizes="32x32" href="../../favicon/favicon-32x32.png">
                              <link rel="icon" type="image/png" sizes="16x16" href="../../favicon/favicon-16x16.png">
                              <link rel="manifest" href="../../favicon/site.webmanifest">
                              <link rel="mask-icon" href="../../favicon/safari-pinned-tab.svg" color="#5bbad5">
                              <meta name="msapplication-TileColor" content="#da532c">
                              <meta name="theme-color" content="#ffffff">
                              <meta name="format-detection" content="telephone=no">
                              <!-- --> `;

    nav.append(
        prev_next_prj('bf', index_pg_.bf, item_.bf.name),
        prev_next_prj('af', index_pg_.af, item_.af.name)
    );

    function prev_next_prj(psfix, index, name) {
        let a = $create('a');
        a.textContent =
            psfix == 'bf' ? '<-- Previous project' : 'Next project -->';
        a.href = `/project_pages/${index}/project.html`;

        let span = $create('span');
        span.textContent = name;
        a.append($create('br'), span);
        return a;
    }
}

function field_date(item) {
    let divtxt = $create('p');
    divtxt.className = 'field_p';
    for (let index in item.field) {
        let span = $create('span');
        span.className = `field ${item.field[index].class}`; //-- json props
        span.textContent = item.field[index].name; //-- json props
        divtxt.append(span, ' ');
    }

    let date = $create('p');
    date.className = 'field_p date_p';
    date.textContent = item.date;

    document.title = item.name;
    h1.textContent = item.name;
    h1.parentNode.insertBefore(divtxt, h1.nextSibling);
    h1.parentNode.insertBefore(date, divtxt);
}
