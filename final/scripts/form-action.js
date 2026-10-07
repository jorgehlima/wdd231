const submittedData = document.querySelector("#submitted-data");

const params = new URLSearchParams(window.location.search);

const experience = params.get("experience");
const interests = params.getAll("interest");
const difficulty = params.get("difficulty");
const goal = params.get("goal");

function formatLabel(value) {
    if (!value) {
        return "Not provided";
    }

    return value.charAt(0).toUpperCase() + value.slice(1);
}

function displaySubmission() {
    const interestList =
        interests.length > 0
            ? interests.map((interest) => formatLabel(interest)).join(", ")
            : "None selected";

    submittedData.innerHTML = `
        <p>
            <strong>Experience:</strong>
            <span id="result-experience"></span>
        </p>

        <p>
            <strong>Project Interests:</strong>
            <span id="result-interests"></span>
        </p>

        <p>
            <strong>Preferred Difficulty:</strong>
            <span id="result-difficulty"></span>
        </p>

        <p>
            <strong>Project Goal:</strong>
            <span id="result-goal"></span>
        </p>
    `;

    document.querySelector("#result-experience").textContent =
        formatLabel(experience);

    document.querySelector("#result-interests").textContent =
        interestList;

    document.querySelector("#result-difficulty").textContent =
        formatLabel(difficulty);

    document.querySelector("#result-goal").textContent =
        goal || "Not provided";
}

displaySubmission();