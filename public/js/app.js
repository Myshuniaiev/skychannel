console.log("Client side javascript file is loaded!");

// Form and input
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

// Error and data
const weatherData = document.querySelector("#weather-data");

// Submit form
weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  weatherData.textContent = "Loading...";
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherError.textContent = data.error;
        weatherData.textContent = "";
      } else {
        const { name, country, forecast, currently, feelslike } = data;
        weatherData.textContent = `Weather from ${name} (${country}): ${forecast}. It is currently ${currently} degrees out. It feels like ${feelslike} degrees.`;
      }
    })
  );
});

document.body.onload = NewYorkData;

// getting elements
const time = document.getElementById("weather-time");
const temperature = document.getElementById("weather-degrees");
const city = document.getElementById("weather-city");
const countryName = document.getElementById("weather-country");
const currentDate = document.getElementById("weather-date");

// date
var today = new Date();
var localDate = `${today.getFullYear()}/${
  today.getMonth() + 1
}/${today.getDate()}`;
var localTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

function NewYorkData(e) {
  e.preventDefault();
  fetch(`/weather?address=%27New%20York%27`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherError.textContent = data.error;
        weatherData.textContent = "";
      } else {
        const { name, country, currently, time } = data;
        time.textContent = time;
        temperature.textContent = `+${currently}°C`;
        city.textContent = name;
        countryName.textContent = country;
        currentDate.textContent = localDate + " " + localTime;
      }
    })
  );
}
