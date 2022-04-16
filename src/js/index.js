import '../css/style.css';
import axios from 'axios';
import './objects.js'
import { City } from './objects.js';
const _get = require('lodash/get');

// declare some var

let citiesList = [];
let cityUrlSearch = '';
let searchedCity;
const eraseSearchBtn = document.querySelector(".x-icon");
const startSearchBtn = document.querySelector(".search-icon");
const citiesContainer = document.querySelector("#citylist");
const searchBar = document.querySelector("#citysearch");

//async fnc for dowload the searched city by API

async function downloadSearchedCity () {
    await axios.get(cityUrlSearch)
      .then (response => {
          searchedCity = _get(response, "data", "Download Error");
          console.log(searchedCity);
          })
      .catch ((error) => alert(error))       
  };

//async fnc for dowload the cities list by API

async function downloadCities () {
  await axios.get(`https://api.teleport.org/api/urban_areas/`)
    .then (response => {
        citiesList = _get(response, "data._links.ua:item", "Download Error")})
    .catch ((error) => alert(error))       
};

downloadCities();

//show cities on the autocomplete box

function displaySearchCities (cities) {
        const displayOnHTML = cities.map( city => {
            return `<li class="city-list-row">${city.name}</li>`
        }).join('');
    citiesContainer.innerHTML = displayOnHTML;
    }

//event listener on search bar inputs - generates autocomplete hints

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

eraseSearchBtn.addEventListener('click', (e)=> { return searchBar.value = ''});
startSearchBtn.addEventListener('click', (e)=> {  
    cityUrlSearch = citiesList[citiesList.findIndex( obj => 
        {return obj.name.toLowerCase() === searchBar.value.toLowerCase()})].href;
        downloadSearchedCity ();
        searchBar.value = ''});
