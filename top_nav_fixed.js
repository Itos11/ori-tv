(function () {
    'use strict';

    if (window.TOP_NAV_TEST) return;
    window.TOP_NAV_TEST = true;

    function start() {

        if (!window.Lampa) {
            setTimeout(start, 500);
            return;
        }

        if (!Lampa.Head || !Lampa.Head.addaddElement) {
            setTimeout(start, 500);
            return;
        }

        var items = [
            'ГЛАВНОЕ',
            'ИСТОРИЯ',
            'ФИЛЬМЫ',
            'СЕРИАЛЫ',
            'МУЛЬТФИЛЬМЫ'
        ];

        for (var i = 0; i < items.length; i++) {

            (function (title) {

                var element = document.createElement('div');

                element.className = 'selector top-nav-test-item';

                element.style.display = 'inline-flex';
                element.style.alignItems = 'center';
                element.style.justifyContent = 'center';
                element.style.height = '50px';
                element.style.padding = '0 25px';
                element.style.margin = '0 5px';
                element.style.fontSize = '20px';
                element.style.fontWeight = 'bold';
                element.style.color = '#ffffff';
                element.style.background = 'rgba(255,255,255,0.08)';
                element.style.borderRadius = '8px';
                element.style.boxSizing = 'border-box';

                element.innerHTML = title;

                Lampa.Head.addaddElement(
                    element,
                    function () {
                        if (Lampa.Noty && Lampa.Noty.show) {
                            Lampa.Noty.show(title);
                        }
                    }
                );

            })(items[i]);
        }

        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show('TOP NAV LOADED');
        }
    }

    start();

})();
