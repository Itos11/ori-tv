```javascript
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
     * Ищем настоящий пункт штатного
     * меню Lampa.
     *
     * Важно:
     * мы НЕ вызываем Router.call().
     */
    function findMenuItem(action) {

        var selectors = [
            '.menu__item[data-action="' + action + '"]',
            '[data-action="' + action + '"]'
        ];

        for (
            var s = 0;
            s < selectors.length;
            s++
        ) {

            try {

                var el =
                    document.querySelector(
                        selectors[s]
                    );

                if (el) return el;

            } catch (e) {}
        }

        return null;
    }

    /*
     * Выполняем настоящий пункт меню Lampa.
     */
    function executeMenuAction(action) {

        closeNav();

        /*
         * Сначала пробуем уже существующий
         * пункт меню.
         */
        var item =
            findMenuItem(action);

        if (item) {

            try {

                if (
                    window.jQuery &&
                    window.jQuery.fn &&
                    window.jQuery.fn.trigger
                ) {

                    window.jQuery(item)
                        .trigger('hover:enter');

                    return true;
                }

            } catch (e) {}

            try {

                var event =
                    new CustomEvent(
                        'hover:enter',
                        {
                            bubbles: true
                        }
                    );

                item.dispatchEvent(event);

                return true;

            } catch (e) {}
        }

        /*
         * Если меню в DOM ещё не создано —
         * открываем штатное меню Lampa
         * и ищем пункт ещё раз.
         */
        try {

            if (
                Lampa.Menu &&
                Lampa.Menu.open
            ) {

                Lampa.Menu.open();

                setTimeout(
                    function () {

                        var menuItem =
                            findMenuItem(action);

                        if (!menuItem) {

                            notify(
                                'Не найдено: ' +
                                action
                            );

                            return;
                        }

                        try {

                            if (
                                window.jQuery &&
                                window.jQuery.fn
                            ) {

                                window.jQuery(
                                    menuItem
                                ).trigger(
                                    'hover:enter'
                                );

                            } else {

                                menuItem.dispatchEvent(
                                    new CustomEvent(
                                        'hover:enter',
                                        {
                                            bubbles: true
                                        }
                                    )
                                );
                            }

                        } catch (e) {

                            notify(
                                'MENU: ' +
                                e.message
                            );
                        }

                    },
                    150
                );

                return true;
            }

        } catch (e) {

            notify(
                'MENU: ' +
                e.message
            );
        }

        notify(
            'Пункт не найден: ' +
            action
        );

        return false;
    }

    /*
     * ИСТОРИЯ.
     *
     * Этот вариант уже был проверен
     * и реально открывает историю.
     */
    function openHistory() {

        closeNav();

        try {

            if (
                Lampa.Favorite &&
                Lampa.Favorite.read
            ) {

                Lampa.Favorite.read();
            }

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

        } catch (e) {

            notify(
                'ИСТОРИЯ: ' +
                e.message
            );
        }
    }

    /*
     * OK
     */
    function ok() {

        if (!visible) return;

        if (selected === 1) {

            openHistory();

            return;
        }

        executeMenuAction(
            actions[selected]
        );
    }

    /*
     * Проверяем верхний контроллер Lampa.
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

    function checkHead(
```
