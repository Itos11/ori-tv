(function () {
    'use strict';

    function start() {
        console.log('Lampa Top Navigation: OK');

        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show('TOP NAVIGATION: ПЛАГИН ЗАГРУЖЕН');
        }
    }

    if (window.appready) {
        start();
    } else if (Lampa.Listener && Lampa.Listener.follow) {
        Lampa.Listener.follow('app', function (e) {
            if (e.type == 'ready') {
                start();
            }
        });
    }
})();
