const searchForm = document.getElementById("search-location");
const cityValue = document.getElementById("city");
const countryValue = document.getElementById("country-code");
const cityName = document.querySelector(".city-name p");
const cardBody = document.querySelector(".card-body");
const timeImage = document.querySelector(".card-top img");
const cardInfo = document.querySelector(".back-card");

const isDayTime = (icon) => {
    if (icon.includes("d")) {
        return true;
    } else {
        return false;
    }
};

updateWeatherApp = (city) => {
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
    cityName.textContent = `${city.name}, ${city.sys.country}`;
    cardBody.innerHTML = `
    <div class="card-mid row">
        <div class="col-8 text-center temperature">
            <span>${city.main.temp}&deg;C</span>
        </div>

        <div class="col-4 condition-temperature">
            <p class="condition">${city.weather[0].description}</p>
            <p class="high">${city.main.temp_max}&deg;C</p>
            <p class="low">${city.main.temp_min}&deg;C</p>
        </div>

    </div>

    <div class="icon-container card shadow mx-auto">
        <img src="${iconSrc}" alt="img-weather" />
    </div>

    <div class="card-bottom px-5 py-4 row">
        <div class="col-6 text-center">
            <p>${city.main.feels_like}&deg;C</p>
            <span>Sensación</span>
        </div>

        <div class="col-6 text-center">
            <p>${city.main.humidity}%</p>
            <span>Humedad</span>
        </div>
    </div>
    `;

    if (isDayTime(imageName)) {
        timeImage.setAttribute("src", "./images/day_image.svg");
    } else {
        timeImage.setAttribute("src", "./images/night_image.svg");
    }

    cardInfo.classList.remove("d-none");
};

searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const citySearched = cityValue.value.trim();
    const countryCode = countryValue.value.trim();
    console.log(citySearched, countryCode);
    searchForm.reset();

    requestCity(citySearched, countryCode)
        .then((data) => {
            updateWeatherApp(data);
        })
        .catch((error) => {
            console.log(error);
        });
});
