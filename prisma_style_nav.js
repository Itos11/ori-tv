(function () {
    'use strict';

    if (window.PRISMA_STYLE_NAV) return;
    window.PRISMA_STYLE_NAV = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var selected = 0;
    var visible = false;
    var box;
    var buttons = [];

    function create() {
        box = document.createElement('div');

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
        box.style.boxShadow = '0 8px 30px rgba(0,0,0,0.45)';

        for (var i = 0; i < items.length; i++) {
            createButton(i);
        }

        document.body.appendChild(box);
        draw();
    }

    function createButton(index) {
        var button = document.createElement('div');

        button.innerHTML = items[index];

        button.style.color = '#ffffff';
        button.style.fontSize = '21px';
        button.style.fontWeight = '600';
        button.style.padding = '15px 24px';
        button.style.margin = '0 3px';
        button.style.borderRadius = '9px';
        button.style.opacity = '0.72';
        button.style.transform = 'scale(1)';
        button.style.transition =
            'transform 0.18s ease, background 0.18s ease, opacity 0.18s ease';
        button.style.whiteSpace = 'nowrap';
        button.style.cursor = 'default';

        box.appendChild(button);
        buttons.push(button);
    }

    function draw() {
        if (!box) return;

        box.style.display = visible ? 'flex' : 'none';

        for (var i = 0; i < buttons.length; i++) {

            if (i === selected) {
                buttons[i].style.background =
                    'rgba(255,255,255,0.18)';
                buttons[i].style.opacity = '1';
                buttons[i].style.transform =
                    'scale(1.08)';
            } else {
                buttons[i].style.background =
                    'transparent';
                buttons[i].style.opacity = '0.72';
                buttons[i].style.transform =
                    'scale(1)';
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
    }

    function closeNav() {
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

    function ok() {
        if (!visible) return;

        notify('ВЫБРАНО: ' + items[selected]);
    }

    /*
     * Управление пока только для открытой шторки.
     *
     * H — открыть для теста.
     * ↓ — закрыть.
     */
    document.addEventListener('keydown', function (event) {

        var code = event.keyCode;

        if (!visible) {
            if (code === 72) {
                openNav();

                event.preventDefault();
                event.stopPropagation();
            }

            return;
        }

        if (code === 37) {
            left();

            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (code === 39) {
            right();

            event.preventDefault();
            event.stopPropagation();
            return;
        }

        if (code === 13) {
            ok();

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

    create();

    notify('PRISMA STYLE ГОТОВ');

})();
