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