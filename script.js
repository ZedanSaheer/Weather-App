const temp = document.querySelector(".temp");
const description = document.querySelector(".description");
const notificationElement = document.querySelector(".notification");
const locationElement = document.querySelector(".location");
const icon = document.getElementById("icon");

/* app data */

const weather = {};

weather.temperature = {
    unit: "celsius"
}

const Kelvin = 273.15;

const key = "cbaa3dfffb2d8c330a6bbeb9be3f214f";

/* check if user has geolocation */

if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "your browser does not support geo location";
}
/* functions to user location action */
function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude, longitude);
}

function showError(error) {
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p>${error.message}</p>`;
}
/* the api url */
function getWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    console.log(api);
/* fetching data from api */

fetch(api)
    .then(function (response) {
        let data = response.json();
        return data;
    })

     
    .then(function (data) {
        weather.temperature.value = Math.floor(data.main.temp - Kelvin);
        weather.description = data.weather[0].description;
        weather.city = data.name;
        weather.country = data.sys.country;
        weather.icon=data.weather[0].icon;
        console.log(weather.icon);
    })

    .then(function () {
        displayWeather();
    });

}

function displayWeather() {
    description.innerHTML = weather.description;
    temp.innerHTML = `<span class="textone">${weather.temperature.value}°</span> <span class="texttwo">C</span>`;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    document.getElementById("icon").src=`icons/${weather.icon}.png`;
}

function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5) + 32;
}

temp.addEventListener('click', () => {
    if (weather.temperature.value === undefined) {
        return;
    }
    if (weather.temperature.unit == "celsius") {
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);

        temp.innerHTML = `<span class="textone">${fahrenheit}°</span> <span class="texttwo">F</span>`;
        weather.temperature.unit = "fahrenheit";
    }
    else {
        temp.innerHTML = `<span class="textone">${weather.temperature.value}°</span> <span class="texttwo">C</span>`;
        weather.temperature.unit = "celsius";
    }

})