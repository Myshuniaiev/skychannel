console.log("Client side javascript file is loaded!");

// Form and input
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

// Weather data element
const weatherData = document.getElementById("weather-data");

// Submit form
weatherForm.addEventListener("submit", function (e) {
  e.preventDefault();
  weatherData.textContent = "Loading...";
  const location = search.value;
  fetch(`/weather?address=${location}`).then((response) =>
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        weatherData.textContent = data.error;
      } else {
        const { name, country, forecast, currently, feelslike } = data;
        weatherData.textContent = `Weather from ${name} (${country}): ${forecast}. It is currently ${currently} degrees out. It feels like ${feelslike} degrees.`;
      }
    })
  );
});
