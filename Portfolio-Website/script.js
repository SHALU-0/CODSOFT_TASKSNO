// ===========================
// SMOOTH SCROLLING
// ===========================

const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(link => {

    link.addEventListener("click", function(e){

        e.preventDefault();

        const targetId = this.getAttribute("href");

        const targetSection = document.querySelector(targetId);

        targetSection.scrollIntoView({

            behavior:"smooth"

        });

    });

});



// ===========================
// DARK MODE
// ===========================

const darkModeBtn = document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        darkModeBtn.innerHTML="☀️";

    }

    else{

        darkModeBtn.innerHTML="🌙";

    }

});



// ===========================
// CONTACT FORM
// ===========================

const form = document.querySelector("form");

form.addEventListener("submit",function(e){

    e.preventDefault();

    alert("Thank You! Your message has been sent successfully.");

    form.reset();

});

// ===========================
// ACTIVE NAVBAR
// ===========================

const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop &&
            window.pageYOffset < sectionTop + sectionHeight) {

            current = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active");

        }

    });

});



// ===========================
// SCROLL ANIMATION
// ===========================

const cards = document.querySelectorAll(
".skill-card,.education-card,.project-card,.about-container"
);

function revealCards(){

    cards.forEach(card=>{

        const windowHeight = window.innerHeight;

        const cardTop = card.getBoundingClientRect().top;

        if(cardTop < windowHeight - 100){

            card.style.opacity="1";
            card.style.transform="translateY(0)";

        }

    });

}

cards.forEach(card=>{

    card.style.opacity="0";

    card.style.transform="translateY(40px)";

    card.style.transition=".6s";

});

window.addEventListener("scroll",revealCards);

revealCards();



// ===========================
// BACK TO TOP BUTTON
// ===========================

const topBtn=document.createElement("button");

topBtn.innerHTML="⬆";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.style.position="fixed";
topBtn.style.bottom="20px";
topBtn.style.right="20px";
topBtn.style.padding="12px 15px";
topBtn.style.border="none";
topBtn.style.borderRadius="50%";
topBtn.style.background="#2563eb";
topBtn.style.color="white";
topBtn.style.cursor="pointer";
topBtn.style.display="none";

window.addEventListener("scroll",()=>{

    if(window.scrollY>300){

        topBtn.style.display="block";

    }

    else{

        topBtn.style.display="none";

    }

});

topBtn.addEventListener("click",()=>{

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});



// ===========================
// CURRENT YEAR
// ===========================

const footer=document.querySelector("footer p");

footer.innerHTML=`© ${new Date().getFullYear()} Shalu Vishkarma | All Rights Reserved`;