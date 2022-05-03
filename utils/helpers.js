function isIDAMode(allowedOrigins) {
    let idaMode = false;

    if (typeof window !== 'undefined') {
        allowedOrigins.forEach(origin => {
            if (window.location.origin.includes(origin)) idaMode = true;
        });
    }

    return idaMode;
}

module.exports.isIDAMode = isIDAMode;