
//Theme mode sombre/claire

const themeBtn = document.getElementById("theme-toggle");
    console.log(document.getElementById("theme-toggle"));
    console.log(themeBtn);
themeBtn.addEventListener("click",()=>{
   
    document.body.classList.toggle("light-mode");
    if(document.body.classList.contains("light-mode")){
        localStorage.setItem("theme","light");
        themeBtn.classList.remove("fa-moon");
        themeBtn.classList.add("fa-sun");
    }else{
        localStorage.setItem("theme","dark");
        themeBtn.classList.remove("fa-sun");
        themeBtn.classList.add("fa-moon");
    }
});