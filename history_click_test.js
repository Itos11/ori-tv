(function () {
    'use strict';

    if (window.HISTORY_CLICK_TEST) return;
    window.HISTORY_CLICK_TEST = true;

    function notify(text) {
        if (window.Lampa &&
            Lampa.Noty &&
            Lampa.Noty.show) {
            Lampa.Noty.show(text);
        }
    }

    function findHistory() {
        var elements = document.querySelectorAll('*');

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];

            if (!el || !el.textContent) continue;

            var text = el.textContent.trim();

            if (
                text === 'История' ||
                text === 'История просмотров'
            ) {
                // Берём самый маленький подходящий элемент,
                // чтобы не нажать на весь контейнер.
                if (
                    el.children.length === 0 ||
                    el.tagName === 'BUTTON' ||
                    el.tagName === 'A'
                ) {
                    return el;
                }
            }
        }

        return null;
    }

    function clickHistory() {
        var history = findHistory();

        if (history) {

            notify('НАШЁЛ ИСТОРИЮ — НАЖИМАЮ');

            try {
                history.click();
            } catch (e) {
                try {
                    history.dispatchEvent(
                        new MouseEvent('click', {
                            bubbles: true,
                            cancelable: true,
                            view: window
                        })
                    );
                } catch (e2) {
                    notify('ОШИБКА CLICK: ' + e2.message);
                }
            }

            return true;
        }

        return false;
    }

    notify('ИЩУ ШТАТНУЮ КНОПКУ ИСТОРИЯ...');

    // Сначала пробуем найти уже открытый пункт.
    setTimeout(function () {

        if (clickHistory()) {
            return;
        }

        // Если меню закрыто — пытаемся открыть стандартное меню.
        var menuButtons = document.querySelectorAll(
            '[class*="menu"], [class*="Menu"], [aria-label*="меню"], [aria-label*="Menu"]'
        );

        for (var i = 0; i < menuButtons.length; i++) {

            var el = menuButtons[i];

            if (
                el.offsetWidth > 0 &&
                el.offsetHeight > 0
            ) {
                try {
                    el.click();
                    break;
                } catch (e) {}
            }
        }

        // После открытия меню снова ищем Историю.
        setTimeout(function () {

            if (!clickHistory()) {
                notify(
                    'КНОПКА ИСТОРИЯ НЕ НАЙДЕНА'
                );
            }

        }, 1000);

    }, 500);

})();
