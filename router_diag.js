(function () {
    'use strict';

    if (!window.Lampa) return;

    var out = [];

    function add(s) {
        out.push(s);
    }

    add('=== LAMPA ROUTER ===');

    add(
        'Router: ' +
        (Lampa.Router ? 'YES' : 'NO')
    );

    if (Lampa.Router) {

        add(
            'call: ' +
            (typeof Lampa.Router.call)
        );

        add(
            'back: ' +
            (typeof Lampa.Router.back)
        );

        add(
            'go: ' +
            (typeof Lampa.Router.go)
        );

        add(
            'url: ' +
            (typeof Lampa.Router.url)
        );

        add(
            'history: ' +
            (typeof Lampa.Router.history)
        );

        try {
            add(
                'current: ' +
                JSON.stringify(
                    Lampa.Router.url ?
                    Lampa.Router.url() :
                    null
                )
            );
        } catch (e) {
            add('current ERROR');
        }
    }

    if (Lampa.Noty && Lampa.Noty.show) {
        Lampa.Noty.show(
            out.join('\n')
        );
    }

})();
