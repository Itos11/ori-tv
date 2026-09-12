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
     * ШТАТНОЕ МЕНЮ LAMPA
     */
    function executeOfficialMenu(action) {

        try {

            var menu = null;

            /*
             * Получаем штатное меню
             */
            try {

                menu =
                    Lampa.Menu.render();

            } catch (e) {}

            /*
             * Если меню ещё не создано —
             * открываем его.
             */
            if (
                !menu ||
                !menu.length
            ) {

                try {

                    if (Lampa.Menu.open) {
                        Lampa.Menu.open();
                    }

                } catch (e) {}

                setTimeout(
                    function () {

                        executeOfficialMenu(
                            action
                        );

                    },
                    150
                );

                return;
            }

            var item = null;

            /*
             * Ищем настоящий пункт Lampa.
             */
            try {

                item =
                    menu.find(
                        '.menu__item[data-action="' +
                        action +
                        '"]'
                    );

            } catch (e) {}

            /*
             * Запасной поиск по документу.
             */
            if (
                !item ||
                !item.length
            ) {

                try {

                    item =
                        $(
                            '.menu__item[data-action="' +
                            action +
                            '"]'
                        );

                } catch (e) {}
            }

            if (
                !item ||
                !item.length
            ) {

                notify(
                    'ПУНКТ НЕ НАЙДЕН: ' +
                    action
                );

                return;
            }

            /*
             * Переключаем Controller
             * на штатное меню.
             */
            try {

                Lampa.Controller.toggle(
                    'menu'
                );

            } catch (e) {}

            /*
             * Устанавливаем настоящий
             * фокус Lampa.
             */
            try {

                Lampa.Controller.collectionFocus(
                    item,
                    menu,
                    true
                );

            } catch (e) {

                try {

                    Lampa.Controller.collectionFocus(
                        item,
                        menu
                    );

                } catch (ee) {}
            }

            /*
             * Нажимаем OK штатным Controller.
             */
            setTimeout(
                function () {

                    try {

                        Lampa.Controller.enter();

                    } catch (e) {

                        /*
                         * Последний запасной вариант.
                         */
                        try {

                            item.trigger(
                                'hover:enter'
                            );

                        } catch (ee) {

                            notify(
                                'ENTER: ' +
                                ee.message
                            );
                        }
                    }

                },
                80
            );

        } catch (e) {

            notify(
                'MENU: ' +
                e.message
            );
        }
    }

    /*
     * ИСТОРИЯ
     *
     * Этот вариант уже проверен.
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
     * OK
     */
    function ok() {

        if (!visible) return;

        var action =
            actions[selected];

        /*
         * Закрываем только нашу шторку.
         */
        closeNav();

        /*
         * История.
         */
        if (
            action === 'history'
        ) {

            openHistory();

            return;
        }

        /*
         * Всё остальное —
         * через штатное меню Lampa.
         */
        executeOfficialMenu(
            action
        );
    }

    /*
     * CONTROLLER
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
     * Открываем шторку только
     * когда Lampa находится наверху.
     */
    function checkHead() {

        var name =
            controllerName();

        if (
            name === 'head'
        ) {

            openNav();

        } else {

            if (visible) {

                closeNav();
            }
        }
    }

    /*
     * КЛАВИАТУРА
     */
    document.addEventListener(
        'keydown',
        function (event) {

            /*
             * Если шторка закрыта —
             * вообще не вмешиваемся.
             */
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
     * START
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
