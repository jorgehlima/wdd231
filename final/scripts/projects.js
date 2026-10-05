const projectsContainer = document.querySelector("#project-cards");

const projectsUrl = "data/projects.json";

async function getProjects() {
    try {
        const response = await fetch(projectsUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayProjects(data.projects);
    } catch (error) {
        console.error("Unable to load project data:", error);

        projectsContainer.innerHTML = `
            <p class="error-message">
                Sorry, the projects could not be loaded.
                Please try again later.
            </p>
        `;
    }
}

function displayProjects(projects) {
    projectsContainer.innerHTML = "";

    projects.forEach((project) => {
        const card = document.createElement("article");

        card.classList.add("project-card");

        card.innerHTML = `
            <img
                src="images/${project.image}"
                alt="${project.name}"
                loading="lazy">

            <div class="project-card-content">
                <h3>${project.name}</h3>

                <p>
                    <strong>Category:</strong>
                    ${formatLabel(project.category)}
                </p>

                <p>
                    <strong>Difficulty:</strong>
                    ${formatLabel(project.difficulty)}
                </p>

                <p>
                    ${project.description}
                </p>

                <p>
                    <strong>Estimated Time:</strong>
                    ${project.estimatedTime}
                </p>

                <button
                    class="details-button"
                    type="button"
                    data-project-id="${project.id}">
                    View Details
                </button>
            </div>
        `;

        projectsContainer.appendChild(card);
    });
}

function formatLabel(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

getProjects();