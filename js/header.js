// Header Background change on scroll
function checkScroll() {
    let header = document.querySelector('header');
    
    if (window.pageYOffset > 0) {
        // Benutzer hat von oben gescrollt, Hintergrundklasse hinzufügen
        header.classList.add('scrolled');
    } else {
        // Benutzer ist ganz oben, Hintergrundklasse entfernen
        header.classList.remove('scrolled');
    }
}

// Event-Listener für das Scroll-Ereignis
window.addEventListener('scroll', checkScroll);





// open and close navbar
const navbar = document.querySelector("#navbar");
const hamburger = document.querySelector(".hamburger");
const hamburgerBG = document.querySelector(".hamburger-bg");

let navbarStatus = "closed";

hamburger.onclick = () => {
    if (navbarStatus == "closed") { //to open the navbar
        navbar.style.transform = "translateX(0%)";
        navbarStatus = "open"; //set to open
        hamburger.classList.remove("toHamburger"); //removes toHamburger Animation
        hamburger.classList.add("toX"); //add toX Animation
        hamburger.style.transform = "translateX(-15px)";
        if (window.matchMedia('(max-width: 700px)').matches) {
            hamburger.classList.add("shiftLeft"); // shifts the x into the navbar when open
            hamburger.classList.remove("shiftRight"); // 
            hamburger.style.transform = "translateX(0px)";
            hamburgerBG.style.opacity = "0"; // Set opacity to 0 when navbar is open
        }
        hamburgerBG.style.backgroundColor = "var(--accent-color-dark)";
        navbar.style.backgroundColor = "var(--accent-color-dark)";
    } else { //to close the navbar
        navbar.style.transform = "translateX(-100%)"; //closes navbar
        navbarStatus = "closed"; //set to closed
        hamburger.classList.remove("toX"); //remove toX Animation
        hamburger.classList.add("toHamburger"); // add toHamburger Animation
        hamburger.style.transform = "translateX(0px)";
        if (window.matchMedia('(max-width: 700px)').matches) {
            hamburger.classList.remove("shiftLeft"); // shifts the hamburger outside the navbar when closed
            hamburger.classList.add("shiftRight"); //
            hamburgerBG.style.opacity = "1"; // Set opacity back to 1 when navbar is closed
        }
        hamburgerBG.style.backgroundColor = "var(--transparent-color)";
        navbar.style.backgroundColor = "var(--transparent-color)";
    }
}




//auto close navbar if you click a link tag or logo
const navbarLinks = document.querySelectorAll("#navbar nav ul li a")
const leitenschenkeLogo = document.querySelector("#navbar .logo")

if (window.matchMedia('(max-width: 1450px)').matches) {
    navbarLinks.forEach((link) => {
        link.onclick = () => {
            navbar.style.transform = "translateX(-100%)"; //closes navbar
            navbarStatus = "closed"; //set to closed
            hamburger.classList.remove("toX"); //remove toX Animation
            hamburger.classList.add("toHamburger"); // add toHamburger Animation
            hamburger.style.transform = "translateX(0px)";
            if (window.matchMedia('(max-width: 700px)').matches) {
                hamburger.classList.remove("shiftLeft"); // shifts the hamburger outside the navbar when closed
                hamburger.classList.add("shiftRight"); // 
                hamburgerBG.style.opacity = "1"; // Set opacity back to 1 when navbar is closed
            }
            hamburgerBG.style.backgroundColor = "var(--transparent-color)";
            navbar.style.backgroundColor = "var(--transparent-color)";
        }
    })
    leitenschenkeLogo.onclick = () => {
        navbar.style.transform = "translateX(-100%)"; //closes navbar
        navbarStatus = "closed"; //set to closed
        hamburger.classList.remove("toX"); //remove toX Animation
        hamburger.classList.add("toHamburger"); // add toHamburger Animation
        hamburger.style.transform = "translateX(0px)";
        if (window.matchMedia('(max-width: 700px)').matches) {
            hamburger.classList.remove("shiftLeft"); // shifts the hamburger outside the navbar when closed
            hamburger.classList.add("shiftRight"); // 
            hamburgerBG.style.opacity = "1"; // Set opacity back to 1 when navbar is closed
        }
        hamburgerBG.style.backgroundColor = "var(--transparent-color)";
        navbar.style.backgroundColor = "var(--transparent-color)";
    }
}




//highlight the current section in the navbar
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let currentSection = "willkommen";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 400) { // if the top end of the section with a preferred offset is less than the window's scrollY
            currentSection = section.id; // set the section we are on as current Section
        }
    });

    navLinks.forEach(nav => {
        if (nav.getAttribute("href") === `#${currentSection}`) { // set active class on the nav with the correct id = same as the current section
            nav.classList.add("active");
        } else {
            nav.classList.remove("active"); // remove active class from all other navs
        }
    });
});
