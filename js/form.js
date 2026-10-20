const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const captchaResponse = grecaptcha.getResponse();

    if (captchaResponse.lenght > 0) {
        throw new Error("Captcha not complete");
    }
});