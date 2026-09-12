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

            if (!Lampa.Router ||
                !Lampa.Router.call) {

                notify('Router.call НЕ НАЙДЕН');
                return;
            }

            notify('ОТКРЫВАЮ ИСТОРИЮ ЧЕРЕЗ ROUTER...');

            setTimeout(function () {

                try {

                    Lampa.Router.call(
                        'favorite',
                        {
                            type: 'history',
                            title: 'История просмотров',
                            page: 1
                        }
                    );

                } catch (e) {

                    notify(
                        'ROUTER ERROR: ' +
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

    }, 1000);

})();
