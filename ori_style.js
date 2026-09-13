(function () {
    'use strict';

    if (window.ORI_STYLE) return;
    window.ORI_STYLE = true;

    function addStyle() {
        if (document.getElementById('ori-style')) return;

        var style = document.createElement('style');
        style.id = 'ori-style';

        style.textContent = `
            /* =====================================================
               OriTV — Prisma style
               Только внешний вид.
               Навигацию prisma_nav_v4.js НЕ меняем.
               ===================================================== */

            .prisma-v4-container {
                background: rgba(18, 18, 20, .78) !important;

                border: 1px solid rgba(255,255,255,.08) !important;
                border-radius: 14px !important;

                padding: 0 8px !important;

                box-shadow:
                    0 8px 30px rgba(0,0,0,.38),
                    inset 0 1px 0 rgba(255,255,255,.04) !important;

                backdrop-filter: blur(18px) saturate(120%) !important;
                -webkit-backdrop-filter: blur(18px) saturate(120%) !important;

                gap: 6px !important;
            }

            .prisma-v4-item {
                height: 42px !important;

                padding-left: 15px !important;
                padding-right: 15px !important;

                border-radius: 10px !important;

                background: transparent !important;

                color: rgba(255,255,255,.70) !important;

                font-family: Arial, sans-serif !important;
                font-size: 15px !important;
                font-weight: 500 !important;

                opacity: 1 !important;

                transition:
                    background .15s ease,
                    color .15s ease,
                    transform .15s ease !important;
            }

            .prisma-v4-item.focus {
                background: rgba(255,255,255,.15) !important;

                color: #fff !important;

                transform: scale(1.03) !important;

                box-shadow:
                    0 4px 14px rgba(0,0,0,.22),
                    inset 0 1px 0 rgba(255,255,255,.06) !important;
            }

            @media (min-width: 1600px) {

                .prisma-v4-container {
                    gap: 7px !important;
                    padding-left: 9px !important;
                    padding-right: 9px !important;
                    border-radius: 15px !important;
                }

                .prisma-v4-item {
                    padding-left: 17px !important;
                    padding-right: 17px !important;
                    font-size: 16px !important;
                }
            }

            @media (max-width: 1200px) {

                .prisma-v4-container {
                    gap: 3px !important;
                    padding-left: 5px !important;
                    padding-right: 5px !important;
                    border-radius: 12px !important;
                }

                .prisma-v4-item {
                    padding-left: 9px !important;
                    padding-right: 9px !important;
                    font-size: 13px !important;
                }
            }
        `;

        document.head.appendChild(style);
    }

    function start() {
        addStyle();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', start);
    } else {
        start();
    }

    setTimeout(start, 1000);
    setTimeout(start, 3000);

})();
