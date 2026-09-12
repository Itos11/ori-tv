(function () {
    'use strict';

    if (window.TOP_NAV_01) return;
    window.TOP_NAV_01 = true;

    var box = document.createElement('div');

    box.id = 'top-nav-01';

    box.style.position = 'fixed';
    box.style.top = '0';
    box.style.left = '0';
    box.style.right = '0';
    box.style.height = '80px';
    box.style.background = 'rgba(0,0,0,0.95)';
    box.style.zIndex = '999999';
    box.style.display = 'flex';
    box.style.alignItems = 'center';
    box.style.justifyContent = 'center';

    box.innerHTML =
        '<div style="display:flex;gap:15px;color:white;font-size:22px;font-weight:bold;">' +
        '<span>ГЛАВНОЕ</span>' +
        '<span>ИСТОРИЯ</span>' +
        '<span>ФИЛЬМЫ</span>' +
        '<span>СЕРИАЛЫ</span>' +
        '<span>МУЛЬТФИЛЬМЫ</span>' +
        '</div>';

    document.body.appendChild(box);

    Lampa.Noty.show('TOP NAV 01');
})();
