(function() {
    'use strict';
    let isChecking = false;
    let checkTimeout;

    function createScrollButton(text, className) {
    const button = document.createElement('div');
    button.textContent = text;
    button.className = `scroll-btn ${className} btn-pers`;
    return button;
}

function createScrollTarget(className) {
    const target = document.createElement('div');
    target.className = `scroll-target ${className}`;
    return target;
}

function addScrollButtons() {
    document.querySelectorAll('.flex.flex-grow.flex-col.max-w-full').forEach(element => {
        if (element.offsetHeight > 400) {
            ['scroll-target-top', 'scroll-target-bottom'].forEach(className => {
                if (!element.querySelector(`.${className}`)) {
                    element.insertAdjacentElement(
                        className === 'scroll-target-top' ? 'afterbegin' : 'beforeend',
                        createScrollTarget(className)
                    );
                }
            });

            [['scroll-to-top-btn', '↑', 'scroll-target-top', 'start'], ['scroll-to-bottom-btn', '↓', 'scroll-target-bottom', 'end']].forEach(([btnClass, text, targetClass, block]) => {
                if (!element.querySelector(`.${btnClass}`)) {
                    const button = createScrollButton(text, btnClass);
                    button.addEventListener('click', () => {
                        const scrollTarget = element.querySelector(`.${targetClass}`);
                        if (scrollTarget) scrollTarget.scrollIntoView({ behavior: 'smooth', block });
                    });
                    element.appendChild(button);
                }
            });
        } else {
            ['scroll-to-top-btn', 'scroll-to-bottom-btn'].forEach(btnClass => {
                const button = element.querySelector(`.${btnClass}`);
                if (button) button.style.display = 'none';
            });
        }
    });
}

const observer = new MutationObserver(() => addScrollButtons());
window.addEventListener('load', () => {
    observer.observe(document.body, { childList: true, subtree: true });
    addScrollButtons();
});



})();

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

// BOTON DE COPIAR
(function() {
    'use strict';
    function addCopyButtonWithTrigger() {
        document.querySelectorAll('.dark.bg-gray-950.border-token-border-medium').forEach(container => {
            if (container.querySelector('.trigger-button-container')) return;
            const buttonContainer = document.createElement('div');
            buttonContainer.className = 'trigger-button-container flex items-center bg-token-main-surface-secondary px-4 py-1 rounded-b-md';
            const triggerButton = document.createElement('div');
            triggerButton.className = 'trigger-button text-xs text-white btn-pers';
            triggerButton.textContent = 'Copiar';
            buttonContainer.appendChild(triggerButton);
            container.appendChild(buttonContainer);
            triggerButton.addEventListener('click', () => {
                console.log('copy');
                const originalCopyButton = container.querySelector('.flex.gap-1.items-center');
                if (originalCopyButton) originalCopyButton.click();
            });
        });
    }
    const observer = new MutationObserver(addCopyButtonWithTrigger);
    observer.observe(document.body, { childList: true, subtree: true });
    addCopyButtonWithTrigger();
})();