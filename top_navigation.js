(function () {
    'use strict';

    if (!window.Lampa) return;

    function start() {
        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show('ШТОРКА: ПЛАГИН РАБОТАЕТ');
        }
    }

    if (window.appready) {
        start();
    } else if (Lampa.Listener) {
        Lampa.Listener.follow('app', function (event) {
            if (event.type == 'ready') {
                start();
            }
        });
    }
})();
