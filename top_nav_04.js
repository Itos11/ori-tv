(function () {
    'use strict';

    if (window.TOP_NAV_04) return;
    window.TOP_NAV_04 = true;

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
    box.style.boxSizing = 'border-box';

    for (var i = 0; i < items.length; i++) {

        var button = document.createElement('div');

        button.style.color = '#ffffff';
        button.style.fontSize = '21px';
        button.style.fontWeight = 'bold';
        button.style.padding = '14px 20px';
        button.style.margin = '0 4px';
        button.style.borderRadius = '8px';
        button.style.boxSizing = 'border-box';
        button.style.transition = '0.15s';

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

                buttons[i].style.transform =
                    'scale(1.08)';

            } else {

                buttons[i].style.background =
                    'transparent';

                buttons[i].style.transform =
                    'scale(1)';
            }
        }
    }

    function message(text) {

        if (window.Lampa &&
            Lampa.Noty &&
            Lampa.Noty.show) {

            Lampa.Noty.show(text);
        }
    }

    function left() {

        if (!visible) return;

        if (selected > 0) {
            selected--;
            draw();
            message(items[selected]);
        }
    }

    function right() {

        if (!visible) return;

        if (selected < items.length - 1) {
            selected++;
            draw();
            message(items[selected]);
        }
    }

    function up() {

        visible = true;
        draw();

        message('ШТОРКА ОТКРЫТА');
    }

    function down() {

        visible = false;
        draw();

        message('ШТОРКА СКРЫТА');
    }

    function ok() {

        if (!visible) return;

        message('ВЫБРАНО: ' + items[selected]);
    }

    document.addEventListener('keydown', function (event) {

        var code = event.keyCode;

        if (code === 37) {
            event.preventDefault();
            event.stopPropagation();
            left();
            return false;
        }

        if (code === 39) {
            event.preventDefault();
            event.stopPropagation();
            right();
            return false;
        }

        if (code === 38) {
            event.preventDefault();
            event.stopPropagation();
            up();
            return false;
        }

        if (code === 40) {
            event.preventDefault();
            event.stopPropagation();
            down();
            return false;
        }

        if (code === 13) {
            event.preventDefault();
            event.stopPropagation();
            ok();
            return false;
        }

    }, true);

    draw();

    message('TOP NAV 04 ГОТОВ');

})();
