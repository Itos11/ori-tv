(function () {
    'use strict';

    if (!window.Lampa) return;
    if (window.__TOP_NAV_FINAL__) return;

    window.__TOP_NAV_FINAL__ = true;

    var items = [
        'ГЛАВНОЕ',
        'ИСТОРИЯ',
        'ФИЛЬМЫ',
        'СЕРИАЛЫ',
        'МУЛЬТФИЛЬМЫ'
    ];

    var current = 0;
    var root = null;

    function css() {
        if ($('#top-nav-final-css').length) return;

        $('head').append(
            '<style id="top-nav-final-css">' +
            '.top-nav-final {' +
                'position:fixed;' +
                'top:0;' +
                'left:0;' +
                'right:0;' +
                'height:72px;' +
                'z-index:999999;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'padding:0 20px;' +
                'box-sizing:border-box;' +
                'background:rgba(20,20,20,.96);' +
            '}' +

            '.top-nav-final__item {' +
                'position:relative;' +
                'height:46px;' +
                'padding:0 20px;' +
                'margin:0 3px;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'border-radius:8px;' +
                'box-sizing:border-box;' +
                'color:rgba(255,255,255,.65);' +
                'font-size:17px;' +
                'font-weight:600;' +
                'white-space:nowrap;' +
            '}' +

            '.top-nav-final__item.focus {' +
                'color:#fff;' +
                'background:rgba(255,255,255,.16);' +
            '}' +

            '.top-nav-final__item.focus:after {' +
                'content:"";' +
                'position:absolute;' +
                'left:20px;' +
                'right:20px;' +
                'bottom:2px;' +
                'height:3px;' +
                'border-radius:3px;' +
                'background:#fff;' +
            '}' +
            '</style>'
        );
    }

    function render() {
        if (!root) return;

        root.find('.top-nav-final__item').each(function (index) {
            $(this).toggleClass('focus', index === current);
        });
    }

    function create() {
        var i;
        var button;

        if (root) return;

        root = $('<div class="top-nav-final"></div>');

        for (i = 0; i < items.length; i++) {
            button = $(
                '<div class="top-nav-final__item selector">' +
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

                    if (Lampa.Noty) {
                        Lampa.Noty.show(
                            'Выбрано: ' + items[current]
                        );
                    }
                });

                button.on('click', function () {
                    current = index;
                    render();

                    if (Lampa.Noty) {
                        Lampa.Noty.show(
                            'Выбрано: ' + items[current]
                        );
                    }
                });
            })(i);

            root.append(button);
        }

        $('body').append(root);

        render();
    }

    function focus() {
        var button;

        create();

        button = root
            .find('.top-nav-final__item')
            .eq(current);

        if (!button.length) return;

        render();

        try {
            if (
                window.Navigator &&
                Navigator.focused
            ) {
                Navigator.focused(button[0]);
            } else {
                Lampa.Controller.collectionFocus(
                    button[0],
                    root
                );
            }
        } catch (e) {
            button.addClass('focus');
        }
    }

    function startController() {
        if (!Lampa.Controller) return;

        Lampa.Controller.add(
            'top_nav_final',
            {
                toggle: function () {
                    focus();
                },

                left: function () {
                    current--;

                    if (current < 0) {
                        current = items.length - 1;
                    }

                    focus();
                },

                right: function () {
                    current++;

                    if (current >= items.length) {
                        current = 0;
                    }

                    focus();
                },

                up: function () {
                    current--;

                    if (current < 0) {
                        current = items.length - 1;
                    }

                    focus();
                },

                down: function () {
                    Lampa.Controller.toggle('content');
                },

                ok: function () {
                    if (Lampa.Noty) {
                        Lampa.Noty.show(
                            'Выбрано: ' + items[current]
                        );
                    }
                },

                back: function () {
                    Lampa.Controller.toggle('content');
                }
            }
        );
    }

    function start() {
        css();
        create();
        startController();

        setTimeout(function () {
            try {
                Lampa.Controller.toggle(
                    'top_nav_final'
                );
            } catch (e) {}
        }, 700);

        if (Lampa.Noty) {
            Lampa.Noty.show(
                'Верхняя навигация готова'
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
                if (event.type === 'ready') {
                    setTimeout(start, 700);
                }
            }
        );
    }

})();
