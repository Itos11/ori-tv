(function () {
    'use strict';

    if (window.ORITV_PRISMA_UI_V3) return;
    window.ORITV_PRISMA_UI_V3 = true;

    if (!window.Lampa) return;


    /* =========================================================
       ITEMS
       ========================================================= */

    var ITEMS = [
        {
            id: 'main',
            title: 'Главная',
            icon: '<svg viewBox="0 0 24 24"><path d="M3.5 10.5 12 3l8.5 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-5h5v5"/></svg>'
        },
        {
            id: 'history',
            title: 'История',
            icon: '<svg viewBox="0 0 24 24"><path d="M4 12a8 8 0 1 0 2.3-5.7"/><path d="M4 5v5h5"/><path d="M12 7v5l3.5 2"/></svg>'
        },
        {
            id: 'movie',
            title: 'Фильмы',
            icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M10 8.5 15.5 12 10 15.5Z" fill="currentColor" stroke="none"/></svg>'
        },
        {
            id: 'tv',
            title: 'Сериалы',
            icon: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="3"/><path d="M7 8h10"/><path d="M7 12h6"/><path d="M7 16h8"/></svg>'
        },
        {
            id: 'settings',
            title: 'Настройки',
            icon: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 13.5l1.2 1-.9 1.6-1.6-.5a7.5 7.5 0 0 1-1.4 1.2l-.2 1.7h-1.9l-.7-1.6a7.7 7.7 0 0 1-1.5.2l-1 1.4-1.7-.8.3-1.7a7.4 7.4 0 0 1-1.3-1.3l-1.7.2-.6-1.8 1.4-1a7.5 7.5 0 0 1 0-1.7l-1.4-1 .6-1.8 1.7.2A7.4 7.4 0 0 1 8.6 7l-.3-1.7 1.7-.8 1 1.4a7.7 7.7 0 0 1 1.5.2l.7-1.6h1.9l.2 1.7a7.5 7.5 0 0 1 1.4 1.2l1.6-.5.9 1.6-1.2 1a7.5 7.5 0 0 1 0 1.7Z"/></svg>'
        }
    ];


    var nav = null;
    var buttons = [];

    /*
     * По умолчанию Фильмы
     */
    var current = 2;

    /*
     * Сейчас фокус находится
     * в верхней навигации
     */
    var navFocused = false;

    var observerStarted = false;
    var keyboardStarted = false;


    /* =========================================================
       STYLE
       ========================================================= */

    function addStyle() {

        if (
            document.getElementById(
                'oritv-prisma-style-v3'
            )
        ) return;


        var style =
            document.createElement('style');


        style.id =
            'oritv-prisma-style-v3';


        style.textContent = `

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

    max-width:
        calc(100vw - 260px) !important;

    box-sizing: border-box !important;

    background:
        rgba(39,40,42,.96) !important;

    border:
        1px solid rgba(255,255,255,.07) !important;

    border-radius:
        28px !important;

    box-shadow:
        0 5px 22px rgba(0,0,0,.38),
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


/* =========================================================
   ITEM
   ========================================================= */

.oritv-prisma-item {

    position: relative !important;

    display: flex !important;

    align-items: center !important;
    justify-content: center !important;

    height: 44px !important;

    padding: 0 15px !important;

    margin: 0 !important;

    border-radius: 23px !important;

    box-sizing: border-box !important;

    flex: 0 0 auto !important;

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
        background .12s ease,
        color .12s ease !important;
}


/* =========================================================
   FOCUS
   ========================================================= */

.oritv-prisma-item.oritv-focused {

    color:
        #ffffff !important;

    background:
        rgba(255,255,255,.17) !important;

    box-shadow:
        0 2px 12px rgba(0,0,0,.20) !important;
}


/* =========================================================
   ACTIVE
   ========================================================= */

.oritv-prisma-item.oritv-active {

    color:
        #ffffff !important;

    background:
        rgba(255,255,255,.12) !important;
}


/* =========================================================
   FOCUS LINE
   ========================================================= */

.oritv-prisma-item.oritv-focused::after {

    content: "" !important;

    position: absolute !important;

    left: 50% !important;

    bottom: 2px !important;

    transform:
        translateX(-50%) !important;

    width: 24px !important;

    height: 3px !important;

    border-radius: 3px !important;

    background:
        #48f4c4 !important;

    box-shadow:
        0 0 9px rgba(72,244,196,.55) !important;
}


/* =========================================================
   ACTIVE LINE
   ========================================================= */

.oritv-prisma-item.oritv-active::after {

    content: "" !important;

    position: absolute !important;

    left: 50% !important;

    bottom: 2px !important;

    transform:
        translateX(-50%) !important;

    width: 18px !important;

    height: 2px !important;

    border-radius: 3px !important;

    background:
        rgba(72,244,196,.65) !important;
}


/* =========================================================
   ICON
   ========================================================= */

.oritv-prisma-item svg {

    width: 19px !important;

    height: 19px !important;

    margin-right: 7px !important;

    flex: 0 0 auto !important;

    fill: none !important;

    stroke:
        currentColor !important;

    stroke-width: 1.65 !important;

    stroke-linecap: round !important;

    stroke-linejoin: round !important;
}


/* =========================================================
   TEXT
   ========================================================= */

.oritv-prisma-text {

    display:
        inline-block !important;

    color:
        inherit !important;

    line-height:
        inherit !important;
}


/* =========================================================
   LAMPA HEADER
   ========================================================= */

.head__time,
.head__markers,
.head__fps,
.head__status {

    display:
        none !important;

    visibility:
        hidden !important;
}


/* =========================================================
   SEARCH
   ========================================================= */

.head__actions .open--search {

    display:
        flex !important;

    visibility:
        visible !important;

    opacity:
        1 !important;
}


/* =========================================================
   NATIVE SETTINGS
   ========================================================= */

.head__actions .open--settings {

    display:
        none !important;

    visibility:
        hidden !important;
}


/* =========================================================
   BIG SCREEN
   ========================================================= */

@media (min-width: 1600px) {

    .oritv-prisma-nav {

        height:
            54px !important;

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


/* =========================================================
   SMALL SCREEN
   ========================================================= */

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
       FIND LAMPA MENU
       ========================================================= */

    function findMenuItem(action) {

        var item = null;


        /*
         * Сначала настоящий data-action
         */

        try {

            item =
                document.querySelector(
                    '.menu__item[data-action="' +
                    action +
                    '"]'
                );


            if (item) return item;

        } catch (e) {}


        /*
         * Потом поиск по тексту
         */

        var words = {

            main: [
                'главная',
                'главн',
                'home'
            ],

            movie: [
                'фильмы',
                'фильм',
                'movie'
            ],

            tv: [
                'сериалы',
                'сериал',
                'tv'
            ],

            settings: [
                'настройки',
                'настрой',
                'settings'
            ]
        };


        var search =
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
                    j < search.length;
                    j++
                ) {

                    if (
                        text.indexOf(
                            search[j]
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
       ACTIVATE
       ========================================================= */

    function activate(element) {

        if (!element) return false;


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
       HISTORY
       ========================================================= */

    function openHistory() {

        navFocused = false;

        updateFocus();


        try {

            if (
                Lampa.Favorite &&
                Lampa.Favorite.read
            ) {

                Lampa.Favorite.read();
            }

        } catch (e) {}


        setTimeout(
            function () {

                try {

                    Lampa.Router.call(
                        'favorite',
                        {
                            url: '',
                            title:
                                'История просмотров',
                            component:
                                'favorite',
                            type:
                                'history',
                            page:
                                1,
                            filter:
                                ''
                        }
                    );

                } catch (e) {}

            },
            250
        );
    }


    /* =========================================================
       SETTINGS
       ========================================================= */

    function openSettings() {

        navFocused = false;

        updateFocus();


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


        var item =
            findMenuItem('settings');


        if (item) {

            activate(item);

            return;
        }


        try {

            Lampa.Controller.toggle(
                'menu'
            );

        } catch (e) {}
    }


    /* =========================================================
       OPEN SECTION
       ========================================================= */

    function openSection(id) {

        /*
         * ИСТОРИЯ
         */

        if (id === 'history') {

            openHistory();

            return;
        }


        /*
         * НАСТРОЙКИ
         */

        if (id === 'settings') {

            openSettings();

            return;
        }


        /*
         * ГЛАВНАЯ / ФИЛЬМЫ / СЕРИАЛЫ
         */

        var item =
            findMenuItem(id);


        if (item) {

            navFocused = false;

            updateFocus();


            setTimeout(
                function () {

                    activate(item);

                },
                50
            );

            return;
        }


        /*
         * Lampa может создать меню
         * чуть позже.
         */

        setTimeout(
            function () {

                var retry =
                    findMenuItem(id);


                if (retry) {

                    navFocused = false;

                    updateFocus();

                    activate(retry);
                }

            },
            350
        );
    }


    /* =========================================================
       ACTIVE
       ========================================================= */

    function setActive(index) {

        if (index < 0) {

            index =
                ITEMS.length - 1;
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


        updateFocus();
    }


    /* =========================================================
       FOCUS
       ========================================================= */

    function updateFocus() {

        for (
            var i = 0;
            i < buttons.length;
            i++
        ) {

            buttons[i].classList.toggle(
                'oritv-focused',
                navFocused &&
                i === current
            );
        }
    }


    /* =========================================================
       ENTER NAVIGATION
       ========================================================= */

    function focusNavigation() {

        if (!nav) {

            createNav();
        }


        navFocused = true;


        updateFocus();


        /*
         * Настоящий Lampa focus
         */

        try {

            if (
                Lampa.Controller &&
                Lampa.Controller.collectionFocus
            ) {

                Lampa.Controller.collectionFocus(
                    buttons[current],
                    nav
                );
            }

        } catch (e) {}
    }


    /* =========================================================
       LEAVE NAVIGATION
       ========================================================= */

    function leaveNavigation() {

        navFocused = false;

        updateFocus();


        /*
         * Возвращаем управление
         * контенту Lampa.
         */

        try {

            if (
                Lampa.Controller &&
                Lampa.Controller.toggle
            ) {

                Lampa.Controller.toggle(
                    'content'
                );
            }

        } catch (e) {}
    }


    /* =========================================================
       KEYBOARD / REMOTE
       ========================================================= */

    function installKeyboard() {

        if (keyboardStarted) return;

        keyboardStarted = true;


        document.addEventListener(
            'keydown',
            function (event) {

                var code =
                    event.keyCode;


                /*
                 * ==============================================
                 * ФОКУС В НАШЕЙ НАВИГАЦИИ
                 * ==============================================
                 */

                if (navFocused) {


                    /*
                     * LEFT
                     */

                    if (code === 37) {

                        event.preventDefault();
                        event.stopPropagation();

                        setActive(
                            current - 1
                        );

                        return;
                    }


                    /*
                     * RIGHT
                     */

                    if (code === 39) {

                        event.preventDefault();
                        event.stopPropagation();

                        setActive(
                            current + 1
                        );

                        return;
                    }


                    /*
                     * OK / ENTER
                     */

                    if (
                        code === 13 ||
                        code === 23
                    ) {

                        event.preventDefault();
                        event.stopPropagation();

                        openSection(
                            ITEMS[current].id
                        );

                        return;
                    }


                    /*
                     * DOWN
                     */

                    if (code === 40) {

                        event.preventDefault();
                        event.stopPropagation();

                        leaveNavigation();

                        return;
                    }


                    /*
                     * BACK
                     */

                    if (
                        code === 27 ||
                        code === 461
                    ) {

                        event.preventDefault();
                        event.stopPropagation();

                        leaveNavigation();

                        return;
                    }


                    return;
                }


                /*
                 * ==============================================
                 * ОБЫЧНЫЙ LAMPA
                 * ==============================================
                 *
                 * UP переводит фокус наверх.
                 */

                if (code === 38) {

                    focusNavigation();

                    return;
                }

            },
            true
        );
    }


    /* =========================================================
       CREATE NAV
       ========================================================= */

    function createNav() {

        if (
            nav &&
            document.body.contains(nav)
        ) {

            return;
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
                 * Мышь
                 */

                button.addEventListener(
                    'mouseenter',
                    function () {

                        current =
                            index;

                        navFocused =
                            true;

                        setActive(index);
                    }
                );


                /*
                 * Мышь click
                 */

                button.addEventListener(
                    'click',
                    function (event) {

                        event.preventDefault();
                        event.stopPropagation();

                        current =
                            index;

                        navFocused =
                            true;

                        setActive(index);

                        openSection(
                            data.id
                        );
                    }
                );


                /*
                 * Lampa hover
                 */

                if (window.jQuery) {

                    try {

                        window.jQuery(button).on(
                            'hover:focus',
                            function () {

                                current =
                                    index;

                                navFocused =
                                    true;

                                setActive(
                                    index
                                );
                            }
                        );


                        window.jQuery(button).on(
                            'hover:enter',
                            function () {

                                current =
                                    index;

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


        document.body.appendChild(
            nav
        );


        /*
         * Фильмы активны
         */

        setActive(current);
    }


    /* =========================================================
       CLEAN LAMPA HEAD
       ========================================================= */

    function cleanHead() {

        var actions = null;


        try {

            if (
                Lampa.Head &&
                Lampa.Head.render
            ) {

                var head =
                    Lampa.Head.render();


                if (head) {

                    actions =
                        head.querySelector(
                            '.head__actions'
                        );
                }
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
             * Нашу навигацию не трогаем.
             */

            if (
                child === nav
            ) {

                continue;
            }


            var classes =
                typeof child.className ===
                'string'
                    ? child.className
                    : '';


            /*
             * Поиск оставляем.
             */

            if (
                classes.indexOf(
                    'open--search'
                ) !== -1
            ) {

                child.style.setProperty(
                    'display',
                    'flex',
                    'important'
                );

                child.style.setProperty(
                    'visibility',
                    'visible',
                    'important'
                );

                child.style.setProperty(
                    'opacity',
                    '1',
                    'important'
                );

                continue;
            }


            /*
             * Настройки скрываем.
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
             * Остальные штатные иконки.
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

        if (!document.body) return;

        addStyle();

        createNav();

        cleanHead();

        installKeyboard();
    }


    /* =========================================================
       OBSERVER
       ========================================================= */

    function startObserver() {

        if (observerStarted) return;

        observerStarted = true;


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
                     * Lampa могла пересоздать DOM.
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


        observer.observe(
            document.body,
            {
                childList:
                    true,

                subtree:
                    true
            }
        );
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
