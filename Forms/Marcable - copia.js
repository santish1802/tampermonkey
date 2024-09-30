(function() {
    'use strict';
// Verificar si input.marcable en localStorage es true
if (localStorage.getItem('input-marcable') === 'true') {
    const probabilitiesMap = {
        'i6': [{"id":"i6","probability":33}, {"id":"i9","probability":33}, {"id":"i12","probability":33}],
    };

    function idrandom() {
        for (const comienzo in probabilitiesMap) {
            if (probabilitiesMap.hasOwnProperty(comienzo)) {
                const probabilities = probabilitiesMap[comienzo];
                const totalProbability = probabilities.reduce((acc, prob) => acc + prob.pb, 0);
                let randomValue = Math.random() * totalProbability;
                let cumulativeProbability = 0;

                for (const prob of probabilities) {
                    cumulativeProbability += prob.pb;
                    if (randomValue < cumulativeProbability) {
                        const element = document.getElementById(prob.id);
                        if (element && !element.classList.contains("N2RpBe")) {
                            element.click();
                            console.log("Se ha marcado la opción:", prob.id);
                        } else {
                            console.error("Se ha repetido la opción:", prob.id);
                        }
                        break;
                    }
                }
            }
        }
    }

    window.addEventListener("load", function () {
        setTimeout(idrandom, 500);
    });
} else {
    console.log("input.marcable no está en true en localStorage.");
}
})();
