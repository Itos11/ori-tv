(function () {
    'use strict';

    if (window.ORITV_PRISMA_FINAL) return;
    window.ORITV_PRISMA_FINAL = true;

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
            id: 'history',
            title: 'История',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<circle cx="12" cy="12" r="8.5"/>' +
                '<path d="M12 7v5l3.5 2"/>' +
                '<path d="M4 7.5V4h3.5"/>' +
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
    var installed = false;
    var current = 1;


    /*
     * =========================================================
     * STYLE
     * =========================================================
     */

    function addStyle() {

        if (document.getElementById('oritv-prisma-final-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'oritv-prisma-final-style';

        style.textContent = `

        .oritv-prisma-nav {
            position: absolute !important;
            left: 50% !important;
            top: 50% !important;
            transform: translate(-50%, -50%) !important;

            display: flex !important;
            align-items: center !important;
            justify-content: center !important;

            flex-direction: row !important;
            flex-wrap: nowrap !important;

            gap: 4px !important;
            padding: 4px !important;
            margin: 0 !important;

            width: max-content !important;
            max-width: 70vw !important;

            height: 52px !important;

            box-sizing: border-box !important;
            overflow: visible !important;
            white-space: nowrap !important;

            z-index: 999999 !important;

            background: rgba(39,40,42,.96) !important;
            border: 1px solid rgba(255,255,255,.07) !important;
            border-radius: 28px !important;

            box-shadow:
                0 5px 22px rgba(0,0,0,.35),
                inset 0 1px 0 rgba(255,255,255,.035) !important;

            backdrop-filter: blur(18px) saturate(120%) !important;
            -webkit-backdrop-filter: blur(18px) saturate(120%) !important;
        }


        .oritv-prisma-item {
            position: relative !important;

            display: flex !important;
            align-items: center !important;
            justify-content: center !important;

            flex: 0 0 auto !important;

            width: auto !important;
            min-width: 0 !important;

            height: 44px !important;

            padding: 0 15px !important;
            margin: 0 !important;

            border-radius: 23px !important;

            box-sizing: border-box !important;

            background: transparent !important;
            color: rgba(255,255,255,.68) !important;

            font-family: Arial,sans-serif !important;
            font-size: 16px !important;
            font-weight: 500 !important;
            line-height: 44px !important;

            white-space: nowrap !important;

            opacity: 1 !important;
            z-index: 1000000 !important;

            cursor: pointer !important;

            transition:
                background .15s ease,
                color .15s ease,
                transform .15s ease !important;
        }


        .oritv-prisma-item svg {
            width: 19px !important;
            height: 19px !important;

            margin-right: 7px !important;

            flex: 0 0 auto !important;

            fill: none !important;
            stroke: currentColor !important;
            stroke-width: 1.65 !important;
            stroke-linecap: round !important;
            stroke-linejoin: round !important;
        }


        .oritv-prisma-text {
            display: inline-block !important;

            color: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
        }


        .oritv-prisma-item.oritv-active,
        .oritv-prisma-item.focus {
            color: #fff !important;
            background: rgba(255,255,255,.14) !important;
            transform: none !important;
        }


        .oritv-prisma-item.focus {
            transform: scale(1.03) !important;
        }


        .oritv-prisma-item.oritv-active::after {
            content: "" !important;

            position: absolute !important;

            left: 50% !important;
            bottom: 2px !important;

            transform: translateX(-50%) !important;

            width: 23px !important;
            height: 3px !important;

            border-radius: 3px !important;

            background: #48f4c4 !important;

            box-shadow:
                0 0 8px rgba(72,244,196,.45) !important;
        }


        .head__time,
        .head__markers,
        .head__fps,
        .head__status {
            display: none !important;
            visibility: hidden !important;
        }


        .head__actions .open--search {
            display: flex !important;
            visibility: visible !important;
            opacity: 1 !important;
        }


        .head__actions .open--settings {
            display: none !important;
            visibility: hidden !important;
        }


        @media (min-width: 1600px) {

            .oritv-prisma-nav {
                height: 54px !important;
                border-radius: 29px !important;
            }

            .oritv-prisma-item {
                height: 46px !important;
                padding: 0 17px !important;
                font-size: 17px !important;
            }

            .oritv-prisma-item svg {
                width: 20px !important;
                height: 20px !important;
            }
        }


        @media (max-width: 1200px) {

            .oritv-prisma-nav {
                max-width: 60vw !important;
                height: 48px !important;
            }

            .oritv-prisma-item {
                height: 40px !important;
                padding: 0 10px !important;
                font-size: 14px !important;
            }

            .oritv-prisma-item svg {
                width: 17px !important;
                height: 17px !important;
                margin-right: 5px !important;
            }
        }

        `;

        document.head.appendChild(style);
    }


    /*
     * =========================================================
     * FIND LAMPA MENU ITEM
     * =========================================================
     */

    function findMenuItem(action) {

        try {

            var item =
                document.querySelector(
                    '.menu__item[data-action="' +
                    action +
                    '"]'
                );

            if (item) {
                return item;
            }

        } catch (e) {}

        return null;
    }


    /*
     * =========================================================
     * ACTIVATE LAMPA MENU
     * =========================================================
     */

    function activateMenuItem(element) {

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


    /*
     * =========================================================
     * HISTORY
     * =========================================================
     */

    function openHistory() {

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
                            title: 'История просмотров',
                            component: 'favorite',
                            type: 'history',
                            page: 1,
                            filter: ''
                        }
                    );

                } catch (e) {}

            },
            250
        );
    }


    /*
     * =========================================================
     * SETTINGS
     * =========================================================
     */

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

            activateMenuItem(settings);

            return;
        }

        try {

            if (
                Lampa.Controller &&
                Lampa.Controller.toggle
            ) {

                Lampa.Controller.toggle('menu');

            }

        } catch (e) {}
    }


    /*
     * =========================================================
     * OPEN SECTION
     * =========================================================
     */

    function openSection(id) {

        if (id === 'history') {

            openHistory();

            return;
        }

        if (id === 'settings') {

            openSettings();

            return;
        }

        var item =
            findMenuItem(id);

        if (item) {

            activateMenuItem(item);

            return;
        }

        setTimeout(
            function () {

                var retry =
                    findMenuItem(id);

                if (retry) {

                    activateMenuItem(retry);

                }

            },
            300
        );
    }


    /*
     * =========================================================
     * ACTIVE
     * =========================================================
     */

    function setActive(index) {

        if (index < 0) {
            index = ITEMS.length - 1;
        }

        if (index >= ITEMS.length) {
            index = 0;
        }

        current = index;

        if (!nav) {
            return;
        }

        var items =
            nav.querySelectorAll(
                '.oritv-prisma-item'
            );

        for (
            var i = 0;
            i < items.length;
            i++
        ) {

            if (i === current) {

                items[i]
                    .classList
                    .add('oritv-active');

            } else {

                items[i]
                    .classList
                    .remove('oritv-active');

            }
        }
    }


    /*
     * =========================================================
     * CREATE BUTTON
     *
     * ЭТО ВАЖНАЯ ЧАСТЬ ИЗ РАБОЧЕГО V4
     * =========================================================
     */

    function createButton(item) {

        var button =
            window.jQuery(
                '<div class="' +
                'head__action ' +
                'selector ' +
                'oritv-prisma-item' +
                '">' +
                '</div>'
            );

        button.html(
            item.icon +
            '<span class="oritv-prisma-text">' +
            item.title +
            '</span>'
        );

        button.attr(
            'data-oritv-action',
            item.id
        );

        button.attr(
            'data-prisma-action',
            item.id
        );


        /*
         * Lampa Remote / Controller
         */

        button.on(
            'hover:focus',
            function () {

                var index =
                    ITEMS.indexOf(item);

                if (index !== -1) {
                    setActive(index);
                }

            }
        );


        button.on(
            'hover:enter',
            function () {

                var index =
                    ITEMS.indexOf(item);

                if (index !== -1) {
                    setActive(index);
                }

                openSection(
                    item.id
                );

            }
        );


        /*
         * Мышь
         */

        button.on(
            'mouseenter',
            function () {

                var index =
                    ITEMS.indexOf(item);

                if (index !== -1) {
                    setActive(index);
                }

            }
        );


        button.on(
            'click',
            function (event) {

                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }

                var index =
                    ITEMS.indexOf(item);

                if (index !== -1) {
                    setActive(index);
                }

                openSection(
                    item.id
                );

            }
        );


        return button;
    }


    /*
     * =========================================================
     * CLEAN HEAD
     * =========================================================
     */

    function cleanHead() {

        var head =
            document.querySelector(
                '.head'
            );

        if (!head) {
            return;
        }

        var body =
            head.querySelector(
                '.head__body'
            );

        if (!body) {
            return;
        }


        var time =
            body.querySelectorAll(
                '.head__time, .head__markers, .head__fps, .head__status'
            );

        for (
            var i = 0;
            i < time.length;
            i++
        ) {

            time[i].style.setProperty(
                'display',
                'none',
                'important'
            );

            time[i].style.setProperty(
                'visibility',
                'hidden',
                'important'
            );
        }


        var actions =
            body.querySelector(
                '.head__actions'
            );

        if (!actions) {
            return;
        }


        var children =
            Array.prototype.slice.call(
                actions.children
            );


        for (
            var j = 0;
            j < children.length;
            j++
        ) {

            var child =
                children[j];


            /*
             * Наша шторка
             */

            if (
                child.classList &&
                child.classList.contains(
                    'oritv-prisma-nav'
                )
            ) {

                continue;
            }


            /*
             * Поиск оставляем
             */

            var cls =
                typeof child.className ===
                'string'
                    ? child.className
                    : '';


            if (
                cls.indexOf(
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

                continue;
            }


            /*
             * Настройки Lampa скрываем
             */

            if (
                cls.indexOf(
                    'open--settings'
                ) !== -1
            ) {

                child.style.setProperty(
                    'display',
                    'none',
                    'important'
                );

                child.style.setProperty(
                    'visibility',
                    'hidden',
                    'important'
                );

                continue;
            }


            /*
             * Остальные штатные кнопки убираем
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


    /*
     * =========================================================
     * INSTALL
     *
     * ТОЧНО ПО ПРИНЦИПУ РАБОЧЕГО PRISMA V4
     * =========================================================
     */

    function install() {

        var head =
            document.querySelector(
                '.head'
            );

        if (!head) {
            return false;
        }

        var actions =
            head.querySelector(
                '.head__actions'
            );

        if (!actions) {
            return false;
        }


        addStyle();

        cleanHead();


        /*
         * Если уже создано —
         * ничего не пересоздаём.
         */

        var old =
            actions.querySelector(
                '.oritv-prisma-nav'
            );

        if (old) {

            nav = old;

            setActive(current);

            installed = true;

            return true;
        }


        /*
         * Создаём контейнер.
         */

        nav =
            document.createElement(
                'div'
            );

        nav.className =
            'oritv-prisma-nav';


        /*
         * Создаём кнопки.
         */

        for (
            var i = 0;
            i < ITEMS.length;
            i++
        ) {

            var button =
                createButton(
                    ITEMS[i]
                );

            nav.appendChild(
                button[0]
            );
        }


        /*
         * ВАЖНО:
         * вставляем именно в .head__actions
         */

        try {

            actions.appendChild(
                nav
            );

        } catch (e) {

            nav = null;

            return false;
        }


        setActive(1);

        cleanHead();

        installed = true;

        return true;
    }


    /*
     * =========================================================
     * OBSERVER
     * =========================================================
     */

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

                    var currentNav =
                        document.querySelector(
                            '.oritv-prisma-nav'
                        );

                    if (
                        !currentNav
                    ) {

                        installed = false;

                        nav = null;

                        install();

                    } else {

                        nav =
                            currentNav;

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


    /*
     * =========================================================
     * START
     * =========================================================
     */

    function start() {

        addStyle();

        startObserver();


        var attempts = 0;

        var timer =
            setInterval(
                function () {

                    attempts++;

                    if (install()) {

                        clearInterval(
                            timer
                        );

                        return;
                    }

                    if (
                        attempts >= 150
                    ) {

                        clearInterval(
                            timer
                        );

                    }

                },
                200
            );
    }


    start();

})();
