(function () {
    'use strict';

    if (!window.Lampa) return;

    var items = [
        { title: 'ГЛАВНОЕ',    words: ['главн', 'home'] },
        { title: 'ИСТОРИЯ',    words: ['истори', 'history'] },
        { title: 'ФИЛЬМЫ',     words: ['фильм', 'movie'] },
        { title: 'СЕРИАЛЫ',    words: ['сериал', 'series', 'tv'] },
        { title: 'МУЛЬТФИЛЬМЫ', words: ['мульт', 'анимац', 'cartoon'] }
    ];

    var nav;
    var current = 0;
    var active = false;

    function style() {
        if ($('#lampa-top-nav-style').length) return;

        $('head').append(`
            <style id="lampa-top-nav-style">

                .lampa-top-nav {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 76px;
                    z-index: 999999;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    padding: 0 30px;
                    box-sizing: border-box;

                    background: rgba(12,12,12,.96);
                    box-shadow: 0 5px 20px rgba(0,0,0,.35);

                    transition: transform .2s ease;
                }

                .lampa-top-nav.hidden {
                    transform: translateY(-100%);
                }

                .lampa-top-nav__item {
                    position: relative;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    height: 48px;
                    padding: 0 22px;

                    border-radius: 8px;

                    color: rgba(255,255,255,.65);

                    font-size: 18px;
                    font-weight: 600;

                    white-space: nowrap;

                    transition:
                        background .15s ease,
                        color .15s ease,
                        transform .15s ease;
                }

                .lampa-top-nav__item.active {
                    color: #fff;
                }

                .lampa-top-nav__item.active:after {
                    content: '';

                    position: absolute;
                    left: 22px;
                    right: 22px;
                    bottom: 2px;

                    height: 3px;

                    border-radius: 3px;

                    background: currentColor;
                }

                .lampa-top-nav__item.focus {
                    color: #fff;
                    background: rgba(255,255,255,.16);
                    transform: scale(1.04);
                }

                @media screen and (max-width: 1000px) {

                    .lampa-top-nav {
                        padding: 0 10px;
                        gap: 2px;
                    }

                    .lampa-top-nav__item {
                        padding: 0 11px;
                        font-size: 14px;
                    }

                    .lampa-top-nav__item.active:after {
                        left: 11px;
                        right: 11px;
                    }
                }

            </style>
        `);
    }

    function create() {

        if (nav) return;

        nav = $('<div class="lampa-top-nav"></div>');

        items.forEach(function (item, index) {

            var button = $('<div class="lampa-top-nav__item selector">' +
                item.title +
            '</div>');

            button.on('hover:focus', function () {
                current = index;
                active = true;
                render();
            });

            button.on('hover:enter', function () {
                current = index;
                open(item);
            });

            button.on('click', function () {
                current = index;
                open(item);
            });

            nav.append(button);
        });

        $('body').append(nav);

        render();
    }

    function render() {

        if (!nav) return;

        nav.find('.lampa-top-nav__item').each(function (index) {

            $(this)
                .toggleClass('active', index === current)
                .toggleClass('focus', active && index === current);

        });
    }

    function show() {

        create();

        nav.removeClass('hidden');

        active = true;

        render();
    }

    function hide() {

        if (!nav) return;

        nav.addClass('hidden');

        active = false;

        render();
    }

    function text(element) {

        return ($(element).text() || '')
            .trim()
            .toLowerCase();

    }

    function findMenuItem(item) {

        var result = $();

        $('.menu__item, .menu .selector').each(function () {

            if (result.length) return;

            var value = text(this);

            item.words.some(function (word) {

                if (value.indexOf(word) !== -1) {

                    result = $(this);

                    return true;
                }

                return false;

            }, this);

        });

        return result.first();
    }

    function open(item) {

        hide();

        /*
         * Ищем соответствующий стандартный
         * пункт меню Lampa.
         */

        var menuItem = findMenuItem(item);

        if (menuItem.length) {

            setTimeout(function () {
                menuItem.trigger('hover:enter');
            }, 50);

            return;
        }

        /*
         * Если пункт не найден —
         * возвращаем стандартное меню.
         */

        try {
            Lampa.Controller.toggle('menu');
        } catch (e) {}

    }

    function keyboard() {

        document.addEventListener('keydown', function (event) {

            if (!active) {

                /*
                 * Стрелка ВВЕРХ открывает шторку.
                 */

                if (event.keyCode === 38) {

                    show();

                }

                return;
            }

            /*
             * ВЛЕВО
             */

            if (event.keyCode === 37) {

                event.preventDefault();

                current--;

                if (current < 0)
                    current = items.length - 1;

                render();

                return;
            }

            /*
             * ВПРАВО
             */

            if (event.keyCode === 39) {

                event.preventDefault();

                current++;

                if (current >= items.length)
                    current = 0;

                render();

                return;
            }

            /*
             * OK
             */

            if (
                event.keyCode === 13 ||
                event.keyCode === 23
            ) {

                event.preventDefault();

                open(items[current]);

                return;
            }

            /*
             * ВНИЗ
             */

            if (event.keyCode === 40) {

                event.preventDefault();

                hide();

                try {
                    Lampa.Controller.toggle('content');
                } catch (e) {}

                return;
            }

            /*
             * НАЗАД
             */

            if (
                event.keyCode === 27 ||
                event.keyCode === 4 ||
                event.keyCode === 461
            ) {

                event.preventDefault();

                hide();

            }

        }, true);

    }

    function init() {

        style();

        create();

        keyboard();

        /*
         * Когда Lampa полностью загрузилась.
         */

        Lampa.Listener.follow('app', function (event) {

            if (event.type === 'ready') {

                setTimeout(function () {

                    create();

                    show();

                }, 1000);

            }

        });

    }

    init();

})();
