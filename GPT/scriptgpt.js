// ==UserScript==
// @name         ChatGPT by Snt
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  GPT complementos de visualizacion
// @author       Santish
// @match        https://chatgpt.com/c/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=openai.com
// @grant        GM_addStyle
// ==/UserScript==
(function () {
        "use strict";
        let isChecking = false;
        let checkTimeout;
        GM_addStyle(`
                .scroll-btn {
                position: absolute;
                }
                .btn-pers {
                padding: 1px 15px;
                background-color: #414141;
                color: white;
                border-radius: 5px;
                cursor: pointer;
                font-size: 12px;
                }
                .btn-pers:active {
                background-color: #5c5959;
                }
                .scroll-to-top-btn {
                bottom: 1px;
                right: -37px;
                }
                .scroll-to-bottom-btn {
                top: 1px;
                right: -37px;
                }
                .flex.flex-grow.flex-col.max-w-full {
                position: relative;
                margin: 10px 0;
                }
                @media (min-width: 1280px) {
                .xl\\:max-w-\\[48rem\\] {
                        max-width: 90% !important;
                }
                }
                @media (min-width: 768px) {
                .md\\:max-w-3xl { max-width: 90% !important;}}
                .gizmo-bot-avatar.flex.h-8.w-8.items-center.justify-center.overflow-hidden.rounded-full {
                display: none;
                }
            `);
    
        function createScrollButton(text, className) {
            const button = document.createElement("button");
            button.textContent = text;
            button.className = `scroll-btn ${className} btn-pers`;
            return button;
        }
    
        function addScrollButtons() {
            const targetElements = document.querySelectorAll(
                ".flex.flex-grow.flex-col.max-w-full"
            );
            targetElements.forEach((element) => {
                if (element.offsetHeight > 600) {
                    if (!element.querySelector(".scroll-to-top-btn")) {
                        const topButton = createScrollButton(
                            "↑",
                            "scroll-to-top-btn"
                        );
                        topButton.addEventListener("click", () => {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                        });
                        element.appendChild(topButton);
                    }
                    if (!element.querySelector(".scroll-to-bottom-btn")) {
                        const bottomButton = createScrollButton(
                            "↓",
                            "scroll-to-bottom-btn"
                        );
                        bottomButton.addEventListener("click", () => {
                            element.scrollIntoView({
                                behavior: "smooth",
                                block: "end",
                            });
                        });
                        element.appendChild(bottomButton);
                    }
                } else {
                    const topButton = element.querySelector(".scroll-to-top-btn");
                    const bottomButton = element.querySelector(
                        ".scroll-to-bottom-btn"
                    );
                    if (topButton) topButton.style.display = "none";
                    if (bottomButton) bottomButton.style.display = "none";
                }
            });
        }
    
        const observer = new MutationObserver((mutations) => {
            mutations.forEach(() => {
                addScrollButtons();
            });
        });
    
        const config = {
            childList: true,
            subtree: true,
        };
    
        window.addEventListener("load", () => {
            const targetNode = document.body;
            observer.observe(targetNode, config);
            addScrollButtons(); // Initial check when page loads
        });
    })();
    
    (function () {
        "use strict";
        function removeInlineStyle() {
            const element = document.querySelector(
                ".mx-auto.flex.flex-1.gap-4.text-base.md\\:gap-5.lg\\:gap-6.md\\:max-w-3xl.lg\\:max-w-\\[40rem\\].xl\\:max-w-\\[48rem\\]"
            );
            if (element) {
                element.removeAttribute("style");
            }
        }
        window.addEventListener("load", () => {
            removeInlineStyle(); // Aplicar una vez al cargar
        });
        if (
            document.readyState === "complete" ||
            document.readyState === "interactive"
        ) {
            removeInlineStyle();
        }
    })();
    
    (function () {
        "use strict";
        function addCopyButtonWithTrigger() {
            document
                .querySelectorAll(".dark.bg-gray-950.border-token-border-medium")
                .forEach((container) => {
                    if (container.querySelector(".trigger-button-container"))
                        return;
                    const buttonContainer = document.createElement("div");
                    buttonContainer.className =
                        "trigger-button-container flex items-center bg-token-main-surface-secondary px-4 py-1 rounded-b-md";
                    const triggerButton = document.createElement("button");
                    triggerButton.className =
                        "trigger-button text-xs text-white btn-pers";
                    triggerButton.textContent = "Copiar";
                    buttonContainer.appendChild(triggerButton);
                    container.appendChild(buttonContainer);
                    triggerButton.addEventListener("click", () => {
                        const originalCopyButton = container.querySelector(
                            ".flex.gap-1.items-center"
                        );
                        if (originalCopyButton) originalCopyButton.click();
                    });
                });
        }
        const observer = new MutationObserver(addCopyButtonWithTrigger);
        observer.observe(document.body, { childList: true, subtree: true });
        addCopyButtonWithTrigger();
    })();
    