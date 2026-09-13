(function () {
    'use strict';

    if (window.PRISMA_NAV_V3_ONLY) return;
    window.PRISMA_NAV_V3_ONLY = true;

    var ITEMS = [
        { title: 'ГЛАВНОЕ', action: 'main' },
        { title: 'ИСТОРИЯ', action: 'history' },
        { title: 'ФИЛЬМЫ', action: 'movie' },
        { title: 'СЕРИАЛЫ', action: 'tv' },
        { title: 'МУЛЬТФИЛЬМЫ', action: 'cartoon' }
    ];

    var installed = false;


    /* =========================================================
       CSS
       ========================================================= */

    function installStyle() {

        if (document.getElementById('prisma-only-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-only-style';

        style.textContent = `

            /*
             * =================================================
             * УБИРАЕМ НЕНУЖНЫЕ ЭЛЕМЕНТЫ LAMPA
             * =================================================
             */

            /*
             * Оставляем первые и третью штатные иконки:
             *
             * 1 = ПОИСК
             * 2 = УВЕДОМЛЕНИЯ
             * 3 = НАСТРОЙКИ
             * 4 = ПРОФИЛЬ
             * 5 = ПОЛНЫЙ ЭКРАН
             */

            .head__actions > .head__action:nth-child(2),
            .head__actions > .head__action:nth-child(4),
            .head__actions > .head__action:nth-child(5),
            .head__actions > .full--screen {

                display: none !important;
            }


            /*
             * Часы
             */

            .head__time {

                display: none !important;
            }


            /*
             * Возможные дополнительные индикаторы
             */

            .head__actions .head__clock,
            .head__actions .head__time,
            .head__actions .head__status,
            .head__actions .head__more {

                display: none !important;
            }


            /*
             * =================================================
             * НАША НАВИГАЦИЯ
             * =================================================
             */

            .prisma-only-container {

                display: flex !important;

                flex-direction: row !important;

                align-items: center !important;

                justify-content: center !important;

                flex-wrap: nowrap !important;

                gap: 3px !important;

                position: absolute !important;

                left: 29% !important;

                right: 25% !important;

                top: 0 !important;

                height: 60px !important;

                width: auto !important;

                padding: 0 !important;

                margin: 0 !important;

                box-sizing: border-box !important;

                overflow: visible !important;

                white-space: nowrap !important;

                z-index: 999999 !important;

                pointer-events: auto !important;
            }


            /*
             * =================================================
             * КНОПКИ
             * =================================================
             */

            .prisma-only-item {

                display: flex !important;

                align-items: center !important;

                justify-content: center !important;

                flex: 0 1 auto !important;

                width: auto !important;

                min-width: 0 !important;

                height: 46px !important;

                margin: 0 2px !important;

                padding: 0 13px !important;

                box-sizing: border-box !important;

                border-radius: 8px !important;

                color: rgba(255,255,255,.85) !important;

                font-family: Arial, sans-serif !important;

                font-size: 16px !important;

                font-weight: 600 !important;

                line-height: 46px !important;

                white-space: nowrap !important;

                opacity: .85 !important;

                background: transparent !important;

                overflow: visible !important;

                z-index: 999999 !important;

                transition:
                    background .12s ease,
                    transform .12s ease,
                    opacity .12s ease !important;
            }


            /*
             * Фокус
             */

            .prisma-only-item.focus {

                color: #ffffff !important;

                opacity: 1 !important;

                background: rgba(255,255,255,.20) !important;

                transform: scale(1.05) !important;

                box-shadow:
                    0 2px 12px rgba(0,0,0,.20) !important;
            }


            /*
             * Наведение мышью
             */

            .prisma-only-item:hover {

                color: #ffffff !important;

                opacity: 1 !important;

                background: rgba(255,255,255,.12) !important;
            }


            /*
             * =================================================
             * ПОИСК И НАСТРОЙКИ
             * =================================================
             *
             * Немного ближе друг к другу.
             */

            .head__actions > .head__action:nth-child(1),
            .head__actions > .head__action:nth-child(3) {

                margin-left: 4px !important;

                margin-right: 4px !important;
            }


            /*
             * =================================================
             * МАЛЕНЬКИЙ ЭКРАН
             * =================================================
             */

            @media (max-width: 1200px) {

                .prisma-only-container {

                    left: 27% !important;

                    right: 23% !important;

                    gap: 1px !important;
                }

                .prisma-only-item {

                    padding-left: 8px !important;

                    padding-right: 8px !important;

                    margin-left: 1px !important;

                    margin-right: 1px !important;

                    font-size: 14px !important;
                }
            }


            /*
             * =================================================
             * БОЛЬШОЙ ТВ
             * =================================================
             */

            @media (min-width: 1600px) {

                .prisma-only-container {

                    left: 27% !important;

                    right: 22% !important;

                    gap: 5px !important;
                }

                .prisma-only-item {

                    padding-left: 17px !important;

                    padding-right: 17px !important;

                    font-size: 18px !important;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* =========================================================
       ПОИСК ШТАТНОГО ПУНКТА
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
       ЗАПУСК ПУНКТА LAMPA
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
       ДЕЙСТВИЕ
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

                    activateMenuItem(retry);
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
            '<div ' +
            'class="head__action selector prisma-only-item">' +
            '</div>'
        );

        button.text(item.title);

        button.attr(
            'data-prisma-action',
            item.action
        );


        button.on(
            'hover:enter',
            function () {

                execute(item.action);

            }
        );


        button.on(
            'click',
            function () {

                execute(item.action);

            }
        );


        return button;
    }


    /* =========================================================
       УСТАНОВКА
       ========================================================= */

    function install() {

        if (installed) {
            return true;
        }


        if (
            !window.Lampa ||
            !Lampa.Head ||
            !Lampa.Head.render
        ) {

            return false;
        }


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


        var actions;

        try {

            actions =
                head.find('.head__actions');

        } catch (e) {

            return false;
        }


        if (
            !actions ||
            !actions.length
        ) {

            return false;
        }


        if (
            document.querySelector(
                '.prisma-only-container'
            )
        ) {

            installed = true;

            return true;
        }


        installStyle();


        /*
         * =====================================================
         * НАШ КОНТЕЙНЕР
         * =====================================================
         */

        var container =
            document.createElement('div');

        container.className =
            'prisma-only-container';


        /*
         * =====================================================
         * ПЯТЬ ПУНКТОВ
         * =====================================================
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

            if (!button) {
                continue;
            }

            container.appendChild(
                button[0]
            );
        }


        /*
         * =====================================================
         * ВСТАВКА В HEAD
         * =====================================================
         */

        try {

            actions[0].appendChild(
                container
            );

        } catch (e) {

            return false;
        }


        installed = true;

        return true;
    }


    /* =========================================================
       ЖДЁМ LAMPA
       ========================================================= */

    var attempts = 0;

    var timer =
        setInterval(
            function () {

                attempts++;

                if (install()) {

                    clearInterval(timer);

                    return;
                }


                if (attempts >= 150) {

                    clearInterval(timer);
                }

            },
            200
        );

})();
