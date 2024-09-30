function copiarLaTeX(e) {
    const t = e.querySelector('annotation[encoding="application/x-tex"]');
    if (t) {
        const e = t.textContent;
        navigator.clipboard.writeText(e).catch((e) => {});
    }
}
function procesarSpansKatex() {
    document.querySelectorAll("span.katex").forEach((e) => {
        (e.style.cursor = "pointer"),
            e.addEventListener("click", function () {
                copiarLaTeX(e);
            }),
            e.addEventListener("contextmenu", (e) => e.preventDefault()),
            (e.oncopy = (e) => (e.preventDefault(), !1));
    });
}
procesarSpansKatex();
const observador = new MutationObserver(procesarSpansKatex);
observador.observe(document.body, { childList: !0, subtree: !0 });
