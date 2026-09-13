(function () {
    'use strict';

    if (window.PRISMA_NAV_FINAL) return;
    window.PRISMA_NAV_FINAL = true;

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

        if (document.getElementById('prisma-final-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-final-style';

        style.textContent = `

            /* =================================================
               УБИРАЕМ ВСЁ ЛИШНЕЕ
               ================================================= */

            .head .head__actions > .head__action:not(.open--search):not(.open--settings) {
                display: none !important;
            }

            /* Полный экран */
            .head .head__actions > .full--screen {
                display: none !important;
            }

            /* Уведомления */
            .head .head__actions > .open--notice {
                display: none !important;
            }

            /* Профиль */
            .head .head__actions > .open--profile {
                display: none !important;
            }

            /* Другие дополнительные кнопки */
            .head .head__actions > .open--broadcast,
            .head .head__actions > .open--feed,
            .head .head__actions > .open--premium {
                display: none !important;
            }

            /* Индикаторы */
            .head .head__markers {
                display: none !important;
            }

            /* Часы */
            .head .head__time {
                display: none !important;
            }


            /* =================================================
               НАША НАВИГАЦИЯ
               ================================================= */

            .prisma-final-container {

                position: absolute !important;

                left: 37% !important;

                top: 0 !important;

                height: 60px !important;

                display: flex !important;

                flex-direction: row !important;

                align-items: center !important;

                justify-content: flex-start !important;

                gap: 3px !important;

                margin: 0 !important;

                padding: 0 !important;

                box-sizing: border-box !important;

                white-space: nowrap !important;

                overflow: visible !important;

                z-index: 999999 !important;

                pointer-events: auto !important;
            }


            /* =================================================
               ПУНКТЫ
               ================================================= */

            .prisma-final-item {

                display: flex !important;

                align-items: center !important;

                justify-content: center !important;

                flex: 0 0 auto !important;

                height: 44px !important;

                padding: 0 10px !important;

                margin: 0 !important;

                border-radius: 8px !important;

                box-sizing: border-box !important;

                color: rgba(255,255,255,.82) !important;

                background: transparent !important;

                font-family: Arial, sans-serif !important;

                font-size: 15px !important;

                font-weight: 600 !important;

                line-height: 44px !important;

                white-space: nowrap !important;

                opacity: .86 !important;

                transition:
                    background .12s ease,
                    transform .12s ease,
                    opacity .12s ease !important;

                z-index: 1000000 !important;
            }


            /* =================================================
               ФОКУС
               ================================================= */

            .prisma-final-item.focus {

                color: #ffffff !important;

                background: rgba(255,255,255,.20) !important;

                opacity: 1 !important;

                transform: scale(1.04) !important;

                box-shadow:
                    0 2px 10px rgba(0,0,0,.20) !important;
            }


            /* =================================================
               ПОИСК И НАСТРОЙКИ
               ================================================= */

            .head .head__actions {

                display: flex !important;

                align-items: center !important;

                flex-shrink: 0 !important;
            }

            .head .head__actions > .open--search,
            .head .head__actions > .open--settings {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;
            }


            /* =================================================
               ТВ / БОЛЬШОЙ ЭКРАН
               ================================================= */

            @media (min-width: 1400px) {

                .prisma-final-container {

                    left: 37% !important;

                    gap: 4px !important;
                }

                .prisma-final-item {

                    padding-left: 12px !important;

                    padding-right: 12px !important;

                    font-size: 16px !important;
                }
            }


            /* =================================================
               ОЧЕНЬ БОЛЬШОЙ ТВ
               ================================================= */

            @media (min-width: 1800px) {

                .prisma-final-container {

                    left: 36% !important;

                    gap: 5px !important;
                }

                .prisma-final-item {

                    padding-left: 15px !important;

                    padding-right: 15px !important;

                    font-size: 18px !important;
                }
            }


            /* =================================================
               МЕНЬШЕ 1200
               ================================================= */

            @media (max-width: 1200px) {

                .prisma-final-container {

                    left: 34% !important;

                    gap: 1px !important;
                }

                .prisma-final-item {

                    padding-left: 7px !important;

                    padding-right: 7px !important;

                    font-size: 13px !important;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* =========================================================
       НАЙТИ ШТАТНЫЙ ПУНКТ
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
       ЗАПУСТИТЬ ШТАТНЫЙ ПУНКТ
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


        setTimeout(function () {

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

        }, 250);
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


        setTimeout(function () {

            var retry =
                findMenuItem(action);

            if (retry) {

                activateMenuItem(retry);
            }

        }, 300);
    }


    /* =========================================================
       СОЗДАТЬ КНОПКУ
       ========================================================= */

    function createButton(item) {

        var button = $(
            '<div class="' +
            'head__action ' +
            'selector ' +
            'prisma-final-item">' +
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
                '.prisma-final-container'
            )
        ) {

            installed = true;

            return true;
        }


        installStyle();


        /* =====================================================
           СОЗДАЁМ КОНТЕЙНЕР
           ===================================================== */

        var container =
            document.createElement('div');

        container.className =
            'prisma-final-container';


        /* =====================================================
           СОЗДАЁМ 5 ПУНКТОВ
           ===================================================== */

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


        /* =====================================================
           ДОБАВЛЯЕМ В HEAD
           ===================================================== */

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
        setInterval(function () {

            attempts++;

            if (install()) {

                clearInterval(timer);

                return;
            }


            if (attempts >= 150) {

                clearInterval(timer);
            }

        }, 200);

})();
