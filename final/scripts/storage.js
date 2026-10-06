const storageKey = "savedProjects";

export function getSavedProjects() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

export function saveProjects(savedProjects) {
    localStorage.setItem(
        storageKey,
        JSON.stringify(savedProjects)
    );
}