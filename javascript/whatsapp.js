/* Floating WhatsApp */

document.addEventListener("DOMContentLoaded", () => {

    const whatsappButton = document.querySelector(".whatsapp-float");
    if (!whatsappButton) return;
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            whatsappButton.classList.add("show");
        } else {
            whatsappButton.classList.remove("show");
        }
    });

});