(function () {
    'use strict';

    if (window.ori_tv_plugin_ready) return;
    window.ori_tv_plugin_ready = true;

    var manifest = {
        type: 'video',
        version: '1.1.0',
        name: 'Ori TV',
        description: 'Интерфейс Ori TV для Lampa',
        component: 'ori_tv_home'
    };

    function addManifest() {
        if (window.Lampa && Lampa.Manifest) {
            Lampa.Manifest.plugins = Lampa.Manifest.plugins || {};
            Lampa.Manifest.plugins.ori_tv = manifest;
        }
    }

    var css = `
        .ori-tv {
            min-height: 100vh;
            background: #08070d;
            color: #fff;
            padding: 25px 4%;
            box-sizing: border-box;
        }

        .ori-tv-logo {
            font-size: 34px;
            font-weight: 800;
            color: #b56cff;
            text-shadow: 0 0 18px #6d35ff;
        }

        .ori-tv-subtitle {
            color: #aaa;
            font-size: 13px;
            margin-top: 2px;
        }

        .ori-tv-nav {
            display: flex;
            gap: 8px;
            margin: 25px 0;
            overflow-x: auto;
        }

        .ori-tv-nav span {
            background: #17141f;
            border-radius: 25px;
            padding: 11px 18px;
            white-space: nowrap;
            color: #bbb;
        }

        .ori-tv-nav span.active {
            background: #8b45ff;
            color: #fff;
        }

        .ori-tv-hero {
            min-height: 260px;
            border-radius: 22px;
            padding: 30px;
            margin-bottom: 30px;
            background:
                linear-gradient(90deg, #171021 0%, #171021cc 45%, #17102122 100%);
            box-shadow: 0 10px 40px #000;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
        }

        .ori-tv-hero-title {
            font-size: 42px;
            font-weight: 800;
            margin-bottom: 8px;
        }

        .ori-tv-hero-info {
            color: #bbb;
            margin-bottom: 18px;
        }

        .ori-tv-button {
            display: inline-block;
            width: fit-content;
            padding: 12px 22px;
            background: #914dff;
            border-radius: 12px;
            font-weight: 700;
        }

        .ori-tv-section {
            margin: 25px 0;
        }

        .ori-tv-section-title {
            font-size: 22px;
            font-weight: 700;
            margin-bottom: 15px;
        }

        .ori-tv-row {
            display: flex;
            gap: 14px;
            overflow-x: auto;
        }

        .ori-tv-card {
            min-width: 155px;
            width: 155px;
            background: #121018;
            border-radius: 14px;
            overflow: hidden;
        }

        .ori-tv-poster {
            height: 220px;
            background: linear-gradient(145deg,#30234a,#100d17);
            display: flex;
            align-items: flex-end;
            padding: 10px;
            box-sizing: border-box;
        }

        .ori-tv-card-title {
            font-weight: 700;
            font-size: 14px;
            padding: 10px 10px 3px;
        }

        .ori-tv-card-meta {
            color: #999;
            font-size: 12px;
            padding: 0 10px 10px;
        }

        .ori-tv-progress {
            height: 3px;
            background: #302b38;
        }

        .ori-tv-progress i {
            display: block;
            height: 100%;
            width: 48%;
            background: #a45cff;
        }
    `;

    function injectCSS() {
        if (document.getElementById('ori-tv-css')) return;

        var style = document.createElement('style');
        style.id = 'ori-tv-css';
        style.innerHTML = css;
        document.head.appendChild(style);
    }

    var titles = [
        'Одни из нас',
        'Уэнсдэй',
        'Аркейн',
        'Дюна',
        'Интерстеллар',
        'Пацаны'
    ];

    function card(title, index) {
        return `
            <div class="ori-tv-card">
                <div class="ori-tv-poster">
                    <span>${title}</span>
                </div>
                <div class="ori-tv-card-title">${title}</div>
                <div class="ori-tv-card-meta">2024 • 4K • ⭐ 8.${index}</div>
                <div class="ori-tv-progress">
                    <i></i>
                </div>
            </div>
        `;
    }
