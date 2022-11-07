var cities = [];

var searchEl = document.querySelector("#searchArea");
var inputEl = document.querySelector("#searchInput");
var historyEl = document.querySelector("#searchhistory");

var todayEl = document.querySelector("#todaydata");
var todayDataEl = document.querySelector("#daydata");
var fiveEl = document.querySelector("#forecastdata");

//Get API Key
//Search button, Connect Data
//Categories: moment/dates, temp, humid, wind, icon -> appendchild
//Save storage curr/past
//Button for search history - addeventlistener
//CSS classlist.add

//API Keys
// ${city}
// units/imperial get right#
// Json to get data
// Geolocation Coordinates?
var weatherData = function (city) {
  var apiKey = "f6110874b6fbeed675c8458f6fb78535";
  var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      todayWeather(data, city);
    });
  });
};
//Coordinates?
// Get 5 Day Data, coordinates vs ${city}
var fiveApi = function (city) {
  let apiKey = "f6110874b6fbeed675c8458f6fb78535";
  let apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;

  fetch(apiURL).then(function (response) {
    response.json().then(function (data) {
      showFive(data);
    });
  });
};

//Today's weather AREA
//template  vs  append
//moment for date
//icon data, setattribute
//append to page

var todayWeather = function (weather, cities) {
  todayEl.textContent = "";
  todayDataEl.textContent = cities;

  var currentDay = document.createElement("div");
  currentDay.textContent =
    " (" + moment(weather.dt.value).format("dddd, L") + ") ";
  todayDataEl.appendChild(currentDay);

  var currentTemp = document.createElement("div");
  currentTemp.textContent = "Temperature = " + weather.main.temp + " °F";
  todayEl.appendChild(currentTemp);

  var currentHumid = document.createElement("div");
  currentHumid.textContent = "Humidity = " + weather.main.humidity + " %";
  todayEl.appendChild(currentHumid);

  var windSpeed = document.createElement("div");
  windSpeed.textContent = "Wind Speed = " + weather.wind.speed + " MPH";
  todayEl.appendChild(windSpeed);

  var weatherIcon = document.createElement("img");
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`
  );
  todayDataEl.appendChild(weatherIcon);
};

//5 Day Area
//make list with forloop
// add numbers to I to get 5
//template  vs  append
//moment for date
//icon data, setattribute
//append to page
var showFive = function (weather) {
  fiveEl.textContent = "";

  var forecast = weather.list;
  for (var i = 5; i < forecast.length; i = i + 8) {
    var dailyForecast = forecast[i];

    var fiveForecast = document.createElement("div");
    fiveForecast.classList.add("cityCell");

    var fiveDay = document.createElement("h2");
    fiveDay.textContent = moment.unix(dailyForecast.dt).format("dddd, L");
    fiveForecast.appendChild(fiveDay);

    var weatherIcon = document.createElement("img");
    weatherIcon.setAttribute(
      "src",
      `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`
    );
    fiveForecast.appendChild(weatherIcon);
    var forecastHumEl = document.createElement("div");
    forecastHumEl.textContent =
      "Humidity = " + dailyForecast.main.humidity + "  %";
    fiveForecast.appendChild(forecastHumEl);

    var windSpeed = document.createElement("div");
    windSpeed.textContent =
      "Wind Speed = " + dailyForecast.wind.speed + " MPH";
    fiveForecast.appendChild(windSpeed);

    var fiveTempEl = document.createElement("div");
    fiveTempEl.textContent =
      "Temperature = " + dailyForecast.main.temp + " °F";
    fiveForecast.appendChild(fiveTempEl);

    fiveEl.appendChild(fiveForecast);
  }
};
// button
var searchBtn = function (event) {
  event.preventDefault();
  var city = inputEl.value.trim();
  if (city) {
    weatherData(city);
    fiveApi(city);
  }
  searchLog();
  pastLog(city);
};
// save
var searchLog = function () {
  localStorage.setItem("cities", JSON.stringify(cities));
  console.log(cities);
};
// history log
//add class for css
//add function to go to past search
// button sends to history city
var pastLog = function (pastLog) {
  pastLogEl = document.createElement("button");
  pastLogEl.textContent = pastLog;
  pastLogEl.setAttribute("data", pastLog);
  pastLogEl.classList.add("historyItem");
  historyEl.prepend(pastLogEl);
};
var clickHistory = function (event) {
  var pastCity = event.target.getAttribute("data");
  if (pastCity) {
    weatherData(pastCity);
    fiveApi(pastCity);
  }
};
searchEl.addEventListener("submit", searchBtn);
historyEl.addEventListener("click", clickHistory);
