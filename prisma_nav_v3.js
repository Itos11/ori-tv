(function () {
    'use strict';

    if (window.PRISMA_NAV_V3_FINAL) return;
    window.PRISMA_NAV_V3_FINAL = true;

    var ITEMS = [
        {
            title: 'ГЛАВНОЕ',
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

    var installed = false;


    /* =========================================================
       CSS
       ========================================================= */

    function installStyle() {

        if (document.getElementById('prisma-nav-v3-final-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-nav-v3-final-style';

        style.textContent = `

            /*
             * Контейнер нашей навигации.
             *
             * Слева оставляем место для названия Lampa.
             * Справа оставляем место для:
             * поиск / уведомления / настройки / профиль.
             */

            .prisma-nav-v3-container {

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
             * Пункты меню
             */

            .prisma-nav-v3-item {

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

                color: rgba(255,255,255,.82) !important;

                font-family: Arial, sans-serif !important;

                font-size: 16px !important;

                font-weight: 600 !important;

                line-height: 46px !important;

                white-space: nowrap !important;

                opacity: .82 !important;

                background: transparent !important;

                overflow: visible !important;

                z-index: 999999 !important;

                transition:
                    background .12s ease,
                    transform .12s ease,
                    opacity .12s ease !important;
            }


            /*
             * Выбранный пункт
             */

            .prisma-nav-v3-item.focus {

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

            .prisma-nav-v3-item:hover {

                color: #ffffff !important;

                opacity: 1 !important;

                background: rgba(255,255,255,.12) !important;
            }


            /*
             * Маленькие экраны
             */

            @media (max-width: 1200px) {

                .prisma-nav-v3-container {

                    left: 27% !important;

                    right: 24% !important;

                    gap: 1px !important;
                }

                .prisma-nav-v3-item {

                    padding-left: 8px !important;

                    padding-right: 8px !important;

                    margin-left: 1px !important;

                    margin-right: 1px !important;

                    font-size: 14px !important;
                }
            }


            /*
             * Большой экран / телевизор
             */

            @media (min-width: 1600px) {

                .prisma-nav-v3-container {

                    left: 27% !important;

                    right: 23% !important;

                    gap: 5px !important;
                }

                .prisma-nav-v3-item {

                    padding-left: 17px !important;

                    padding-right: 17px !important;

                    font-size: 18px !important;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* =========================================================
       ПОИСК ШТАТНОГО ПУНКТА LAMPA
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
       ЗАПУСК ШТАТНОГО ПУНКТА LAMPA
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

                window.jQuery(element).trigger(
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
       ВЫПОЛНЕНИЕ ДЕЙСТВИЯ
       ========================================================= */

    function execute(action) {

        /*
         * История
         */

        if (action === 'history') {

            openHistory();

            return;
        }


        /*
         * ГЛАВНОЕ / ФИЛЬМЫ / СЕРИАЛЫ /
         * МУЛЬТФИЛЬМЫ
         *
         * Используем штатные пункты Lampa.
         */

        var item = findMenuItem(action);

        if (item) {

            activateMenuItem(item);

            return;
        }


        /*
         * Если штатное меню ещё не успело
         * появиться — повторяем попытку.
         */

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
            'class="head__action selector prisma-nav-v3-item">' +
            '</div>'
        );

        button.text(item.title);

        button.attr(
            'data-prisma-action',
            item.action
        );


        /*
         * OK на пульте
         */

        button.on(
            'hover:enter',
            function () {

                execute(item.action);

            }
        );


        /*
         * Клик мышью

         */

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


        /*
         * Ждём Lampa
         */

        if (
            !window.Lampa ||
            !Lampa.Head ||
            !Lampa.Head.render
        ) {

            return false;
        }


        /*
         * Получаем настоящий Head Lampa
         */

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


        /*
         * Получаем область действий
         */

        var actions;

        try {

            actions =
                head.find(
                    '.head__actions'
                );

        } catch (e) {

            return false;
        }


        if (
            !actions ||
            !actions.length
        ) {

            return false;
        }


        /*
         * Не создаём повторно
         */

        if (
            document.querySelector(
                '.prisma-nav-v3-container'
            )
        ) {

            installed = true;

            return true;
        }


        installStyle();


        /*
         * Создаём контейнер
         */

        var container =
            document.createElement('div');

        container.className =
            'prisma-nav-v3-container';


        /*
         * Создаём пять кнопок
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
         * Вставляем в настоящий Head Lampa
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
       ОЖИДАНИЕ ГОТОВНОСТИ LAMPA
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


                /*
                 * 30 секунд максимум
                 */

                if (attempts >= 150) {

                    clearInterval(timer);
                }

            },
            200
        );

})();
