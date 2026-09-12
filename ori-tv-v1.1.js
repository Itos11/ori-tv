/*!
 * Ori TV for Lampa — v1.1.0
 */
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

    function manifestAdd() {
        try {
            if (!Lampa.Manifest) Lampa.Manifest = {};
            Lampa.Manifest.plugins = manifest;
        } catch (e) {}
    }

    function styles() {
        if (document.getElementById('ori-tv-style')) return;

        var s = document.createElement('style');
        s.id = 'ori-tv-style';

        s.textContent =
        '.ori-tv-page{background:#05060d;color:#fff;min-height:100%;padding:1.5em 2em 4em}' +
        '.ori-tv-brand{font-size:2em;font-weight:800;margin-bottom:.7em}.ori-tv-brand b{color:#9b4cff}' +
        '.ori-tv-hero{min-height:20em;border:1px solid #292a3d;border-radius:1em;overflow:hidden;background:radial-gradient(circle at 75% 40%,#7434a955,transparent 30%),linear-gradient(100deg,#080910,#191523 55%,#302039);position:relative}' +
        '.ori-tv-copy{padding:3em;max-width:38em;position:relative;z-index:1}.ori-tv-eyebrow{font-size:.7em;letter-spacing:.45em;color:#aaa8b9}' +
        '.ori-tv-title{font-size:3.8em;line-height:.9;font-weight:900;margin:.25em 0}.ori-tv-meta{display:flex;gap:.7em;color:#ccc}' +
        '.ori-tv-q{background:#7438dc;padding:.2em .45em;border-radius:.3em}.ori-tv-r{color:#ffc42b}' +
        '.ori-tv-copy p{color:#c5c2cf;line-height:1.5}.ori-tv-action{display:inline-block;padding:.75em 1.4em;border-radius:2em;background:linear-gradient(90deg,#8c3dff,#5b27d1);margin-top:.7em}' +
        '.ori-tv-row{margin-top:1.5em}.ori-tv-row h2{font-size:1.3em;margin:0 0 .65em}.ori-tv-cards{display:flex;gap:.7em;overflow:hidden}' +
        '.ori-tv-card{width:12em;min-width:12em;background:#11121d;border:1px solid #292a3b;border-radius:.65em;overflow:hidden}' +
        '.ori-tv-poster{height:7em;background:radial-gradient(circle at 70% 25%,#8a3dce66,transparent 35%),linear-gradient(135deg,#17192b,#45205b);display:flex;align-items:flex-end;padding:.55em;position:relative}' +
        '.ori-tv-card-title{position:relative;z-index:1;font-weight:700;font-size:.9em}.ori-tv-info{padding:.55em .65em;color:#aaa9b7;font-size:.7em;display:flex;gap:.55em}' +
        '.ori-tv-quality{background:#7138dc;color:#fff;border-radius:.25em;padding:.15em .3em}.ori-tv-rating{color:#ffc42b}' +
        '.ori-tv-progress{height:.2em;background:#292a38;margin:0 .65em .65em}.ori-tv-progress i{display:block;height:100%;background:#9d4dff}';

        document.head.appendChild(s);
    }

    var rows = [
        ['Сейчас смотрят',[
            'Дэдпул и Росомаха',
            'Пацаны',
            'Дом Дракона',
            'Дюна: Часть вторая',
            'Годзилла и Конг',
            'Министерство джентльменских дел'
        ]],

        ['Популярные сериалы',[
            'Игра престолов',
            'Одни из нас',
            'Ведьмак',
            'Сёгун',
            'Фоллаут',
            'Уэнсдэй'
        ]],

        ['Продолжить просмотр',[
            'Последний из нас',
            'Дом Дракона',
            'Пацаны',
            'Сёгун',
            'Рик и Морти',
            'Уэнсдэй'
        ]],

        ['Новинки',[
            'Чужой: Ромул',
            'Плохие парни',
            'Тихое место',
            'Гарфилд в кино',
            'Королевство планеты обезьян'
        ]]
    ];

    function component(object) {
        var html;

        this.create = function () {
            styles();

            html = $('<div class="ori-tv-page"></div>');

            html.append(
                $('<div class="ori-tv-brand"></div>')
                .html('▶ Ori <b>TV</b>')
            );

            var hero = $('<div class="ori-tv-hero"></div>');
            var copy = $('<div class="ori-tv-copy"></div>');

            copy.append(
                $('<div class="ori-tv-eyebrow"></div>')
                .text('РЕКОМЕНДУЕМ')
            );

            copy.append(
                $('<div class="ori-tv-title"></div>')
                .text('ОДНИ ИЗ НАС')
            );

            copy.append(
                $('<div class="ori-tv-meta"></div>')
                .append(
                    $('<span class="ori-tv-q"></span>').text('4K'),
                    $('<span class="ori-tv-r"></span>').text('★ 8.8'),
                    $('<span></span>').text('2023'),
                    $('<span></span>').text('Драма, Триллер')
                )
            );

            copy.append(
                $('<p></p>')
                .text('Мир изменился навсегда. Чтобы выжить, им придётся доверять друг другу.')
            );

            copy.append(
                $('<div class="ori-tv-action selector"></div>')
                .text('▶ Смотреть')
            );

            hero.append(copy);
            html.append(hero);

            rows.forEach(function (row, ri) {

                var section = $('<section class="ori-tv-row"></section>');

                section.append(
                    $('<h2></h2>').text(row[0])
                );

                var cards = $('<div class="ori-tv-cards"></div>');

                row[1].forEach(function (title, i) {

                    var card = $('<div class="ori-tv-card selector"></div>');

                    var poster = $('<div class="ori-tv-poster"></div>');

                    poster.append(
                        $('<div class="ori-tv-card-title"></div>')
                        .text(title)
                    );

                    card.append(poster);

                    if (ri === 2) {

                        card.append(
                            $('<div class="ori-tv-info"></div>')
                            .text(
                                'S' + (i % 2 + 1) +
                                ' · E' + (i + 3) +
                                '  Осталось ' + (i + 6) + ' мин'
                            )
                        );

                        card.append(
                            $('<div class="ori-tv-progress"></div>')
                            .append(
                                $('<i></i>')
                                .css('width', (35 + i * 9) + '%')
                            )
                        );

                    } else {

                        card.append(
                            $('<div class="ori-tv-info"></div>')
                            .append(
                                $('<span class="ori-tv-quality"></span>')
                                .text(i === 4 ? 'HD' : '4K'),

                                $('<span class="ori-tv-rating"></span>')
                                .text(
                                    '★ ' +
                                    (7.4 + i / 10).toFixed(1)
                                ),

                                $('<span></span>')
                                .text('2024')
                            )
                        );
                    }

                    cards.append(card);
                });

                section.append(cards);
                html.append(section);
            });

            return this.render();
        };

        this.render = function () {
            return html;
        };

        this.start = function () {
            try {
                Lampa.Controller.toggle('content');
            } catch (e) {}
        };

        this.pause = function () {};
        this.stop = function () {};

        this.destroy = function () {
            if (html) html.remove();
        };

        this.back = function () {
            Lampa.Activity.backward();
        };
    }

    function openHome() {

        Lampa.Component.add(
            'ori_tv_home',
            component
        );

        Lampa.Activity.push({
            url: '',
            title: 'Ori TV',
            component: 'ori_tv_home',
            page: 1
        });
    }

    function start() {

        if (window.ori_tv_started) return;

        window.ori_tv_started = true;

        manifestAdd();
        styles();

        if (Lampa.Component && Lampa.Component.add) {
            Lampa.Component.add(
                'ori_tv_home',
                component
            );
        }

        if (Lampa.Menu && Lampa.Menu.addButton) {

            var icon =
                '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                '<path d="M5 4l14 8-14 8V4z"/>' +
                '</svg>';

            Lampa.Menu.addButton(
                icon,
                'Ori TV',
                openHome
            );
        }

        console.log('[Ori TV] v1.1.0 loaded');
    }

    if (window.appready) {
        start();
    } else if (
        Lampa.Listener &&
        Lampa.Listener.follow
    ) {

        Lampa.Listener.follow(
            'app',
            function (e) {
                if (e.type === 'ready') {
                    start();
                }
            }
        );
    }

})();
