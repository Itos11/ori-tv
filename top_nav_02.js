(function () {
    'use strict';

    if (window.TOP_NAV_02) return;
    window.TOP_NAV_02 = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var selected = 0;
    var visible = true;
    var box;
    var buttons = [];

    function draw() {
        if (!box) return;

        for (var i = 0; i < buttons.length; i++) {
            if (i === selected) {
                buttons[i].style.background = 'rgba(255,255,255,0.35)';
                buttons[i].style.transform = 'scale(1.08)';
            } else {
                buttons[i].style.background = 'rgba(255,255,255,0.08)';
                buttons[i].style.transform = 'scale(1)';
            }
        }

        box.style.display = visible ? 'flex' : 'none';
    }

    function create() {
        box = document.createElement('div');

        box.style.position = 'fixed';
        box.style.top = '0';
        box.style.left = '0';
        box.style.right = '0';
        box.style.height = '80px';
        box.style.background = 'rgba(0,0,0,0.96)';
        box.style.zIndex = '999999';
        box.style.display = 'flex';
        box.style.alignItems = 'center';
        box.style.justifyContent = 'center';

        for (var i = 0; i < items.length; i++) {
            var button = document.createElement('div');

            button.style.color = '#ffffff';
            button.style.fontSize = '20px';
            button.style.fontWeight = 'bold';
            button.style.padding = '15px 22px';
            button.style.margin = '0 4px';
            button.style.borderRadius = '8px';
            button.style.boxSizing = 'border-box';

            button.innerHTML = items[i];

            box.appendChild(button);
            buttons.push(button);
        }

        document.body.appendChild(box);

        draw();
    }

    function command(direction) {

        if (direction === 'left') {
            if (selected > 0) {
                selected--;
                draw();
                Lampa.Noty.show(items[selected]);
            }
        }

        if (direction === 'right') {
            if (selected < items.length - 1) {
                selected++;
                draw();
                Lampa.Noty.show(items[selected]);
            }
        }

        if (direction === 'up') {
            visible = true;
            draw();
            Lampa.Noty.show('ШТОРКА ОТКРЫТА');
        }

        if (direction === 'down') {
            visible = false;
            draw();
            Lampa.Noty.show('ШТОРКА СКРЫТА');
        }

        if (direction === 'ok') {
            Lampa.Noty.show('ВЫБРАНО: ' + items[selected]);
        }
    }

    create();

    /*
     * Подключаемся к системе управления Lampa.
     */
    if (Lampa.Controller) {

        Lampa.Controller.add('top_nav_02', {

            toggle: function () {
                return true;
            },

            left: function () {
                command('left');
            },

            right: function () {
                command('right');
            },

            up: function () {
                command('up');
            },

            down: function () {
                command('down');
            },

            ok: function () {
                command('ok');
            },

            back: function () {
                visible = false;
                draw();
            }
        });

        Lampa.Controller.toggle('top_nav_02');
    }

    Lampa.Noty.show('TOP NAV 02 ГОТОВ');

})();
