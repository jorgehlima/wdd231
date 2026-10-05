// Mobile navigation
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");

    menuButton.setAttribute("aria-expanded", isOpen);

    menuButton.innerHTML = isOpen ? "&times;" : "&#9776;";
    menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );
});

// Current year
const currentYear = document.querySelector("#current-year");

currentYear.textContent = new Date().getFullYear();

// Last modified date
const lastModified = document.querySelector("#last-modified");

lastModified.textContent = `Last Modified: ${document.lastModified}`;