console.log("Client side javascript file is loaded!");

const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const weatherError = document.querySelector("#error-message");
const weatherData = document.querySelector("#weather-data");

weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  weatherData.textContent = "Loading...";
  const location = search.value;
  fetch(`http://localhost:3000/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherError.textContent = data.error;
        weatherData.textContent = "";
      } else {
        const { location, forecast, currently, feelslike } = data;
        weatherData.textContent = `Weather from ${location}: ${forecast}. It is currently ${currently} degrees out. It feels like ${feelslike} degrees.`;
      }
    })
  );
});
