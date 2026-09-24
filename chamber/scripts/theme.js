const themeButton = document.querySelector("#theme-toggle");

// Check for a previously saved theme
const savedTheme = localStorage.getItem("theme");

// Apply the saved theme
if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-mode");
}

// Update the button accessibility text
function updateThemeButton() {
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
}

// Set the correct button text when the page loads
updateThemeButton();

// Change and save the theme when the button is clicked
themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark-mode");

    const darkMode =
        document.documentElement.classList.contains("dark-mode");

    // Save the user's choice
    localStorage.setItem("theme", darkMode ? "dark" : "light");

    updateThemeButton();
});