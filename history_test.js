(function () {
    'use strict';

    if (!window.Lampa) return;

    function notify(text) {
        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show(text);
        }
    }

    setTimeout(function () {

        try {

            // Перечитать сохранённые данные
            if (Lampa.Favorite &&
                Lampa.Favorite.read) {

                Lampa.Favorite.read(true);
            }

            // Принудительно создать отсутствующие категории
            if (Lampa.Favorite &&
                Lampa.Favorite.full) {

                var all = Lampa.Favorite.full();

                var info =
                    'history=' +
                    (all.history ?
                        all.history.length : 'UNDEFINED') +
                    ' | like=' +
                    (all.like ?
                        all.like.length : 'UNDEFINED');

                notify('FAVORITE ГОТОВ: ' + info);

            } else {

                notify('Favorite.full НЕ НАЙДЕН');
                return;
            }

            // Теперь открываем
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
                        'ОШИБКА: ' + e.message
                    );
                }

            }, 500);

        } catch (e) {

            notify(
                'ОШИБКА INIT: ' + e.message
            );
        }

    }, 1500);

})();
