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
               OriTV — карточки
               Prisma-inspired
               ===================================================== */

            .card {
                width: 13em !important;
                flex-shrink: 0 !important;
                position: relative !important;
                transition: transform .18s ease !important;
            }

            .card__view {
                position: relative !important;
                padding-bottom: 150% !important;
                margin-bottom: .75em !important;
                overflow: hidden !important;
                border-radius: 12px !important;
                background: #181818 !important;
            }

            .card__img {
                position: absolute !important;
                inset: 0 !important;

                width: 100% !important;
                height: 100% !important;

                object-fit: cover !important;

                border-radius: 12px !important;

                background: #181818 !important;

                transition:
                    transform .22s ease,
                    filter .22s ease !important;
            }

            /*
             * Затемнение картинки
             */
            .card__view::after {
                content: '' !important;

                position: absolute !important;
                inset: 0 !important;

                pointer-events: none !important;

                background:
                    linear-gradient(
                        to bottom,
                        rgba(0,0,0,0) 55%,
                        rgba(0,0,0,.35) 100%
                    ) !important;

                border-radius: 12px !important;

                z-index: 2 !important;
            }

            /*
             * Название
             */
            .card__title {
                font-size: 1.15em !important;

                line-height: 1.25 !important;

                max-height: 2.5em !important;

                overflow: hidden !important;

                display: -webkit-box !important;
                -webkit-line-clamp: 2 !important;
                -webkit-box-orient: vertical !important;

                color: rgba(255,255,255,.92) !important;

                font-weight: 500 !important;

                margin-top: .1em !important;
            }

            /*
             * Год
             */
            .card__age {
                font-size: .85em !important;

                margin-top: .4em !important;

                color: rgba(255,255,255,.48) !important;
            }

            /*
             * Фокус пульта
             */
            .card.focus {
                z-index: 20 !important;

                transform: scale(1.055) !important;
            }

            .card.focus .card__view {
                border-radius: 14px !important;

                box-shadow:
                    0 8px 25px rgba(0,0,0,.45),
                    0 0 0 2px rgba(255,255,255,.85) !important;
            }

            .card.focus .card__img {
                transform: scale(1.015) !important;
            }

            .card.focus .card__title {
                color: #ffffff !important;
            }

            /*
             * Иконки внутри карточки
             */
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

            /*
             * Маркер просмотра
             */
            .card__marker {
                left: .5em !important;
                bottom: .5em !important;

                background: rgba(0,0,0,.65) !important;

                border-radius: 8px !important;

                backdrop-filter: blur(8px) !important;
                -webkit-backdrop-filter: blur(8px) !important;
            }

            /*
             * Ряды
             */
            .scroll__body .card {
                margin-right: .55em !important;
            }

            /*
             * Большой экран
             */
            @media (min-width: 1600px) {

                .card {
                    width: 14em !important;
                }

                .card__title {
                    font-size: 1.2em !important;
                }
            }

            /*
             * Небольшой экран
             */
            @media (max-width: 1200px) {

                .card {
                    width: 11em !important;
                }

                .card__title {
                    font-size: 1em !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function apply() {
        addStyle();
    }

    /*
     * Lampa может пересоздавать DOM.
     * Поэтому стиль просто держим установленным,
     * а карточки сам Lampa продолжает создавать.
     */

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', apply);
    } else {
        apply();
    }

    setTimeout(apply, 500);
    setTimeout(apply, 1500);
    setTimeout(apply, 3000);

})();
