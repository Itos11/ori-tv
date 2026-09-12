(function () {
    'use strict';

    if (window.__TOP_NAV_FIXED__) return;
    window.__TOP_NAV_FIXED__ = true;

    var items = [
        {
            title: 'ГЛАВНОЕ',
            action: 'main'
        },
        {
            title: 'ИСТОРИЯ',
            action: 'history'
        },
        {
            title: 'ФИЛЬМЫ',
            action: 'movies'
        },
        {
            title: 'СЕРИАЛЫ',
            action: 'serials'
        },
        {
            title: 'МУЛЬТФИЛЬМЫ',
            action: 'cartoons'
        }
    ];

    var elements = [];
    var styleAdded = false;

    function addStyle() {
        if (styleAdded) return;
        styleAdded = true;

        var style = document.createElement('style');

        style.innerHTML =
            '.top-nav-fixed-item {' +
                'display:inline-flex !important;' +
                'align-items:center;' +
                'justify-content:center;' +
                'height:3.2em;' +
                'padding:0 1.1em;' +
                'margin:0 0.15em;' +
                'box-sizing:border-box;' +
                'border-radius:0.35em;' +
                'font-size:1.05em;' +
                'font-weight:600;' +
                'white-space:nowrap;' +
                'opacity:0.85;' +
                'transition:all 0.15s ease;' +
            '}' +

            '.top-nav-fixed-item.focus,' +
            '.top-nav-fixed-item.hover {' +
                'opacity:1 !important;' +
                'background:rgba(255,255,255,0.18) !important;' +
                'transform:scale(1.03);' +
            '}' +

            '.top-nav-fixed-item:focus {' +
                'outline:none;' +
            '}' +

            '.top-nav-fixed-wrapper {' +
                'display:flex;' +
                'align-items:center;' +
                'justify-content:center;' +
                'width:100%;' +
                'box-sizing:border-box;' +
            '}';

        document.head.appendChild(style);
    }

    function showMessage(title) {
        if (Lampa.Noty && Lampa.Noty.show) {
            Lampa.Noty.show(title);
        }
    }

    function action(item) {
        /*
         * Пока только проверяем управление.
         *
         * Позже здесь подключим настоящие каталоги Lampa:
         *
         * main
         * history
         * movies
         * serials
         * cartoons
         */

        showMessage(item.title);
    }

    function createNavigation() {
        if (!Lampa.Head || !Lampa.Head.addaddElement) {
            return false;
        }

        addStyle();

        var wrapper = document.createElement('div');
        wrapper.className = 'top-nav-fixed-wrapper';

        for (var i = 0; i < items.length; i++) {
            (function (item) {
                var element = document.createElement('div');

                element.className =
                    'selector top-nav-fixed-item';

                element.innerHTML = item.title;

                /*
                 * ВАЖНО:
                 * Добавляем элемент именно в штатный Head Lampa.
                 * Поэтому ↑ из контента возвращает сюда
                 * через штатную систему Controller.
                 */
                var added = Lampa.Head.addaddElement(
                    element,
                    function () {
                        action(item);
                    }
                );

                if (added) {
                    elements.push(added);
                }
            })(items[i]);
        }

        return true;
    }

    function init() {
        /*
         * Ждём, пока Lampa полностью создаст Head.
         */
        if (!Lampa.Head || !Lampa.Head.addaddElement) {
            setTimeout(init, 500);
            return;
        }

        createNavigation();
    }

    /*
     * Небольшая задержка нужна, чтобы не вмешиваться
     * в создание интерфейса Lampa во время запуска.
     */
    setTimeout(init, 1000);

})();
