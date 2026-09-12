(function () {
    'use strict';

    if (window.TOP_NAV_07) return;
    window.TOP_NAV_07 = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var selected = 0;
    var visible = false;

    var box = document.createElement('div');
    var buttons = [];

    box.style.position = 'fixed';
    box.style.top = '0';
    box.style.left = '0';
    box.style.right = '0';
    box.style.height = '90px';
    box.style.background = 'rgba(0,0,0,0.96)';
    box.style.zIndex = '999999';
    box.style.display = 'none';
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

    document.addEventListener('keydown', function (event) {

        var code = event.keyCode;

        /*
         * H — открыть шторку.
         * Используем только для теста.
         */
        if (code === 72 && !visible) {
            openNav();

            event.preventDefault();
            event.stopPropagation();
            return;
        }

        /*
         * Ниже управление работает ТОЛЬКО
         * когда шторка открыта.
         */
        if (!visible) {
            return;
        }

        if (code === 37) {
            if (selected > 0) {
                selected--;
                draw();
                notify(items[selected]);
            }

            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (code === 39) {
            if (selected < items.length - 1) {
                selected++;
                draw();
                notify(items[selected]);
            }

            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (code === 13) {
            notify('ВЫБРАНО: ' + items[selected]);

            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (code === 40) {
            closeNav();

            event.preventDefault();
            event.stopPropagation();
            return;
        }

    }, true);

    draw();

    notify('TOP NAV 07 ГОТОВ');

})();
