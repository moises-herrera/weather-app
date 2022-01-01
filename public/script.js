const searchForm = document.getElementById("search-location");
const cityValue = document.getElementById("city");
const countryValue = document.getElementById("country-code");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back-card");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (cityValue.value == null) return;
  
  const citySearched = cityValue.value.trim();
  const countryCode = countryValue.value.trim();

  searchForm.reset();

  fetch("/weather", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({ city: citySearched, countryCode: countryCode }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Hello from script");
      updateWeatherApp(data);
    });
});

const isDayTime = (icon) => {
  if (icon.includes("d")) {
    return true;
  } else {
    return false;
  }
};

const temperature = document.querySelector("#temperature");
const condition = document.querySelector(".condition");
const highTemp = document.querySelector(".high");
const lowTemp = document.querySelector(".low");
const weatherImage = document.querySelector("#weather-img");
const feels = document.querySelector("#feels-temp");
const humidity = document.querySelector("#humidity-percent");

function updateWeatherApp (city) {
  const imageName = city.weather[0].icon;
  const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
  cityName.textContent = `${city.name}, ${city.sys.country}`;
  
  temperature.textContent = `${Math.round(city.main.temp)}°C`;
  condition.textContent = city.weather[0].description;
  highTemp.textContent = `${Math.round(city.main.temp_max)}°C`;
  lowTemp.textContent = `${Math.round(city.main.temp_min)}°C`;
  weatherImage.setAttribute("src", iconSrc);
  feels.textContent = `${Math.round(city.main.feels_like)}°C`;
  humidity.textContent = `${city.main.humidity}%`;

  if (isDayTime(imageName)) {
    timeImage.setAttribute("src", "./images/day_image.svg");
  } else {
    timeImage.setAttribute("src", "./images/night_image.svg");
  }

  cardInfo.classList.remove("d-none");
};