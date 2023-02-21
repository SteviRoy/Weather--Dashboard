const API_KEY = '29f05369924619c18babdbfc54f190e1';

const searchForm = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const searchBtn = document.querySelector('#search-btn');
const searchHistory = document.querySelector('#search-history');
const currentWeather = document.querySelector('#current-weather');
const forecast = document.querySelector('#forecast');

let searchHistoryArray = JSON.parse(localStorage.getItem('searchHistory')) || [];

// Render search history
function renderSearchHistory() {
  searchHistory.innerHTML = '';
  searchHistoryArray.forEach(city => {
    const item = document.createElement('div');
    item.classList.add('search-history-item');
    item.textContent = city;
    item.addEventListener('click', () => {
      searchCity(city);
    });

    searchHistory.appendChild(item);
});
}


// Search for a city
function searchCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      // Save search to history and update UI
      if (!searchHistoryArray.includes(data.name)) {
        searchHistoryArray.push(data.name);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistoryArray));
        renderSearchHistory();
      }

// Render current weather
currentWeather.innerHTML = `
<div class="current-weather-item">
  <h2>${data.name} (${new Date().toLocaleDateString()})</h2>
  <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
  <p>Temperature: ${data.main.temp} °C</p>
  <p>Humidity: ${data.main.humidity} %</p>
  <p>Wind Speed: ${data.wind.speed} m/s</p>
</div>
`;

// Get coordinates for forecast
const lat = data.coord.lat;
const lon = data.coord.lon;

 // Fetch forecast data
 const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

 fetch(forecastUrl)
   .then(response => response.json())
   .then(data => {
     console.log(data);

     // Render forecast
     forecast.innerHTML = '';
     for (let i = 0; i < data.list.length; i += 8) {
       const item = data.list[i];
       const date = new Date(item.dt_txt).toLocaleDateString();
       const icon = item.weather[0].icon;
       const temp = item.main.temp;
       const humidity = item.main.humidity;
       const wind = item.wind.speed;

       forecast.innerHTML += `
         <div class="forecast-item">
           <h3>${date}</h3>
           <img src="https://openweathermap.org/img/w/${icon}.png" alt="${item.weather[0].description}">
           <p>Temperature: ${temp} °C</p>
           <p>Humidity: ${humidity} %</p>
           <p>Wind Speed: ${wind} m/s</p>
         </div>
       `;
     }
   })
   .catch(error => console.error(error));
})
.catch(error => console.error(error));
}

// Handle form submission