(function () {
    'use strict';

    if (window.ORITV_CARDS) return;
    window.ORITV_CARDS = true;

    function addStyle() {
        if (document.getElementById('oritv-cards-style')) return;

        var style = document.createElement('style');
        style.id = 'oritv-cards-style';

        style.textContent = `
            /* =====================================================
               OriTV — Prisma style cards
               ===================================================== */

            .card {
                width: 13em !important;
                flex-shrink: 0 !important;
                position: relative !important;

                transition:
                    transform .20s cubic-bezier(.2,.8,.2,1),
                    opacity .20s ease,
                    filter .20s ease !important;
            }


            /* -----------------------------------------------------
               Обычная карточка
               ----------------------------------------------------- */

            .card__view {
                position: relative !important;

                padding-bottom: 150% !important;

                margin-bottom: .75em !important;

                overflow: hidden !important;

                border-radius: 12px !important;

                background: #181818 !important;

                transition:
                    border-radius .20s ease,
                    box-shadow .20s ease !important;
            }


            .card__img {
                position: absolute !important;

                inset: 0 !important;

                width: 100% !important;
                height: 100% !important;

                object-fit: cover !important;

                border-radius: 12px !important;

                transition:
                    transform .25s cubic-bezier(.2,.8,.2,1),
                    filter .20s ease !important;
            }


            /* -----------------------------------------------------
               Затемнение нижней части постера
               ----------------------------------------------------- */

            .card__view::after {
                content: '' !important;

                position: absolute !important;

                inset: 0 !important;

                pointer-events: none !important;

                background:
                    linear-gradient(
                        to bottom,
                        rgba(0,0,0,0) 45%,
                        rgba(0,0,0,.10) 65%,
                        rgba(0,0,0,.55) 100%
                    ) !important;

                border-radius: 12px !important;

                z-index: 2 !important;
            }


            /* -----------------------------------------------------
               Название
               ----------------------------------------------------- */

            .card__title {
                font-size: 1.15em !important;

                line-height: 1.25 !important;

                max-height: 2.5em !important;

                overflow: hidden !important;

                display: -webkit-box !important;

                -webkit-line-clamp: 2 !important;

                -webkit-box-orient: vertical !important;

                color: rgba(255,255,255,.90) !important;

                font-weight: 500 !important;

                margin-top: .1em !important;

                transition:
                    color .20s ease !important;
            }


            .card__age {
                font-size: .85em !important;

                margin-top: .4em !important;

                color: rgba(255,255,255,.48) !important;
            }


            /* =====================================================
               ФОКУС
               ===================================================== */

            .card.focus {
                z-index: 50 !important;

                transform:
                    translateY(-7px)
                    scale(1.075) !important;

                opacity: 1 !important;

                filter: none !important;
            }


            .card.focus .card__view {
                border-radius: 14px !important;

                box-shadow:
                    0 12px 30px rgba(0,0,0,.55),
                    0 0 0 2px rgba(255,255,255,.90) !important;
            }


            .card.focus .card__img {
                transform: scale(1.025) !important;

                filter: brightness(1.04) !important;
            }


            .card.focus .card__title {
                color: #ffffff !important;
            }


            /* =====================================================
               СОСЕДНИЕ КАРТОЧКИ
               ===================================================== */

            .card.focus ~ .card {
                opacity: .82 !important;
            }


            .card:has(~ .card.focus) {
                opacity: .82 !important;
            }


            /* -----------------------------------------------------
               Не затемняем соседей слишком сильно,
               чтобы интерфейс оставался читаемым.
               ----------------------------------------------------- */

            .card:not(.focus) {
                filter: brightness(.94) !important;
            }


            .card.focus {
                filter: brightness(1) !important;
            }


            /* =====================================================
               ИКОНКИ
               ===================================================== */

            .card__icons {
                top: .65em !important;

                z-index: 5 !important;
            }


            .card__icons-inner {
                background: rgba(0,0,0,.62) !important;

                border-radius: 20px !important;

                backdrop-filter: blur(8px) !important;

                -webkit-backdrop-filter: blur(8px) !important;
            }


            /* =====================================================
               МАРКЕР
               ===================================================== */

            .card__marker {
                left: .5em !important;

                bottom: .5em !important;

                background: rgba(0,0,0,.65) !important;

                border-radius: 8px !important;

                backdrop-filter: blur(8px) !important;

                -webkit-backdrop-filter: blur(8px) !important;
            }


            /* =====================================================
               РЯДЫ
               ===================================================== */

            .scroll__body .card {
                margin-right: .55em !important;
            }


            /* =====================================================
               БОЛЬШОЙ ЭКРАН
               ===================================================== */

            @media (min-width: 1600px) {

                .card {
                    width: 14em !important;
                }

                .card__title {
                    font-size: 1.2em !important;
                }

                .card.focus {
                    transform:
                        translateY(-8px)
                        scale(1.08) !important;
                }
            }


            /* =====================================================
               НЕБОЛЬШОЙ ЭКРАН
               ===================================================== */

            @media (max-width: 1200px) {

                .card {
                    width: 11em !important;
                }

                .card__title {
                    font-size: 1em !important;
                }

                .card.focus {
                    transform:
                        translateY(-5px)
                        scale(1.06) !important;
                }
            }
        `;

        document.head.appendChild(style);
    }


    function start() {
        addStyle();
    }


    if (document.readyState === 'loading') {
        document.addEventListener(
            'DOMContentLoaded',
            start
        );
    } else {
        start();
    }


    setTimeout(start, 500);
    setTimeout(start, 1500);
    setTimeout(start, 3000);

})();
