var api_key = "f45ebe8eb4e6aec0968bafa6e60740c7";
var forecastContainer = document.querySelector("#forecast-container");
var city = "Mesa";
var $masthead = document.querySelector("#masthead");
var $cityText = document.querySelector("city-text");
var historyContainer = document.querySelector("#cityhistory")
var $mastHead = document.querySelector("#masthead")
var dhistory = JSON.parse(localStorage.getItem("history")) || [];

// Get today's weather function
function getWeather(city) {
  var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
  fetch(currentWeatherUrl)
    .then((data) => data.json())
    .then(function (weather) {
      console.log(weather);

      if (weather.cod === "404") {
        // Display message to user
        alert("City not found");
        return;
      }

      var lat = weather.coord.lat;
      var lon = weather.coord.lon;
      var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;

      fetch(onecallURL)
        .then((data) => data.json())
        .then(function (oneCallData) {
          //   oneCallData has all the information that we need
          console.log(oneCallData);
          var mainCard.classList.add("mainCard")

          // Header
          var cityEl = document.createElement("h2")
          cityEl.textContent = city + new Date().toDateString();
          mainCard.append(cityEl);

          // UV Index
          var uvEl = document.createElement("button");
          var unIndex = oneCallData.current.uvi
          uvEl.textContent = oneCallData.current.uvi
          console.log(typeof oneCallData.current.uvi)
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


function getFiveDay(city) {
  var fiveDayFore = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${api_key}&units=imperial`;

  fetch(fiveDayFore)
    .then((data) => data.json())
    .then(function (oneCallData) {
        //    has all the information that we need
        console.log(oneCallData);
          var fiveDayArray[index] = classList.add("mainCard")

          var cityEl = document.createElement("h2")
          cityEl.textContent = city + new Date().toDateString();
          mainCard.append();
        });
// Degree symbol alt+ 0176


// Date
var dateEl = document.createElement("h2");
dateEl.textContent = currentDay
forecastCard.append(dateEl);

// Icon
var iconEl = document.createElement("img");
iconEl.setAttribute("src", `http://openweather.org/img/wn/${currentDay.weather[0].icon}@2x.png`)
forecastCard.append(iconEl);

// Temperature
var tempEl = document.createElement("p");
tempEl.textContent = `Temp: ${currentDay.main.temp} °F`
forecastCard.append(templEl);

// Humidity
var humidityEl = document.createElement("p");
templEl.textContent = `Temp: ${currentDay.main.humidity} %`
forecastCard.append(humidityEl);


historyContainer.append(forecastCard)
}


historyContainer.addEventListener("click", function(e){
  e.preventDefault();
  if (!e.target.matches("li")) return;
  getWeather(e.target.value);
  getFiveDay(e.target.value);
})

$(".btn").on("click", function (event) {
    //prevent refreshy
    event.preventDefault();
    console.log("submit");
    var city = $("#city-input").val();
    dhistory.pushState(city);
    cityHandle(city);
    console.log(city);
    getWeather(city);
    getFiveDay(city);

  });

  function cityHandle(cityname) {
    // Treat as a catch all for each item in history array
    if (!dhistory.includes(cityname)) {
      dhistory.push(cityname)
    };
    localStorage.setItem("dhistory", JSON.stringify(past));
    // Each item gets a p tag
    // add event listener
    // call getWeather() and buildDashboard using the value of
    // event listener getFiveDay()
    // push into history the most recent search
    // take and store under history
    
  }

  renderIt();
  function renderIt(){
    historyContainer.innerHTML = "";
    for (const city of dhistory) {
      var previousCity = document.createElement("li");
      previousCity.textContent = city;
      historyContainer.append(previousCity);
    }
  }
  



// var container = document.createElement("div");
// var dayof5 = document.createElement("div");
// var blok = document.createElement("p");
// dayof5.textContent = blk.append(date, img, temp, humidity);

// container.append(dayof5);

// return container;