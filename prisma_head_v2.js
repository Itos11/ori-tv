(function () {
    'use strict';

    if (window.PRISMA_HEAD_V2_NEW) return;
    window.PRISMA_HEAD_V2_NEW = true;

    var ITEMS = [
        { title: 'ГЛАВНОЕ', action: 'main' },
        { title: 'ИСТОРИЯ', action: 'history' },
        { title: 'ФИЛЬМЫ', action: 'movie' },
        { title: 'СЕРИАЛЫ', action: 'tv' },
        { title: 'МУЛЬТФИЛЬМЫ', action: 'cartoon' }
    ];

    var installed = false;


    /*
     * =========================================================
     * СТИЛИ PRISMA
     * =========================================================
     */

    function installStyle() {

        if (document.getElementById('prisma-head-v2-new-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-head-v2-new-style';

        style.innerHTML = `

            /*
             * Главный контейнер нашей навигации
             */

            .prisma-head-v2-wrap {
                position: fixed !important;

                left: 50% !important;
                top: 8px !important;

                transform: translateX(-50%) !important;

                display: flex !important;

                align-items: center !important;
                justify-content: center !important;

                gap: 6px !important;

                height: 64px !important;

                padding: 0 10px !important;

                z-index: 99999 !important;

                white-space: nowrap !important;

                pointer-events: auto !important;
            }


            /*
             * Наши пять кнопок
             */

            .prisma-head-v2 {
                position: relative !important;

                display: flex !important;

                align-items: center !important;
                justify-content: center !important;

                height: 48px !important;

                padding: 0 17px !important;

                margin: 0 !important;

                border-radius: 9px !important;

                box-sizing: border-box !important;

                color: rgba(255,255,255,.82) !important;

                font-size: 17px !important;

                font-weight: 600 !important;

                line-height: 48px !important;

                white-space: nowrap !important;

                opacity: .82 !important;

                background: transparent !important;

                transition:
                    background .12s ease,
                    transform .12s ease,
                    opacity .12s ease !important;
            }


            /*
             * Фокус
             */

            .prisma-head-v2.focus {
                color: #ffffff !important;

                opacity: 1 !important;

                background: rgba(255,255,255,.18) !important;

                transform: scale(1.06) !important;

                box-shadow:
                    0 2px 12px rgba(0,0,0,.18) !important;
            }


            /*
             * Небольшая подсветка при наведении мышью
             */

            .prisma-head-v2:hover {
                color: #ffffff !important;

                opacity: 1 !important;

                background: rgba(255,255,255,.12) !important;
            }


            /*
             * На маленьком экране немного уменьшаем
             */

            @media (max-width: 1100px) {

                .prisma-head-v2-wrap {
                    gap: 2px !important;
                }

                .prisma-head-v2 {
                    padding-left: 11px !important;
                    padding-right: 11px !important;
                    font-size: 15px !important;
                }
            }


            /*
             * На больших телевизорах
             */

            @media (min-width: 1600px) {

                .prisma-head-v2 {
                    padding-left: 22px !important;
                    padding-right: 22px !important;

                    font-size: 19px !important;
                }

                .prisma-head-v2-wrap {
                    gap: 8px !important;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /*
     * =========================================================
     * УВЕДОМЛЕНИЕ
     * =========================================================
     */

    function notify(text) {

        try {

            if (
                window.Lampa &&
                Lampa.Noty &&
                Lampa.Noty.show
            ) {
                Lampa.Noty.show(text);
            }

        } catch (e) {}

    }


    /*
     * =========================================================
     * ИЩЕМ НАСТОЯЩИЕ ПУНКТЫ МЕНЮ LAMPA
     * =========================================================
     */

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


    /*
     * =========================================================
     * ЗАПУСК ШТАТНОГО ПУНКТА LAMPA
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

                window.jQuery(element).trigger('hover:enter');

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

            notify(
                'Ошибка: ' +
                e.message
            );

            return false;
        }
    }


    /*
     * =========================================================
     * ИСТОРИЯ
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

            } catch (e) {

                notify(
                    'История: ' +
                    e.message
                );
            }

        }, 250);
    }


    /*
     * =========================================================
     * ВЫПОЛНЕНИЕ ДЕЙСТВИЯ
     * =========================================================
     */

    function execute(action) {

        /*
         * История
         */

        if (action === 'history') {

            openHistory();

            return;
        }


        /*
         * Остальные разделы —
         * через настоящее меню Lampa.
         */

        var item = findMenuItem(action);

        if (item) {

            activateMenuItem(item);

            return;
        }


        /*
         * Если меню ещё не создано —
         * ждём.
         */

        setTimeout(function () {

            var retry = findMenuItem(action);

            if (retry) {

                activateMenuItem(retry);

            } else {

                notify(
                    'Не найден раздел: ' +
                    action
                );
            }

        }, 300);
    }


    /*
     * =========================================================
     * СОЗДАНИЕ КНОПКИ
     * =========================================================
     */

    function createItem(item) {

        var element;

        try {

            element = $(
                '<div class="' +
                'head__action ' +
                'selector ' +
                'prisma-head-v2">' +
                '</div>'
            );

        } catch (e) {

            return null;
        }


        element.text(item.title);


        /*
         * Сохраняем действие
         */

        element.attr(
            'data-prisma-action',
            item.action
        );


        /*
         * OK на пульте
         */

        element.on(
            'hover:enter',
            function () {

                execute(item.action);

            }
        );


        /*
         * Клик мышью
         */

        element.on(
            'click',
            function () {

                execute(item.action);

            }
        );


        return element;
    }


    /*
     * =========================================================
     * УСТАНОВКА
     * =========================================================
     */

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

            head = Lampa.Head.render();

        } catch (e) {

            return false;
        }


        if (!head) {
            return false;
        }


        var actions;

        try {

            actions = head.find(
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
         * Уже существует?
         */

        if (
            document.querySelector(
                '.prisma-head-v2-wrap'
            )
        ) {

            installed = true;

            return true;
        }


        installStyle();


        /*
         * =====================================================
         * СОЗДАЁМ ОТДЕЛЬНЫЙ КОНТЕЙНЕР
         * =====================================================
         */

        var wrap = document.createElement('div');

        wrap.className =
            'prisma-head-v2-wrap';


        /*
         * Добавляем кнопки
         */

        for (
            var i = 0;
            i < ITEMS.length;
            i++
        ) {

            var element =
                createItem(ITEMS[i]);


            if (!element) {
                continue;
            }


            /*
             * jQuery объект превращаем в DOM
             */

            try {

                wrap.appendChild(
                    element[0]
                );

            } catch (e) {}

        }


        /*
         * Вставляем контейнер в настоящий Head.
         *
         * Сам контейнер НЕ является selector.
         * Selector являются только пять кнопок.
         */

        try {

            actions[0].appendChild(wrap);

        } catch (e) {

            return false;
        }


        installed = true;


        return true;
    }


    /*
     * =========================================================
     * ЖДЁМ ГОТОВНОСТИ LAMPA
     * =========================================================
     */

    var attempts = 0;

    var timer = setInterval(
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


    /*
     * Дополнительные проверки
     */

    setTimeout(
        function () {

            if (!installed) {
                install();
            }

        },
        3000
    );


    setTimeout(
        function () {

            if (!installed) {
                install();
            }

        },
        7000
    );


})();
