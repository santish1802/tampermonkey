// AJUSTAR BORDES
(function() {
    'use strict';
    function removeInlineStyle() {
        const element = document.querySelector('.mx-auto.flex.flex-1.gap-4.text-base.md\\:gap-5.lg\\:gap-6.md\\:max-w-3xl.lg\\:max-w-\\[40rem\\].xl\\:max-w-\\[48rem\\]');
        if (element) {
            element.removeAttribute('style');
        }
    }
    window.addEventListener('load', () => {
        removeInlineStyle(); // Aplicar una vez al cargar
    });
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        removeInlineStyle();
    }
})();
