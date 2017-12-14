'use strict';

const axios = require('axios');
const yargs = require('yargs');

const DARK_SKY_API_KEY = process.env.DARK_SKY_API_KEY;

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: "a",
      describe: "Address to fetch weather for",
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

let uriEncodedAddress = encodeURIComponent(argv.address);
const GEOCODE_URL_PREFIX = "https://maps.googleapis.com/maps/api/geocode/json?address=";
let geocodeUrl = GEOCODE_URL_PREFIX + uriEncodedAddress

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address.');
  }

  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
  let weatherUrl = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${lat},${lng}`;
  console.log(response.data.results[0].formatted_address);

  return axios.get(weatherUrl);
}).then((response) => {
  let temperature = response.data.currently.temperature;
  let apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}.`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log("Connection Error! Unable to connect to API servers.");
  } else {
    console.log("Error: " + e.message);
  }
});
