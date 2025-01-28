// Arrow Down Swipe Animation add and remove to fix bug
const arrowDown = document.querySelector('main .fa-chevron-down');

arrowDown.addEventListener('click', () => {
    arrowDown.classList.add('animated');
    setTimeout(() => {
        arrowDown.classList.remove('animated');
    }, 1000);
});