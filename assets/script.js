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
// Save search to history and update UI

// Render current weather
// Render current weather
// Fetch forecast data
// Render forecast
// Handle form submission