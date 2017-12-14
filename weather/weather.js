'use strict';
const request = require('request');

const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY;

let getWeather = (lat, lng, callback) => {
  request({
    url: `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Connection Error! Unable to connect to forecast.io server.');
    } else if (response.statusCode !== 200) {
      callback("Error. Unable to fetch weather");
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature:  body.currently.apparentTemperature
      });
    }
  });
};

module.exports.getWeather = getWeather;
