let overlayActive=!1;const createElementWithClass=(e,t)=>{let l=document.createElement(e);return l.className=t,l},logElementsText=()=>{if(overlayActive)return;overlayActive=!0;let e=document.querySelectorAll(".relative.max-w-\\[70\\%\\].rounded-3xl.bg-\\[\\#f4f4f4\\].px-5.py-2\\.5.dark\\:bg-token-main-surface-secondary");e.forEach(((e,t)=>{e.appendChild(createElementWithClass("div","offset-div"))})),createOverlay(e)},createOverlay=e=>{let t=createElementWithClass("div","custom-overlay"),l=createElementWithClass("div","custom-container"),o=createElementWithClass("button","close-button");o.textContent="X",o.onclick=()=>{document.body.removeChild(t),overlayActive=!1},t.appendChild(o),e.forEach(((e,o)=>{let d=createElementWithClass("div","custom-div");d.textContent=e.textContent.trim(),document.body.appendChild(d),d.scrollHeight>150&&d.classList.add("custom-div-scroll"),document.body.removeChild(d),d.onclick=()=>{e.querySelector(".offset-div").scrollIntoView({behavior:"smooth",block:"start"}),document.body.removeChild(t),overlayActive=!1},l.appendChild(d)})),t.appendChild(l),document.body.appendChild(t)};document.addEventListener("keydown",(e=>104===e.keyCode&&logElementsText()));