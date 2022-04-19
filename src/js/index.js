import '../css/style.css';
import axios from 'axios';
import './city.js'
import { City } from './city.js';
import './showcity.js'
import { ShowCity } from './showcity.js';
const _get = require('lodash/get');

const mainCity = new ShowCity();


//Download the list of all cities available in the Teleport API

let citiesList = [];

(async function downloadCities () {
    await axios.get(`https://api.teleport.org/api/urban_areas/`)
      .then (response => {
          citiesList = _get(response, "data._links.ua:item", "Download Error")})
      .catch ((error) => alert(error))       
  })();
  
//Show cities in the autocomplete box

  const citiesContainer = document.querySelector("#citylist");

function displaySearchCities (cities) {
          const displayOnHTML = cities.map( city => {
              return `<li class="city-list-row">${city.name}</li>`
          }).join('');
      citiesContainer.innerHTML = displayOnHTML;
      }

// SEARCH BAR EVENTS //

//Event listener on search bar inputs - generates autocomplete hints

const searchBar = document.querySelector("#citysearch");

searchBar.addEventListener("keyup", e => {
    const value = e.target.value.toLowerCase();
    const filteredCities = citiesList.filter ( city => {
            return (city.name.toLowerCase().startsWith(value))})
    if (citiesList.length === filteredCities.length){
        filteredCities.length = 0;}
    displaySearchCities (filteredCities);
    let allHints = citiesContainer.querySelectorAll('li');
    for (let i = 0; i<allHints.length; i++){
        allHints[i].addEventListener('click', e => {
            searchBar.value = e.target.textContent;
            filteredCities.length = 0;
            displaySearchCities (filteredCities);
        }) 
    }
});

// Clear the search bar when X is clicked

const eraseSearchBtn = document.querySelector(".x-icon");

eraseSearchBtn.addEventListener('click', (e)=> { return searchBar.value = ''});

// Start search and show the city datas

const startSearchBtn = document.querySelector(".search-icon");

startSearchBtn.addEventListener('click', (e)=> {  
    let cityUrlSearch = citiesList[citiesList.findIndex( obj => 
        {return obj.name.toLowerCase() === searchBar.value.toLowerCase()})].href;
        const cityToUser = new City (cityUrlSearch);    
        cityToUser.getCityData().then( () => {
            mainCity.setMainTitle(cityToUser.cityName.toUpperCase());
            mainCity.setCityBanner(cityToUser.cityImg);
            mainCity.setCityName(cityToUser.cityName, cityToUser.cityNation, cityToUser.cityContinent);
            mainCity.setCitySummary(cityToUser.citySummary);
            mainCity.setCityMayor(cityToUser.cityMayor);
            mainCity.setCityTotalScore(cityToUser.cityTotalScore.toFixed());

        });
        searchBar.value = ''});
      