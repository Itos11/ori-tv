(function () {
    'use strict';

    if (!window.Lampa) return;
    if (window.LampaTopNavigation) return;

    window.LampaTopNavigation = true;

    var items = [
        {
            title: 'ГЛАВНОЕ',
            words: ['главн', 'home']
        },
        {
            title: 'ИСТОРИЯ',
            words: ['истори', 'history']
        },
        {
            title: 'ФИЛЬМЫ',
            words: ['фильм', 'movie']
        },
        {
            title: 'СЕРИАЛЫ',
            words: ['сериал', 'series', 'tv']
        },
        {
            title: 'МУЛЬТФИЛЬМЫ',
            words: ['мульт', 'анимац', 'cartoon']
        }
    ];

    var nav = null;
    var current = 0;
    var opened = true;

    function addStyle() {

        if ($('#lampa-top-nav-style').length) return;

        $('head').append(
            '<style id="lampa-top-nav-style">' +

            '.ltn-bar{' +
                'position:fixed;' +
                'top:0;' +
                'left:0;' +
                'right:0;' +
                'height:72px;' +
                'z-index:99990;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'gap:4px;' +
                'padding:0 25px;' +
                'box-sizing:border-box;' +
                'background:rgba(15,15,15,.97);' +
                'box-shadow:0 4px 18px rgba(0,0,0,.35);' +
            '}' +

            '.ltn-bar.ltn-hide{' +
                'display:none;' +
            '}' +

            '.ltn-item{' +
                'position:relative;' +
                'height:46px;' +
                'padding:0 20px;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'box-sizing:border-box;' +
                'border-radius:8px;' +
                'color:rgba(255,255,255,.65);' +
                'font-size:17px;' +
                'font-weight:600;' +
                'white-space:nowrap;' +
                'cursor:pointer;' +
            '}' +

            '.ltn-item.ltn-current{' +
                'color:#fff;' +
                'background:rgba(255,255,255,.13);' +
            '}' +

            '.ltn-item.ltn-current:after{' +
                'content:"";' +
                'position:absolute;' +
                'left:20px;' +
                'right:20px;' +
                'bottom:2px;' +
                'height:3px;' +
                'border-radius:3px;' +
                'background:#fff;' +
            '}' +

            '@media screen and (max-width:900px){' +

                '.ltn-bar{' +
                    'padding:0 5px;' +
                    'gap:0;' +
                '}' +

                '.ltn-item{' +
                    'padding:0 9px;' +
                    'font-size:13px;' +
                '}' +

                '.ltn-item.ltn-current:after{' +
                    'left:9px;' +
                    'right:9px;' +
                '}' +

            '}' +

            '</style>'
        );
    }

    function render() {

        if (!nav) return;

        nav.find('.ltn-item').each(function (index) {

            if (index === current) {
                $(this).addClass('ltn-current');
            } else {
                $(this).removeClass('ltn-current');
            }

        });
    }

    function create() {

        var i;
        var button;

        if (nav) return;

        nav = $('<div class="ltn-bar"></div>');

        for (i = 0; i < items.length; i++) {

            button = $(
                '<div class="ltn-item selector">' +
                items[i].title +
                '</div>'
            );

            button.attr(
                'data-ltn-index',
                i
            );

            (function (index) {

                button.on(
                    'hover:focus',
                    function () {

                        current = index;

                        render();
                    }
                );

                button.on(
                    'hover:enter',
                    function () {

                        current = index;

                        render();

                        openSection(
                            items[index]
                        );
                    }
                );

                button.on(
                    'click',
                    function () {

                        current = index;

                        render();

                        openSection(
                            items[index]
                        );
                    }
                );

            })(i);

            nav.append(button);
        }

        $('body').append(nav);

        render();
    }

    function show() {

        create();

        nav.removeClass(
            'ltn-hide'
        );

        opened = true;

        render();
    }

    function hide() {

        if (!nav) return;

        nav.addClass(
            'ltn-hide'
        );

        opened = false;
    }

    function findMenuItem(item) {

        var result = null;

        var elements = $(
            '.menu__item, ' +
            '.menu .selector, ' +
            '.menu__item.selector'
        );

        elements.each(function () {

            var value;
            var j;

            if (result) return;

            value = (
                $(this).text() || ''
            ).toLowerCase();

            for (
                j = 0;
                j < item.words.length;
                j++
            ) {

                if (
                    value.indexOf(
                        item.words[j]
                    ) !== -1
                ) {

                    result = $(this);

                    break;
                }
            }

        });

        if (result) {
            return result.first();
        }

        return $();
    }

    function openSection(item) {

        var menuItem;

        hide();

        menuItem = findMenuItem(item);

        if (menuItem.length) {

            setTimeout(
                function () {

                    menuItem.trigger(
                        'hover:enter'
                    );

                },
                80
            );

        } else {

            try {

                Lampa.Controller.toggle(
                    'menu'
                );

            } catch (e) {}

        }
    }

    function installKeyboard() {

        if (
            window.LampaTopNavigationKeyboard
        ) {
            return;
        }

        window.LampaTopNavigationKeyboard = true;

        document.addEventListener(
            'keydown',
            function (event) {

                var code = event.keyCode;

                if (!opened) {

                    if (code === 38) {

                        show();
                    }

                    return;
                }

                /*
                 * ВЛЕВО
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
                 * ВПРАВО
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

                    openSection(
                        items[current]
                    );

                    return;
                }

                /*
                 * ВНИЗ
                 */

                if (code === 40) {

                    event.preventDefault();

                    hide();

                    try {

                        Lampa.Controller.toggle(
                            'content'
                        );

                    } catch (e) {}

                    return;
                }

                /*
                 * НАЗАД
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

    function init() {

        addStyle();

        create();

        installKeyboard();

        if (
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
                            function () {

                                show();

                            },
                            500
                        );
                    }

                }
            );
        }
    }

    init();

})();
