// Función para copiar el contenido LaTeX al portapapeles
function copiarLaTeX(spanKatex) {
    const annotationElement = spanKatex.querySelector(
        'annotation[encoding="application/x-tex"]'
    );
    if (annotationElement) {
        const latexCode = annotationElement.textContent;
        navigator.clipboard.writeText(latexCode).catch((err) => {
            console.error("Error al copiar el texto: ", err);
        });
    } else {
        console.error("No se encontró código LaTeX en este elemento.");
    }
}
// Función para añadir el evento de clic a los spans Katex
function procesarSpansKatex() {
    const spansKatex = document.querySelectorAll("span.katex");
    spansKatex.forEach((span) => {
        // Mantener la funcionalidad de clic para copiar LaTeX
        span.style.cursor = "pointer";
        span.addEventListener("click", function () {
            copiarLaTeX(span);
        });
        // Aplicar medidas anti-copia
        span.addEventListener("contextmenu", (event) => event.preventDefault());
        span.oncopy = (event) => {
            event.preventDefault();
            return false;
        };
    });
}
// Procesar los spans Katex existentes
procesarSpansKatex();
// Observar cambios en el DOM para procesar nuevos spans Katex
const observador = new MutationObserver(procesarSpansKatex);
observador.observe(document.body, { childList: true, subtree: true });
