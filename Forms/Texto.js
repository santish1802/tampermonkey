(function() {
    'use strict';

    if (localStorage.getItem('input-text') === 'true') {
        const probabilitiesMap = {
            i25: [
                { 'nm': '1', 'pb': 19.03 },
                { 'nm': '2', 'pb': 38.05 },
                { 'nm': '3', 'pb': 28.32 },
                { 'nm': '4', 'pb': 13.27 },
                { 'nm': '5', 'pb': 1.33 }
            ]
        };

        function selectRandomByProbability(items) {
            const totalProbability = items.reduce((sum, item) => sum + item.pb, 0);
            let random = Math.random() * totalProbability;
            for (const item of items) {
                if (random < item.pb) return item.nm;
                random -= item.pb;
            }
        }

        function triggerEvent(element, type, key) {
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
            for (const char of text) {
                triggerEvent(element, 'keydown', char);
                element.value += char;
                triggerEvent(element, 'keypress', char);
                triggerEvent(element, 'keyup', char);
                element.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
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