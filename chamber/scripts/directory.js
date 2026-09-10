const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");

const url = "data/members.json";

async function getMemberData() {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);
    } catch (error) {
        console.error("Unable to load member data:", error);

        membersContainer.innerHTML =
            "<p>Business directory information is currently unavailable.</p>";
    }
}

function displayMembers(members) {
    membersContainer.innerHTML = "";

    members.forEach((member) => {
        const card = document.createElement("section");

        card.classList.add("member-card");

        const image = document.createElement("img");
        image.setAttribute(
            "src",
            `images/${member.image}`
        );
        image.setAttribute(
            "alt",
            `${member.name} business logo`
        );
        image.setAttribute("loading", "lazy");
        image.setAttribute("width", "300");
        image.setAttribute("height", "200");

        const name = document.createElement("h2");
        name.textContent = member.name;

        const address = document.createElement("p");
        address.textContent = member.address;

        const phone = document.createElement("p");
        phone.textContent = member.phone;

        const description = document.createElement("p");
        description.textContent = member.description;

        const membership = document.createElement("p");
        membership.classList.add("membership");

        membership.textContent =
            `Membership: ${getMembershipLevel(member.membership)}`;

        const website = document.createElement("a");
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");
        website.setAttribute("rel", "noopener noreferrer");
        website.textContent = "Visit Website";

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(description);
        card.appendChild(membership);
        card.appendChild(website);

        membersContainer.appendChild(card);
    });
}

function getMembershipLevel(level) {
    if (level === 3) {
        return "Gold";
    }

    if (level === 2) {
        return "Silver";
    }

    return "Member";
}

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid");
    membersContainer.classList.remove("list");

    gridButton.classList.add("selected");
    listButton.classList.remove("selected");
});

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list");
    membersContainer.classList.remove("grid");

    listButton.classList.add("selected");
    gridButton.classList.remove("selected");
});

/* Footer information */

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.textContent = new Date().getFullYear();

lastModified.textContent =
    `Last Modification: ${document.lastModified}`;

getMemberData();