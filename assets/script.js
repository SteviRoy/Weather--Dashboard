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
// Render forecast
// Handle form submission