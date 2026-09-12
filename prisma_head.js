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

    var elements = [];

    /*
     * ---------------------------------------------------------
     * НАЙТИ ШТАТНЫЙ ПУНКТ МЕНЮ LAMPA
     * ---------------------------------------------------------
     */

    function findMenuItem(action) {

        try {

            var selectors = [
                '.menu__item[data-action="' + action + '"]',
                '.menu__item.selector[data-action="' + action + '"]'
            ];

            for (
                var i = 0;
                i < selectors.length;
                i++
            ) {

                var element =
                    document.querySelector(
                        selectors[i]
                    );

                if (element) {
                    return element;
                }
            }

        } catch (e) {}

        return null;
    }

    /*
     * ---------------------------------------------------------
     * ВЫЗОВ ШТАТНОГО ДЕЙСТВИЯ LAMPA
     * ---------------------------------------------------------
     */

    function execute(action) {

        /*
         * ИСТОРИЯ
         *
         * Оставляем уже проверенный вариант.
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
         * Для остальных пунктов НЕ используем
         * Router.call().
         *
         * Берём настоящий пункт штатного меню
         * и запускаем его hover:enter.
         */
        try {

            var item =
                findMenuItem(action);

            if (!item) {

                /*
                 * Если меню ещё не создано,
                 * создаём его штатным способом.
                 */
                if (
                    Lampa.Menu &&
                    Lampa.Menu.open
                ) {

                    Lampa.Menu.open();
                }

                setTimeout(
                    function () {

                        var realItem =
                            findMenuItem(
                                action
                            );

                        if (!realItem) {

                            notify(
                                'Не найден пункт: ' +
                                action
                            );

                            return;
                        }

                        triggerEnter(
                            realItem
                        );

                    },
                    150
                );

                return;
            }

            triggerEnter(item);

        } catch (e) {

            notify(
                'MENU: ' +
                e.message
            );
        }
    }

    /*
     * ---------------------------------------------------------
     * HOVER:ENTER
     * ---------------------------------------------------------
     */

    function triggerEnter(element) {

        try {

            if (
                window.jQuery &&
                window.jQuery.fn &&
                window.jQuery.fn.trigger
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

            var event =
                new CustomEvent(
                    'hover:enter',
                    {
                        bubbles: true,
                        cancelable: true
                    }
                );

            element.dispatchEvent(
                event
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
     * СОЗДАНИЕ ЭЛЕМЕНТА В НАСТОЯЩЕМ LAMPA HEAD
     * ---------------------------------------------------------
     */

    function createItem(item) {

        var element =
            $('<div class="selector prisma-head-item"></div>');

        element.text(
            item.title
        );

        /*
         * При OK Lampa сама вызывает
         * это hover:enter через Controller.
         */
        element.on(
            'hover:enter',
            function () {

                execute(
                    item.action
                );

            }
        );

        /*
         * Добавляем элемент именно
         * в штатный Lampa.Head.
         */
        Lampa.Head.addElement(
            element
        );

        elements.push(
            element
        );
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
            document.createElement('style');

        css.id =
            'prisma-head-style';

        css.innerHTML = `
            .head__actions {
                gap: 4px !important;
            }

            .prisma-head-item {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;

                height: 52px !important;

                padding: 0 18px !important;

                margin: 0 2px !important;

                border-radius: 8px !important;

                color: #ffffff !important;

                font-size: 19px !important;

                font-weight: 600 !important;

                white-space: nowrap !important;

                opacity: 0.65;

                transition:
                    transform .16s ease,
                    background .16s ease,
                    opacity .16s ease;
            }

            .prisma-head-item.focus,
            .prisma-head-item:hover {
                opacity: 1 !important;

                background:
                    rgba(255,255,255,0.18) !important;

                transform:
                    scale(1.06);
            }

            .head__action.prisma-head-item {
                width: auto !important;
            }
        `;

        document.head.appendChild(
            css
        );
    }

    /*
     * ---------------------------------------------------------
     * START
     * ---------------------------------------------------------
     */

    function start() {

        if (
            !window.Lampa ||
            !Lampa.Head
        ) {

            setTimeout(
                start,
                500
            );

            return;
        }

        if (
            !Lampa.Head.addElement
        ) {

            notify(
                'Lampa.Head.addElement отсутствует'
            );

            return;
        }

        style();

        /*
         * Добавляем в обратном порядке,
         * потому что Lampa.Head.addElement()
         * делает prepend().
         */
        for (
            var i = items.length - 1;
            i >= 0;
            i--
        ) {

            createItem(
                items[i]
            );
        }

        notify(
            'PRISMA HEAD ГОТОВ'
        );
    }

    function notify(text) {

        try {

            if (
                Lampa.Noty &&
                Lampa.Noty.show
            ) {

                Lampa.Noty.show(
                    text
                );
            }

        } catch (e) {}
    }

    /*
     * Lampa может ещё не быть готова
     * в момент загрузки плагина.
     */
    if (
        window.Lampa &&
        Lampa.Head
    ) {

        start();

    } else {

        setTimeout(
            start,
            500
        );
    }

})();
