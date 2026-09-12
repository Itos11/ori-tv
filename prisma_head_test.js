(function () {
    'use strict';

    if (window.PRISMA_HEAD_TEST) return;
    window.PRISMA_HEAD_TEST = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var html = document.createElement('div');
    var buttons = [];
    var selected = 0;

    html.style.position = 'fixed';
    html.style.top = '0';
    html.style.left = '0';
    html.style.right = '0';
    html.style.height = '90px';
    html.style.zIndex = '999999';
    html.style.display = 'none';
    html.style.alignItems = 'center';
    html.style.justifyContent = 'center';
    html.style.background = 'rgba(10,10,10,.97)';

    for (var i = 0; i < items.length; i++) {
        var button = document.createElement('div');

        button.className = 'selector';

        button.innerHTML = items[i];

        button.style.color = '#fff';
        button.style.fontSize = '21px';
        button.style.fontWeight = '600';
        button.style.padding = '14px 22px';
        button.style.margin = '0 4px';
        button.style.borderRadius = '8px';

        html.appendChild(button);
        buttons.push(button);
    }

    document.body.appendChild(html);

    function draw() {
        for (var i = 0; i < buttons.length; i++) {
            if (i === selected) {
                buttons[i].style.background =
                    'rgba(255,255,255,.25)';
                buttons[i].style.transform =
                    'scale(1.08)';
            } else {
                buttons[i].style.background =
                    'transparent';
                buttons[i].style.transform =
                    'scale(1)';
            }
        }
    }

    Lampa.Controller.add('prisma_head_test', {

        toggle: function () {
            html.style.display = 'flex';

            draw();

            Lampa.Noty.show('PRISMA HEAD ACTIVE');
        },

        gone: function () {
            html.style.display = 'none';
        },

        left: function () {
            if (selected > 0) {
                selected--;
                draw();
            }
        },

        right: function () {
            if (selected < items.length - 1) {
                selected++;
                draw();
            }
        },

        up: function () {
            draw();
        },

        down: function () {
            html.style.display = 'none';

            /*
             * Возвращаемся в стандартный content.
             */
            Lampa.Controller.toggle('content');
        },

        ok: function () {
            Lampa.Noty.show(
                'ВЫБРАНО: ' + items[selected]
            );
        },

        back: function () {
            html.style.display = 'none';

            Lampa.Controller.toggle('content');
        }

    });

    /*
     * Для первого теста НЕ переключаем контроллер
     * автоматически.
     *
     * Нам нужно проверить его отдельно.
     */

    Lampa.Noty.show('PRISMA HEAD TEST ГОТОВ');

})();
