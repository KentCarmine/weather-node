'use strict';

const yargs = require('yargs');

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather');

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

geocode.geocodeAddress(argv.address, (errorMsg, results) => {
  if (errorMsg) {
    console.log(errorMsg);
  } else {
    console.log(results.address);
    weather.getWeather(results.latitude, results.longitude, (errorMsg, weatherResults) => {
      if (errorMsg) {
        console.log(errorMsg);
      } else {
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`);
      }
    });
  }
});
