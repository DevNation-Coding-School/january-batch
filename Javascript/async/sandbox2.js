// console.log("Sandbox 2");

// const getTodos = (resource, callback) => {
//   const request = new XMLHttpRequest();

//   request.addEventListener("readystatechange", () => {
//     if (request.readyState === 4 && request.status === 200) {
//       const data = JSON.parse(request.responseText);
//       callback(undefined, data);
//     } else if (request.readyState === 4) {
//       callback("Could not fetch", undefined);
//     }
//   });

//   request.open("GET", resource);
//   request.send();
// };

// getTodos("todos/raheel.json", (error, data) => {
//   console.log(data);
//   getTodos("todos/mudi.json", (error, data) => {
//     console.log(data);
//     getTodos("todos/mudi.json", (error, data) => {
//       console.log(data);
//     });
//     getTodos("todos/mudi.json", (error, data) => {
//       console.log(data);
//     });
//     getTodos("todos/mudi.json", (error, data) => {
//       console.log(data);
//     });
//   });
// });

// // Promises
// // Either gets resolved (get the data) or rejected (get an error)

// const getSomething = () => {
//   // network request
//   return new Promise((resolve, reject) => {
//     // fetch something
//     resolve("some data");
//     reject("error");
//   });
// };

// getSomething().then(
//   (data) => {
//     console.log(data);
//   },
//   (err) => {
//     console.log(err);
//   }
// );

const todoPromise = (resource) => {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.addEventListener("readystatechange", () => {
      if (request.readyState === 4 && request.status === 200) {
        const data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState === 4) {
        reject("Could not fetch data");
      }
    });
    request.open("GET", resource);
    request.send();
  });
};

// todoPromise("todos/raheel.json")
//   .then((data) => {
//     console.log("promise resolve", data);
//   })
//   .catch((err) => {
//     console.log("promise rejected", err);
//   });

// // Chaining Promises
// todoPromise("todos/raheel.json")
//   .then((data) => {
//     console.log("Promise 1 is resolved", data);
//     return todoPromise("todos/hamd.json");
//   })
//   .then((data) => {
//     console.log("Promise 2 is resolved", data);
//     return todoPromise("todos/mudi.json");
//   })
//   .then((data) => {
//     console.log("Promise 3 is resolved", data);
//   })
//   .catch((err) => {
//     console.log("Promise Rejected", err);
//   });

// Fetch API
// It has in-build promises so makes handling resolve + reject easier.

// fetch("API ENDPOINT")
// return promise

// fetch("todos/raheel.json")
//   .then((response) => {
//     console.log("resolved", response.json());
//   })
//   .catch((err) => {
//     console.log("rejected", err);
//   });

// ASYNC & AWAIT
const goGetTodos = async () => {
  //returns a promise
  //use fetch api
  const response = await fetch("todos/raheel.json");

  if (response.status !== 200) {
    throw new Error("Cannot fetch the data");
  }

  const data2 = await response.json();
  return data2;
};

//return the data by directly invoking the function
goGetTodos();

//if you save the function in a variable, then you will have to use async/await
const test = goGetTodos();
test.then((data) => console.log(data));
