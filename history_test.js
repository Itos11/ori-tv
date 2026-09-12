(function () {
    'use strict';

    if (!window.Lampa) {
        return;
    }

    function notify(text) {
        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show(text);
        }
    }

    notify('ПРОВЕРЯЮ ИСТОРИЮ...');

    setTimeout(function () {

        try {

            // 1. Принудительно перечитываем состояние избранного/истории
            if (Lampa.Favorite &&
                Lampa.Favorite.read) {

                Lampa.Favorite.read(true);

            } else {

                notify('Lampa.Favorite.read НЕ НАЙДЕН');
                return;
            }

            // 2. Проверяем историю
            var history = [];

            if (Lampa.Favorite.get) {
                history = Lampa.Favorite.get({
                    type: 'history'
                });
            }

            if (!history) {
                history = [];
            }

            notify(
                'ИСТОРИЯ НАЙДЕНА: ' +
                history.length +
                ' КАРТОЧЕК'
            );

            // 3. Открываем историю
            setTimeout(function () {

                try {

                    Lampa.Activity.push({
                        component: 'favorite',
                        type: 'history',
                        page: 1,
                        title: 'История',
                        filter: ''
                    });

                } catch (e) {

                    notify(
                        'ОШИБКА ОТКРЫТИЯ: ' +
                        e.message
                    );
                }

            }, 700);

        } catch (e) {

            notify(
                'ОШИБКА ИСТОРИИ: ' +
                e.message
            );

        }

    }, 500);

})();
