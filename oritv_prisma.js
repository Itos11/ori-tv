(function () {
    'use strict';

    if (window.ORITV_PRISMA_UI) return;
    window.ORITV_PRISMA_UI = true;

    var ITEMS = [
        {
            id: 'main',
            title: 'Главная',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<path d="M3.5 10.5 12 3l8.5 7.5"/>' +
                '<path d="M5.5 9.5V21h13V9.5"/>' +
                '<path d="M9.5 21v-5h5v5"/>' +
                '</svg>'
        },
        {
            id: 'movie',
            title: 'Фильмы',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<rect x="3" y="4" width="18" height="16" rx="3"/>' +
                '<path d="M10 8.5 15.5 12 10 15.5Z" fill="currentColor" stroke="none"/>' +
                '</svg>'
        },
        {
            id: 'tv',
            title: 'Сериалы',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<rect x="3" y="4" width="18" height="16" rx="3"/>' +
                '<path d="M7 8h10"/>' +
                '<path d="M7 12h6"/>' +
                '<path d="M7 16h8"/>' +
                '</svg>'
        },
        {
            id: 'feed',
            title: 'Свайп',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<rect x="4" y="4" width="16" height="16" rx="4"/>' +
                '<circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/>' +
                '<circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none"/>' +
                '<circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none"/>' +
                '<circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"/>' +
                '</svg>'
        },
        {
            id: 'settings',
            title: 'Настройки',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<circle cx="12" cy="12" r="3"/>' +
                '<path d="M19 13.5l1.2 1-.9 1.6-1.6-.5a7.5 7.5 0 0 1-1.4 1.2l-.2 1.7h-1.9l-.7-1.6a7.7 7.7 0 0 1-1.5.2l-1 1.4-1.7-.8.3-1.7a7.4 7.4 0 0 1-1.3-1.3l-1.7.2-.6-1.8 1.4-1a7.5 7.5 0 0 1 0-1.7l-1.4-1 .6-1.8 1.7.2A7.4 7.4 0 0 1 8.6 7l-.3-1.7 1.7-.8 1 1.4a7.7 7.7 0 0 1 1.5.2l.7-1.6h1.9l.2 1.7a7.5 7.5 0 0 1 1.4 1.2l1.6-.5.9 1.6-1.2 1a7.5 7.5 0 0 1 0 1.7Z"/>' +
                '</svg>'
        }
    ];

    var nav = null;
    var buttons = [];
    var current = 0;
    var timer = null;


    /* =========================================================
       STYLE
       ========================================================= */

    function addStyle() {

        if (document.getElementById('oritv-prisma-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'oritv-prisma-style';

        style.textContent = `

/* =========================================================
   ORITV / PRISMA STYLE HEADER
   ========================================================= */

.oritv-prisma-nav {

    position: fixed !important;

    top: 8px !important;
    left: 50% !important;

    transform: translateX(-50%) !important;

    z-index: 9999999 !important;

    height: 52px !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    padding: 4px !important;
    margin: 0 !important;

    width: max-content !important;
    max-width: calc(100vw - 260px) !important;

    box-sizing: border-box !important;

    background:
        rgba(39,40,42,.96) !important;

    border:
        1px solid rgba(255,255,255,.07) !important;

    border-radius:
        28px !important;

    box-shadow:
        0 5px 22px rgba(0,0,0,.35),
        inset 0 1px 0 rgba(255,255,255,.035) !important;

    backdrop-filter:
        blur(18px) saturate(120%) !important;

    -webkit-backdrop-filter:
        blur(18px) saturate(120%) !important;

    overflow:
        visible !important;

    white-space:
        nowrap !important;
}


/* ---------------------------------------------------------
   ITEM
   --------------------------------------------------------- */

.oritv-prisma-item {

    position: relative !important;

    display: flex !important;

    align-items: center !important;
    justify-content: center !important;

    height: 44px !important;

    padding:
        0 15px !important;

    margin:
        0 !important;

    border-radius:
        23px !important;

    box-sizing:
        border-box !important;

    flex:
        0 0 auto !important;

    color:
        rgba(255,255,255,.68) !important;

    background:
        transparent !important;

    font-family:
        Arial, sans-serif !important;

    font-size:
        16px !important;

    font-weight:
        500 !important;

    line-height:
        44px !important;

    white-space:
        nowrap !important;

    cursor:
        pointer !important;

    transition:
        background .15s ease,
        color .15s ease,
        transform .15s ease !important;
}


/* ---------------------------------------------------------
   ICON
   --------------------------------------------------------- */

.oritv-prisma-item svg {

    width:
        19px !important;

    height:
        19px !important;

    margin-right:
        7px !important;

    flex:
        0 0 auto !important;

    fill:
        none !important;

    stroke:
        currentColor !important;

    stroke-width:
        1.65 !important;

    stroke-linecap:
        round !important;

    stroke-linejoin:
        round !important;
}


/* ---------------------------------------------------------
   TEXT
   --------------------------------------------------------- */

.oritv-prisma-text {

    display:
        inline-block !important;

    color:
        inherit !important;

    font-size:
        inherit !important;

    font-weight:
        inherit !important;

    line-height:
        inherit !important;
}


/* ---------------------------------------------------------
   ACTIVE
   --------------------------------------------------------- */

.oritv-prisma-item.oritv-active {

    color:
        #ffffff !important;

    background:
        rgba(255,255,255,.14) !important;

    transform:
        none !important;
}


/* ---------------------------------------------------------
   TURQUOISE UNDERLINE
   --------------------------------------------------------- */

.oritv-prisma-item.oritv-active::after {

    content:
        "" !important;

    position:
        absolute !important;

    left:
        50% !important;

    bottom:
        2px !important;

    transform:
        translateX(-50%) !important;

    width:
        23px !important;

    height:
        3px !important;

    border-radius:
        3px !important;

    background:
        #48f4c4 !important;

    box-shadow:
        0 0 8px rgba(72,244,196,.45) !important;
}


/* ---------------------------------------------------------
   LAMPA HEADER
   --------------------------------------------------------- */

.head__time,
.head__markers,
.head__fps,
.head__status {

    display:
        none !important;

    visibility:
        hidden !important;
}


/* ---------------------------------------------------------
   SEARCH
   --------------------------------------------------------- */

.head__actions .open--search {

    display:
        flex !important;

    visibility:
        visible !important;

    opacity:
        1 !important;
}


/* ---------------------------------------------------------
   NATIVE SETTINGS
   --------------------------------------------------------- */

.head__actions .open--settings {

    display:
        none !important;

    visibility:
        hidden !important;
}


/* ---------------------------------------------------------
   LARGE SCREEN
   --------------------------------------------------------- */

@media (min-width: 1600px) {

    .oritv-prisma-nav {

        height:
            54px !important;

        padding:
            4px !important;

        border-radius:
            29px !important;
    }

    .oritv-prisma-item {

        height:
            46px !important;

        padding:
            0 17px !important;

        font-size:
            17px !important;
    }

    .oritv-prisma-item svg {

        width:
            20px !important;

        height:
            20px !important;
    }
}


/* ---------------------------------------------------------
   SMALL SCREEN
   --------------------------------------------------------- */

@media (max-width: 1200px) {

    .oritv-prisma-nav {

        max-width:
            calc(100vw - 180px) !important;

        height:
            48px !important;
    }

    .oritv-prisma-item {

        height:
            40px !important;

        padding:
            0 10px !important;

        font-size:
            14px !important;
    }

    .oritv-prisma-item svg {

        width:
            17px !important;

        height:
            17px !important;

        margin-right:
            5px !important;
    }
}

`;

        document.head.appendChild(style);
    }


    /* =========================================================
       NATIVE LAMPA MENU
       ========================================================= */

    function findMenuItem(action) {

        var item = null;

        try {

            item =
                document.querySelector(
                    '.menu__item[data-action="' +
                    action +
                    '"]'
                );

            if (item) {
                return item;
            }

        } catch (e) {}


        /*
         * Если data-action нет,
         * ищем по тексту.
         */

        var words = {
            main: ['главная', 'главн'],
            movie: ['фильмы', 'фильм'],
            tv: ['сериалы', 'сериал'],
            feed: ['свайп', 'лента', 'feed'],
            settings: ['настройки', 'настрой']
        };

        var list =
            words[action] || [];

        try {

            var nodes =
                document.querySelectorAll(
                    '.menu__item'
                );

            for (
                var i = 0;
                i < nodes.length;
                i++
            ) {

                var text =
                    (
                        nodes[i].textContent ||
                        ''
                    )
                    .trim()
                    .toLowerCase();

                for (
                    var j = 0;
                    j < list.length;
                    j++
                ) {

                    if (
                        text.indexOf(
                            list[j]
                        ) !== -1
                    ) {

                        return nodes[i];
                    }
                }
            }

        } catch (e) {}

        return null;
    }


    /* =========================================================
       ACTIVATE LAMPA ITEM
       ========================================================= */

    function activate(element) {

        if (!element) {
            return false;
        }

        try {

            if (
                window.jQuery &&
                window.jQuery.fn &&
                window.jQuery.fn.trigger
            ) {

                window.jQuery(element)
                    .trigger('hover:enter');

                return true;
            }

        } catch (e) {}


        try {

            element.dispatchEvent(
                new CustomEvent(
                    'hover:enter',
                    {
                        bubbles: true,
                        cancelable: true
                    }
                )
            );

            return true;

        } catch (e) {}

        return false;
    }


    /* =========================================================
       SETTINGS
       ========================================================= */

    function openSettings() {

        var settings = null;

        try {

            settings =
                document.querySelector(
                    '.head__actions .open--settings'
                );

            if (!settings) {

                settings =
                    document.querySelector(
                        '.open--settings'
                    );
            }

        } catch (e) {}


        if (settings) {

            activate(settings);

            return;
        }


        var menuItem =
            findMenuItem('settings');

        if (menuItem) {

            activate(menuItem);

            return;
        }


        /*
         * Последний вариант —
         * открыть штатное меню Lampa.
         */

        try {

            if (
                Lampa.Controller &&
                Lampa.Controller.toggle
            ) {

                Lampa.Controller.toggle(
                    'menu'
                );
            }

        } catch (e) {}
    }


    /* =========================================================
       OPEN SECTION
       ========================================================= */

    function openSection(id) {

        if (id === 'settings') {

            openSettings();

            return;
        }


        var element =
            findMenuItem(id);

        if (element) {

            activate(element);

            return;
        }


        /*
         * Если элемент появляется
         * после открытия Lampa —
         * пробуем ещё раз.
         */

        setTimeout(
            function () {

                var retry =
                    findMenuItem(id);

                if (retry) {

                    activate(retry);
                }

            },
            300
        );
    }


    /* =========================================================
       ACTIVE ITEM
       ========================================================= */

    function setActive(index) {

        if (index < 0) {
            index = ITEMS.length - 1;
        }

        if (
            index >= ITEMS.length
        ) {
            index = 0;
        }

        current = index;

        for (
            var i = 0;
            i < buttons.length;
            i++
        ) {

            if (i === current) {

                buttons[i].classList.add(
                    'oritv-active'
                );

            } else {

                buttons[i].classList.remove(
                    'oritv-active'
                );
            }
        }
    }


    /* =========================================================
       CREATE NAV
       ========================================================= */

    function createNav() {

        if (nav) {

            if (
                document.body.contains(nav)
            ) {
                return;
            }

            nav = null;
        }


        nav =
            document.createElement('div');

        nav.className =
            'oritv-prisma-nav';


        buttons = [];


        for (
            var i = 0;
            i < ITEMS.length;
            i++
        ) {

            (function (index) {

                var data =
                    ITEMS[index];

                var button =
                    document.createElement('div');

                button.className =
                    'oritv-prisma-item selector';


                button.setAttribute(
                    'data-oritv-action',
                    data.id
                );


                button.innerHTML =
                    data.icon +
                    '<span class="oritv-prisma-text">' +
                    data.title +
                    '</span>';


                /*
                 * МЫШЬ
                 */

                button.addEventListener(
                    'mouseenter',
                    function () {

                        setActive(index);
                    }
                );


                button.addEventListener(
                    'click',
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        setActive(index);

                        openSection(
                            data.id
                        );
                    }
                );


                /*
                 * Lampa TV / пульт
                 */

                if (window.jQuery) {

                    try {

                        window.jQuery(button).on(
                            'hover:focus',
                            function () {

                                setActive(index);
                            }
                        );


                        window.jQuery(button).on(
                            'hover:enter',
                            function () {

                                setActive(index);

                                openSection(
                                    data.id
                                );
                            }
                        );

                    } catch (e) {}
                }


                buttons.push(button);

                nav.appendChild(
                    button
                );

            })(i);
        }


        document.body.appendChild(nav);


        /*
         * По умолчанию —
         * Фильмы, как на Prisma-скрине.
         */

        setActive(1);
    }


    /* =========================================================
       REMOVE NATIVE EXTRA BUTTONS
       ========================================================= */

    function cleanHead() {

        var actions = null;

        try {

            if (
                Lampa.Head &&
                Lampa.Head.render
            ) {

                actions =
                    Lampa.Head.render()
                        .querySelector(
                            '.head__actions'
                        );
            }

        } catch (e) {}


        if (!actions) {

            actions =
                document.querySelector(
                    '.head__actions'
                );
        }


        if (!actions) return;


        var children =
            Array.prototype.slice.call(
                actions.children
            );


        for (
            var i = 0;
            i < children.length;
            i++
        ) {

            var child =
                children[i];


            /*
             * Наша навигация
             */

            if (
                child === nav ||
                child.classList.contains(
                    'oritv-prisma-nav'
                )
            ) {

                continue;
            }


            /*
             * Поиск оставляем.
             */

            var classes =
                typeof child.className ===
                'string'
                    ? child.className
                    : '';


            if (
                classes.indexOf(
                    'open--search'
                ) !== -1
            ) {

                continue;
            }


            /*
             * Настройки Lampa скрываем.
             */

            if (
                classes.indexOf(
                    'open--settings'
                ) !== -1
            ) {

                child.style.setProperty(
                    'display',
                    'none',
                    'important'
                );

                continue;
            }


            /*
             * Всё остальное —
             * broadcast / notice /
             * profile / fullscreen
             */

            try {

                child.remove();

            } catch (e) {

                child.style.setProperty(
                    'display',
                    'none',
                    'important'
                );
            }
        }
    }


    /* =========================================================
       INSTALL
       ========================================================= */

    function install() {

        addStyle();

        createNav();

        cleanHead();
    }


    /* =========================================================
       WATCH LAMPA
       ========================================================= */

    function startObserver() {

        if (
            typeof MutationObserver ===
            'undefined'
        ) {
            return;
        }


        var observer =
            new MutationObserver(
                function () {

                    /*
                     * Lampa иногда пересоздаёт Head.
                     * В таком случае возвращаем
                     * нашу навигацию.
                     */

                    if (
                        !nav ||
                        !document.body.contains(nav)
                    ) {

                        createNav();
                    }


                    cleanHead();
                }
            );


        if (document.body) {

            observer.observe(
                document.body,
                {
                    childList: true,
                    subtree: true
                }
            );
        }
    }


    /* =========================================================
       START
       ========================================================= */

    function start() {

        if (!document.body) {

            setTimeout(
                start,
                200
            );

            return;
        }


        install();

        startObserver();
    }


    start();

})();
