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
        if (window.Lampa &&
            Lampa.Noty &&
            Lampa.Noty.show) {
            Lampa.Noty.show(text);
        }
    }

    function create() {
        if (box) return;

        box = document.createElement('div');
        box.id = 'prisma-nav-final';

        box.style.position = 'fixed';
        box.style.top = '0';
        box.style.left = '0';
        box.style.right = '0';
        box.style.height = '100px';
        box.style.zIndex = '999999';
        box.style.display = 'none';
        box.style.alignItems = 'center';
        box.style.justifyContent = 'center';
        box.style.padding = '0 25px';
        box.style.boxSizing = 'border-box';
        box.style.background = 'rgba(10,10,10,0.97)';
        box.style.boxShadow = '0 8px 30px rgba(0,0,0,0.5)';
        box.style.pointerEvents = 'none';

        for (var i = 0; i < items.length; i++) {
            var button = document.createElement('div');

            button.innerHTML = items[i];
            button.style.color = '#ffffff';
            button.style.fontSize = '21px';
            button.style.fontWeight = '600';
            button.style.padding = '15px 24px';
            button.style.margin = '0 3px';
            button.style.borderRadius = '9px';
            button.style.opacity = '0.7';
            button.style.transform = 'scale(1)';
            button.style.transition =
                'transform .18s ease, ' +
                'background .18s ease, ' +
                'opacity .18s ease';
            button.style.whiteSpace = 'nowrap';

            box.appendChild(button);
            buttons.push(button);
        }

        document.body.appendChild(box);
        draw();
    }

    function draw() {
        if (!box) return;

        box.style.display = visible ? 'flex' : 'none';

        for (var i = 0; i < buttons.length; i++) {

            if (i === selected) {

                buttons[i].style.background =
                    'rgba(255,255,255,0.20)';

                buttons[i].style.opacity = '1';

                buttons[i].style.transform =
                    'scale(1.08)';

            } else {

                buttons[i].style.background =
                    'transparent';

                buttons[i].style.opacity =
                    '0.7';

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

        if (selected < items.length - 1) {
            selected++;
            draw();
        }
    }

    function openHistory() {

        /*
         * ТОЧНЫЙ РАБОЧИЙ URL,
         * полученный из твоей Lampa 3.3.3
         */
        window.location.href =
            'http://lampa.mx/?title=' +
            encodeURIComponent('История просмотров') +
            '&type=history' +
            '&component=favorite' +
            '&source=tmdb' +
            '&page=1';
    }

    function ok() {
        if (!visible) return;

        if (selected === 0) {

            notify('ГЛАВНОЕ');

            closeNav();

            try {
                Lampa.Controller.toggle('content');
            } catch (e) {}

            return;
        }

        if (selected === 1) {

            openHistory();
            return;
        }

        if (selected === 2) {

            notify('ФИЛЬМЫ — СЛЕДУЮЩИЙ ЭТАП');
            return;
        }

        if (selected === 3) {

            notify('СЕРИАЛЫ — СЛЕДУЮЩИЙ ЭТАП');
            return;
        }

        if (selected === 4) {

            notify('МУЛЬТФИЛЬМЫ — СЛЕДУЮЩИЙ ЭТАП');
            return;
        }
    }

    function controllerName() {

        try {

            if (!Lampa.Controller ||
                !Lampa.Controller.enabled) {
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

        var name = controllerName();

        if (name === 'head') {

            openNav();

        } else {

            if (visible) {
                closeNav();
            }
        }
    }

    document.addEventListener(
        'keydown',
        function (event) {

            /*
             * Пока шторка закрыта,
             * вообще не вмешиваемся в Lampa.
             */
            if (!visible) {
                return;
            }

            var code = event.keyCode;

            // LEFT
            if (code === 37) {

                left();

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            // RIGHT
            if (code === 39) {

                right();

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            // OK / ENTER
            if (code === 13) {

                ok();

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            // DOWN
            if (code === 40) {

                closeNav();

                try {
                    Lampa.Controller.toggle('content');
                } catch (e) {}

                event.preventDefault();
                event.stopPropagation();

                return;
            }

            // UP
            if (code === 38) {

                event.preventDefault();
                event.stopPropagation();

                return;
            }

        },
        true
    );

    create();

    setInterval(
        checkHead,
        100
    );

    notify('PRISMA NAV С ИСТОРИЕЙ ГОТОВ');

})();
