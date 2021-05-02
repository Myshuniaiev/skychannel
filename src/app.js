const path = require("path");
const express = require("express");
const hbs = require("hbs");
const app = express();

// Setting port
const port = process.env.PORT || 3000;

// GETTING GEOCODE AND WEATHER STACK
const geocode = require("./utils/geocode");
const weatherstack = require("./utils/weatherstack");

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

// MAIN PAGE
app.get("", (req, res) => {
  res.render("index", {
    title: "Node weather",
    body:
      "This weather app is one of best free weather apps with full features: Local weather, weather map (weather map service) and weather widgets.",
  });
});

// ABOUT PAGE
app.get("/statistic", (req, res) => {
  res.render("statistic", {
    title: "Statistic",
    body:
      "This weather app is one of best free weather apps with full features: Local weather, weather map (weather map service) and weather widgets.",
    image:
      "https://live-production.wcms.abc-cdn.net.au/e82e2beff906c88e2cc337d25b4fbdba?impolicy=wcms_crop_resize&cropH=689&cropW=1230&xPos=88&yPos=160&width=862&height=485",
  });
});

// HELP PAGE
app.get("/map", (req, res) => {
  res.render("map", {
    title: "Map",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempore at voluptates sed, aspernatur assumenda mollitia voluptatibus. Illo, dolorum sunt. Dolorem hic a iste ut doloremque aliquam neque ullam velit.",
  });
});

// HELP PAGE
app.get("/calendar", (req, res) => {
  res.render("calendar", {
    title: "Calendar",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempore at voluptates sed, aspernatur assumenda mollitia voluptatibus. Illo, dolorum sunt. Dolorem hic a iste ut doloremque aliquam neque ullam velit.",
  });
});
// HELP PAGE
app.get("/settings", (req, res) => {
  res.render("calendar", {
    title: "Calendar",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempore at voluptates sed, aspernatur assumenda mollitia voluptatibus. Illo, dolorum sunt. Dolorem hic a iste ut doloremque aliquam neque ullam velit.",
  });
});

// GETTING WEATHER
app.get("/weather", function (req, res) {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode((address = req.query.address), (error, data) => {
    if (error) {
      res.send({
        error: `Coordinates Error: ${error}`,
      });
    } else if (address === undefined) {
      res.send({
        error: `Please provide an address!`,
      });
    } else {
      const { text, center } = data;
      const latitude = center[1];
      const longitude = center[0];
      weatherstack(latitude, longitude, (error, { current, location }) => {
        if (error) {
          res.send({
            error: `Weather Error: ${error}`,
          });
        } else {
          const { temperature, feelslike, weather_descriptions, observation_time } = current;
          const { country } = location;
          res.send({
            name: text,
            country: country,
            time: observation_time,
            forecast: weather_descriptions[0],
            currently: temperature,
            feelslike: feelslike,
          });
        }
      });
    }
  });
});

// 404 PAGE
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Something goes wrong :/",
    error: "Please provide correct address",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempore at voluptates sed, aspernatur assumenda mollitia voluptatibus. Illo, dolorum sunt. Dolorem hic a iste ut doloremque aliquam neque ullam velit.",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "Something goes wrong :/",
    error: "Please provide correct address",
    body:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere tempore at voluptates sed, aspernatur assumenda mollitia voluptatibus. Illo, dolorum sunt. Dolorem hic a iste ut doloremque aliquam neque ullam velit.",
  });
});
// STARTING SERVER
app.listen(port, () => {
  console.log(`Server now is running on localhost ${port}!`);
});
