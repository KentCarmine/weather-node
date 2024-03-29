'use strict';

const request = require('request');

const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

let geocodeAddress = (address) => {
  return new Promise((resolve, reject) => {
    let uriEncodedAddress = encodeURIComponent(address);

    request({
      url: GEOCODE_URL + uriEncodedAddress,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject("Connection Error: Unable to connect to Google servers.")
      } else if (body.status === 'ZERO_RESULTS') {
        reject("Error: Unable to find that address.");
      } else if (body.status === 'OK') {
        resolve({
          address:  body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        });
      }
    });
  });
};

geocodeAddress('19142').then((location) => {
  console.log(JSON.stringify(location, undefined, 2));
}, (errMsg) => {
  console.log(errMsg);
});
