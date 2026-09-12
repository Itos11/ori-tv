(function () {
    'use strict';

    if (window.PRISMA_NAV_FINAL) return;
    window.PRISMA_NAV_FINAL = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var actions = [
        'main',
        'history',
        'movie',
        'tv',
        'cartoon'
    ];

    var selected = 0;
    var visible = false;

    /*
     * После перехода в раздел не даём
     * нашей шторке сразу появиться снова.
     */
    var suppressHead = false;

    var box = null;
    var buttons = [];

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

    function create() {

        if (box) return;

        box = document.createElement('div');

        box.id = 'prisma-nav-final';

        box.style.position = 'fixed';
        box.style.top = '0';
        box.style.left = '0';
        box.style.right = '0';
        box.style.height = '92px';

        box.style.zIndex = '999999';

        box.style.display = 'none';

        box.style.alignItems = 'center';
        box.style.justifyContent = 'center';

        box.style.padding = '0 20px';

        box.style.boxSizing = 'border-box';

        box.style.background =
            'rgba(12,12,12,0.97)';

        box.style.boxShadow =
            '0 8px 30px rgba(0,0,0,0.45)';

        box.style.pointerEvents = 'none';

        for (
            var i = 0;
            i < items.length;
            i++
        ) {

            var button =
                document.createElement('div');

            button.innerHTML =
                items[i];

            button.style.color =
                '#ffffff';

            button.style.fontSize =
                '20px';

            button.style.fontWeight =
                '600';

            button.style.padding =
                '14px 22px';

            button.style.margin =
                '0 2px';

            button.style.borderRadius =
                '8px';

            button.style.whiteSpace =
                'nowrap';

            button.style.opacity =
                '0.55';

            button.style.transform =
                'scale(1)';

            button.style.transition =
                'all .16s ease';

            box.appendChild(button);

            buttons.push(button);
        }

        document.body.appendChild(box);

        draw();
    }

    function draw() {

        if (!box) return;

        box.style.display =
            visible ? 'flex' : 'none';

        for (
            var i = 0;
            i < buttons.length;
            i++
        ) {

            if (i === selected) {

                buttons[i].style.background =
                    'rgba(255,255,255,0.18)';

                buttons[i].style.opacity =
                    '1';

                buttons[i].style.transform =
                    'scale(1.08)';

            } else {

                buttons[i].style.background =
                    'transparent';

                buttons[i].style.opacity =
                    '0.55';

                buttons[i].style.transform =
                    'scale(1)';
            }
        }
    }

    function openNav() {

        if (visible) return;

        visible = true;

        draw();
    }

    function closeNav() {

        if (!visible) return;

        visible = false;

        draw();
    }

    function left() {

        if (!visible) return;

        if (selected > 0) {

            selected--;

            draw();
        }
    }

    function right() {

        if (!visible) return;

        if (
            selected <
            items.length - 1
        ) {

            selected++;

            draw();
        }
    }

    /*
     * Ищем настоящий пункт меню Lampa.
     */
    function findOfficialItem(action) {

        var selectors = [
            '.menu__item[data-action="' +
            action +
            '"]',

            '.menu__item.selector[data-action="' +
            action +
            '"]',

            '[data-action="' +
            action +
            '"]'
        ];

        for (
            var i = 0;
            i < selectors.length;
            i++
        ) {

            try {

                var element =
                    document.querySelector(
                        selectors[i]
                    );

                if (element) {
                    return element;
                }

            } catch (e) {}
        }

        return null;
    }

    /*
     * Отправляем штатное событие Lampa.
     */
    function triggerHoverEnter(element) {

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

                return true;
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

            return true;

        } catch (e) {

            notify(
                'EVENT: ' +
                e.message
            );
        }

        return false;
    }

    /*
     * После открытия категории
     * возвращаем фокус наверх.
     */
    function restoreTopFocus() {

        /*
         * Не позволяем checkHead()
         * снова открыть Prisma-шторку.
         */
        suppressHead = true;

        setTimeout(
            function () {

                try {

                    /*
                     * Переключаем Lampa обратно
                     * на верхний контроллер.
                     *
                     * Это оставляет страницу категории
                     * открытой, но фокус находится сверху.
                     */
                    Lampa.Controller.toggle(
                        'head'
                    );

                } catch (e) {}

            },
            500
        );

        /*
         * Через некоторое время снова
         * разрешаем открытие нашей шторки.
         */
        setTimeout(
            function () {

                suppressHead = false;

            },
            1200
        );
    }

    /*
     * Выполняем настоящий пункт Lampa.
     */
    function executeOfficialAction(action) {

        try {

            var item =
                findOfficialItem(action);

            /*
             * Если пункт уже существует —
             * сразу выполняем его.
             */
            if (item) {

                triggerHoverEnter(item);

                /*
                 * После перехода даём Lampa
                 * построить страницу.
                 */
                if (
                    action === 'movie' ||
                    action === 'tv' ||
                    action === 'cartoon'
                ) {

                    restoreTopFocus();
                }

                return;
            }

            /*
             * Если штатного меню сейчас нет,
             * создаём его.
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

                    var realItem =
                        findOfficialItem(
                            action
                        );

                    if (!realItem) {

                        notify(
                            'ПУНКТ НЕ НАЙДЕН: ' +
                            action
                        );

                        return;
                    }

                    triggerHoverEnter(
                        realItem
                    );

                    if (
                        action === 'movie' ||
                        action === 'tv' ||
                        action === 'cartoon'
                    ) {

                        restoreTopFocus();
                    }

                },
                150
            );

        } catch (e) {

            notify(
                'MENU: ' +
                e.message
            );
        }
    }

    /*
     * История.
     * Ничего здесь не меняем.
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
    }

    /*
     * OK.
     */
    function ok() {

        if (!visible) return;

        var action =
            actions[selected];

        closeNav();

        if (
            action === 'history'
        ) {

            openHistory();

            return;
        }

        executeOfficialAction(
            action
        );
    }

    /*
     * Текущий контроллер.
     */
    function controllerName() {

        try {

            if (
                !Lampa.Controller ||
                !Lampa.Controller.enabled
            ) {

                return '';
            }

            var controller =
                Lampa.Controller.enabled();

            if (!controller) return '';

            if (controller.name) {
                return controller.name;
            }

            if (controller._name) {
                return controller._name;
            }

        } catch (e) {}

        return '';
    }

    /*
     * Контролируем верх.
     */
    function checkHead() {

        var name =
            controllerName();

        if (
            name === 'head'
        ) {

            /*
             * После перехода в категорию
             * не открываем нашу шторку
             * автоматически.
             */
            if (suppressHead) {
                return;
            }

            openNav();

        } else {

            if (visible) {
                closeNav();
            }
        }
    }

    /*
     * КЛАВИАТУРА.
     */
    document.addEventListener(
        'keydown',
        function (event) {

            if (!visible) return;

            var code =
                event.keyCode;

            /*
             * LEFT
             */
            if (code === 37) {

                left();

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            /*
             * RIGHT
             */
            if (code === 39) {

                right();

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            /*
             * OK
             */
            if (code === 13) {

                ok();

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            /*
             * DOWN
             */
            if (code === 40) {

                closeNav();

                try {

                    Lampa.Controller.toggle(
                        'content'
                    );

                } catch (e) {}

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            /*
             * UP
             */
            if (code === 38) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }

        },
        true
    );

    /*
     * START.
     */
    create();

    setInterval(
        checkHead,
        100
    );

    notify(
        'PRISMA NAV ГОТОВ'
    );

})();
