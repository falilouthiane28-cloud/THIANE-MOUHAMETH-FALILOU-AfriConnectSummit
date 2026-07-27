// NAVBAR BUTTON 
const btnMobile = document.querySelector('.btn-mobile');
const navLinks = document.querySelector('.nav-links');
btnMobile.addEventListener('click', () =>{
    navLinks.classList.toggle('active');
});

// BUTTON MODE JOURS/NUITS
const toggleBtn = document.getElementById('theme-toggle');
const icon = toggleBtn.querySelector('i');
if(localStorage.getItem('theme')==='dark'){
    document.body.classList.add('dark-mode');
    toggleBtn.textContent = '🔆';
}
toggleBtn.addEventListener('click',()=> {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
        localStorage.setItem('theme', 'dark');
        toggleBtn.textContent ='🔆';
    }else{
        localStorage.setItem('theme', 'light');
        toggleBtn.textContent="🌙"
    }
}  
);
//  NAVBAR INTERACIVE AU SCROLL
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll',() => {
    if (window.scrollY >80){
        navbar.classList.add('scrolled');
  }else{
    navbar.classList.remove('scrolled');
}
} );
// COMPTEURS ANIMES
const counters = document.querySelectorAll('.counter');
const countObserver = new IntersectionObserver((entries) =>{
    entries.forEach(entry =>{
        if(entry.isIntersecting){
            const target = entry.target;
            const finalValue = parseInt(target.dataset.target);
            let current = 0;
            const increment = finalValue / 100;
            const timer = setInterval( () => {
                current += increment;
                if (current >= finalValue){ 
                current = finalValue;
                clearInterval(timer);
            }
            target.textContent = '+' + Math.floor(current);
        }, 20);
        countObserver.unobserve(target);
    }
});
 });
 counters.forEach(counter => countObserver.observe(counter));


// BUTTON TOP
const backToTop = document.querySelector(".back-to-top");

if (backToTop) {
    window.addEventListener("scroll", () => {
        backToTop.classList.toggle("show", window.scrollY > 300);
    });

    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// COMPTE A REBOUR EN TEMPS REEL
const date = new Date("2026-11-20T09:00:00");

setInterval(() => {
    const temps = date - new Date();

    const jours = Math.floor(temps / 86400000);
    const heures = Math.floor((temps / 3600000) % 24);
    const minutes = Math.floor((temps / 60000) % 60);
    const secondes = Math.floor((temps / 1000) % 60);
 const joursElement=   document.getElementById("jours").textContent = jours;
 const heuresElement =   document.getElementById("heures").textContent = heures;
 const minutesElement =  document.getElementById("minutes").textContent = minutes;
 const secondesElement =   document.getElementById("second").textContent = secondes;
}, 1000);

// ANIMATIONS FADE-IN , SLIDE-LEFT, ZOOM-IN 
const animatedElements = document.querySelectorAll(
    ".fade-in, .slide-in, .zoom-in"
);

if (animatedElements.length > 0) {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                animationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    animatedElements.forEach((element) => {
        animationObserver.observe(element);
    });
}
// FILTRAGE ONGLETS PROGRAMME
const bouttons = document.querySelectorAll('.btn-tab');
const contenus = document.querySelectorAll('.tab-container');
bouttons.forEach((boutton) => {
    boutton.addEventListener('click',() => {
        bouttons.forEach((btn) => {
            btn.classList.remove('active');
        } );
        contenus.forEach((contenu) => {
            contenu.classList.remove('active');
        });
        boutton.classList.add('active');
        document.getElementById(boutton.dataset.tab)
        .classList.add('active')
    } );
});
// FILTRAGE INTERVENANTS
const filterButtons = document.querySelectorAll('.filter-btn');
const persoCards = document.querySelectorAll('.sec-card');
filterButtons.forEach((boutton) => {
    boutton.addEventListener('click',() => {
        filterButtons.forEach((btn) => {
            btn.classList.remove('active');
        });
        boutton.classList.add('active');
        const filter = boutton.dataset.filter;
        persoCards.forEach((card) => {
        const categori = card.dataset.categori;
if (filter === 'Tous' || categori === filter){
    card.classList.remove('non');
}else  {
    card.classList.add('non');
}
        });

    });
} );

// VALIDATIONS FORMULAIRE
const form = document.querySelector("form");
if(form){ 
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let valide = true;
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const participation = document.getElementById("participations");
    const pays = document.getElementById("pays");
    const message = document.getElementById("message");

    document.querySelectorAll(".erreur-message").forEach(function (erreur) {
        erreur.textContent = "";
    });

    if (fullname.value.trim() === "") {
        fullname.nextElementSibling.textContent = "Le nom est obligatoire.";
        valide = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value.trim())) {
        email.nextElementSibling.textContent = "Adresse e-mail invalide.";
        valide = false;
    }

    const chiffres = phone.value.replace(/\D/g, "");

    if (chiffres.length < 8) {
        phone.nextElementSibling.textContent =
            "Le téléphone doit contenir au moins 8 chiffres.";
        valide = false;
    }
    if (participation.value === "") {
        participation.nextElementSibling.textContent =
            "Choisissez un type de participation.";
        valide = false;
    }
    if (pays.value === "") {
        pays.nextElementSibling.textContent =
            "Sélectionnez un pays.";
        valide = false;
    }
    if (message.value.trim().length < 20) {
        message.nextElementSibling.textContent =
            "La motivation doit contenir au moins 20 caractères.";
        valide = false;
    }
    if (valide) {
        alert("Votre demande a été envoyée avec succès.");
        form.reset();
    }
});
}
// ANNNE DYNAMIQUE DU FOOTER
const year = document.getElementById('year');
if (year){
    year.textContent= new Date().getFullYear();
}