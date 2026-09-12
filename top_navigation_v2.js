(function () {
    'use strict';

    if (!window.Lampa) return;
    if (window.LampaTopNavigationV2) return;

    window.LampaTopNavigationV2 = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var current = 0;
    var opened = true;
    var nav = null;

    function createStyle() {

        if ($('#ltn2-style').length) return;

        $('head').append(
            '<style id="ltn2-style">' +

            '.ltn2{' +
                'position:fixed;' +
                'top:0;' +
                'left:0;' +
                'right:0;' +
                'height:70px;' +
                'z-index:999999;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'background:rgba(12,12,12,.93);' +
                'backdrop-filter:blur(10px);' +
                'padding:0 20px;' +
                'box-sizing:border-box;' +
            '}' +

            '.ltn2.hidden{' +
                'transform:translateY(-100%);' +
            '}' +

            '.ltn2-item{' +
                'position:relative;' +
                'height:46px;' +
                'padding:0 22px;' +
                'margin:0 3px;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'border-radius:8px;' +
                'color:rgba(255,255,255,.62);' +
                'font-size:17px;' +
                'font-weight:600;' +
                'box-sizing:border-box;' +
                'white-space:nowrap;' +
            '}' +

            '.ltn2-item.focus{' +
                'color:#fff;' +
                'background:rgba(255,255,255,.18);' +
                'transform:scale(1.04);' +
            '}' +

            '.ltn2-item.focus:after{' +
                'content:"";' +
                'position:absolute;' +
                'left:22px;' +
                'right:22px;' +
                'bottom:2px;' +
                'height:3px;' +
                'border-radius:3px;' +
                'background:#fff;' +
            '}' +

            '</style>'
        );
    }

    function create() {

        var i;
        var item;

        if (nav) return;

        nav = $('<div class="ltn2"></div>');

        for (i = 0; i < items.length; i++) {

            item = $(
                '<div class="ltn2-item selector">' +
                items[i] +
                '</div>'
            );

            (function (index) {

                item.on('hover:focus', function () {

                    current = index;

                    render();

                });

                item.on('hover:enter', function () {

                    current = index;

                    render();

                    select();

                });

                item.on('click', function () {

                    current = index;

                    render();

                    select();

                });

            })(i);

            nav.append(item);
        }

        $('body').append(nav);

        render();
    }

    function render() {

        if (!nav) return;

        nav.find('.ltn2-item').each(function (index) {

            if (
                opened &&
                index === current
            ) {

                $(this).addClass('focus');

            } else {

                $(this).removeClass('focus');

            }

        });
    }

    function show() {

        create();

        nav.removeClass('hidden');

        opened = true;

        render();

    }

    function hide() {

        if (!nav) return;

        nav.addClass('hidden');

        opened = false;

        render();

    }

    function select() {

        var title = items[current];

        /*
         * Пока тестируем навигацию.
         * После проверки подключим реальные разделы Lampa.
         */

        if (Lampa.Noty) {

            Lampa.Noty.show(
                'Выбрано: ' + title
            );

        }

        console.log(
            '[TopNavigation] ' +
            title
        );

    }

    function keyboard() {

        document.addEventListener(
            'keydown',
            function (event) {

                var code = event.keyCode;

                /*
                 * Если шторка закрыта,
                 * UP её открывает.
                 */

                if (!opened) {

                    if (code === 38) {

                        event.preventDefault();

                        show();

                    }

                    return;
                }

                /*
                 * LEFT
                 */

                if (code === 37) {

                    event.preventDefault();

                    current--;

                    if (current < 0) {

                        current =
                            items.length - 1;

                    }

                    render();

                    return;
                }

                /*
                 * RIGHT
                 */

                if (code === 39) {

                    event.preventDefault();

                    current++;

                    if (
                        current >=
                        items.length
                    ) {

                        current = 0;

                    }

                    render();

                    return;
                }

                /*
                 * OK
                 */

                if (
                    code === 13 ||
                    code === 23
                ) {

                    event.preventDefault();

                    select();

                    return;
                }

                /*
                 * DOWN
                 */

                if (code === 40) {

                    event.preventDefault();

                    hide();

                    return;
                }

                /*
                 * BACK
                 */

                if (
                    code === 27 ||
                    code === 4 ||
                    code === 461
                ) {

                    event.preventDefault();

                    hide();

                }

            },
            true
        );

    }

    function start() {

        createStyle();

        create();

        keyboard();

        if (Lampa.Noty) {

            Lampa.Noty.show(
                'Навигация готова'
            );

        }

    }

    if (window.appready) {

        start();

    } else if (
        Lampa.Listener &&
        Lampa.Listener.follow
    ) {

        Lampa.Listener.follow(
            'app',
            function (event) {

                if (
                    event.type ===
                    'ready'
                ) {

                    setTimeout(
                        start,
                        500
                    );

                }

            }
        );

    }

})();
