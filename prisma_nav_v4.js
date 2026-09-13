(function () {
    'use strict';

    if (window.PRISMA_NAV_V4) return;
    window.PRISMA_NAV_V4 = true;

    var ITEMS = [
        { title: 'ГЛАВНОЕ', action: 'main' },
        { title: 'ИСТОРИЯ', action: 'history' },
        { title: 'ФИЛЬМЫ', action: 'movie' },
        { title: 'СЕРИАЛЫ', action: 'tv' },
        { title: 'МУЛЬТФИЛЬМЫ', action: 'cartoon' }
    ];

    var installed = false;


    /* =========================================================
       СТИЛИ
       ========================================================= */

    function addStyle() {

        if (document.getElementById('prisma-v4-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-v4-style';

        style.textContent = `

            /*
             * =================================================
             * НАША ПАНЕЛЬ
             * =================================================
             */

            .prisma-v4-container {
                position: absolute !important;
                left: 50% !important;
                top: 50% !important;
                transform: translate(-50%, -50%) !important;

                height: auto !important;

                display: flex !important;
                align-items: center !important;
                justify-content: center !important;

                flex-direction: row !important;
                flex-wrap: nowrap !important;

                gap: 4px !important;
                padding: 10px !important;
                margin: 0 !important;

                width: max-content !important;
                max-width: 70vw !important;

                box-sizing: border-box !important;
                overflow: visible !important;
                white-space: nowrap !important;

                z-index: 999999 !important;

                background: rgba(22,22,24,.94) !important;
                border: 1px solid rgba(255,255,255,.08) !important;
                border-radius: 18px !important;

                box-shadow:
                    0 18px 60px rgba(0,0,0,.60),
                    0 4px 20px rgba(0,0,0,.35) !important;

                backdrop-filter: blur(22px) !important;
                -webkit-backdrop-filter: blur(22px) !important;
            }


            /*
             * =================================================
             * НАШИ КНОПКИ
             * =================================================
             */

            .prisma-v4-item {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                flex: 0 0 auto !important;

                width: auto !important;
                min-width: 0 !important;

                height: 46px !important;
                padding: 0 17px !important;
                margin: 0 !important;

                border-radius: 12px !important;
                box-sizing: border-box !important;

                background: transparent !important;
                color: rgba(255,255,255,.62) !important;

                font-family: Arial, sans-serif !important;
                font-size: 15px !important;
                font-weight: 500 !important;
                line-height: 46px !important;

                white-space: nowrap !important;
                opacity: 1 !important;
                z-index: 1000000 !important;

                transition:
                    transform .18s ease,
                    background .18s ease,
                    color .18s ease !important;
            }


            /*
             * =================================================
             * ФОКУС
             * =================================================
             */

            .prisma-v4-item.focus {
                color: #ffffff !important;
                background: rgba(255,255,255,.16) !important;
                opacity: 1 !important;
                transform: scale(1.04) !important;

                box-shadow:
                    0 4px 18px rgba(0,0,0,.25),
                    inset 0 1px rgba(255,255,255,.08) !important;
            }


            /*
             * =================================================
             * ПОИСК И НАСТРОЙКИ
             * =================================================
             */

            .head__actions .open--search,
            .head__actions .open--settings {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;
            }


            /*
             * =================================================
             * БОЛЬШОЙ ЭКРАН
             * =================================================
             */

            @media (min-width: 1600px) {

                .prisma-v4-container {
                    gap: 6px !important;
                }

                .prisma-v4-item {
                    padding-left: 16px !important;
                    padding-right: 16px !important;

                    font-size: 18px !important;
                }
            }


            /*
             * =================================================
             * МАЛЕНЬКИЙ ЭКРАН
             * =================================================
             */

            @media (max-width: 1200px) {

                .prisma-v4-container {
                    gap: 1px !important;

                    max-width: 60vw !important;
                }

                .prisma-v4-item {
                    padding-left: 8px !important;
                    padding-right: 8px !important;

                    font-size: 14px !important;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* =========================================================
       ЖЁСТКО СКРЫВАЕМ ЛИШНЕЕ
       ========================================================= */

    function hideElement(element) {

        if (!element) {
            return;
        }

        try {

            element.style.setProperty(
                'display',
                'none',
                'important'
            );

            element.style.setProperty(
                'visibility',
                'hidden',
                'important'
            );

        } catch (e) {

            try {
                element.style.display = 'none';
            } catch (ee) {}
        }
    }


    /* =========================================================
       ПРОВЕРКА — ПОИСК
       ========================================================= */

    function isSearch(element) {

        if (!element) {
            return false;
        }

        var cls =
            typeof element.className === 'string'
                ? element.className
                : '';

        if (
            cls.indexOf('open--search') !== -1
        ) {
            return true;
        }


        try {

            if (
                element.querySelector(
                    '.open--search'
                )
            ) {
                return true;
            }

        } catch (e) {}


        /*
         * Дополнительная проверка SVG.
         */

        try {

            var use =
                element.querySelector(
                    'use'
                );

            if (use) {

                var href =
                    use.getAttribute(
                        'xlink:href'
                    ) ||
                    use.getAttribute(
                        'href'
                    ) ||
                    '';

                if (
                    href.indexOf('search') !== -1
                ) {
                    return true;
                }
            }

        } catch (e) {}


        return false;
    }


    /* =========================================================
       ПРОВЕРКА — НАСТРОЙКИ
       ========================================================= */

    function isSettings(element) {

        if (!element) {
            return false;
        }

        var cls =
            typeof element.className === 'string'
                ? element.className
                : '';

        if (
            cls.indexOf('open--settings') !== -1
        ) {
            return true;
        }


        try {

            if (
                element.querySelector(
                    '.open--settings'
                )
            ) {
                return true;
            }

        } catch (e) {}


        /*
         * Дополнительная проверка SVG.
         */

        try {

            var use =
                element.querySelector(
                    'use'
                );

            if (use) {

                var href =
                    use.getAttribute(
                        'xlink:href'
                    ) ||
                    use.getAttribute(
                        'href'
                    ) ||
                    '';

                if (
                    href.indexOf('settings') !== -1 ||
                    href.indexOf('setting') !== -1
                ) {
                    return true;
                }
            }

        } catch (e) {}


        return false;
    }


    /* =========================================================
       ОЧИСТКА HEAD
       ========================================================= */

    function cleanHead() {

        var body =
            document.querySelector(
                '.head__body'
            );

        if (!body) {
            return;
        }


        /*
         * =====================================================
         * УБИРАЕМ ЧАСЫ
         * =====================================================
         */

        var times =
            body.querySelectorAll(
                '.head__time, .head__markers'
            );

        for (
            var i = 0;
            i < times.length;
            i++
        ) {

            hideElement(
                times[i]
            );
        }


        /*
         * =====================================================
         * УБИРАЕМ ИНДИКАТОРЫ / FPS
         * =====================================================
         */

        var extra =
            body.querySelectorAll(
                '.head__fps, .head__status'
            );

        for (
            var j = 0;
            j < extra.length;
            j++
        ) {

            hideElement(
                extra[j]
            );
        }


        /*
         * =====================================================
         * ОЧИЩАЕМ ACTIONS
         * =====================================================
         */

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
            var k = 0;
            k < children.length;
            k++
        ) {

            var child =
                children[k];


            /*
             * НАШУ НАВИГАЦИЮ НЕ ТРОГАЕМ
             */

            if (
                child.classList.contains(
                    'prisma-v4-container'
                )
            ) {
                continue;
            }


            /*
             * ОСТАВЛЯЕМ ПОИСК
             */

            if (isSearch(child)) {

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
             * ОСТАВЛЯЕМ НАСТРОЙКИ
             */

            if (isSettings(child)) {

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
             * ВСЁ ОСТАЛЬНОЕ УДАЛЯЕМ
             */

            try {

                child.remove();

            } catch (e) {

                hideElement(child);

            }
        }
    }


    /* =========================================================
       НАЙТИ ШТАТНЫЙ ПУНКТ LAMPA
       ========================================================= */

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


    /* =========================================================
       АКТИВАЦИЯ ШТАТНОГО ПУНКТА
       ========================================================= */

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
                    .trigger(
                        'hover:enter'
                    );

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

        } catch (e) {

            return false;
        }
    }


    /* =========================================================
       ИСТОРИЯ
       ========================================================= */

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


    /* =========================================================
       ВЫПОЛНЕНИЕ
       ========================================================= */

    function execute(action) {

        if (action === 'history') {

            openHistory();

            return;
        }


        var item =
            findMenuItem(action);


        if (item) {

            activateMenuItem(item);

            return;
        }


        setTimeout(
            function () {

                var retry =
                    findMenuItem(action);

                if (retry) {

                    activateMenuItem(
                        retry
                    );
                }

            },
            300
        );
    }


    /* =========================================================
       СОЗДАНИЕ КНОПКИ
       ========================================================= */

    function createButton(item) {

        var button = $(
            '<div class="' +
            'head__action ' +
            'selector ' +
            'prisma-v4-item">' +
            '</div>'
        );


        button.text(
            item.title
        );


        button.attr(
            'data-prisma-action',
            item.action
        );


        button.on(
            'hover:enter',
            function () {

                execute(
                    item.action
                );

            }
        );


        button.on(
            'click',
            function () {

                execute(
                    item.action
                );

            }
        );


        return button;
    }


    /* =========================================================
       УСТАНОВКА
       ========================================================= */

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


        /*
         * СНАЧАЛА УБИРАЕМ ЛИШНЕЕ
         */

        cleanHead();


        /*
         * Если уже установлено —
         * просто ещё раз чистим.
         */

        if (
            head.querySelector(
                '.prisma-v4-container'
            )
        ) {

            installed = true;

            return true;
        }


        /*
         * =====================================================
         * СОЗДАЁМ НАВИГАЦИЮ
         * ===================================================== */

        var container =
            document.createElement(
                'div'
            );

        container.className =
            'prisma-v4-container';


        for (
            var i = 0;
            i < ITEMS.length;
            i++
        ) {

            var button =
                createButton(
                    ITEMS[i]
                );

            container.appendChild(
                button[0]
            );
        }


        /*
         * =====================================================
         * ВСТАВЛЯЕМ В HEAD
         * ===================================================== */

        try {

            actions.appendChild(
                container
            );

        } catch (e) {

            return false;
        }


        /*
         * Ещё раз чистим.
         */

        cleanHead();


        installed = true;

        return true;
    }


    /* =========================================================
       НАБЛЮДЕНИЕ ЗА LAMPA
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

                    cleanHead();

                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }


    /* =========================================================
       ЗАПУСК
       ========================================================= */

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


                if (attempts >= 150) {

                    clearInterval(
                        timer
                    );
                }

            },
            200
        );

})();
