(function () {
    'use strict';

    if (window.PRISMA_HEAD_NAV) return;
    window.PRISMA_HEAD_NAV = true;

    var items = [
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

    var added = false;

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
     * ---------------------------------------------------------
     * ИЩЕМ НАСТОЯЩИЙ ПУНКТ ШТАТНОГО МЕНЮ
     * ---------------------------------------------------------
     */

    function findMenuItem(action) {

        try {

            var item =
                document.querySelector(
                    '.menu__item[data-action="' +
                    action +
                    '"]'
                );

            return item;

        } catch (e) {

            return null;
        }
    }

    /*
     * ---------------------------------------------------------
     * ЗАПУСК ШТАТНОГО ДЕЙСТВИЯ
     * ---------------------------------------------------------
     */

    function runAction(action) {

        /*
         * История — наш уже рабочий вариант.
         */

        if (action === 'history') {

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
                                page: 1,
                                filter: ''
                            }
                        );

                    } catch (e) {

                        notify(
                            'ИСТОРИЯ: ' +
                            e.message
                        );
                    }

                },
                300
            );

            return;
        }

        /*
         * Остальные пункты:
         *
         * НЕ вызываем Router.call().
         *
         * Находим реальный пункт меню Lampa
         * и передаём ему штатный hover:enter.
         */

        var item =
            findMenuItem(action);

        if (!item) {

            /*
             * Меню может ещё не существовать
             * в DOM.
             */

            try {

                if (
                    Lampa.Menu &&
                    Lampa.Menu.open
                ) {
                    Lampa.Menu.open();
                }

            } catch (e) {}

            setTimeout(
                function () {

                    var real =
                        findMenuItem(
                            action
                        );

                    if (!real) {

                        notify(
                            'Не найден пункт: ' +
                            action
                        );

                        return;
                    }

                    triggerEnter(
                        real
                    );

                },
                150
            );

            return;
        }

        triggerEnter(item);
    }

    /*
     * ---------------------------------------------------------
     * ШТАТНЫЙ EVENT LAMPA
     * ---------------------------------------------------------
     */

    function triggerEnter(element) {

        try {

            if (
                window.jQuery &&
                window.jQuery.fn
            ) {

                window.jQuery(
                    element
                ).trigger(
                    'hover:enter'
                );

                return;
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

        } catch (e) {

            notify(
                'ENTER: ' +
                e.message
            );
        }
    }

    /*
     * ---------------------------------------------------------
     * СОЗДАЁМ ПУНКТЫ В HEAD
     * ---------------------------------------------------------
     */

    function addItems() {

        if (added) return;

        if (
            !window.Lampa ||
            !Lampa.Head ||
            !Lampa.Head.addElement ||
            !Lampa.Head.render
        ) {
            return false;
        }

        /*
         * КЛЮЧЕВОЙ МОМЕНТ:
         *
         * проверяем, что Head уже реально
         * проинициализирован.
         */

        var head = null;

        try {

            head =
                Lampa.Head.render();

        } catch (e) {

            return false;
        }

        if (!head) {
            return false;
        }

        try {

            if (
                !head.find(
                    '.head__actions'
                ).length
            ) {
                return false;
            }

        } catch (e) {

            return false;
        }

        /*
         * Теперь addElement() уже безопасен.
         */

        for (
            var i = items.length - 1;
            i >= 0;
            i--
        ) {

            (function (item) {

                var element =
                    $(
                        '<div class="head__action selector prisma-head-item">' +
                            item.title +
                        '</div>'
                    );

                element.on(
                    'hover:enter',
                    function () {

                        runAction(
                            item.action
                        );

                    }
                );

                Lampa.Head.addElement(
                    element
                );

            })(items[i]);
        }

        added = true;

        style();

        notify(
            'PRISMA HEAD ГОТОВ'
        );

        return true;
    }

    /*
     * ---------------------------------------------------------
     * СТИЛИ
     * ---------------------------------------------------------
     */

    function style() {

        if (
            document.getElementById(
                'prisma-head-style'
            )
        ) {
            return;
        }

        var css =
            document.createElement(
                'style'
            );

        css.id =
            'prisma-head-style';

        css.innerHTML = `
            .prisma-head-item {
                display: flex !important;

                align-items: center !important;
                justify-content: center !important;

                height: 52px !important;

                padding: 0 18px !important;

                margin: 0 2px !important;

                border-radius: 8px !important;

                color: #ffffff !important;

                font-size: 18px !important;

                font-weight: 600 !important;

                white-space: nowrap !important;

                opacity: .72;

                transition:
                    transform .16s ease,
                    background .16s ease,
                    opacity .16s ease;
            }

            .prisma-head-item.focus,
            .prisma-head-item.hover {
                opacity: 1 !important;

                background:
                    rgba(255,255,255,.18) !important;

                transform:
                    scale(1.05);
            }
        `;

        document.head.appendChild(
            css
        );
    }

    /*
     * ---------------------------------------------------------
     * ЖДЁМ ГОТОВУЮ LAMPA HEAD
     * ---------------------------------------------------------
     *
     * Не полагаемся только на app/ready:
     * плагин может загрузиться как до ready,
     * так и после него.
     */

    var attempts = 0;

    function waitForHead() {

        if (added) return;

        attempts++;

        if (
            addItems()
        ) {
            return;
        }

        /*
         * Максимум примерно 30 секунд.
         */
        if (attempts < 300) {

            setTimeout(
                waitForHead,
                100
            );

        } else {

            notify(
                'PRISMA HEAD: LAMPA HEAD не готов'
            );
        }
    }

    /*
     * Запускаем после загрузки DOM.
     */
    if (
        document.readyState ===
        'loading'
    ) {

        document.addEventListener(
            'DOMContentLoaded',
            waitForHead
        );

    } else {

        waitForHead();
    }

})();
