const themeButton = document.querySelector("#theme-toggle");

themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    const darkMode =
        document.documentElement.classList.contains("dark-mode");

    themeButton.setAttribute(
        "aria-label",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );

    themeButton.setAttribute(
        "title",
        darkMode ? "Switch to light mode" : "Switch to dark mode"
    );
});