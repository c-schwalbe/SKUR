document.addEventListener("DOMContentLoaded", function() {
    const yrSpan = document.querySelectorAll('.yrspan');
    const yrSpans = Array.from(yrSpan);

    const currentYr = new Date().getFullYear();

    const setCurrentYear = (element) => {
        element.textContent = currentYr
    }

    yrSpans.forEach(setCurrentYear);

});