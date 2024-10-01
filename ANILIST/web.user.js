// ==UserScript==
// @name         Modificar web
// @namespace    http://tampermonkey.net/
// @version      1.3
// @description  Modificar web
// @author       Santiago
// @match        https://anilist.co/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=anilist.co
// @downloadURL https://raw.githubusercontent.com/santish1802/tampermonkey/refs/heads/main/ANILIST/web.user.js
// @updateURL https://raw.githubusercontent.com/santish1802/tampermonkey/refs/heads/main/ANILIST/web.user.js
// @grant        GM_setClipboard
// @grant        GM_addStyle
// ==/UserScript==

(function () {
    'use strict';

    GM_addStyle(`
        .banner-button {
            position: absolute;
            right: 0;
            padding: 7px 20px;
            background-color: black;
            color: red;
            font-weight: bold;
            border: none;
            cursor: pointer;
            z-index: 9999;
        }

        .modified-value {
            color: black !important;
            font-weight: bold;
        }
        .type[data-v-d3a518a6] {
            color: red;
            font-weight: bold;
            font-size: 1.6rem !important;
        }
        .value[data-v-d3a518a6] {
            font-size: 1.5rem !important;
        }
    `);

    setTimeout(function () {
        const allowedTypes = ["Start Date", "Average Score", "Genres", "English", "Episodes"];
        const elementos = document.querySelectorAll('.value');
        elementos.forEach(elemento => {
            elemento.classList.add('modified-value');
        });

        document.querySelectorAll('.data-set').forEach(dataSet => {
            const typeElement = dataSet.querySelector('.type');
            const typeText = typeElement.textContent.trim();

            if (!allowedTypes.includes(typeText)) {
                dataSet.style.display = 'none';
            }
        });

        function formatDate(dateString) {
            const months = {
                "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04",
                "May": "05", "Jun": "06", "Jul": "07", "Aug": "08",
                "Sep": "09", "Oct": "10", "Nov": "11", "Dec": "12"
            };

            const [month, day, year] = dateString.split(' ');
            const formattedDate = `${day.padStart(2, '0')} / ${months[month]} / ${year.slice(0)}`;
            return formattedDate;
        }

        document.querySelectorAll('.data-set').forEach(dataSet => {
            const typeElement = dataSet.querySelector('.type');
            const valueElement = dataSet.querySelector('.value');

            if (typeElement && typeElement.textContent.trim() === "Start Date") {
                const originalDate = valueElement.textContent.trim();
                valueElement.textContent = formatDate(originalDate);
            }
        });

        const banner = document.querySelector('.banner');
        if (banner) {
            const button = document.createElement('button');
            button.textContent = 'Abrir imagen';
            button.classList.add('banner-button');
            banner.appendChild(button);
            button.addEventListener('click', function () {
                const bgImage = window.getComputedStyle(banner).backgroundImage;
                if (bgImage !== 'none') {
                    const imageUrl = bgImage.slice(5, -2);
                    window.open(imageUrl, '_blank');
                } else {
                    alert('No se encontró ninguna imagen de fondo.');
                }
            });
        }
    }, 1000);
})();

(function() {
    'use strict';
    function handleClick(event) {
        const link = event.target.closest('a');
        if (link && link.href.includes('/anime/')) {
            event.preventDefault();
            window.open(link.href, '_blank');
        }
    }
    document.addEventListener('click', handleClick, true);
})();