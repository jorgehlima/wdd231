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
            ${formatLabel(experience)}
        </p>

        <p>
            <strong>Project Interests:</strong>
            ${interestList}
        </p>

        <p>
            <strong>Preferred Difficulty:</strong>
            ${formatLabel(difficulty)}
        </p>

        <p>
            <strong>Project Goal:</strong>
            ${goal ? goal : "Not provided"}
        </p>
    `;
}

displaySubmission();