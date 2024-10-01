// ==UserScript==
// @name         Extraer Iframe
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Extrae las URLs de los elementos li en la página y permite copiarlas al portapapeles.
// @match        https://saidochesto.top/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=animeonline.ninja
// @downloadURL https://raw.githubusercontent.com/santish1802/tampermonkey/refs/heads/main/WEBIFRAME/iframe.user.js
// @updateURL https://raw.githubusercontent.com/santish1802/tampermonkey/refs/heads/main/WEBIFRAME/iframe.user.js
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        #video-codes-container {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px;
            z-index: 1000;
            max-height: 300px;
            overflow-y: auto;
            display: none;
        }
        #toggle-video-codes {
            position: fixed;
            bottom: 10px;
            right: 10px;
            padding: 10px;
            background-color: #a72828;
            border-radius: 10px;
            color: white;
            border: none;
            cursor: pointer;
            z-index: 1001;
        }
        .video-code {
            cursor: pointer;
            width: max-content;
        }
        .video-code:hover {
            color: green;
        }
    `);

    const container = document.createElement('div');
    container.id = 'video-codes-container';
    document.body.appendChild(container);

    const toggleButton = document.createElement('button');
    toggleButton.id = 'toggle-video-codes';
    toggleButton.textContent = 'Mostrar URLs de Video';
    document.body.appendChild(toggleButton);

    toggleButton.addEventListener('click', () => {
        if (container.style.display === 'none' || container.style.display === '') {
            extractVideoCodes();
            container.style.display = 'block';
            toggleButton.textContent = 'Ocultar URLs de Video';
        } else {
            container.style.display = 'none';
            toggleButton.textContent = 'Mostrar URLs de Video';
        }
    });

    function extractVideoCodes() {
        container.innerHTML = '';
        const listItems = document.querySelectorAll('.OD_SUB li');
        let foundCodes = false;

        listItems.forEach(item => {
            const onclickAttr = item.getAttribute('onclick');
            if (onclickAttr) {
                const match = onclickAttr.match(/go_to_player\('([^']+)'\)/);
                if (match) {
                    const videoUrl = match[1];
                    const name = item.querySelector('span').textContent;
                    const codeElement = document.createElement('div');
                    codeElement.textContent = name;
                    codeElement.className = 'video-code';
                    codeElement.addEventListener('click', () => {
                        copyToClipboard(videoUrl);
                    });
                    container.appendChild(codeElement);
                    foundCodes = true;
                }
            }
        });

        if (!foundCodes) {
            container.textContent = 'No se encontraron URLs de video en la página.';
        }
    }

    function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('URL copiada: ' + text);
    }
})();