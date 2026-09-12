(function () {
    'use strict';

    if (window.CONTROLLER_TEST) return;
    window.CONTROLLER_TEST = true;

    function info() {
        var name = 'unknown';

        try {
            if (Lampa.Controller &&
                Lampa.Controller.enabled) {

                var controller = Lampa.Controller.enabled();

                if (controller) {
                    if (controller.name) {
                        name = controller.name;
                    } else if (controller._name) {
                        name = controller._name;
                    }
                }
            }
        } catch (e) {
            name = 'ERROR';
        }

        return name;
    }

    function show(text) {
        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show(text);
        }
    }

    show('КОНТРОЛЛЕР: ' + info());

    document.addEventListener('keydown', function (event) {

        if (event.keyCode === 38) {
            show('↑  КОНТРОЛЛЕР: ' + info());
        }

        if (event.keyCode === 40) {
            show('↓  КОНТРОЛЛЕР: ' + info());
        }

    }, false);

})();
