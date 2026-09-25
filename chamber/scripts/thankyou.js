// Gets the form information from the URL
const params = new URLSearchParams(window.location.search);

// Get submitted values
const firstName = params.get("first");
const lastName = params.get("last");
const email = params.get("email");
const phone = params.get("phone");
const organization = params.get("organization");
const timestamp = params.get("timestamp");

// Displays the submitted information
document.querySelector("#first-name").textContent = firstName || "";
document.querySelector("#last-name").textContent = lastName || "";
document.querySelector("#email").textContent = email || "";
document.querySelector("#phone").textContent = phone || "";
document.querySelector("#organization").textContent = organization || "";

// timestamp section
if (timestamp) {
    const applicationDate = new Date(timestamp);

    document.querySelector("#application-date").textContent =
        applicationDate.toLocaleString();
}