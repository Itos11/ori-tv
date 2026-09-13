(function () {
    'use strict';

    if (window.PRISMA_NAV_PRISMA) return;
    window.PRISMA_NAV_PRISMA = true;

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

    function addStyle() {

        if (document.getElementById('prisma-prisma-style')) {
            return;
        }

        var style = document.createElement('style');

        style.id = 'prisma-prisma-style';

        style.textContent = `

            /*
             * ================================================
             * НАША НАВИГАЦИЯ
             * ================================================
             */

            .prisma-nav-prisma {

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

                max-width: 55vw !important;

                overflow: visible !important;

                white-space: nowrap !important;

                z-index: 999999 !important;
            }


            /*
             * ================================================
             * КНОПКИ
             * ================================================
             */

            .prisma-nav-prisma-item {

                display: flex !important;

                align-items: center !important;

                justify-content: center !important;

                flex: 0 0 auto !important;

                height: 44px !important;

                padding: 0 13px !important;

                margin: 0 !important;

                border-radius: 8px !important;

                box-sizing: border-box !important;

                background: transparent !important;

                color: rgba(255,255,255,.85) !important;

                font-family: Arial, sans-serif !important;

                font-size: 16px !important;

                font-weight: 600 !important;

                line-height: 44px !important;

                white-space: nowrap !important;

                opacity: .86 !important;

                z-index: 1000000 !important;
            }


            /*
             * Фокус
             */

            .prisma-nav-prisma-item.focus {

                color: #ffffff !important;

                background: rgba(255,255,255,.20) !important;

                opacity: 1 !important;

                transform: scale(1.05) !important;
            }


            /*
             * ================================================
             * ПОИСК И НАСТРОЙКИ
             * ================================================
             */

            .head__action.open--search,
            .head__action.open--settings {

                display: flex !important;

                visibility: visible !important;

                opacity: 1 !important;
            }


            /*
             * Всё остальное скрипт удаляет сам.
             */


            /*
             * ================================================
             * БОЛЬШОЙ ЭКРАН
             * ================================================
             */

            @media (min-width: 1600px) {

                .prisma-nav-prisma {

                    gap: 6px !important;
                }

                .prisma-nav-prisma-item {

                    padding-left: 16px !important;

                    padding-right: 16px !important;

                    font-size: 18px !important;
                }
            }


            /*
             * ================================================
             * НЕБОЛЬШОЙ ЭКРАН
             * ================================================
             */

            @media (max-width: 1200px) {

                .prisma-nav-prisma {

                    gap: 1px !important;

                    max-width: 58vw !important;
                }

                .prisma-nav-prisma-item {

                    padding-left: 8px !important;

                    padding-right: 8px !important;

                    font-size: 14px !important;
                }
            }

        `;

        document.head.appendChild(style);
    }


    /* =========================================================
       ОПРЕДЕЛЯЕМ НУЖНЫЕ КНОПКИ
       ========================================================= */

    function isSearch(element) {

        if (!element) return false;

        return (
            element.classList.contains('open--search') ||
            element.querySelector('.open--search')
        );
    }


    function isSettings(element) {

        if (!element) return false;

        return (
            element.classList.contains('open--settings') ||
            element.querySelector('.open--settings')
        );
    }


    /* =========================================================
       ОЧИСТКА HEAD
       ========================================================= */

    function cleanHead() {

        var actions =
            document.querySelector('.head__actions');

        if (!actions) {
            return;
        }


        var children =
            Array.prototype.slice.call(
                actions.children
            );


        children.forEach(function (element) {

            /*
             * Наш контейнер не трогаем
             */

            if (
                element.classList.contains(
                    'prisma-nav-prisma'
                )
            ) {
                return;
            }


            /*
             * Оставляем только ПОИСК
             * и НАСТРОЙКИ
             */

            if (isSearch(element)) {

                element.style.display =
                    'flex';

                return;
            }


            if (isSettings(element)) {

                element.style.display =
                    'flex';

                return;
            }


            /*
             * Всё остальное удаляем
             */

            try {

                element.remove();

            } catch (e) {

                element.style.display =
                    'none';
            }

        });


        /*
         * Часы
         */

        var time =
            document.querySelector(
                '.head__time'
            );

        if (time) {

            time.style.display =
                'none';
        }


        /*
         * Маркеры
         */

        var markers =
            document.querySelector(
                '.head__markers'
            );

        if (markers) {

            markers.style.display =
                'none';
        }
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
       АКТИВИРОВАТЬ ШТАТНЫЙ ПУНКТ
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
            'prisma-nav-prisma-item">' +
            '</div>'
        );


        button.text(
            item.title
        );


        button.attr(
            'data-prisma-action',
            item.action
        );


        button.on(
            'hover:enter',
            function () {

                execute(
                    item.action
                );

            }
        );


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
       СОЗДАНИЕ НАВИГАЦИИ
       ========================================================= */

    function install() {

        if (installed) {

            cleanHead();

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


        addStyle();


        /*
         * Сначала чистим штатные элементы
         */

        cleanHead();


        /*
         * Уже создано?
         */

        if (
            document.querySelector(
                '.prisma-nav-prisma'
            )
        ) {

            installed = true;

            return true;
        }


        /*
         * Контейнер
         */

        var container =
            document.createElement(
                'div'
            );

        container.className =
            'prisma-nav-prisma';


        /*
         * Пять пунктов
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

            container.appendChild(
                button[0]
            );
        }


        /*
         * Вставляем
         */

        try {

            actions[0].appendChild(
                container
            );

        } catch (e) {

            return false;
        }


        /*
         * Ещё раз чистим,
         * чтобы убрать всё лишнее,
         * что Lampa могла добавить одновременно.
         */

        cleanHead();


        installed = true;

        return true;
    }


    /* =========================================================
       НАБЛЮДАТЕЛЬ
       ========================================================= */

    function observe() {

        if (
            typeof MutationObserver ===
            'undefined'
        ) {
            return;
        }


        var observer =
            new MutationObserver(
                function () {

                    cleanHead();

                }
            );


        observer.observe(
            document.body,
            {
                childList: true,
                subtree: true
            }
        );
    }


    /* =========================================================
       ЗАПУСК
       ========================================================= */

    observe();


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
