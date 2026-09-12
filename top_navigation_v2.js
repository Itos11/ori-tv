(function () {
    'use strict';

    if (!window.Lampa) return;
    if (window.LampaTopNavigationV3) return;

    window.LampaTopNavigationV3 = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var current = 0;
    var nav = null;

    function style() {

        if ($('#ltn3-style').length) return;

        $('head').append(
            '<style id="ltn3-style">' +

            '.ltn3 {' +
                'position:fixed;' +
                'top:0;' +
                'left:0;' +
                'right:0;' +
                'height:72px;' +
                'z-index:999999;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'gap:5px;' +
                'padding:0 20px;' +
                'box-sizing:border-box;' +
                'background:rgba(12,12,12,.96);' +
            '}' +

            '.ltn3-item {' +
                'position:relative;' +
                'height:46px;' +
                'padding:0 22px;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'border-radius:8px;' +
                'color:rgba(255,255,255,.65);' +
                'font-size:17px;' +
                'font-weight:600;' +
                'box-sizing:border-box;' +
                'white-space:nowrap;' +
            '}' +

            '.ltn3-item.focus {' +
                'color:#fff;' +
                'background:rgba(255,255,255,.18);' +
                'transform:scale(1.04);' +
            '}' +

            '.ltn3-item.focus:after {' +
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

    function render() {

        if (!nav) return;

        nav.find('.ltn3-item').each(function (index) {

            if (index === current) {
                $(this).addClass('focus');
            } else {
                $(this).removeClass('focus');
            }

        });
    }

    function create() {

        var i;
        var button;

        if (nav) return;

        nav = $('<div class="ltn3"></div>');

        for (i = 0; i < items.length; i++) {

            button = $(
                '<div class="ltn3-item selector">' +
                items[i] +
                '</div>'
            );

            (function (index) {

                button.on('hover:focus', function () {

                    current = index;

                    render();

                });

                button.on('hover:enter', function () {

                    current = index;

                    render();

                    select();

                });

                button.on('click', function () {

                    current = index;

                    render();

                    select();

                });

            })(i);

            nav.append(button);
        }

        $('body').append(nav);

        render();
    }

    function focusCurrent() {

        if (!nav) return;

        var button = nav
            .find('.ltn3-item')
            .eq(current);

        if (!button.length) return;

        render();

        try {

            if (
                window.Navigator &&
                Navigator.focused
            ) {

                Navigator.focused(
                    button[0]
                );

            } else {

                Lampa.Controller.collectionFocus(
                    button[0],
                    nav
                );

            }

        } catch (e) {

            render();

        }
    }

    function select() {

        if (Lampa.Noty) {

            Lampa.Noty.show(
                'Выбрано: ' + items[current]
            );

        }

        console.log(
            '[Top Navigation] ' +
            items[current]
        );
    }

    function controller() {

        Lampa.Controller.add(
            'top_navigation',
            {

                toggle: function () {

                    create();

                    focusCurrent();

                },

                left: function () {

                    current--;

                    if (current < 0) {
                        current = items.length - 1;
                    }

                    focusCurrent();

                },

                right: function () {

                    current++;

                    if (
                        current >=
                        items.length
                    ) {

                        current = 0;

                    }

                    focusCurrent();

                },

                up: function () {

                    current--;

                    if (current < 0) {
                        current = items.length - 1;
                    }

                    focusCurrent();

                },

                down: function () {

                    try {

                        Lampa.Controller.toggle(
                            'content'
                        );

                    } catch (e) {}

                },

                ok: function () {

                    select();

                },

                back: function () {

                    try {

                        Lampa.Controller.toggle(
                            'content'
                        );

                    } catch (e) {}

                }

            }
        );

    }

    function start() {

        style();

        create();

        controller();

        setTimeout(function () {

            Lampa.Controller.toggle(
                'top_navigation'
            );

        }, 500);

        if (Lampa.Noty) {

            Lampa.Noty.show(
                'Навигация подключена'
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
                    event.type === 'ready'
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
