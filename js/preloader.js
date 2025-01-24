window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");
    const preloaderIMG = preloader.querySelector("img");

    setTimeout(function() {
        document.documentElement.classList.remove("no-scroll");
        preloader.style.opacity = 0;
        preloader.style.visibility = "hidden";
        preloaderIMG.style.opacity = 0;
        preloaderIMG.style.visibility = "hidden";
    }, 2000);
});