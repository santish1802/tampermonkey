// ==UserScript==
// @name         Marcar Animes Subidos (con BD)
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Marcar animes que ya han sido subidos en una base de datos compartida, y permitir eliminar animes.
// @author       Tú
// @match        https://anilist.co/search/anime?format=TV&sort=POPULARITY_DESC&episodes=0&episodes=30
// @connect      webutp.kesug.com
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @downloadURL https://raw.githubusercontent.com/santish1802/tampermonkey/refs/heads/main/ANILIST/api.js
// @updateURL https://raw.githubusercontent.com/santish1802/tampermonkey/refs/heads/main/ANILIST/api.js
// ==/UserScript==

(function() {
    'use strict';

    const apiUrl = 'https://webutp.kesug.com/api.php';
    const animeSelector = '.media-card';
    GM_addStyle(`
        .btn-accion {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 10px; /* Ajusta según necesites */
            right: 10px; /* Ajusta según necesites */
            z-index: 1000; /* Asegúrate de que el botón esté por encima de otros elementos */
        }
        .btn-accion button {
            padding: 5px 10px;
            margin: 2px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .btn-accion .enviar {
            background-color: #4CAF50;
            color: white;
        }
        .btn-accion .eliminar {
            background-color: #FF4C4C;
            color: white;
        }
        .media-card:hover .btn-accion {
            display: flex;
        }
        .anime-subido .title {
            color: red !important; /* Cambia el color del título a rojo para animes subidos */
            font-weight: bold; /* Mantener el texto en negrita */
        }
    `);

    function obtenerAnimesSubidos() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: apiUrl,
            onload: (response) => {
                const animesSubidos = JSON.parse(response.responseText);
                setTimeout(() => {
                    marcarAnimesSubidos(animesSubidos);
                }, 100);
            }
        });
    }

    function marcarAnimesSubidos(animesSubidos) {
        document.querySelectorAll(animeSelector).forEach((animeElement) => {
            const animeNombre = animeElement.querySelector('.title').textContent.trim();

            const btnAccionContainer = document.createElement('div');
            btnAccionContainer.className = 'btn-accion';

            if (animesSubidos.includes(animeNombre)) {
                animeElement.classList.add('anime-subido');
                crearBotonEliminar(btnAccionContainer, animeNombre, animeElement);
            } else {
                crearBotonAgregar(btnAccionContainer, animeNombre, animeElement);
            }

            animeElement.appendChild(btnAccionContainer);
        });
    }

    function crearBotonAgregar(container, animeNombre, animeElement) {
        const agregarBtn = document.createElement('button');
        agregarBtn.textContent = 'Agregar';
        agregarBtn.className = 'enviar'; // Asignar la clase "enviar"

        agregarBtn.addEventListener('click', () => {
            if (confirm(`¿Estás seguro de que deseas marcar "${animeNombre}" como subido?`)) {
                marcarAnimeEnBaseDeDatos(animeNombre, animeElement, container);
            }
        });

        container.appendChild(agregarBtn);
    }
    function crearBotonEliminar(container, animeNombre, animeElement) {
        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.className = 'eliminar'; // Asignar la clase "eliminar"

        eliminarBtn.addEventListener('click', () => {
            if (confirm(`¿Estás seguro de que deseas eliminar "${animeNombre}" de la base de datos?`)) {
                eliminarAnimeDeBaseDeDatos(animeNombre, animeElement, container);
            }
        });

        container.appendChild(eliminarBtn);
    }

    // Función para enviar el anime marcado a la base de datos
    function marcarAnimeEnBaseDeDatos(animeNombre, animeElement, container) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `nombre_anime=${encodeURIComponent(animeNombre)}&accion=subir`,
            onload: (response) => {
                animeElement.classList.add('anime-subido');
                container.innerHTML = '';
                crearBotonEliminar(container, animeNombre, animeElement);
            }
        });
    }

    function eliminarAnimeDeBaseDeDatos(animeNombre, animeElement, container) {
        GM_xmlhttpRequest({
            method: 'POST',
            url: apiUrl,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `nombre_anime=${encodeURIComponent(animeNombre)}&accion=eliminar`,
            onload: (response) => {
                animeElement.classList.remove('anime-subido');

                container.innerHTML = '';
                crearBotonAgregar(container, animeNombre, animeElement);
            }
        });
    }

    function handleKeyDown(event) {
        if (event.altKey && event.shiftKey) {
            obtenerAnimesSubidos(); // Ejecutar la verificación
        }
    }

    window.addEventListener('keydown', handleKeyDown);

    obtenerAnimesSubidos();
})();
