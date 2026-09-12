(function () {
    'use strict';

    if (!window.Lampa) return;

    if (Lampa.Noty && Lampa.Noty.show) {
        Lampa.Noty.show('ОТКРЫВАЮ ИСТОРИЮ...');
    }

    setTimeout(function () {
        try {
            Lampa.Activity.push({
                url: '',
                title: 'История',
                component: 'favorite',
                type: 'history',
                page: 1,
                filter: ''
            });

        } catch (e) {
            if (Lampa.Noty && Lampa.Noty.show) {
                Lampa.Noty.show(
                    'ОШИБКА: ' + e.message
                );
            }
        }
    }, 500);

})();
