let overlayActive = false;
let overlayElement = null;

const createElementWithClass = (e, t) => {
    let l = document.createElement(e);
    return (l.className = t), l;
};

const logElementsText = () => {
    if (overlayActive) {
        closeOverlay();
        return;
    }
    overlayActive = true;
    let e = document.querySelectorAll(
        ".relative.max-w-\\[70\\%\\].rounded-3xl.bg-\\[\\#f4f4f4\\].px-5.py-2\\.5.dark\\:bg-token-main-surface-secondary"
    );
    
    e.forEach((e, t) => {
        console.log(`Elemento ${t + 1} texto:`, e.textContent.trim());
        e.appendChild(createElementWithClass("div", "offset-div"));
    });
    createOverlay(e);
};

const createOverlay = (e) => {
    let t = createElementWithClass("div", "custom-overlay");
    let l = createElementWithClass("div", "custom-container");

    t.onclick = (event) => {
        if (event.target === t) {
            closeOverlay();
        }
    };

    [...e].reverse().forEach((e, o) => {
        let a = createElementWithClass("div", "custom-div");
        a.textContent = e.textContent.trim();
        document.body.appendChild(a);
        if (a.scrollHeight > 200) {
            a.classList.add("custom-div-scroll");
        }
        document.body.removeChild(a);
        a.onclick = (event) => {
            event.stopPropagation();
            e.querySelector(".offset-div").scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
            closeOverlay();
        };
        l.appendChild(a);
    });

    t.appendChild(l);
    document.body.appendChild(t);
    overlayElement = t;
};

const closeOverlay = () => {
    if (overlayElement && overlayElement.parentNode) {
        overlayElement.parentNode.removeChild(overlayElement);
    }
    overlayActive = false;
    overlayElement = null;
};

document.addEventListener("keydown", (e) => {
    if (e.altKey && e.shiftKey) {
        e.preventDefault(); // Previene el comportamiento por defecto
        logElementsText();
    }
});