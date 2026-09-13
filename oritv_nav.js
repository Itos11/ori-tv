(function () {
    'use strict';

    if (window.ORITV_NAV) return;
    window.ORITV_NAV = true;

    var ITEMS = [
        {
            title: 'Главная',
            action: 'main',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<path d="M3 10.8 12 3l9 7.8"/>' +
                '<path d="M5.5 9.5V21h13V9.5"/>' +
                '<path d="M9.5 21v-6h5v6"/>' +
                '</svg>'
        },
        {
            title: 'Фильмы',
            action: 'movie',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<rect x="3" y="4" width="18" height="16" rx="3"/>' +
                '<path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>' +
                '</svg>'
        },
        {
            title: 'Сериалы',
            action: 'tv',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<rect x="3" y="4" width="18" height="16" rx="3"/>' +
                '<path d="M7 8h10M7 12h6M7 16h8"/>' +
                '</svg>'
        },
        {
            title: 'Свайп',
            action: 'feed',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<rect x="4" y="4" width="16" height="16" rx="4"/>' +
                '<circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none"/>' +
                '<circle cx="15" cy="9" r="1.2" fill="currentColor" stroke="none"/>' +
                '<circle cx="9" cy="15" r="1.2" fill="currentColor" stroke="none"/>' +
                '<circle cx="15" cy="15" r="1.2" fill="currentColor" stroke="none"/>' +
                '</svg>'
        },
        {
            title: 'Настройки',
            action: 'settings',
            icon:
                '<svg viewBox="0 0 24 24">' +
                '<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/>' +
                '<path d="m19 13.5 1.5 1-.9 1.6-1.7-.5a7.8 7.8 0 0 1-1.5 1.2l-.2 1.8h-1.9l-.7-1.7a7.6 7.6 0 0 1-1.6.2l-1 1.5-1.7-.8.3-1.8a7.5 7.5 0 0 1-1.3-1.3l-1.8.2-.6-1.8 1.5-1a7.7 7.7 0 0 1 0-1.8l-1.5-1 .6-1.8 1.8.2A7.5 7.5 0 0 1 8.6 7l-.3-1.8 1.7-.8 1 1.5a7.6 7.6 0 0 1 1.6.2l.7-1.7h1.9l.2 1.8a7.8 7.8 0 0 1 1.5 1.2l1.7-.5.9 1.6-1.5 1a7.7 7.7 0 0 1 0 1.8Z"/>' +
                '</svg>'
        }
    ];

    var installed = false;


    /* =========================================================
       CSS
       ========================================================= */

    function addStyle() {

        if (document.getElementById('oritv-nav-style')) return;

        var style = document.createElement('style');

        style.id = 'oritv-nav-style';

        style.textContent = `

/* =========================================================
   ORITV — ВЕРХНЯЯ КАПСУЛА
   ========================================================= */

.oritv-nav {
    position: absolute !important;

    left: 50% !important;
    top: 4px !important;

    transform: translateX(-50%) !important;

    height: 52px !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    flex-direction: row !important;
    flex-wrap: nowrap !important;

    padding: 4px !important;
    margin: 0 !important;

    width: max-content !important;
    max-width: 65vw !important;

    box-sizing: border-box !important;

    overflow: visible !important;
    white-space: nowrap !important;

    z-index: 999999 !important;

    background:
        rgba(37, 38, 40, .94) !important;

    border:
        1px solid rgba(255,255,255,.07) !important;

    border-radius:
        28px !important;

    box-shadow:
        0 4px 18px rgba(0,0,0,.30),
        inset 0 1px 0 rgba(255,255,255,.035) !important;

    backdrop-filter:
        blur(18px) saturate(120%) !important;

    -webkit-backdrop-filter:
        blur(18px) saturate(120%) !important;
}


/* =========================================================
   КНОПКА
   ========================================================= */

.oritv-nav-item {
    position: relative !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;

    flex: 0 0 auto !important;

    height: 44px !important;

    min-width: 0 !important;

    padding:
        0 15px !important;

    margin: 0 !important;

    border-radius:
        23px !important;

    box-sizing:
        border-box !important;

    background:
        transparent !important;

    color:
        rgba(255,255,255,.70) !important;

    font-family:
        Arial, sans-serif !important;

    font-size:
        16px !important;

    font-weight:
        500 !important;

    line-height:
        44px !important;

    white-space:
        nowrap !important;

    opacity:
        1 !important;

    transform:
        none !important;

    transition:
        background .15s ease,
        color .15s ease !important;

    z-index:
        1000000 !important;
}


/* =========================================================
   ИКОНКА
   ========================================================= */

.oritv-nav-item svg {
    width:
        19px !important;

    height:
        19px !important;

    margin-right:
        7px !important;

    flex:
        0 0 auto !important;

    fill:
        none !important;

    stroke:
        currentColor !important;

    stroke-width:
        1.7 !important;

    stroke-linecap:
        round !important;

    stroke-linejoin:
        round !important;
}


/* =========================================================
   ТЕКСТ
   ========================================================= */

.oritv-nav-text {
    display:
        block !important;

    color:
        inherit !important;

    font-size:
        inherit !important;

    font-weight:
        inherit !important;

    line-height:
        inherit !important;
}


/* =========================================================
   ФОКУС / ВЫБРАННЫЙ ПУНКТ
   ========================================================= */

.oritv-nav-item.focus,
.oritv-nav-item.selected,
.oritv-nav-item:hover {
    color:
        #ffffff !important;

    background:
        rgba(255,255,255,.13) !important;
}


/* =========================================================
   БИРЮЗОВАЯ ЛИНИЯ PRISMA-LIKE
   ========================================================= */

.oritv-nav-item.focus::after,
.oritv-nav-item.selected::after {
    content:
        "" !important;

    position:
        absolute !important;

    left:
        50% !important;

    bottom:
        2px !important;

    transform:
        translateX(-50%) !important;

    width:
        22px !important;

    height:
        3px !important;

    border-radius:
        3px !important;

    background:
        #43f5c3 !important;

    box-shadow:
        0 0 7px rgba(67,245,195,.45) !important;
}


/* =========================================================
   ПОИСК / НАСТРОЙКИ LAMPA
   ========================================================= */

.head__actions .open--search {
    display:
        flex !important;

    visibility:
        visible !important;

    opacity:
        1 !important;
}


/* =========================================================
   ПРАВЫЕ ИКОНКИ
   ========================================================= */

.head__actions .open--settings {
    display:
        none !important;
}


/* =========================================================
   УБИРАЕМ ВРЕМЯ И СЛУЖЕБНЫЕ ЭЛЕМЕНТЫ
   ========================================================= */

.head__time,
.head__markers,
.head__fps,
.head__status {
    display:
        none !important;

    visibility:
        hidden !important;
}


/* =========================================================
   БОЛЬШОЙ ЭКРАН
   ========================================================= */

@media (min-width: 1600px) {

    .oritv-nav {
        height:
            54px !important;

        padding:
            4px !important;

        border-radius:
            29px !important;
    }

    .oritv-nav-item {
        height:
            46px !important;

        padding:
            0 17px !important;

        font-size:
            17px !important;
    }

    .oritv-nav-item svg {
        width:
            20px !important;

        height:
            20px !important;
    }
}


/* =========================================================
   НЕБОЛЬШОЙ ЭКРАН
   ========================================================= */

@media (max-width: 1200px) {

    .oritv-nav {
        max-width:
            72vw !important;

        height:
            48px !important;

        padding:
            3px !important;
    }

    .oritv-nav-item {
        height:
            40px !important;

        padding:
            0 10px !important;

        font-size:
            14px !important;
    }

    .oritv-nav-item svg {
        width:
            17px !important;

        height:
            17px !important;

        margin-right:
            5px !important;
    }
}

`;

        document.head.appendChild(style);
    }


    /* =========================================================
       HIDE
       ========================================================= */

    function hide(element) {

        if (!element) return;

        try {
            element.style.setProperty(
                'display',
                'none',
                'important'
            );

            element.style.setProperty(
                'visibility',
                'hidden',
                'important'
            );
        } catch (e) {}
    }


    /* =========================================================
       SEARCH
       ========================================================= */

    function isSearch(element) {

        if (!element) return false;

        var cls =
            typeof element.className === 'string'
                ? element.className
                : '';

        if (
            cls.indexOf('open--search') !== -1
        ) {
            return true;
        }

        try {

            var use =
                element.querySelector('use');

            if (use) {

                var href =
                    use.getAttribute('href') ||
                    use.getAttribute('xlink:href') ||
                    '';

                if (
                    href.indexOf('search') !== -1
                ) {
                    return true;
                }
            }

        } catch (e) {}

        return false;
    }


    /* =========================================================
       SETTINGS
       ========================================================= */

    function isSettings(element) {

        if (!element) return false;

        var cls =
            typeof element.className === 'string'
                ? element.className
                : '';

        return (
            cls.indexOf('open--settings') !== -1
        );
    }


    /* =========================================================
       ОЧИСТКА HEAD
       ========================================================= */

    function cleanHead() {

        var body =
            document.querySelector('.head__body');

        if (!body) return;

        var time =
            body.querySelectorAll(
                '.head__time,' +
                '.head__markers,' +
                '.head__fps,' +
                '.head__status'
            );

        for (var i = 0; i < time.length; i++) {
            hide(time[i]);
        }


        var actions =
            body.querySelector('.head__actions');

        if (!actions) return;


        var children =
            Array.prototype.slice.call(
                actions.children
            );


        for (
            var j = 0;
            j < children.length;
            j++
        ) {

            var child = children[j];

            if (
                child.classList.contains(
                    'oritv-nav'
                )
            ) {
                continue;
            }


            if (isSearch(child)) {

                child.style.setProperty(
                    'display',
                    'flex',
                    'important'
                );

                child.style.setProperty(
                    'visibility',
                    'visible',
                    'important'
                );

                child.style.setProperty(
                    'opacity',
                    '1',
                    'important'
                );

                continue;
            }


            /*
             * Старые настройки Lampa скрываем,
             * потому что настройки теперь
             * находятся внутри нашей капсулы.
             */

            if (isSettings(child)) {
                hide(child);
                continue;
            }


            try {
                child.remove();
            } catch (e) {
                hide(child);
            }
        }
    }


    /* =========================================================
       НАЙТИ MENU ITEM
       ========================================================= */

    function findMenuItem(action) {

        try {

            return document.querySelector(
                '.menu__item[data-action="' +
                action +
                '"]'
            );

        } catch (e) {

            return null;
        }
    }


    /* =========================================================
       НАЙТИ SETTINGS
       ========================================================= */

    function findSettings() {

        try {

            var element =
                document.querySelector(
                    '.head__actions .open--settings'
                );

            if (element) return element;


            element =
                document.querySelector(
                    '.open--settings'
                );

            if (element) return element;

        } catch (e) {}

        return null;
    }


    /* =========================================================
       ACTIVATE
       ========================================================= */

    function activate(element) {

        if (!element) return false;

        try {

            if (
                window.jQuery &&
                window.jQuery.fn &&
                window.jQuery.fn.trigger
            ) {

                window.jQuery(element)
                    .trigger('hover:enter');

                return true;
            }

        } catch (e) {}


        try {

            element.dispatchEvent(
                new CustomEvent(
                    'hover:enter',
                    {
                        bubbles: true,
                        cancelable: true
                    }
                )
            );

            return true;

        } catch (e) {}

        return false;
    }


    /* =========================================================
       АКТИВНЫЙ ПУНКТ
       ========================================================= */

    function selectButton(action) {

        var nav =
            document.querySelector(
                '.oritv-nav'
            );

        if (!nav) return;

        var buttons =
            nav.querySelectorAll(
                '.oritv-nav-item'
            );

        for (
            var i = 0;
            i < buttons.length;
            i++
        ) {

            if (
                buttons[i].getAttribute(
                    'data-action'
                ) === action
            ) {

                buttons[i].classList.add(
                    'selected'
                );

            } else {

                buttons[i].classList.remove(
                    'selected'
                );
            }
        }
    }


    /* =========================================================
       ОТКРЫТИЕ
       ========================================================= */

    function execute(action) {

        selectButton(action);


        /*
         * НАСТРОЙКИ
         */

        if (action === 'settings') {

            var settings =
                findSettings();

            if (settings) {
                activate(settings);
            }

            return;
        }


        /*
         * СВАЙП
         *
         * В разных сборках Lampa
         * этот раздел может называться
         * feed или swipe.
         */

        if (action === 'feed') {

            var feed =
                findMenuItem('feed');

            if (!feed) {
                feed =
                    findMenuItem('swipe');
            }

            if (!feed) {
                feed =
                    findMenuItem('cartoon');
            }

            if (feed) {
                activate(feed);
            }

            return;
        }


        /*
         * ОСТАЛЬНЫЕ РАЗДЕЛЫ
         */

        var item =
            findMenuItem(action);

        if (item) {

            activate(item);

            return;
        }


        /*
         * Иногда меню создаётся
         * немного позже.
         */

        setTimeout(
            function () {

                var retry =
                    findMenuItem(action);

                if (retry) {
                    activate(retry);
                }

            },
            300
        );
    }


    /* =========================================================
       СОЗДАНИЕ КНОПКИ
       ========================================================= */

    function createButton(item) {

        var button =
            document.createElement('div');

        button.className =
            'head__action selector oritv-nav-item';

        button.setAttribute(
            'data-action',
            item.action
        );


        button.innerHTML =
            item.icon +
            '<span class="oritv-nav-text">' +
            item.title +
            '</span>';


        /*
         * ПУЛЬТ LAMPA
         */

        if (window.jQuery) {

            try {

                window.jQuery(button).on(
                    'hover:enter',
                    function () {
                        execute(item.action);
                    }
                );

            } catch (e) {}

        }


        /*
         * Обычный клик мышью
         */

        button.addEventListener(
            'click',
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                execute(item.action);
            }
        );


        return button;
    }


    /* =========================================================
       УСТАНОВКА
       ========================================================= */

    function install() {

        var head =
            document.querySelector('.head');

        if (!head) return false;


        var actions =
            head.querySelector(
                '.head__actions'
            );

        if (!actions) return false;


        addStyle();

        cleanHead();


        /*
         * Уже установлена
         */

        var old =
            actions.querySelector(
                '.oritv-nav'
            );

        if (old) {

            installed = true;

            return true;
        }


        /*
         * Создаём капсулу
         */

        var nav =
            document.createElement('div');

        nav.className =
            'oritv-nav';


        for (
            var i = 0;
            i < ITEMS.length;
            i++
        ) {

            nav.appendChild(
                createButton(
                    ITEMS[i]
                )
            );
        }


        /*
         * Вставляем
         */

        try {

            actions.appendChild(nav);

        } catch (e) {

            return false;
        }


        /*
         * По умолчанию Фильмы
         * как на твоём скриншоте.
         */

        selectButton('movie');


        cleanHead();

        installed = true;

        return true;
    }


    /* =========================================================
       OBSERVER
       ========================================================= */

    function startObserver() {

        if (
            typeof MutationObserver ===
            'undefined'
        ) {
            return;
        }


        var observer =
            new MutationObserver(
                function () {

                    if (!installed) {
                        install();
                        return;
                    }

                    cleanHead();
                }
            );


        if (document.body) {

            observer.observe(
                document.body,
                {
                    childList: true,
                    subtree: true
                }
            );
        }
    }


    /* =========================================================
       START
       ========================================================= */

    startObserver();


    var attempts = 0;

    var timer =
        setInterval(
            function () {

                attempts++;


                if (install()) {

                    clearInterval(timer);

                    return;
                }


                if (attempts >= 150) {

                    clearInterval(timer);
                }

            },
            200
        );

})();
