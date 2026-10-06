const projectsContainer = document.querySelector("#project-cards");
const difficultyFilter = document.querySelector("#difficulty-filter");
const categoryFilter = document.querySelector("#category-filter");
const projectDialog = document.querySelector("#project-details");
const dialogContent = document.querySelector("#dialog-content");
const closeDialogButton = document.querySelector("#close-dialog");


const projectsUrl = "data/projects.json";

let allProjects = [];

async function getProjects() {
    try {
        const response = await fetch(projectsUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();
        
        allProjects = data.projects;

        displayProjects(allProjects);
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

function filterProjects() {
    const selectedDifficulty = difficultyFilter.value;
    const selectedCategory = categoryFilter.value;

    const filteredProjects = allProjects.filter((project) => {
        const matchesDifficulty =
            selectedDifficulty === "all" ||
            project.difficulty === selectedDifficulty;

        const matchesCategory =
            selectedCategory === "all" ||
            project.category === selectedCategory;

        return matchesDifficulty && matchesCategory;
    });

    displayProjects(filteredProjects);
}

function displayProjects(projects) {
    projectsContainer.innerHTML = "";

    if (projects.length === 0) {
        projectsContainer.innerHTML = `
            <p class="no-projects">
                No projects match the selected filters.
            </p>
        `;

        return;
    }

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

difficultyFilter.addEventListener("change", filterProjects);
categoryFilter.addEventListener("change", filterProjects);

getProjects();
