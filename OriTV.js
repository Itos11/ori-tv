(function () {
    'use strict';

    if (window.ORITV_LOADED) return;
    window.ORITV_LOADED = true;

    var ITEMS = [
        { title: 'ГЛАВНАЯ', action: 'main' },
        { title: 'ИСТОРИЯ', action: 'history' },
        { title: 'ФИЛЬМЫ', action: 'movie' },
        { title: 'СЕРИАЛЫ', action: 'tv' },
        { title: 'МУЛЬТФИЛЬМЫ', action: 'cartoon' }
    ];

    var installed = false;


    /* =====================================================
       CSS
       ===================================================== */

    function addStyle() {

        if (document.getElementById('oritv-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'oritv-style';

        style.textContent = `

            /* ===============================================
               ПРЯЧЕМ ВСЁ ЛИШНЕЕ В ШАПКЕ LAMPA
               =============================================== */

            .head .head__time {
                display: none !important;
            }

            .head .head__markers {
                display: none !important;
            }


            /* ===============================================
               ШТАТНЫЕ КНОПКИ, КОТОРЫЕ НАМ НЕ НУЖНЫ
               =============================================== */

            .head .head__actions .open--profile,
            .head .head__actions .open--notice,
            .head .head__actions .open--broadcast,
            .head .head__actions .open--feed,
            .head .head__actions .open--premium,
            .head .head__actions .full--screen {

                display: none !important;

                visibility: hidden !important;

                opacity: 0 !important;

                pointer-events: none !important;
            }


            /* ===============================================
               НАША НАВИГАЦИЯ
               =============================================== */

            .oritv-nav {

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

                width: max-content !important;

                height: 48px !important;

                padding: 0 !important;

                margin: 0 !important;

                white-space: nowrap !important;

                z-index: 999999 !important;

                pointer-events: auto !important;
            }


            /* ===============================================
               КНОПКА
               =============================================== */

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

                color: rgba(255,255,255,.82) !important;

                background: transparent !important;

                font-family: Arial, sans-serif !important;

                font-size: 15px !important;

                font-weight: 600 !important;

                line-height: 42px !important;

                white-space: nowrap !important;

                opacity: 1 !important;
            }


            /* ===============================================
               ФОКУС
               =============================================== */

            .oritv-nav-item.focus {

                color: #fff !important;

                background: rgba(255,255,255,.20) !important;

                transform: scale(1.04) !important;

                opacity: 1 !important;
            }


            /* ===============================================
               ПОИСК
               =============================================== */

            .head .head__actions .open--search {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;

                pointer-events: auto !important;
            }


            /* ===============================================
               НАСТРОЙКИ
               =============================================== */

            .head .head__actions .open--settings {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;

                pointer-events: auto !important;
            }


            /* ===============================================
               НЕ ПОЗВОЛЯЕМ LAMPA РАСТЯГИВАТЬ НАШ HEAD
               =============================================== */

            .head .head__actions {

                position: relative !important;

                display: flex !important;

                align-items: center !important;

                flex-direction: row !important;
            }


            /* ===============================================
               БОЛЬШОЙ ЭКРАН
               =============================================== */

            @media (min-width: 1600px) {

                .oritv-nav {

                    gap: 6px !important;
                }

                .oritv-nav-item {

                    padding-left: 16px !important;

                    padding-right: 16px !important;

                    font-size: 17px !important;
                }
            }


            /* ===============================================
               МАЛЕНЬКИЙ ЭКРАН
               =============================================== */

            @media (max-width: 1200px) {

                .oritv-nav {

                    gap: 1px !important;
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
       УДАЛЯЕМ СТАРУЮ ORITV НАВИГАЦИЮ
       ===================================================== */

    function removeOld() {

        var old =
            document.querySelectorAll(
                '.oritv-nav'
            );

        for (var i = 0; i < old.length; i++) {

            try {
                old[i].remove();
            } catch (e) {}
        }
    }


    /* =====================================================
       ИЩЕМ ШТАТНЫЙ ПУНКТ LAMPA
       ===================================================== */

    function findLampaItem(action) {

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
       ЗАПУСК LAMPA
       ===================================================== */

    function activate(item) {

        if (!item) {
            return;
        }

        try {

            if (
                window.jQuery &&
                window.jQuery.fn &&
                window.jQuery.fn.trigger
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

    function history() {

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

        }, 200);
    }


    /* =====================================================
       ДЕЙСТВИЕ
       ===================================================== */

    function action(type) {

        if (type === 'history') {

            history();

            return;
        }

        var item =
            findLampaItem(type);

        if (item) {

            activate(item);

            return;
        }

        setTimeout(function () {

            var retry =
                findLampaItem(type);

            if (retry) {
                activate(retry);
            }

        }, 300);
    }


    /* =====================================================
       КНОПКА
       ===================================================== */

    function makeButton(data) {

        var button =
            document.createElement('div');

        button.className =
            'head__action selector oritv-nav-item';

        button.textContent =
            data.title;

        button.setAttribute(
            'data-oritv-action',
            data.action
        );


        /* OK пульта */

        if (window.jQuery) {

            window.jQuery(button).on(
                'hover:enter',
                function () {

                    action(
                        data.action
                    );

                }
            );

        }


        /* Мышь */

        button.addEventListener(
            'click',
            function () {

                action(
                    data.action
                );

            }
        );


        return button;
    }


    /* =====================================================
       УСТАНОВКА
       ===================================================== */

    function install() {

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


        addStyle();


        removeOld();


        /* ===============================================
           СОЗДАЁМ ТОЛЬКО ОДНУ ШТОРКУ
           =============================================== */

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
                makeButton(
                    ITEMS[i]
                )
            );

        }


        actions[0].appendChild(
            nav
        );


        installed = true;

        return true;
    }


    /* =====================================================
       СТАРТ
       ===================================================== */

    var tries = 0;

    var timer =
        setInterval(
            function () {

                tries++;

                if (install()) {

                    clearInterval(
                        timer
                    );

                    return;
                }

                if (tries > 150) {

                    clearInterval(
                        timer
                    );
                }

            },
            200
        );


    /* =====================================================
       ДОПОЛНИТЕЛЬНО:
       ЕСЛИ LAMPA ДОБАВИЛА АККАУНТ/УВЕДОМЛЕНИЕ ПОЗЖЕ,
       CSS ВСЁ РАВНО ИХ СПРЯЧЕТ.
       ===================================================== */

})();
