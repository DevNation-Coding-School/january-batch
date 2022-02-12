// Async

console.log(1);
console.log(2);

setTimeout(() => {
  console.log("Callback Function Fired!");
}, 2000);

console.log(3);
console.log(4);

// HTTP Request Method.

// // 1. Create a request object
// const request = new XMLHttpRequest();
// // create request object, used to send a request to the server

// // 2. Give Argument: Request Method, Request URL
// request.open("GET", "https://jsonplaceholder.typicode.com/todos");
// // This only opens up the request.

// request.send();

// console.log(request.responseText);

// // Track the progress of this request
// // "event listener" + "ready state change"

// request.addEventListener("readystatechange", () => {
//   if (request.readyState === 4 && request.status === 200) {
//     console.log(request.responseText);
//   } else if (request.readyState === 4) {
//     console.log("Could not fetch data");
//   }
// });

const getTodos = (callbackFunction) => {
  const request = new XMLHttpRequest();

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      callbackFunction(undefined, request.responseText);
      //   console.log(request, request.responseText);
    } else if (request.readyState === 4) {
      callbackFunction("Could not fetch", undefined);
      //   console.log("Could not fetch the data");
    }
  });

  request.open("GET", "https://jsonplaceholder.typicode.com/todos");
  request.send();
};

getTodos((error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});
