//inialisation de EmailJS

(function () {
  emailjs.init("RGwHmd5Ug21E8HHj3");
})();

const sections = document.querySelectorAll('section');
const linksNav = document.querySelectorAll('.navigation a');
const header = document.querySelector('header');
const btnHome = document.querySelector('.btn-home');
const menuIcon = document.querySelector('#menu-burger');
const nav = document.querySelector('.navigation');

//Validation des champs avant l'envoi des donnees
function validateForm(){

    const name=document.querySelector('[name="name"]');
    const email=document.querySelector('[name="email"]');
    const message=document.querySelector('[name="message"]');
        if(name.value.trim()===""){
            showToast("Veuillez saisir votre nom","warning");
            name.focus();
            return false;
        }
        if(email.value.trim()===""){
            showToast("Veuillez saisir votre email","warning");
            email.focus();
            return false;
        }
        const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email.value)){
            showToast("Adresse email invalide","warning");
            email.focus();
            return false;
        }
        if(message.value.trim().length < 20){
            showToast("Le message doit contenir au moins 20 caractères","warning");
            message.focus();
            return false;
        }
    return true;
}

const burgerActive = () =>{
  console.log("Menu cliqué");
   nav.classList.toggle('active');
  menuIcon.classList.toggle('fa-bars');
  menuIcon.classList.toggle('fa-xmark');
}

const scrollActive = () => {
  sections.forEach(section => {
    const top = window.scrollY;
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if(top >= offset && top < offset + height){
      linksNav.forEach(link => {
        link.classList.remove('active');
      });
      const activeLink = document.querySelector(
        `.navigation a[href*="${id}"]`
      );
      if(activeLink){
        activeLink.classList.add('active');
      }
    }
  });
};

ScrollReveal ({
  reset: true,
   distance:'80px',
   duration:2000,
   delay: 200
});

ScrollReveal().reveal('.home-content, .section-title',{origin: 'top'});
ScrollReveal().reveal('.home-img, .services-content, .portfolio-box, .contact-form',{origin: 'bottom'});
ScrollReveal().reveal('.home-content h1, .about-img',{origin: 'left'});
ScrollReveal().reveal('.home-content p, .about-content',{origin: 'left'});

const typed = new Typed('.multiple',{

  strings: ["Développeur Web et mobile", "Data Analyste", "Web Designer", "Passionné de l'IA"],
  typeSpeed: 100,
  backSpeed: 100,
  backDelay: 1000,
  loop:true
})

//refermer automatiquement le menuIcon une fois etre ouvert
menuIcon.addEventListener('click', burgerActive);
window.addEventListener('scroll', scrollActive);

linksNav.forEach(link => {

  link.addEventListener('click', () => {
    menuIcon.classList.remove('bx-x');
    nav.classList.remove('active');
  });
});

//fermeture automatique pendant le scroll
window.addEventListener('scroll', () => {

  menuIcon.classList.remove('bx-x');
  nav.classList.remove('active');

});


//Configuration de l'envoi d'un email
const form = document.getElementById('contact-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  if(!validateForm()){
        return;
    }
  emailjs.sendForm(
      'service_26a9487',
      'template_5bdvfov',
      this
  )
  .then((response) => {
      console.log("SUCCESS", response)
      showToast("Message envoyé avec succès !","success");
      form.reset();
  })
  .catch((error) => {
        console.log("STATUS :", error.status);
        console.log("TEXT :", error.text);
        console.log("ERROR :", error);
        showToast("Erreur lors de l'envoi","error");
  });
});

//Section statistique des realisations projects et experiences.

// const counters = document.querySelectorAll(".counter");

//     const startCounters = () => {
//         counters.forEach(counter => {
//             const target = +counter.dataset.target;
//             let count = 0;
//             const updateCounter = () => {
//                 const increment = target / 50;
//                 if(count < target){
//                     count += increment;
//                     counter.innerText = Math.ceil(count);
//                     requestAnimationFrame(updateCounter);
//                 }else{
//                     counter.innerText = target + "+";
//                 }
//             }
//             updateCounter();
//         });
// }

//     const statsSection = document.querySelector(".stats");
//     const observerCounter = new IntersectionObserver(entries=>{
//         if(entries[0].isIntersecting){
//             startCounters();
//             observerCounter.disconnect();
//         }
//     });
//     observerCounter.observe(statsSection);

//Animation mode sombre/claire

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

//fonction showToast

    function showToast(message,type="success"){
        const toast=document.getElementById("toast");
        let icon="";

          if(type==="success"){
              icon="✅ ";
          }
          if(type==="error"){
              icon="❌ ";
          }
          if(type==="warning"){
              icon="⚠️ ";
          }
          toast.innerHTML=icon + message;
          toast.className=`show ${type}`;
          setTimeout(()=>{
              toast.className="";
          },3000);
    }
      
