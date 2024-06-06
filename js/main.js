// set Background Gradient only after Video is loaded
document.addEventListener("DOMContentLoaded", function() {
    var video = document.getElementById('background-video');
    var landingPage = document.querySelector('.landing-page');

    video.onloadeddata = function() {
        if (video.readyState >= 3) { // Überprüft, ob genug Daten geladen sind für eine flüssige Wiedergabe
            landingPage.style.background = 'radial-gradient(circle at 50% 300px, rgba(0, 0, 0, 0.2) 10%, rgba(64, 62, 70, 0) 40%, rgba(57, 56, 61, 0.1) 90%), linear-gradient(to bottom, rgba(72, 68, 103, 0.1) 0%, rgba(72, 68, 103, 0.1) 10%, rgba(72, 68, 103, 0) 20%, rgba(72, 68, 103, 0) 100%)';
        }
    };
});




// Arrow Down Animation
const arrowDown = document.querySelector('main .fa-chevron-down');

arrowDown.addEventListener('click', () => {
    arrowDown.classList.add('animated');
    setTimeout(() => {
        arrowDown.classList.remove('animated');
    }, 1000);
});