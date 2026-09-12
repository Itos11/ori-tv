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

            if (!Lampa.Router || !Lampa.Router.call) {
                notify('Router.call НЕ НАЙДЕН');
                return;
            }

            notify('ОТКРЫВАЮ ФИЛЬМЫ...');

            setTimeout(function () {

                try {

                    Lampa.Router.call(
                        'main',
                        {
                            title: 'Фильмы',
                            type: 'movie',
                            page: 1,
                            source: 'tmdb'
                        }
                    );

                } catch (e) {

                    notify(
                        'MOVIES ERROR: ' +
                        e.message
                    );
                }

            }, 500);

        } catch (e) {

            notify(
                'ERROR: ' +
                e.message
            );
        }

    }, 500);

})();
