(function () {
    'use strict';

    // Защита от повторной загрузки
    if (window.PRISMA_HEAD_V2) return;
    window.PRISMA_HEAD_V2 = true;

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

    /*
     * ---------------------------------------------------------
     * СТИЛИ
     * ---------------------------------------------------------
     */

    function installStyle() {

        if (document.getElementById('prisma-head-v2-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-head-v2-style';

        style.innerHTML = `
            .prisma-head-v2 {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;

                height: 52px !important;

                padding: 0 18px !important;
                margin: 0 3px !important;

                border-radius: 9px !important;

                color: #ffffff !important;

                font-size: 18px !important;
                font-weight: 600 !important;

                line-height: 52px !important;

                white-space: nowrap !important;

                opacity: 0.70 !important;

                box-sizing: border-box !important;

                transition:
                    transform 0.12s ease,
                    background 0.12s ease,
                    opacity 0.12s ease !important;
            }

            .prisma-head-v2.focus {
                opacity: 1 !important;

                background: rgba(255,255,255,0.18) !important;

                transform: scale(1.05) !important;
            }

            .prisma-head-v2:hover {
                opacity: 1 !important;
            }
        `;

        document.head.appendChild(style);
    }


    /*
     * ---------------------------------------------------------
     * УВЕДОМЛЕНИЕ ОБ ОШИБКАХ
     * ---------------------------------------------------------
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
     * ---------------------------------------------------------
     * ПОИСК ШТАТНОГО ПУНКТА LAMPA
     * ---------------------------------------------------------
     */

    function findMenuItem(action) {

        try {

            var selector =
                '.menu__item[data-action="' +
                action +
                '"]';

            return document.querySelector(selector);

        } catch (e) {

            return null;

        }
    }


    /*
     * ---------------------------------------------------------
     * ЗАПУСК ШТАТНОГО ПУНКТА LAMPA
     * ---------------------------------------------------------
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

            var event = new CustomEvent(
                'hover:enter',
                {
                    bubbles: true,
                    cancelable: true
                }
            );

            element.dispatchEvent(event);

            return true;

        } catch (e) {

            notify(
                'Ошибка запуска: ' +
                e.message
            );

            return false;
        }
    }


    /*
     * ---------------------------------------------------------
     * ИСТОРИЯ
     * ---------------------------------------------------------
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
     * ---------------------------------------------------------
     * ПЕРЕХОДЫ
     * ---------------------------------------------------------
     */

    function execute(action) {

        // История — проверенный рабочий маршрут
        if (action === 'history') {

            openHistory();

            return;
        }


        // Для остальных используем
        // настоящий штатный пункт меню Lampa

        var item = findMenuItem(action);

        if (item) {

            activateMenuItem(item);

            return;
        }


        /*
         * Если меню ещё не создано,
         * немного ждём и пробуем ещё раз.
         */

        setTimeout(function () {

            var retry = findMenuItem(action);

            if (retry) {

                activateMenuItem(retry);

            } else {

                notify(
                    'Не найден пункт Lampa: ' +
                    action
                );

            }

        }, 300);
    }


    /*
     * ---------------------------------------------------------
     * СОЗДАНИЕ НАШЕГО ПУНКТА
     * ---------------------------------------------------------
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
         * OK / Enter
         */

        element.on(
            'hover:enter',
            function () {

                execute(item.action);

            }
        );


        /*
         * Дополнительная защита
         * для обычного клика мышью
         */

        element.on(
            'click',
            function () {

                execute(item.action);

            }
        );


        /*
         * Кладём ссылку на действие
         */

        element.attr(
            'data-prisma-action',
            item.action
        );


        return element;
    }


    /*
     * ---------------------------------------------------------
     * УСТАНОВКА В НАСТОЯЩИЙ LAMPA HEAD
     * ---------------------------------------------------------
     *
     * ВАЖНО:
     *
     * Мы НЕ используем:
     *
     * Lampa.Head.addElement()
     *
     * потому что в твоей сборке этот метод
     * вызывается раньше готовности html.
     *
     * Вместо этого берём уже существующий
     * DOM через Lampa.Head.render().
     *
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


        var head = null;

        try {

            head = Lampa.Head.render();

        } catch (e) {

            return false;
        }


        if (!head) {
            return false;
        }


        var actions = null;

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
         * Уже установлено?
         */

        if (
            actions.find(
                '.prisma-head-v2'
            ).length
        ) {

            installed = true;

            return true;
        }


        installStyle();


        /*
         * Добавляем справа налево,
         * чтобы итоговый порядок был:
         *
         * ГЛАВНОЕ
         * ИСТОРИЯ
         * ФИЛЬМЫ
         * СЕРИАЛЫ
         * МУЛЬТФИЛЬМЫ
         */

        for (
            var i = ITEMS.length - 1;
            i >= 0;
            i--
        ) {

            var item = ITEMS[i];

            var element =
                createItem(item);

            if (!element) {
                continue;
            }


            actions.prepend(element);
        }


        installed = true;


        return true;
    }


    /*
     * ---------------------------------------------------------
     * ЖДЁМ ГОТОВНОСТИ LAMPA
     * ---------------------------------------------------------
     */

    var attempts = 0;

    var timer = setInterval(
        function () {

            attempts++;

            if (install()) {

                clearInterval(timer);

                return;
            }


            /*
             * Максимум 30 секунд
             */

            if (attempts >= 150) {

                clearInterval(timer);

            }

        },
        200
    );


    /*
     * ---------------------------------------------------------
     * ЕСЛИ LAMPA ПЕРЕРИСОВАЛА HEAD
     * ---------------------------------------------------------
     *
     * Иногда Lampa пересоздаёт header.
     * Поэтому через несколько секунд проверяем ещё раз.
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
