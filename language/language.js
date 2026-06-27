
document.addEventListener("DOMContentLoaded", () => {
    const switcher=document.querySelector(".language-switcher");
    const selected=document.querySelector(".selected-language");
    const menu=document.querySelector(".language-menu");
    const selectedFlag=document.getElementById("selected-flag");
    const selectedText=document.getElementById("selected-text");
    selected.addEventListener("click",()=>{
        console.log("CLICK");
        menu.classList.toggle("active");
  });
});
//Chargement de langues

async function loadLanguage(lang){

    const response=await fetch(`lang/${lang}.json`);
    const data=await response.json();
    document.querySelectorAll("[data-lang-key]").forEach(element=>{
        const key=element.dataset.langKey;
        element.textContent=data[key];
    });
}

//Choix d'une langue
document.querySelectorAll(".language-menu li")
.forEach(item=>{

    item.addEventListener("click",()=>{
    const lang=item.dataset.lang;
    localStorage.setItem("language",lang);
    loadLanguage(lang);
    selectedFlag.src=`images/${lang==="fr"?"fr":"gb"}.png`;
    selectedText.textContent=lang.toUpperCase();
    menu.classList.remove("active");

    });
});

//Restauration au demarrage

const currentLanguage=
localStorage.getItem("language") || "fr";

    loadLanguage(currentLanguage);
    selectedText.textContent=currentLanguage.toUpperCase();

selectedFlag.src=
`images/${currentLanguage==="fr"?"fr":"gb"}.png`;

//Fermeture automatique apres le choix

document.addEventListener("click",(e)=>{

      if(!switcher.contains(e.target)){
      menu.classList.remove("active");
      }
});