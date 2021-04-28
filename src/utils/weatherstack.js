const request = require("request");

// WEATHER STACK (KNOW THE WEATHER IN CITY/COUNTRY)
const weatherstack = (latitude, longitude, callback) => {
  const weatherstackURL = `http://api.weatherstack.com/current?access_key=7f7ea16cfb2bcc29868f3a1bfe7dad0d&query=${latitude},${longitude}`;
  request({ url: weatherstackURL, json: true }, (error, { body } = {}) => {
    const { current } = body;
    if (error) {
      callback(`Unable to connect to location services! (${error})`, undefined);
    } else if (body.error) {
      callback(`Link error : ${body.error.info}`, undefined);
    } else {
      callback(undefined, current);
    }
  });
};

module.exports = weatherstack;
