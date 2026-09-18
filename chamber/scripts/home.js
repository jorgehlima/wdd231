/* Weather */

// Wilmington, North Carolina coordinates
const latitude = 34.21;
const longitude = -77.89;

const apiKey = "8ac83492e539bfa12112453960e2ebfd";

// OpenWeatherMap URLs
const currentWeatherUrl =
  `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

const forecastUrl =
  `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;

// weather HTML elements
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const weatherDescription = document.querySelector("#weather-description");
const forecastContainer = document.querySelector("#forecast");

// Fetch current weather
async function getCurrentWeather() {
  try {
    const response = await fetch(currentWeatherUrl);

    if (response.ok) {
      const data = await response.json();
      displayCurrentWeather(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error("Current weather error:", error);
  }
}

// Display current weather
function displayCurrentWeather(data) {
  const temperature = Math.round(data.main.temp);
  const description = data.weather[0].description;
  const icon = data.weather[0].icon;

  currentTemp.innerHTML = `${temperature}&deg;F`;

  weatherDescription.textContent = capitalizeWords(description);

  const iconSource =
    `https://openweathermap.org/img/wn/${icon}@2x.png`;

  weatherIcon.setAttribute("src", iconSource);
  weatherIcon.setAttribute("alt", description);
}

/* Three days forecast */

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);

    if (response.ok) {
      const data = await response.json();
      displayForecast(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error("Forecast error:", error);
  }
}

// next three days of forecast data
function displayForecast(data) {
  forecastContainer.innerHTML = "";

  const dailyForecasts = data.list.filter((forecast) =>
    forecast.dt_txt.includes("12:00:00")
  );

  dailyForecasts.slice(0, 3).forEach((forecast) => {
    const date = new Date(forecast.dt * 1000);

    const dayName = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    const temperature = Math.round(forecast.main.temp);

    const forecastItem = document.createElement("p");

    forecastItem.innerHTML =
      `<strong>${dayName}:</strong> ${temperature}&deg;F`;

    forecastContainer.appendChild(forecastItem);
  });
}

// Capitalize weather descriptions
function capitalizeWords(text) {
  return text
    .split(" ")
    .map((word) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

/* Member spotlight */

const membersUrl = "data/members.json";

const spotlightContainer =
  document.querySelector("#spotlight-cards");

// Fetch chamber member information
async function getMembers() {
  try {
    const response = await fetch(membersUrl);

    if (response.ok) {
      const data = await response.json();

      displaySpotlights(data);
    } else {
      throw Error(await response.text());
    }
  } catch (error) {
    console.error("Member data error:", error);
  }
}

// Gold and Silver members
function displaySpotlights(data) {
  spotlightContainer.innerHTML = "";

  const members = data.members || data;

  const qualifiedMembers = members.filter(
    (member) =>
      member.membership === 2 ||
      member.membership === 3
  );

  const shuffledMembers = [...qualifiedMembers].sort(
    () => Math.random() - 0.5
  );

  const selectedMembers = shuffledMembers.slice(0, 3);

  selectedMembers.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("spotlight-card");

    const name = document.createElement("h3");
    name.textContent = member.name;

    const logo = document.createElement("img");
    logo.setAttribute(
      "src",
      `images/${member.image}`
    );
    logo.setAttribute(
      "alt",
      `${member.name} logo`
    );
    logo.setAttribute("loading", "lazy");

    const address = document.createElement("p");
    address.textContent = member.address;

    const phone = document.createElement("p");
    phone.textContent = member.phone;

    const website = document.createElement("a");
    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.setAttribute("rel", "noopener");
    website.textContent = "Visit Website";

    const membership = document.createElement("p");

    if (member.membership === 3) {
      membership.textContent = "Gold Member";
    } else {
      membership.textContent = "Silver Member";
    }

    membership.classList.add("membership-level");

    card.appendChild(name);
    card.appendChild(logo);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);
    card.appendChild(membership);

    spotlightContainer.appendChild(card);
  });
}

getCurrentWeather();
getForecast();
getMembers();