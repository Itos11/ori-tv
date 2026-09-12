(function () {
    'use strict';

    if (!window.Lampa) {
        alert('Lampa не найдена');
        return;
    }

    var result = [];

    function add(text) {
        result.push(text);
    }

    add('=== PRISMA HISTORY DIAG ===');

    // Activity
    try {
        add('Activity: ' +
            (Lampa.Activity ? 'YES' : 'NO'));

        if (Lampa.Activity && Lampa.Activity.active) {
            var active = Lampa.Activity.active();

            if (active) {
                add('ACTIVE component: ' +
                    (active.component || 'undefined'));

                add('ACTIVE title: ' +
                    (active.title || 'undefined'));
            }
        }
    } catch (e) {
        add('Activity ERROR: ' + e.message);
    }

    // Component
    try {
        add('Component: ' +
            (Lampa.Component ? 'YES' : 'NO'));
    } catch (e) {}

    // Favorite
    try {
        add('Favorite: ' +
            (Lampa.Favorite ? 'YES' : 'NO'));

        if (Lampa.Favorite) {
            add('Favorite.check: ' +
                (Lampa.Favorite.check ? 'YES' : 'NO'));

            add('Favorite.search: ' +
                (Lampa.Favorite.search ? 'YES' : 'NO'));
        }
    } catch (e) {
        add('Favorite ERROR: ' + e.message);
    }

    // Storage
    try {
        add('Storage: ' +
            (Lampa.Storage ? 'YES' : 'NO'));
    } catch (e) {}

    // Controller
    try {
        if (Lampa.Controller &&
            Lampa.Controller.enabled) {

            var controller =
                Lampa.Controller.enabled();

            add('Controller: ' +
                (controller && controller.name ?
                    controller.name :
                    'undefined'));
        }
    } catch (e) {}

    // URL
    try {
        add('URL: ' + location.href);
    } catch (e) {}

    // LocalStorage keys
    try {
        var keys = [];

        for (var i = 0;
             i < localStorage.length;
             i++) {

            var key = localStorage.key(i);

            if (key) {
                if (
                    key.indexOf('favorite') !== -1 ||
                    key.indexOf('history') !== -1 ||
                    key.indexOf('timeline') !== -1
                ) {
                    keys.push(key);
                }
            }
        }

        add('Storage keys: ' +
            (keys.length ?
                keys.join(', ') :
                'NONE'));

    } catch (e) {
        add('Storage ERROR: ' + e.message);
    }

    if (Lampa.Noty &&
        Lampa.Noty.show) {

        Lampa.Noty.show(
            result.join('\n')
        );
    }

})();
