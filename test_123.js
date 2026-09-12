(function () {
    'use strict';

    if (window.Lampa && Lampa.Noty) {
        Lampa.Noty.show('TEST 123 WORKS');
    } else {
        alert('TEST 123: LAMPA NOT FOUND');
    }
})();
