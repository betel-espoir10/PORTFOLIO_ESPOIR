
const sections = document.querySelectorAll('section');
const linksNav = document.querySelectorAll('.navigation a');
const header = document.querySelector('header');
const btnHome = document.querySelector('.btn-home');
const menuIcon = document.querySelector('#menu-burger');
const nav = document.querySelector('.navigation');


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



      
