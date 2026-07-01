
document.addEventListener("DOMContentLoaded", () => {

    const switcher = document.querySelector(".language-switcher");
    const selected = document.querySelector(".selected-language");
    const menu = document.querySelector(".language-menu");

    const selectedFlag = document.getElementById("selected-flag");
    const selectedText = document.getElementById("selected-text");

//Chargement de langues
    async function loadLanguage(lang){
        const response = await fetch(`lang/${lang}.json`);
        const data = await response.json();
        document.querySelectorAll("[data-lang-key]")
        .forEach(element => {
            const key = element.dataset.langKey;
            if(data[key]){
                element.textContent = data[key];
            }
        });
    }

    selected.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

//Choix d'une langue
    document.querySelectorAll(".language-menu li")
    .forEach(item => {
        item.addEventListener("click", async () => {
            const lang = item.dataset.lang;
            await loadLanguage(lang);
            initTyped(lang);
            localStorage.setItem("language", lang);
            selectedFlag.src =
            `images/${lang === "fr" ? "frchs" : "enghs"}.png`;
            selectedText.textContent =
            lang.toUpperCase();
            menu.classList.remove("active");
        });
    });

//Restauration au demarrage
    const currentLanguage =
    localStorage.getItem("language") || "fr";
    loadLanguage(currentLanguage);
    selectedText.textContent =
    currentLanguage.toUpperCase();
    selectedFlag.src =
    `images/${currentLanguage === "fr" ? "frchs" : "enghs"}.png`;
    document.addEventListener("click",(e)=>{
//Fermeture automatique apres le choix
        if(!switcher.contains(e.target)){
            menu.classList.remove("active");
        }
    });

});