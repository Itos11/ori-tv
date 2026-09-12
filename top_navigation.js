(function () {
    'use strict';

    if (!window.Lampa) return;
    if (window.__LAMPA_TOP_NAV__) return;

    window.__LAMPA_TOP_NAV__ = true;

    var ITEMS = [
        {
            id: 'home',
            title: 'ГЛАВНОЕ',
            keywords: ['главное', 'главная', 'home']
        },
        {
            id: 'history',
            title: 'ИСТОРИЯ',
            keywords: ['история', 'history']
        },
        {
            id: 'movie',
            title: 'ФИЛЬМЫ',
            keywords: ['фильмы', 'фильмы', 'movie']
        },
        {
            id: 'serial',
            title: 'СЕРИАЛЫ',
            keywords: ['сериалы', 'сериал', 'series', 'tv']
        },
        {
            id: 'cartoon',
            title: 'МУЛЬТФИЛЬМЫ',
            keywords: ['мультфильмы', 'мультфильм', 'мульт', 'анимация', 'cartoon']
        }
    ];

    var nav = null;
    var current = 0;
    var opened = false;

    function addStyle() {
        if ($('#lampa-top-navigation-style').length) return;

        $('head').append(
            '<style id="lampa-top-navigation-style">' +

            '.ltn {' +
                'position:fixed;' +
                'top:0;' +
                'left:0;' +
                'right:0;' +
                'height:74px;' +
                'z-index:999999;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'padding:0 30px;' +
                'gap:5px;' +
                'box-sizing:border-box;' +
                'background:rgba(10,10,10,.97);' +
                'box-shadow:0 4px 20px rgba(0,0,0,.35);' +
                'font-family:Arial,sans-serif;' +
                'transition:transform .2s ease,opacity .2s ease;' +
            '}' +

            '.ltn.ltn-hide {' +
                'transform:translateY(-100%);' +
                'opacity:0;' +
                'pointer-events:none;' +
            '}' +

            '.ltn-item {' +
                'position:relative;' +
                'height:48px;' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'padding:0 20px;' +
                'border-radius:8px;' +
                'box-sizing:border-box;' +
                'color:rgba(255,255,255,.65);' +
                'font-size:17px;' +
                'font-weight:600;' +
                'white-space:nowrap;' +
                'transition:background .12s ease,color .12s ease,transform .12s ease;' +
            '}' +

            '.ltn-item.ltn-selected {' +
                'color:#fff;' +
            '}' +

            '.ltn-item.ltn-selected:after {' +
                'content:"";' +
                'position:absolute;' +
                'left:20px;' +
                'right:20px;' +
                'bottom:2px;' +
                'height:3px;' +
                'border-radius:3px;' +
                'background:#fff;' +
            '}' +

            '.ltn-item.ltn-focus {' +
                'color:#fff;' +
                'background:rgba(255,255,255,.16);' +
                'transform:scale(1.04);' +
            '}' +

            '@media screen and (max-width:1000px) {' +
                '.ltn {' +
                    'padding:0 8px;' +
                    'gap:1px;' +
                '}' +

                '.ltn-item {' +
                    'padding:0 10px;' +
                    'font-size:13px;' +
                '}' +

                '.ltn-item.ltn-selected:after {' +
                    'left:10px;' +
                    'right:10px;' +
                '}' +
            '}' +

            '</style>'
        );
    }

    function create() {
        if (nav) return;

        nav = $('<div class="ltn"></div>');

        ITEMS.forEach(function (item, index) {

            var button = $(
                '<div class="ltn-item selector">' +
                item.title +
                '</div>'
            );

            button.on('hover:focus', function () {
                current = index;
                render();
            });

            button.on('hover:enter', function () {
                current = index;
                openItem(item);
            });

            button.on('click', function () {
                current = index;
                openItem(item);
            });

            nav.append(button);
        });

        $('body').append(nav);

        render();
    }

    function render() {
        if (!nav) return;

        nav.find('.ltn-item').each(function (index) {

            $(this).toggleClass(
                'ltn-selected',
                index === current
            );

            $(this).toggleClass(
                'ltn-focus',
                opened && index === current
            );

        });
    }

    function show() {
        create();

        nav.removeClass('ltn-hide');

        opened = true;

        render();
    }

    function hide() {
        if (!nav) return;

        nav.addClass('ltn-hide');

        opened = false;

        render();
    }

    function getText(element) {
        return ($(element).text() || '')
            .replace(/\s+/g, ' ')
            .trim()
            .toLowerCase();
    }

    function findMenuItem(item) {

        var result = null;

        var elements = $(
            '.menu__item,' +
            '.menu .selector,' +
            '.menu-item,' +
            '.menu .menu__item'
        );

        elements.each(function () {

            if (result) return;

            var text = getText(this);

            if (!text) return;

            for (var i = 0; i < item.keywords.length; i++) {

                if (
                    text.indexOf(
                        item.keywords[i].toLowerCase()
                    ) !== -1
                ) {
                    result = this;
                    break;
                }

            }

        });

        return result ? $(result) : $();
    }

    function openItem(item) {

        hide();

        var menuItem = findMenuItem(item);

        if (menuItem.length) {

            setTimeout(function () {

                try {
                    menuItem.trigger('hover:enter');
                } catch (e) {
                    menuItem.click();
                }

            }, 100);

            return;
        }

        /*
         * Если пункт не найден,
         * открываем стандартное меню Lampa.
         */

        setTimeout(function () {

            try {
                Lampa.Controller.toggle('menu');
            } catch (e) {}

        }, 100);
    }

    function isModalOpen() {

        if ($('.player:visible').length) return true;
        if ($('.modal:visible').length) return true;
        if ($('.keyboard:visible').length) return true;

        return false;
    }

    function installKeyboard() {

        document.addEventListener(
            'keydown',
            function (event) {

                if (isModalOpen()) {
                    return;
                }

                var key = event.keyCode;

                /*
                 * ВВЕРХ — открыть шторку
                 */

                if (!opened) {

                    if (key === 38) {

                        event.preventDefault();

                        show();

                    }

                    return;
                }

                /*
                 * ВЛЕВО
                 */

                if (key === 37) {

                    event.preventDefault();
                    event.stopPropagation();

                    current--;

                    if (current < 0) {
                        current = ITEMS.length - 1;
                    }

                    render();

                    return;
                }

                /*
                 * ВПРАВО
                 */

                if (key === 39) {

                    event.preventDefault();
                    event.stopPropagation();

                    current++;

                    if (current >= ITEMS.length) {
                        current = 0;
                    }

                    render();

                    return;
                }

                /*
                 * OK
                 */

                if (key === 13 || key === 23) {

                    event.preventDefault();
                    event.stopPropagation();

                    openItem(ITEMS[current]);

                    return;
                }

                /*
                 * ВНИЗ
                 */

                if (key === 40) {

                    event.preventDefault();
                    event.stopPropagation();

                    hide();

                    return;
                }

                /*
                 * BACK
                 */

                if (
                    key === 27 ||
                    key === 4 ||
                    key === 461
                ) {

                    event.preventDefault();
                    event.stopPropagation();

                    hide();

                    return;
                }

            },
            true
        );
    }

    function events() {

        if (!Lampa.Listener) return;

        Lampa.Listener.follow('app', function (event) {

            if (event.type === 'ready') {

                setTimeout(function () {

                    create();
                    show();

                }, 1200);

            }

        });

        Lampa.Listener.follow('activity', function (event) {

            if (event.type === 'start') {

                setTimeout(function () {

                    if (!isModalOpen()) {
                        create();
                    }

                }, 500);

            }

        });

    }

    function init() {

        addStyle();

        create();

        installKeyboard();

        events();

    }

    init();

})();
