(function () {
    'use strict';

    setTimeout(function () {

        if (!window.Lampa || !Lampa.Head || !Lampa.Head.render) {
            Lampa.Noty.show('ORI: Head не найден');
            return;
        }

        var head = Lampa.Head.render();

        if (!head || !head.length) {
            Lampa.Noty.show('ORI: Head пустой');
            return;
        }

        var actions = head.find('.head__actions');

        var result = [];

        actions.children().each(function (i) {

            var el = this;

            result.push(
                i +
                ': ' +
                el.className +
                ' | ' +
                (el.getAttribute('data-action') || '') +
                ' | ' +
                (el.textContent || '').trim().substring(0, 30)
            );

        });

        console.log('===== ORITV HEAD =====');
        console.log(result.join('\n'));

        Lampa.Noty.show(
            'ORI: смотри консоль F12'
        );

    }, 1000);

})();
