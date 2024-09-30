(function() {
    'use strict';
if(localStorage.getItem('input-text') === 'true') {
    const probabilitiesMap = {
        i25 : [{'nm': '1', 'pb': 19.03}, {'nm': '2', 'pb': 38.05}, {'nm': '3', 'pb': 28.32}, {'nm': '4', 'pb': 13.27}, {'nm': '5', 'pb': 1.33}],
        i19 : [{'nm': 'Ing. Sistemas', 'pb': 42.74}, {'nm': 'Ing. Industrial', 'pb': 21.79}, {'nm': 'Ing. Automotriz', 'pb': 35.47}],
        i15 : [{'nm': 'Lima Norte', 'pb': 26.69}, {'nm': 'Lima Centro', 'pb': 21.54}, {'nm': 'Lima Sur', 'pb': 32.15}, {'nm': 'Chiclayo', 'pb': 7.72}, {'nm': 'Arequipa', 'pb': 2.57}, {'nm': 'Trujillo', 'pb': 9.32}],
        i143 : [{'nm': '30', 'pb': 13.45}, {'nm': '40', 'pb': 9.98}, {'nm': '45', 'pb': 17.14}, {'nm': '60', 'pb': 21.69}, {'nm': '90', 'pb': 9.98}, {'nm': '100', 'pb': 1.52}, {'nm': '120', 'pb': 16.49}, {'nm': '150', 'pb': 7.38}, {'nm': '180', 'pb': 2.39}],
        i147 : [{'nm': '02', 'pb': 6.31}, {'nm': '03', 'pb': 13.25}, {'nm': '04', 'pb': 31.55}, {'nm': '05', 'pb': 22.08}, {'nm': '06', 'pb': 26.81}]
    
    };
    
    function selectRandomByProbability(items) {
        const totalProbability = items.reduce((sum, item) => sum + item.pb, 0);
        let random = Math.random() * totalProbability;
        for (const item of items) {
            if (random < item.pb) return item.nm;
            random -= item.pb;
        }
    }
    
    function triggerInputEvent(element) {
        const event = new Event('input', {
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(event);
    }
    
    function triggerKeyboardEvent(element, type, key) {
        const event = new KeyboardEvent(type, {
            key: key,
            bubbles: true,
            cancelable: true,
        });
        element.dispatchEvent(event);
    }
    
    function simulateTyping(element, text) {
        element.focus();
        element.value = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            triggerKeyboardEvent(element, 'keydown', char);
            element.value += char;
            triggerKeyboardEvent(element, 'keypress', char);
            triggerKeyboardEvent(element, 'keyup', char);
            triggerInputEvent(element);
        }
    }
    
    function setInputValue(ariaLabel, value) {
        const input = document.querySelector(`input[aria-labelledby="${ariaLabel}"]`);
        if (input) {
            simulateTyping(input, value);
        }
    }
    
    function clickButton() {
        const button = document.querySelector('.uArJ5e.UQuaGc.Y5sE8d');
        if (button) {
            button.click();
        }
    }
    
    window.addEventListener("load", function () {
        setTimeout(function () {
            for (const ariaLabel in probabilitiesMap) {
                if (probabilitiesMap.hasOwnProperty(ariaLabel)) {
                    setInputValue(ariaLabel, selectRandomByProbability(probabilitiesMap[ariaLabel]));
                }
            }

        }, 1000);
    });
} else {
    console.log("input-text no está en true en localStorage.");
}
})();