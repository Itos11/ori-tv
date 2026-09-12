(function () {
    'use strict';

    if (window.TOP_NAV_03) return;
    window.TOP_NAV_03 = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var box = document.createElement('div');
    var buttons = [];
    var selected = 0;

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

        button.className = 'selector';

        button.innerHTML = items[i];

        button.style.color = '#ffffff';
        button.style.fontSize = '20px';
        button.style.fontWeight = 'bold';
        button.style.padding = '15px 22px';
        button.style.margin = '0 5px';
        button.style.borderRadius = '8px';

        box.appendChild(button);
        buttons.push(button);
    }

    document.body.appendChild(box);

    function focusItem(index) {

        if (index < 0) index = 0;
        if (index >= buttons.length) index = buttons.length - 1;

        selected = index;

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove('focus');
        }

        buttons[selected].classList.add('focus');

        if (Lampa.Controller && Lampa.Controller.collectionFocus) {
            Lampa.Controller.collectionFocus(
                buttons[selected],
                buttons[selected]
            );
        }

        Lampa.Noty.show(items[selected]);
    }

    function choose() {
        Lampa.Noty.show('ВЫБРАНО: ' + items[selected]);
    }

    Lampa.Controller.add('top_nav_03', {

        toggle: function () {
            focusItem(selected);
        },

        left: function () {
            if (selected > 0) {
                focusItem(selected - 1);
            }
        },

        right: function () {
            if (selected < buttons.length - 1) {
                focusItem(selected + 1);
            }
        },

        up: function () {
            focusItem(selected);
        },

        down: function () {
            Lampa.Controller.toggle('content');
        },

        ok: function () {
            choose();
        },

        back: function () {
            Lampa.Controller.toggle('content');
        }
    });

    Lampa.Controller.toggle('top_nav_03');

    setTimeout(function () {
        focusItem(0);
    }, 300);

    Lampa.Noty.show('TOP NAV 03');

})();
