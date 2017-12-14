'use strict';

const request = require('request');

const GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

let geocodeAddress = (address, callback) => {
  let uriEncodedAddress = encodeURIComponent(address);

  request({
    url: GEOCODE_URL + uriEncodedAddress,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback("Connection Error: Unable to connect to Google servers.")
    } else if (body.status === 'ZERO_RESULTS') {
      callback("Error: Unable to find that address.");
    } else if (body.status === 'OK') {
      callback(undefined, {
        address:  body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports = {
  geocodeAddress
};
