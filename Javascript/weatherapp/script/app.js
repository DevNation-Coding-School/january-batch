// DOM Manipulation
const cityForm = document.querySelector("form");
const time = document.querySelector("img.time");

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails[0].Key);
  return {
    cityDetails,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => {
      throw new Error("Please enter the correct city name");
      alert("Please enter the correct city name");
    });

  // city => add to the local storage
  localStorage.setItem("city", city);
});

// Update the UI
const card = document.querySelector(".card");
const details = document.querySelector(".details");

const updateUI = (data) => {
  const { cityDetails, weather } = data;
  details.innerHTML = `
  <h5 class="my-5">${cityDetails[0].EnglishName}</h5>
          <div class="my-3">${weather.WeatherText}</div>
          <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
          </div>`;

  let timeSource = null;

  if (weather.IsDayTime) {
    timeSource = "img/day.jpeg";
  } else {
    timeSource = "img/night.jpeg";
  }

  time.setAttribute("src", timeSource);

  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// Refresh and check Local Storage

if (localStorage.getItem("city")) {
  updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}
