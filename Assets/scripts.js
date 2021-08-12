// var api_key = "f45ebe8eb4e6aec0968bafa6e60740c7";
var api_key = "431dd6371869dd989989366774b6e8c7";
var forecastContainer = document.querySelector("#foreday5");
var currentDate = moment().format("MMMM Do YYYY");
// Setting the current date and time in the nav bar
var currentDay = document.getElementById("#todayDate");
var city;

// Container Elements
var $masthead = document.querySelector("#masthead");
var $cityText = document.querySelector("#city-text");
var $foreText1 = document.querySelector("#fore1");
var $foreText2 = document.querySelector("#fore2");
var $foreText3 = document.querySelector("#fore3");
var $foreText4 = document.querySelector("#fore4");
var $foreText5 = document.querySelector("#fore5");

// Get a city from an input element

var historyContainer = document.querySelector("#cityhistory");
var srchHistory = JSON.parse(localStorage.getItem("srchHistory")) || [];

var button = document.querySelector("#btn");

button.addEventListener("click", function (e) {
  e.preventDefault();
  var city = document.querySelector("#city-input").value;
  console.log(city);
  getWeather(city);
  // looking through the search history array for the city in case it was already searched for - related to the history search section
  if (srchHistory.indexOf(city) === -1) {
    srchHistory.push(city);
  }
  localStorage.setItem("srchHistory", JSON.stringify(srchHistory));
});

// Get today's weather function
function getWeather(city) {
  var currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);
      getuvIndex(weather.coord.lat, weather.coord.lon);
      if (weather.cod === "404") {
        // Display message to user
        alert("City not found");
        return;
      }

      // var singleCityPull = `https://api.openweathermap.org/data/2.5/onecall?lat=${weather.coord.lat}&lon=${weather.coord.lon}&appid=${api_key}`;

      var singleCityPull = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`;

      fetch(singleCityPull)
        .then((data) => data.json())
        .then(function (singleCityData) {
          // singleCityData has all the information that we need
          console.log(singleCityData);
          var mainCard = document.createElement("div");
          mainCard.classList.add("mainCard");

          // City Name
          var cityEl = document.createElement("h2");
          cityEl.textContent = city + "-" + new Date().toDateString();
          mainCard.append(cityEl);

          // Icon
          console.log(singleCityData);
          var iconEl = document.createElement("img");
          iconEl.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${singleCityData.weather[0].icon}@2x.png`
          );
          mainCard.append(iconEl);

          // Degree symbol alt+ 0176
          // Temperature
          var tempEl = document.createElement("p");
          tempEl.innerHTML = `Temp: ${singleCityData.main.temp} °F`;
          mainCard.append(tempEl);

          // Humidity
          var humidityEl = document.createElement("p");
          humidityEl.innerHTML = `Humidity: ${singleCityData.main.humidity} %`;
          mainCard.append(humidityEl);

          // Wind Speed
          var windEl = document.createElement("p");
          windEl.innerHTML = `Wind Speed: ${singleCityData.wind.speed} mph`;
          mainCard.append(windEl);

          $masthead.innerHTML = "";
          $masthead.append(mainCard);
        });
    });
}

function getuvIndex(lat, lon) {
  var uviPull = `http://api.openweathermap.org/data/2.5/uvi?&lat=${lat}&lon=${lon}&appid=${api_key}`;
  fetch(uviPull)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);

      // UV Index
      var uvEl = document.createElement("button");
      var uvIndex = weather.value;
      uvEl.innerHTML = uvIndex;
      console.log(typeof uvIndex);
      if (uvIndex <= 2) {
        uvEl.classList.add("favourable");
      } else if (uvIndex >= 5) {
        uvEl.classList.add("severe");
      } else {
        uvEl.classList.add("moderate");
      }
      $masthead.append(uvEl);
    });
}

// 5 Day Forecast - div id=foreday5
function getFiveDay(city) {
  var fiveDayForeUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=imperial`;

  fetch(fiveDayForeUrl)
    .then((data) => data.json())
    .then(function (singleCityForeData) {
      //    has all the information that we need
      console.log(singleCityForeData);
      var fiveDayArray = singleCityForeData.list;
      forecastContainer.innerHTML = "";

      for (let i = 4; i < 5; i++) {
        console.log(fiveDayArray[i]);
        var forecastCard = document.createElement("div");
        forecastContainer.classList.add("forecastCard");

        // City + Day
        var dateEl = document.createElement("h2");
        dateEl.textContent = currentDay.dt_slice(0, 10) + "1:00";
        forecastCard.append(dateEl);

        // Icon
        var iconEl = document.createElement("img");
        iconEl.setAttribute(
          "src",
          `https://openweathermap.org/img/wn/${currentDay.weather[0].icon}@2x.png`
        );
        forecastCard.append(iconEl);

        // Degree symbol alt+ 0176
        // Temperature
        var tempEl = document.createElement("p");
        tempEl.textContent = `Temp: ${currentDay.main.temp} °F`;
        forecastCard.append(templEl);

        // Humidity
        var humidityEl = document.createElement("p");
        templEl.textContent = `Humidity: ${currentDay.main.humidity} %`;
        forecastCard.append(humidityEl);

        // UV Index

        historyContainer.append(forecastCard);
      }
    });
}

renderIt();
function renderIt() {
  historyContainer.innerHTML = "";
  for (const city of srchHistory) {
    var previousCity = document.createElement("li");
    previousCity.innerHTML = city;
    historyContainer.append(previousCity);
  }
}
