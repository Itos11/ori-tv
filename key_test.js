(function () {
    'use strict';

    if (window.KEY_TEST_PLUGIN) return;
    window.KEY_TEST_PLUGIN = true;

    var box = document.createElement('div');

    box.style.position = 'fixed';
    box.style.left = '50%';
    box.style.bottom = '30px';
    box.style.transform = 'translateX(-50%)';
    box.style.zIndex = '9999999';
    box.style.background = 'rgba(0,0,0,0.95)';
    box.style.color = '#ffffff';
    box.style.padding = '15px 30px';
    box.style.fontSize = '24px';
    box.style.fontWeight = 'bold';
    box.style.borderRadius = '10px';

    box.innerHTML = 'НАЖМИ ← → ↑ ↓ ИЛИ OK';

    document.body.appendChild(box);

    function show(text) {
        box.innerHTML = text;

        setTimeout(function () {
            box.innerHTML = 'НАЖМИ ← → ↑ ↓ ИЛИ OK';
        }, 1000);
    }

    document.addEventListener('keydown', function (event) {

        if (event.keyCode === 37) {
            show('LEFT ←');
        }

        if (event.keyCode === 38) {
            show('UP ↑');
        }

        if (event.keyCode === 39) {
            show('RIGHT →');
        }

        if (event.keyCode === 40) {
            show('DOWN ↓');
        }

        if (event.keyCode === 13) {
            show('OK');
        }

    }, true);

    Lampa.Noty.show('KEY TEST ГОТОВ');

})();
