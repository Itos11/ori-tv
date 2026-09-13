(function () {
    'use strict';

    if (window.ORITV_LOADED) return;
    window.ORITV_LOADED = true;

    var ITEMS = [
        { title: 'ГЛАВНОЕ', action: 'main' },
        { title: 'ИСТОРИЯ', action: 'history' },
        { title: 'ФИЛЬМЫ', action: 'movie' },
        { title: 'СЕРИАЛЫ', action: 'tv' },
        { title: 'МУЛЬТФИЛЬМЫ', action: 'cartoon' }
    ];

    var installed = false;


    /* =========================================================
       СТИЛИ ORITV
       ========================================================= */

    function installStyle() {

        if (document.getElementById('oritv-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'oritv-style';

        style.textContent = `

            /* =================================================
               ВЕРХНЯЯ НАВИГАЦИЯ ORITV
               ================================================= */

            .oritv-nav {

                position: absolute !important;

                left: 50% !important;
                top: 0 !important;

                transform: translateX(-50%) !important;

                height: 60px !important;

                display: flex !important;

                align-items: center !important;
                justify-content: center !important;

                flex-direction: row !important;

                flex-wrap: nowrap !important;

                gap: 4px !important;

                padding: 0 !important;
                margin: 0 !important;

                width: max-content !important;

                max-width: 60vw !important;

                box-sizing: border-box !important;

                overflow: visible !important;

                white-space: nowrap !important;

                z-index: 999999 !important;

                pointer-events: auto !important;
            }


            /* =================================================
               ПУНКТЫ
               ================================================= */

            .oritv-nav-item {

                display: flex !important;

                align-items: center !important;
                justify-content: center !important;

                flex: 0 0 auto !important;

                height: 44px !important;

                padding: 0 13px !important;

                margin: 0 !important;

                border-radius: 9px !important;

                box-sizing: border-box !important;

                color: rgba(255,255,255,.84) !important;

                background: transparent !important;

                font-family: Arial, sans-serif !important;

                font-size: 16px !important;

                font-weight: 600 !important;

                line-height: 44px !important;

                white-space: nowrap !important;

                opacity: .86 !important;

                z-index: 1000000 !important;

                transition:
                    background .12s ease,
                    transform .12s ease,
                    opacity .12s ease !important;
            }


            /* =================================================
               ФОКУС
               ================================================= */

            .oritv-nav-item.focus {

                color: #ffffff !important;

                background: rgba(255,255,255,.20) !important;

                opacity: 1 !important;

                transform: scale(1.05) !important;

                box-shadow:
                    0 2px 10px rgba(0,0,0,.20) !important;
            }


            /* =================================================
               ПОИСК
               ================================================= */

            .head__actions .open--search {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;
            }


            /* =================================================
               НАСТРОЙКИ
               ================================================= */

            .head__actions .open--settings {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;
            }


            /* =================================================
               УБИРАЕМ ЧАСЫ
               ================================================= */

            .head__time {

                display: none !important;
            }


            /* =================================================
               УБИРАЕМ МАРКЕРЫ
               ================================================= */

            .head__markers {

                display: none !important;
            }


            /* =================================================
               БОЛЬШОЙ ТВ
               ================================================= */

            @media (min-width: 1600px) {

                .oritv-nav {

                    gap: 6px !important;
                }

                .oritv-nav-item {

                    padding-left: 16px !important;

                    padding-right: 16px !important;

                    font-size: 18px !important;
                }
            }


            /* =================================================
               НЕБОЛЬШОЙ ЭКРАН
               ================================================= */

            @media (max-width: 1200px) {

                .oritv-nav {

                    gap: 1px !important;

                    max-width: 62vw !important;
                }

                .oritv-nav-item {

                    padding-left: 8px !important;

                    padding-right: 8px !important;

                    font-size: 14px !important;
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
            '<div class="' +
            'head__action ' +
            'selector ' +
            'oritv-nav-item">' +
            '</div>'
        );


        button.text(
            item.title
        );


        button.attr(
            'data-oritv-action',
            item.action
        );


        /* OK */

        button.on(
            'hover:enter',
            function () {

                execute(
                    item.action
                );

            }
        );


        /* Мышь */

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


        installStyle();


        /* Уже установлено */

        if (
            document.querySelector(
                '.oritv-nav'
            )
        ) {

            installed = true;

            return true;
        }


        /* Создаём контейнер */

        var nav =
            document.createElement(
                'div'
            );

        nav.className =
            'oritv-nav';


        /* Создаём пять кнопок */

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


        /* Добавляем в настоящий Head Lampa */

        try {

            actions[0].appendChild(
                nav
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
