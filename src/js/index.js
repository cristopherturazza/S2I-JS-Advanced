import '../css/style.css';
import axios from 'axios';
import './city.js'
import { City } from './city.js';
const _get = require('lodash/get');

// declare some var

const eraseSearchBtn = document.querySelector(".x-icon");
const startSearchBtn = document.querySelector(".search-icon");
const citiesContainer = document.querySelector("#citylist");
const searchBar = document.querySelector("#citysearch");

//Download the list of all cities available in the Teleport API

let citiesList = [];

async function downloadCities () {
  await axios.get(`https://api.teleport.org/api/urban_areas/`)
    .then (response => {
        citiesList = _get(response, "data._links.ua:item", "Download Error")})
    .catch ((error) => alert(error))       
};
downloadCities();

//Show cities in the autocomplete box

function displaySearchCities (cities) {
        const displayOnHTML = cities.map( city => {
            return `<li class="city-list-row">${city.name}</li>`
        }).join('');
    citiesContainer.innerHTML = displayOnHTML;
    }

//Event listener on search bar inputs - generates autocomplete hints

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
eraseSearchBtn.addEventListener('click', (e)=> { return searchBar.value = ''});


// Start search and show the city datas
startSearchBtn.addEventListener('click', (e)=> {  
    let cityUrlSearch = citiesList[citiesList.findIndex( obj => 
        {return obj.name.toLowerCase() === searchBar.value.toLowerCase()})].href;
        const cityToUser = new City (cityUrlSearch);    
        cityToUser.getCityData().then( res => console.log(cityToUser));
        searchBar.value = ''});


        