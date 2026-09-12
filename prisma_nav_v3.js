(function () {
    'use strict';

    if (window.PRISMA_NAV_V3) return;
    window.PRISMA_NAV_V3 = true;

    var items = [
        { title: 'ГЛАВНОЕ', action: 'main' },
        { title: 'ИСТОРИЯ', action: 'history' },
        { title: 'ФИЛЬМЫ', action: 'movie' },
        { title: 'СЕРИАЛЫ', action: 'tv' },
        { title: 'МУЛЬТФИЛЬМЫ', action: 'cartoon' }
    ];

    var installed = false;


    /* =====================================================
       СТИЛИ
       ===================================================== */

    function addStyle() {

        if (document.getElementById('prisma-nav-v3-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-nav-v3-style';

        style.textContent = `

            /* Наши пять пунктов */

            .prisma-nav-v3-item {
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;

                position: relative !important;

                flex: 0 0 auto !important;

                width: auto !important;
                min-width: 0 !important;

                height: 50px !important;

                margin: 0 5px !important;

                padding: 0 18px !important;

                box-sizing: border-box !important;

                border-radius: 9px !important;

                color: rgba(255,255,255,.82) !important;

                font-family: Arial, sans-serif !important;

                font-size: 17px !important;

                font-weight: 600 !important;

                line-height: 50px !important;

                white-space: nowrap !important;

                opacity: .82 !important;

                background: transparent !important;

                overflow: visible !important;

                z-index: 999999 !important;
            }


            /* Выбранный пункт */

            .prisma-nav-v3-item.focus {
                color: #fff !important;

                opacity: 1 !important;

                background: rgba(255,255,255,.20) !important;

                transform: scale(1.04) !important;
            }


            /* Контейнер */

            .prisma-nav-v3-container {
                display: flex !important;

                flex-direction: row !important;

                align-items: center !important;

                justify-content: center !important;

                flex-wrap: nowrap !important;

                gap: 2px !important;

                white-space: nowrap !important;

                width: auto !important;

                height: 60px !important;

                padding: 0 !important;

                margin: 0 !important;

                box-sizing: border-box !important;

                overflow: visible !important;

                position: absolute !important;

                left: 50% !important;

                top: 0 !important;

                transform: translateX(-50%) !important;

                z-index: 999999 !important;

                pointer-events: auto !important;
            }


            /* На небольшом экране */

            @media (max-width: 1200px) {

                .prisma-nav-v3-item {
                    padding-left: 10px !important;
                    padding-right: 10px !important;
                    margin-left: 2px !important;
                    margin-right: 2px !important;
                    font-size: 15px !important;
                }

            }


            /* Большой экран / ТВ */

            @media (min-width: 1600px) {

                .prisma-nav-v3-item {
                    padding-left: 22px !important;
                    padding-right: 22px !important;
                    margin-left: 6px !important;
                    margin-right: 6px !important;
                    font-size: 19px !important;
                }

            }

        `;

        document.head.appendChild(style);
    }


    /* =====================================================
       ПОИСК ШТАТНОГО ПУНКТА LAMPA
       ===================================================== */

    function findItem(action) {

        try {

            return document.querySelector(
                '.menu__item[data-action="' + action + '"]'
            );

        } catch (e) {

            return null;

        }
    }


    /* =====================================================
       ЗАПУСК ПУНКТА LAMPA
       ===================================================== */

    function activate(action) {

        if (action === 'history') {

            openHistory();

            return;
        }


        var item = findItem(action);

        if (item) {

            try {

                $(item).trigger('hover:enter');

                return;

            } catch (e) {}

        }


        setTimeout(function () {

            var retry = findItem(action);

            if (retry) {

                try {

                    $(retry).trigger('hover:enter');

                } catch (e) {}

            }

        }, 300);
    }


    /* =====================================================
       ИСТОРИЯ
       ===================================================== */

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


    /* =====================================================
       СОЗДАНИЕ КНОПКИ
       ===================================================== */

    function createButton(item) {

        var button = $(
            '<div class="' +
            'head__action ' +
            'selector ' +
            'prisma-nav-v3-item' +
            '"></div>'
        );

        button.text(item.title);

        button.attr(
            'data-prisma-v3-action',
            item.action
        );


        /*
         * OK
         */

        button.on(
            'hover:enter',
            function () {

                activate(item.action);

            }
        );


        /*
         * Мышь
         */

        button.on(
            'click',
            function () {

                activate(item.action);

            }
        );


        return button;
    }


    /* =====================================================
       УСТАНОВКА
       ===================================================== */

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


        if (!head || !head.length) {

            return false;
        }


        var actions;

        try {

            actions = head.find('.head__actions');

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
         * Если уже есть — не создаём второй раз.
         */

        if (
            document.querySelector(
                '.prisma-nav-v3-container'
            )
        ) {

            installed = true;

            return true;
        }


        addStyle();


        /*
         * Контейнер
         */

        var container =
            document.createElement('div');

        container.className =
            'prisma-nav-v3-container';


        /*
         * Пять пунктов
         */

        items.forEach(function (item) {

            var button =
                createButton(item);

            container.appendChild(
                button[0]
            );

        });


        /*
         * Добавляем непосредственно
         * в настоящий Head Lampa.
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


    /* =====================================================
       ЖДЁМ LAMPA
       ===================================================== */

    var count = 0;

    var timer = setInterval(
        function () {

            count++;

            if (install()) {

                clearInterval(timer);

                return;
            }


            if (count > 150) {

                clearInterval(timer);

            }

        },
        200
    );


})();
