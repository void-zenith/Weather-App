"use strict";

let city = document.querySelector(".city");
let temperature = document.querySelector(".temperature");
let maxTemperature = document.querySelector(".max-temp");
let minTemperature = document.querySelector(".min-temp");
let humidity = document.querySelector(".humidity");
let pressure = document.querySelector(".pressure");
let description = document.querySelector(".weather-description");
let weatherIcon = document.querySelector(".weather-image");
let time = document.querySelector(".time");
let dates = document.querySelector(".date");
let checkbox = document.querySelector(`.checkbox`);
const apiKey = "894d273232600a4c08b2a95e2e7cce97";

const weatherDetailByCity = function (paramCity) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${paramCity}&appid=894d273232600a4c08b2a95e2e7cce97`
  )
    .then((response) => {
      if (!response.ok) {
        document.querySelector(".loading").innerHTML = "Wrong City entered";
        throw new Error("No weather found.");
      } else {
        document.querySelector(".loading").classList.add("remove");
        document
          .querySelector(".weather-description-image")
          .classList.remove("remove");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    });
};

//to display weather
const displayWeather = function (data) {
  var name = data["name"];
  var temp = data["main"]["temp"];
  var minTemp = data["main"]["temp_min"];
  var maxTemp = data["main"]["temp_max"];
  var humid = data["main"]["humidity"];
  var press = data["main"]["pressure"];
  var desc = data["weather"][0]["description"];
  var descIcon = data["weather"][0]["icon"];

  city.innerHTML = `City: ${name}`;
  temperature.innerHTML = `Temperature: ${convertKelvinToCelsius(temp)}`;
  maxTemperature.innerHTML = `Maximum Temperature: ${convertKelvinToCelsius(
    maxTemp
  )}`;
  minTemperature.innerHTML = `Minimum Temperature: ${convertKelvinToCelsius(
    minTemp
  )}`;
  humidity.innerHTML = `Humidity: ${humid}%`;
  pressure.innerHTML = `Pressure :${press}`;
  weatherIcon.src = "http://openweathermap.org/img/w/" + descIcon + ".png";
  description.innerHTML = `${desc}`;
};

//to convert kelvin to celsius
const convertKelvinToCelsius = function (temp) {
  return `${(temp - 273.15).toFixed(2)} C`;
};

//to get the search value
const search = function () {
  let searchValue = document.querySelector(".searchCity");
  weatherDetailByCity(searchValue.value);
};

//for latitude and longitude
const getLocation = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      lonAndLat.weatherDetailBylonAndLat(
        position.coords.latitude,
        position.coords.longitude
      );
    }, showError);
  } else {
    console.log("Geolocation not working");
  }
};

// api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
//lets try from Object oriented programming
let lonAndLat = {
  weatherDetailBylonAndLat(latitude, longitude) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=894d273232600a4c08b2a95e2e7cce97`
    )
      .then((response) => {
        if (!response.ok) {
          document.querySelector(".loading").innerHTML = "No weather found";
          throw new Error("No weather found.");
        } else {
          document.querySelector(".loading").classList.add("remove");
          document
            .querySelector(".weather-description-image")
            .classList.remove("remove");
        }
        return response.json();
      })
      .then((data) => {
        displayWeather(data);
      });
  },
};

const showError = function (error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      document.querySelector(".loading").innerHTML =
        "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      document.querySelector(".loading").innerHTML =
        "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      document.querySelector(".loading").innerHTML =
        "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      document.querySelector(".loading").innerHTML =
        "An unknown error occurred.";
      break;
  }
};

//for date
const day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Satruday",
];

const getTime = function () {
  let date = new Date();
  dates.innerHTML = `${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`;
  let ampm = date.getHours() >= 12 ? "PM" : "AM";
  time.innerHTML = `${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()} ${ampm}`;
  timeOut("getTime()", 1000);
};
const timeOut = function (func, refresh) {
  setTimeout(func, refresh);
};

getTime();

//map for object

checkbox.addEventListener("click", function () {
  if (checkbox.checked) {
    document.querySelector(".header").classList.add("dark-mode");
    document.querySelector(".time-date").classList.add("dark-mode");
    document.querySelector(".img").classList.add("dark-mode");
    document.querySelector(".container-weather").classList.add("dark-mode");
  } else {
    document.querySelector(".header").classList.add("dark-mode-reverse");
    document.querySelector(".time-date").classList.add("dark-mode-reverse");
    document.querySelector(".img").classList.add("dark-mode-reverse");
    document.querySelector(".container-weather").classList.remove("dark-mode-reverse");
    document.querySelector(".container-weather").classList.remove("dark-mode");
    document.querySelector(".header").classList.remove("dark-mode");
    document.querySelector(".time-date").classList.remove("dark-mode");
    document.querySelector(".img").classList.remove("dark-mode");
  }
});
