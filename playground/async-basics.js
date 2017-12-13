'use strict';

console.log("Starting up");

setTimeout(() => {
  console.log("First callback");
}, 2000);

setTimeout(() => {
  console.log("Second callback");
}, 0);

console.log("Finishing up")
