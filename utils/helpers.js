function isIDAMode(allowedOrigins) {
    let idaMode = false;

    if (typeof window !== 'undefined') {
        allowedOrigins.forEach(origin => {
            if (window.location.origin.includes(origin)) idaMode = true;
        });
    }

    return idaMode;
}

function scrollToHeader() {
    if (typeof window === 'undefined') return;

    if (window.location.hash) {
        const elementId = document.querySelector(window.location.hash);
        if (elementId) {
            if (elementId.parentElement.classList.contains('expansion__content')) {
                if (elementId.parentElement.classList.contains('visible')) return;
                elementId.parentElement.classList.add('visible');
            }
            elementId.scrollIntoView();
        }
    }
}

module.exports.isIDAMode = isIDAMode;
module.exports.scrollToHeader = scrollToHeader;