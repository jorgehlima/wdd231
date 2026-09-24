// Sets the timestamp when the page loads
const timestamp = document.querySelector("#timestamp");

timestamp.value = new Date().toISOString();

// Opens membership modals
const membershipButtons = document.querySelectorAll(".membership-info");

membershipButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modalId = button.dataset.modal;
        const modal = document.querySelector(`#${modalId}`);

        modal.showModal();
    });
});

// Closes membership modals
const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const modal = button.closest("dialog");

        modal.close();
    });
});