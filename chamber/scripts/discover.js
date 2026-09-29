 /* imports the eight objects within places.mjs */
import { places } from "../data/places.mjs";

/* Corresponds to the section class=discover-grid */
const discoverGrid = document.querySelector("#discover-grid");

/* Card-building function */
function displayPlaces(places) {
  places.forEach((place, index) => {
    const card = document.createElement("article");
    const title = document.createElement("h2");
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const address = document.createElement("address");
    const description = document.createElement("p");
    const button = document.createElement("button");

    card.classList.add("discover-card");
    card.style.gridArea = `card${index + 1}`;

    title.textContent = place.name;

    image.setAttribute("src", `images/${place.image}`);
    image.setAttribute("alt", place.name);
    image.setAttribute("width", "300");
    image.setAttribute("height", "200");
    image.setAttribute("loading", "lazy");

    address.textContent = place.address;
    description.textContent = place.description;

    button.textContent = "Learn More";
    button.setAttribute("type", "button");

    figure.appendChild(image);

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(description);
    card.appendChild(button);

    discoverGrid.appendChild(card);
  });
}

displayPlaces(places);

// Display visitor message
const visitorMessage = document.querySelector("#visitor-message");

const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
  visitorMessage.textContent =
    "Welcome! Let us know if you have any questions.";
} else {
  const difference = currentVisit - Number(lastVisit);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const daysBetweenVisits = Math.floor(difference / millisecondsPerDay);

  if (daysBetweenVisits < 1) {
    visitorMessage.textContent = "Back so soon! Awesome!";
  } else if (daysBetweenVisits === 1) {
    visitorMessage.textContent = "You last visited 1 day ago.";
  } else {
    visitorMessage.textContent =
      `You last visited ${daysBetweenVisits} days ago.`;
  }
}

localStorage.setItem("lastVisit", currentVisit);