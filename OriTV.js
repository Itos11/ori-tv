(function () {
    'use strict';

    /*
     * ORITV
     * Prisma-like navigation for Lampa
     */

    var ITEMS = [
        {
            title: 'ГЛАВНАЯ',
            action: 'main'
        },
        {
            title: 'ИСТОРИЯ',
            action: 'history'
        },
        {
            title: 'ФИЛЬМЫ',
            action: 'movie'
        },
        {
            title: 'СЕРИАЛЫ',
            action: 'tv'
        },
        {
            title: 'МУЛЬТФИЛЬМЫ',
            action: 'cartoon'
        }
    ];


    /* =====================================================
       CSS
       ===================================================== */

    function installCSS() {

        if (document.getElementById('oritv-css')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'oritv-css';

        style.textContent = `

        /* =================================================
           LAMPA HEAD
           ================================================= */

        .head__time {
            display: none !important;
        }

        .head__markers {
            display: none !important;
        }


        /* =================================================
           ШТАТНЫЕ КНОПКИ LAMPA

           0 search       оставить
           1 broadcast    убрать
           2 notice       убрать
           3 settings     оставить
           4 profile      убрать
           5 fullscreen   убрать
           ================================================= */

        .head__actions .open--broadcast,
        .head__actions .open--notice,
        .head__actions .open--profile,
        .head__actions .full--screen {

            display: none !important;

            visibility: hidden !important;

            opacity: 0 !important;

            pointer-events: none !important;
        }


        /* =================================================
           НАША НАВИГАЦИЯ

           ВАЖНО:
           Она НЕ находится внутри head__actions.
           Поэтому Lampa не считает её своей шторкой.
           ================================================= */

        .oritv-nav {

            position: absolute !important;

            left: 50% !important;

            top: 50% !important;

            transform: translate(-50%, -50%) !important;

            display: flex !important;

            flex-direction: row !important;

            align-items: center !important;

            justify-content: center !important;

            flex-wrap: nowrap !important;

            gap: 5px !important;

            width: max-content !important;

            height: 48px !important;

            padding: 0 !important;

            margin: 0 !important;

            z-index: 1000 !important;

            white-space: nowrap !important;

            pointer-events: auto !important;
        }


        /* =================================================
           КНОПКИ
           ================================================= */

        .oritv-nav-item {

            position: relative !important;

            display: flex !important;

            align-items: center !important;

            justify-content: center !important;

            flex: 0 0 auto !important;

            width: auto !important;

            min-width: 0 !important;

            height: 42px !important;

            padding: 0 13px !important;

            margin: 0 !important;

            border-radius: 9px !important;

            box-sizing: border-box !important;

            background: transparent !important;

            color: rgba(255,255,255,.82) !important;

            font-family: Arial, sans-serif !important;

            font-size: 15px !important;

            font-weight: 600 !important;

            line-height: 42px !important;

            white-space: nowrap !important;

            opacity: 1 !important;

            cursor: pointer !important;

            transition:
                background .12s ease,
                transform .12s ease !important;
        }


        /* =================================================
           ФОКУС ПУЛЬТА
           ================================================= */

        .oritv-nav-item.focus {

            background: rgba(255,255,255,.20) !important;

            color: #ffffff !important;

            transform: scale(1.04) !important;
        }


        /* =================================================
           SEARCH
           ================================================= */

        .head__actions .open--search {

            display: flex !important;

            visibility: visible !important;

            opacity: 1 !important;

            pointer-events: auto !important;
        }


        /* =================================================
           SETTINGS
           ================================================= */

        .head__actions .open--settings {

            display: flex !important;

            visibility: visible !important;

            opacity: 1 !important;

            pointer-events: auto !important;
        }


        /* =================================================
           HEAD BODY
           ================================================= */

        .head__body {

            position: relative !important;
        }


        /* =================================================
           TV 1920+
           ================================================= */

        @media (min-width: 1600px) {

            .oritv-nav {

                gap: 7px !important;
            }

            .oritv-nav-item {

                padding-left: 16px !important;

                padding-right: 16px !important;

                font-size: 17px !important;
            }
        }


        /* =================================================
           МАЛЕНЬКИЙ ЭКРАН
           ================================================= */

        @media (max-width: 1200px) {

            .oritv-nav {

                gap: 2px !important;
            }

            .oritv-nav-item {

                padding-left: 8px !important;

                padding-right: 8px !important;

                font-size: 13px !important;
            }
        }

        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       УБИРАЕМ СТАРЫЕ ORITV ШТОРКИ
       ===================================================== */

    function removeOldNavigation() {

        var old =
            document.querySelectorAll(
                '.oritv-nav'
            );

        for (var i = 0; i < old.length; i++) {

            try {

                old[i].parentNode.removeChild(
                    old[i]
                );

            } catch (e) {}
        }
    }


    /* =====================================================
       СКРЫВАЕМ ШТАТНЫЕ ЭЛЕМЕНТЫ
       ===================================================== */

    function cleanLampaHead() {

        var selectors = [

            '.head__actions .open--broadcast',

            '.head__actions .open--notice',

            '.head__actions .open--profile',

            '.head__actions .full--screen'

        ];


        for (
            var i = 0;
            i < selectors.length;
            i++
        ) {

            var elements =
                document.querySelectorAll(
                    selectors[i]
                );


            for (
                var j = 0;
                j < elements.length;
                j++
            ) {

                elements[j].style.display =
                    'none';

                elements[j].style.visibility =
                    'hidden';

                elements[j].style.opacity =
                    '0';

                elements[j].style.pointerEvents =
                    'none';
            }
        }


        var time =
            document.querySelectorAll(
                '.head__time'
            );

        for (
            var t = 0;
            t < time.length;
            t++
        ) {

            time[t].style.display =
                'none';
        }


        var markers =
            document.querySelectorAll(
                '.head__markers'
            );

        for (
            var m = 0;
            m < markers.length;
            m++
        ) {

            markers[m].style.display =
                'none';
        }
    }


    /* =====================================================
       ПОИСК ПУНКТА LAMPA
       ===================================================== */

    function findMenuItem(action) {

        try {

            return document.querySelector(
                '.menu__item[data-action="' +
                action +
                '"]'
            );

        } catch (e) {

            return null;
        }
    }


    /* =====================================================
       ЗАПУСК ПУНКТА
       ===================================================== */

    function activateMenuItem(action) {

        var item =
            findMenuItem(action);


        if (!item) {

            setTimeout(
                function () {

                    var retry =
                        findMenuItem(
                            action
                        );

                    if (retry) {

                        triggerItem(
                            retry
                        );
                    }

                },
                250
            );

            return;
        }


        triggerItem(item);
    }


    function triggerItem(item) {

        try {

            if (
                window.jQuery &&
                window.jQuery.fn
            ) {

                window.jQuery(item)
                    .trigger('hover:enter');

                return;
            }

        } catch (e) {}


        try {

            item.dispatchEvent(
                new CustomEvent(
                    'hover:enter',
                    {
                        bubbles: true,
                        cancelable: true
                    }
                )
            );

        } catch (e) {}
    }


    /* =====================================================
       ИСТОРИЯ
       ===================================================== */

    function openHistory() {

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

        } catch (e) {

            console.log(
                'OriTV history error',
                e
            );
        }
    }


    /* =====================================================
       ACTION
       ===================================================== */

    function runAction(action) {

        if (action === 'history') {

            openHistory();

            return;
        }


        activateMenuItem(
            action
        );
    }


    /* =====================================================
       СОЗДАНИЕ КНОПКИ
       ===================================================== */

    function createButton(item) {

        var button =
            document.createElement(
                'div'
            );


        button.className =
            'oritv-nav-item selector';


        button.textContent =
            item.title;


        button.setAttribute(
            'data-oritv-action',
            item.action
        );


        /* =================================================
           OK ПУЛЬТА
           ================================================= */

        if (window.jQuery) {

            window.jQuery(button).on(
                'hover:enter',
                function () {

                    runAction(
                        item.action
                    );

                }
            );
        }


        /* =================================================
           МЫШЬ
           ================================================= */

        button.addEventListener(
            'click',
            function (event) {

                event.preventDefault();

                event.stopPropagation();

                runAction(
                    item.action
                );

            }
        );


        return button;
    }


    /* =====================================================
       СОЗДАНИЕ НАВИГАЦИИ
       ===================================================== */

    function createNavigation() {

        var head;

        try {

            head =
                Lampa.Head.render();

        } catch (e) {

            return false;
        }


        if (
            !head ||
            !head.length
        ) {

            return false;
        }


        var body =
            head.find(
                '.head__body'
            );


        if (
            !body ||
            !body.length
        ) {

            return false;
        }


        /*
         * На всякий случай удаляем старую.
         */

        removeOldNavigation();


        /*
         * Создаём ЕДИНСТВЕННУЮ навигацию.
         */

        var nav =
            document.createElement(
                'div'
            );


        nav.className =
            'oritv-nav';


        for (
            var i = 0;
            i < ITEMS.length;
            i++
        ) {

            nav.appendChild(
                createButton(
                    ITEMS[i]
                )
            );
        }


        /*
         * КЛЮЧЕВОЕ ОТЛИЧИЕ:
         *
         * добавляем в head__body,
         * а НЕ в head__actions.
         */

        body[0].appendChild(
            nav
        );


        return true;
    }


    /* =====================================================
       START
       ===================================================== */

    function start() {

        installCSS();

        cleanLampaHead();


        if (
            document.querySelector(
                '.oritv-nav'
            )
        ) {

            return true;
        }


        return createNavigation();
    }


    /* =====================================================
       ЖДЁМ LAMPA
       ===================================================== */

    var attempts = 0;

    var timer =
        setInterval(
            function () {

                attempts++;


                cleanLampaHead();


                if (start()) {

                    clearInterval(
                        timer
                    );

                    return;
                }


                if (attempts > 150) {

                    clearInterval(
                        timer
                    );
                }

            },
            200
        );


    /* =====================================================
       ЕСЛИ LAMPA ПОТОМ ПЕРЕСОЗДАСТ HEAD
       ===================================================== */

    var observer =
        new MutationObserver(
            function () {

                cleanLampaHead();

            }
        );


    try {

        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );

    } catch (e) {}


})();
