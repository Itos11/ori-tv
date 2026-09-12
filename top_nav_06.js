(function () {
    'use strict';

    if (window.TOP_NAV_06) return;
    window.TOP_NAV_06 = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var selected = 0;
    var visible = true;

    var box = document.createElement('div');
    var buttons = [];

    box.style.position = 'fixed';
    box.style.top = '0';
    box.style.left = '0';
    box.style.right = '0';
    box.style.height = '90px';
    box.style.background = 'rgba(0,0,0,0.96)';
    box.style.zIndex = '999999';
    box.style.display = 'flex';
    box.style.alignItems = 'center';
    box.style.justifyContent = 'center';

    for (var i = 0; i < items.length; i++) {
        var button = document.createElement('div');

        button.style.color = '#fff';
        button.style.fontSize = '21px';
        button.style.fontWeight = 'bold';
        button.style.padding = '14px 20px';
        button.style.margin = '0 4px';
        button.style.borderRadius = '8px';
        button.style.boxSizing = 'border-box';

        button.innerHTML = items[i];

        box.appendChild(button);
        buttons.push(button);
    }

    document.body.appendChild(box);

    function draw() {
        box.style.display = visible ? 'flex' : 'none';

        for (var i = 0; i < buttons.length; i++) {
            if (i === selected) {
                buttons[i].style.background =
                    'rgba(255,255,255,0.35)';
                buttons[i].style.transform = 'scale(1.08)';
            } else {
                buttons[i].style.background = 'transparent';
                buttons[i].style.transform = 'scale(1)';
            }
        }
    }

    function notify(text) {
        if (window.Lampa &&
            Lampa.Noty &&
            Lampa.Noty.show) {
            Lampa.Noty.show(text);
        }
    }

    function openNav() {
        visible = true;
        draw();
        notify('ШТОРКА ОТКРЫТА');
    }

    function closeNav() {
        visible = false;
        draw();
    }

    function canMoveUp() {
        try {
            if (window.Navigator &&
                Navigator.canmove) {
                return Navigator.canmove('up');
            }
        } catch (e) {}

        return true;
    }

    function keyHandler(event) {

        var code = event.keyCode;

        /*
         * ШТОРКА ОТКРЫТА
         */
        if (visible) {

            if (code === 37) {
                if (selected > 0) {
                    selected--;
                    draw();
                }

                event.preventDefault();
                event.stopPropagation();
                return;
            }

            if (code === 39) {
                if (selected < items.length - 1) {
                    selected++;
                    draw();
                }

                event.preventDefault();
                event.stopPropagation();
                return;
            }

            if (code === 13) {
                notify(
                    'ВЫБРАНО: ' +
                    items[selected]
                );

                event.preventDefault();
                event.stopPropagation();
                return;
            }

            /*
             * ↓ закрывает нашу шторку.
             */
            if (code === 40) {
                closeNav();

                /*
                 * Не блокируем ↓.
                 * Lampa тоже получает эту кнопку.
                 */
                return;
            }

            /*
             * ↑ внутри шторки ничего не делает.
             */
            if (code === 38) {
                event.preventDefault();
                event.stopPropagation();
                return;
            }
        }

        /*
         * ШТОРКА ЗАКРЫТА
         */

        if (!visible && code === 38) {

            /*
             * Если Lampa может двигаться вверх,
             * это обычная кнопка ↑.
             *
             * Если выше двигаться уже нельзя,
             * открываем нашу шторку.
             */
            if (!canMoveUp()) {
                openNav();

                event.preventDefault();
                event.stopPropagation();
                return;
            }

            /*
             * Здесь ничего не блокируем.
             * Lampa получает ↑.
             */
        }
    }

    document.addEventListener(
        'keydown',
        keyHandler,
        true
    );

    draw();

    notify('TOP NAV 06 ГОТОВ');

})();
