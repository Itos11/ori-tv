(function () {
    'use strict';

    if (!window.Lampa) return;

    if (Lampa.Noty && Lampa.Noty.show) {
        Lampa.Noty.show('ИСТОРИЯ: ТЕСТ');
    }

    setTimeout(function () {

        try {

            if (Lampa.Activity &&
                Lampa.Activity.push) {

                Lampa.Activity.push({
                    component: 'favorite',
                    page: 1,
                    title: 'История'
                });

            } else {

                Lampa.Noty.show(
                    'Activity.push НЕ НАЙДЕН'
                );
            }

        } catch (e) {

            Lampa.Noty.show(
                'ОШИБКА: ' + e.message
            );
        }

    }, 1000);

})();
