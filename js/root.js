// scroll reveal 
window.addEventListener('scroll', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.scrollAnimated'); //add class to all elements who need to be animated

    for (var i = 0; i < reveals.length; i++) {

        var windowHeight = window.innerHeight;
        var revealTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 50; //can be adjusted to reveal elements earlier - or later +

        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('visible');   //adds visible class wich can be css styled
        } else {
            reveals[i].classList.remove('visible');
        }
    }
}