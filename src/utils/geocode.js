const request = require("request");

// GEOCODE (KNOW THE COORDINATES OF CITY/COUNTRY)
const geocodeStructure = (address, callback) => {
  const geocodeURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoibmlvYml1bSIsImEiOiJja25wdWtwNHoxcHJ2Mm5wZTA0cjlhbXozIn0._gSeg6BrIqZdqGgBwjkqGg&limit=1`;
  request({ url: geocodeURL, json: true }, (error, { body }) => {
    const { message, features } = body;
    if (error) {
      callback(`Unable to connect to location services! (${error})`, undefined);
    } else if (message) {
      callback(`${message}`, undefined);
    } else if (features.length === 0) {
      callback("Unable to read out the country/city", undefined);
    } else {
      callback(undefined, features[0]);
    }
  });
};

module.exports = geocodeStructure;
