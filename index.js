const apiLink = 'https://api.openweathermap.org/data/2.5/weather?APPID=6fd65ebdbabf5858e804ce69f0f04db6&q='
let currentLocation = 'seattle';
let currentTemp;
let tempScale = 'f';

const locationForm = document.getElementById('locationForm');
locationForm.addEventListener('submit', updateLocation);

const toggleTempButton = document.getElementById('tempScale');
toggleTempButton.addEventListener('click', toggleTemp);

async function getWeather(location) {
    console.log(location);
    const toFetch = apiLink + location;
    const response = await fetch(toFetch, { mode: "cors" });
    const responseData = await response.json();
    return responseData;
}

function calcTemp(temp) {
    if (tempScale == 'f') return Math.round((9 / 5 * temp - 459.67));
    if (tempScale == 'c') {
        let c = temp - 273.15;
        // return Math.round((c + Number.EPSILON) * 10) / 10; // use for decimals
        return Math.round(c);
    }
}

async function showWeather() {
    const cityDiv = document.getElementById('cityName');
    const searchKey = document.getElementById('searchKey');
    const weatherDiv = document.getElementById('currentWeather');
    const tempDiv = document.getElementById('currentTemp');
    const icon = document.getElementById('icon');

    let weatherData = await getWeather(currentLocation);

   if (weatherData.name) {
      //  cityDiv.textContent = weatherData.name;
        searchKey.value = '';
        searchKey.placeholder = weatherData.name;
        weatherDiv.textContent = weatherData.weather[0].description;
        currentTemp = weatherData.main.temp; 
        tempDiv.textContent = calcTemp(currentTemp) + "°";
        icon.src = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`

        //update background color
        backgroundColor(weatherData.weather[0].main)
    }
    else alert('Invalid Location');
    
}

function backgroundColor(weather) {
    const weatherContainer = document.getElementById('weatherContainer');
    weatherContainer.classList.remove('cloudy');
    weatherContainer.classList.remove('sunny');
    weatherContainer.classList.remove('rainy');
    weatherContainer.classList.remove('snowy');
    switch (weather) {
        case ('Clouds'): weatherContainer.classList.add('cloudy');
        break;
        case ('Clear'): weatherContainer.classList.add('sunny');
        break;
        case ('Rain'): weatherContainer.classList.add('rainy');
        break;

        default: weatherContainer.classList.add('snowy');
    }
}


function updateLocation(event) {
    event.preventDefault();
    let searchKey = document.getElementById('searchKey').value;
    currentLocation = searchKey;
    showWeather();
}

// function toggleTempScale(){
//     const tempDiv = document.getElementById('currentTemp');
//     tempDiv.textContent = currentTemp  + "°";


// }

function toggleTemp() {
    if (tempScale == 'c') tempScale = 'f';
    else tempScale = 'c';

    const tempDiv = document.getElementById('currentTemp');
    tempDiv.textContent = calcTemp(currentTemp)  + "°";

    const tempScaleButton = document.getElementById('tempScale');
    tempScaleButton.textContent = tempScale.toUpperCase();
    
}

showWeather();


