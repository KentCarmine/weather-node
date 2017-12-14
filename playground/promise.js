'use strict';

let asyncAdd = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof a === 'number' && typeof b === 'number') {
        resolve(a + b);
      } else {
        reject("Arguments must be numbers.");
      }
    }, 1500);
  });
};

asyncAdd(5, 7).then((result) => {
  console.log("Result: " + result);
  return asyncAdd(result, '33');
}).then((result) => {
  console.log("Result: " + result);
}).catch((errMsg) => {
  console.log("Error: "+ errMsg);
});

// let somePromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("Hey. it worked!");
//     // reject("Unable to fulfill promise.");
//   }, 2500);
// });
//
// somePromise.then((msg) => {
//   console.log("Success: " + msg);
// }, (errMsg) => {
//   console.log("Error: " + errMsg);
// });
