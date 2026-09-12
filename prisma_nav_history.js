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

    function source() {
        try {
            if (
                Lampa.Storage &&
                Lampa.Storage.field
            ) {
                return (
                    Lampa.Storage.field('source') ||
                    'tmdb'
                );
            }
        } catch (e) {}

        return 'tmdb';
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

        for (var i = 0; i < items.length; i++) {

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
     * ГЛАВНОЕ
     */
    function openMain() {

        closeNav();

        try {

            Lampa.Router.call(
                'main',
                {
                    title:
                        'Главное - ' +
                        String(
                            source()
                        ).toUpperCase()
                }
            );

        } catch (e) {

            notify(
                'ГЛАВНОЕ: ' +
                e.message
            );
        }
    }

    /*
     * ИСТОРИЯ
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
     * ФИЛЬМЫ
     */
    function openMovies() {

        closeNav();

        try {

            Lampa.Router.call(
                'category',
                {
                    url: 'movie',

                    title:
                        'Фильмы - ' +
                        String(
                            source()
                        ).toUpperCase(),

                    source:
                        source()
                }
            );

        } catch (e) {

            notify(
                'ФИЛЬМЫ: ' +
                e.message
            );
        }
    }

    /*
     * СЕРИАЛЫ
     */
    function openSeries() {

        closeNav();

        try {

            Lampa.Router.call(
                'category',
                {
                    url: 'tv',

                    title:
                        'Сериалы - ' +
                        String(
                            source()
                        ).toUpperCase(),

                    source:
                        source()
                }
            );

        } catch (e) {

            notify(
                'СЕРИАЛЫ: ' +
                e.message
            );
        }
    }

    /*
     * МУЛЬТФИЛЬМЫ
     */
    function openCartoons() {

        closeNav();

        try {

            Lampa.Router.call(
                'category',
                {
                    url: 'movie',

                    title:
                        'Мультфильмы - ' +
                        String(
                            source()
                        ).toUpperCase(),

                    genres: 16
                }
            );

        } catch (e) {

            notify(
                'МУЛЬТФИЛЬМЫ: ' +
                e.message
            );
        }
    }

    /*
     * OK
     */
    function ok() {

        if (!visible) return;

        switch (selected) {

            case 0:
                openMain();
                break;

            case 1:
                openHistory();
                break;

            case 2:
                openMovies();
                break;

            case 3:
                openSeries();
                break;

            case 4:
                openCartoons();
                break;
        }
    }

    /*
     * Определяем, находится ли Lampa
     * на верхнем контроллере.
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

    function checkHead() {

        var name =
            controllerName();

        if (name === 'head') {

            openNav();

        } else {

            if (visible) {
                closeNav();
            }
        }
    }

    /*
     * КЛАВИАТУРА
     *
     * Когда шторка закрыта —
     * вообще ничего не перехватываем.
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
             *
             * Пока шторка открыта —
             * остаёмся в ней.
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
