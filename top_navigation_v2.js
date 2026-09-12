(function () {
    'use strict';

    if (!window.Lampa) return;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var current = 0;

    function start() {

        if ($('#my-top-navigation').length) return;

        var style =
            '<style>' +
            '#my-top-navigation {' +
                'position:fixed;' +
                'top:0;' +
                'left:0;' +
                'right:0;' +
                'height:70px;' +
                'z-index:999999;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'background:rgba(15,15,15,.96);' +
                'font-family:Arial,sans-serif;' +
            '}' +

            '#my-top-navigation .nav-item {' +
                'padding:14px 22px;' +
                'margin:0 4px;' +
                'border-radius:8px;' +
                'font-size:18px;' +
                'color:rgba(255,255,255,.65);' +
                'position:relative;' +
            '}' +

            '#my-top-navigation .nav-item.selected {' +
                'color:#fff;' +
                'background:rgba(255,255,255,.15);' +
            '}' +

            '#my-top-navigation .nav-item.selected:after {' +
                'content:"";' +
                'position:absolute;' +
                'left:20px;' +
                'right:20px;' +
                'bottom:3px;' +
                'height:3px;' +
                'background:#fff;' +
                'border-radius:3px;' +
            '}' +

            '</style>';

        $('head').append(style);

        var nav = $('<div id="my-top-navigation"></div>');

        for (var i = 0; i < items.length; i++) {

            var item = $(
                '<div class="nav-item">' +
                items[i] +
                '</div>'
            );

            (function (index) {

                item.on('click', function () {

                    current = index;
                    render();

                });

            })(i);

            nav.append(item);
        }

        $('body').append(nav);

        render();

        if (Lampa.Noty) {
            Lampa.Noty.show('ВЕРХНЕЕ МЕНЮ ЗАГРУЖЕНО');
        }
    }

    function render() {

        $('#my-top-navigation .nav-item')
            .removeClass('selected')
            .eq(current)
            .addClass('selected');

    }

    if (window.appready) {

        start();

    } else if (Lampa.Listener) {

        Lampa.Listener.follow('app', function (event) {

            if (event.type === 'ready') {

                setTimeout(function () {
                    start();
                }, 500);

            }

        });

    }

})();
