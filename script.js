function dateTime() {
  let dateElement = document.querySelector("#currentDateTime");
  let items = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  let currentDateTime = new Date().toLocaleString("en-US", items);
  dateElement.innerHTML = currentDateTime;
}

dateTime();

setInterval(dateTime, 60000);
// // //

let apiKey = "9fb4b1ec478c718ebf8daf5d8d38e4b9";

function showTemp(response) {
  console.log(response.data);

  let h2 = document.querySelector("#city");
  h2.innerHTML = response.data.name;

  let temperature = document.querySelector("#temp");
  let roundedTemp = Math.round(response.data.main.temp) + "℃";
  temperature.innerHTML = roundedTemp;

  let hmdty = document.querySelector("#humidity");
  hmdty.innerHTML = response.data.main.humidity + "%";

  let speed = document.querySelector("#wind");
  speed.innerHTML = response.data.wind.speed + "km/h";

  let descript = document.querySelector("#description");
  descript.innerHTML = response.data.weather[0].main;
}
function weatherInfo(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(`${apiUrl}`).then(showTemp);
}
function cityInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  weatherInfo(city);
}
function byLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(byLocation);
}

let citySearch = document.querySelector("#citySearchForm");
citySearch.addEventListener("click", cityInfo);

let currentLocation = document.querySelector("#current-button");
currentLocation.addEventListener("click", getCurrentLocation);

weatherInfo("Gaborone");
