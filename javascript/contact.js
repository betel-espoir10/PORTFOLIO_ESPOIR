//inialisation de EmailJS

(function () {
  emailjs.init("RGwHmd5Ug21E8HHj3");
})();


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

