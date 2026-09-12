(function () {
    'use strict';

    if (!window.Lampa) return;

    function notify(text) {
        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show(text);
        }
    }

    notify('ОТКРЫВАЮ ИСТОРИЮ...');

    setTimeout(function () {
        try {

            Lampa.Activity.push({
                title: 'История просмотров',
                type: 'history',
                component: 'favorite',
                source: 'tmdb',
                page: 1
            });

        } catch (e) {

            notify(
                'ОШИБКА: ' + e.message
            );

        }
    }, 500);

})();
