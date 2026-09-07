
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

let typed;
function initTyped(lang) {
    if (typed) {
        typed.destroy();
    }
    const strings = {
        fr: [
            "Développeur Web & Mobile",
            "Data Analyst",
            "Web Designer",
            "Passionné par l'IA"
        ],
        en: [
            "Web & Mobile Developer",
            "Data Analyst",
            "Web Designer",
            "AI Enthusiast"
        ]
    };

    typed = new Typed(".multiple", {
        strings: strings[lang],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

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

const currentLanguage = localStorage.getItem("language") || "fr";
initTyped(currentLanguage);

const projectModal = document.getElementById('project-modal');
const projectModalTitle = document.getElementById('project-modal-title');
const projectModalDescription = document.getElementById('project-modal-description');
const projectModalImage = document.getElementById('project-modal-image');
const projectModalStack = document.getElementById('project-modal-stack-list');
const projectModalGithub = document.getElementById('project-modal-github');
const projectModalLive = document.getElementById('project-modal-live');
const closeModalButton = document.querySelector('.close-modal');

const openProjectModal = (projectCard) => {
  if (!projectModal || !projectCard) return;

  const title = projectCard.querySelector('h4')?.textContent?.trim() || 'Projet';
  const description = projectCard.querySelector('p')?.textContent?.trim() || 'Description du projet.';
  const image = projectCard.querySelector('img')?.src || './images/esp.png';
  const stackValue = projectCard.dataset.projectStack || 'HTML, CSS, JavaScript';
  const githubLink = projectCard.dataset.projectGithub || '#';
  const liveLink = projectCard.dataset.projectLive || '#';

  projectModalTitle.textContent = title;
  projectModalDescription.textContent = description;
  projectModalImage.src = image;
  projectModalImage.alt = title;

  projectModalStack.innerHTML = '';
  stackValue.split(',').map(item => item.trim()).filter(Boolean).forEach(item => {
    const stackItem = document.createElement('li');
    stackItem.textContent = item;
    projectModalStack.appendChild(stackItem);
  });

  projectModalGithub.href = githubLink;
  projectModalLive.href = liveLink;
  projectModal.classList.add('active');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
};

const closeProjectModal = () => {
  if (!projectModal) return;

  projectModal.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
};

document.querySelectorAll('.portfolio-box').forEach((projectCard) => {
  projectCard.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      event.preventDefault();
      openProjectModal(projectCard);
      return;
    }
    openProjectModal(projectCard);
  });
});

document.querySelectorAll('.portfolio-layer a').forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    const projectCard = link.closest('.portfolio-box');
    openProjectModal(projectCard);
  });
});

if (closeModalButton) {
  closeModalButton.addEventListener('click', closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});

      
