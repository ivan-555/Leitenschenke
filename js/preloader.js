window.addEventListener("load", function() {
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.style.opacity = 0;
        preloader.style.visibility = "hidden";

        document.documentElement.classList.remove("no-scroll");

        document.body.classList.add("page-ready");
    }, 2000);
});