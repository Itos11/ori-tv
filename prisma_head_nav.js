(function () {
    'use strict';

    if (window.PRISMA_HEAD_NAV) return;
    window.PRISMA_HEAD_NAV = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var created = false;
    var elements = [];

    function addStyle() {
        if (document.getElementById('prisma-head-nav-style')) return;

        var style = document.createElement('style');
        style.id = 'prisma-head-nav-style';

        style.innerHTML =
            '.prisma-head-nav-item {' +
                'display:inline-flex !important;' +
                'align-items:center;' +
                'justify-content:center;' +
                'height:3em;' +
                'padding:0 1em;' +
                'margin:0 .15em;' +
                'box-sizing:border-box;' +
                'border-radius:.45em;' +
                'font-size:1.05em;' +
                'font-weight:600;' +
                'white-space:nowrap;' +
                'opacity:.72;' +
                'transition:transform .18s ease, background .18s ease, opacity .18s ease;' +
            '}' +

            '.prisma-head-nav-item.focus {' +
                'background:rgba(255,255,255,.18) !important;' +
                'opacity:1 !important;' +
                'transform:scale(1.06);' +
            '}' +

            '.prisma-head-nav-item:hover {' +
                'opacity:1;' +
            '}';

        document.head.appendChild(style);
    }

    function action(title) {
        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show('ВЫБРАНО: ' + title);
        }
    }

    function create() {
        if (created) return true;

        if (!window.Lampa ||
            !Lampa.Head ||
            !Lampa.Head.addaddElement) {
            return false;
        }

        created = true;

        addStyle();

        for (var i = 0; i < items.length; i++) {

            (function (title) {

                var element = document.createElement('div');

                element.className =
                    'selector prisma-head-nav-item';

                element.innerHTML = title;

                Lampa.Head.addaddElement(
                    element,
                    function () {
                        action(title);
                    }
                );

                elements.push(element);

            })(items[i]);
        }

        return true;
    }

    function wait() {
        if (!create()) {
            setTimeout(wait, 500);
        }
    }

    wait();

})();
