var api_key = "f45ebe8eb4e6aec0968bafa6e60740c7";
var forecastContainer = document.querySelector("#foreday5");
var city = "";

// Container Elements
var $masthead = document.querySelector("#masthead");
var $cityText = document.querySelector("#city-text");
// Setting the current date and time in the nav bar
var date = moment().format("MMMM Do YYYY, HH:mm");
var $currentDay = document.getElementById("#todayDate");

// Get a city from an input element
var city = document.querySelector("#city-input");

var historyContainer = document.querySelector("#cityhistory");
var srchHistory = JSON.parse(localStorage.getItem("srchHistory")) || [];

var citySrch=[];
// looking through the search history array for the city in case it was already searched for - related to the history search section
function find(cty){
  for (var i=0; i<citySrch.length; i++){
    if(cty.textValue === ctySrch[i]){
      return -1;
    }
  }
  return 1;
}

// Get today's weather function
function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=imperial`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);

      if (weather.cod === "404") {
        // Display message to user
        alert("City not found");
        return;
      }

      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;

      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (oneCallData) {
          // oneCallData has all the information that we need
          console.log(oneCallData);
          var mainCard = document.createElement("div");
          mainCard.classList.add("mainCard");

          // City Name
          var cityEl = document.createElement("h2")
          cityEl.textContent = city + new "-" + new Date().toDateString();
          mainCard.append(cityEl);
          

          // UV Index
          var uvEl = document.createElement("button");
          var uvIndex = oneCallData.current.uvi;
          uvEl.textContent = oneCallData.current.uvi;
          console.log(typeof oneCallData.current.uvi);
          if (uvIndex<=2){
            uvEl.classList.add("favourable");
          }
          else if (uvIndex>=5){
            uvEl.classList.add("severe");
          }
          else {
            uvEl.classList.add("moderate");
        }
          mainCard.append(uvEl);

          $mastHead.innerHTML = "";
          $mastHead.append(mainCard);

        });
    });
  }

  // 5 Day Forecast - div id=foreday5
function getFiveDay(city) {
  var fiveDayFore = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=imperial`;

  fetch(fiveDayFore)
    .then((data) => data.json())
    .then(function (oneCallData) {
        //    has all the information that we need
        console.log(oneCallData);
          var fiveDayArray = oneCallData.list;
          forecastContainer.innerHTML = "";

          for (let i = 4; i < 5; i++) {
            console.log(fiveDayArray[i]);
            var forecastCard = document.createElement("div");
            forecastContainer.classList.add("forecastCard");
          
            // City + Day
            var dateEl = document.createElement("h2");
            dateEl.textContent = currentDay.dt_slice(0, 10)+ "1:00";
            forecastCard.append(dateEl);
          
          
           // Icon
            var iconEl = document.createElement("img");
            iconEl.setAttribute("src", `http://openweather.org/img/wn/${currentDay.weather[0].icon}@2x.png`)
            forecastCard.append(iconEl);
          
            // Degree symbol alt+ 0176
            // Temperature
            var tempEl = document.createElement("p");
            tempEl.textContent = `Temp: ${currentDay.main.temp} °F`
            forecastCard.append(templEl);
          
            // Humidity
            var humidityEl = document.createElement("p");
            templEl.textContent = `Humidity: ${currentDay.main.humidity} %`
            forecastCard.append(humidityEl);
          
            // UV Index
          
            historyContainer.append(forecastCard)
          }
    });
}

renderIt();
function renderIt(){
  historyContainer.innerHTML = "";
  for (const city of srchHistory) {
    var previousCity = document.createElement("li");
    srchHistory.textContent = city;
    historyContainer.append(previousCity);
  }
}