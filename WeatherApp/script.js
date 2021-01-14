let LSKey = 'cities';
let opwApiKey = "50d53005c0fd5f556bb4ef15224c4209";
let citiesInLocalStorageArr = [];
let actualCitiesDataFromApiArr = [];
let citiesSection= document.getElementById('cityInfo');
let citiesButton= document.getElementById('cityAdd');
document.addEventListener('DOMContentLoaded', renderWeatherInfoFromLS);
citiesButton.addEventListener('click', getCityInfoFromInput);

function createHTMLObj(weatherObj, cityTakenFromArchive){
  let citySection = document.createElement('section');
  let cityHeader = document.createElement('div');
  let cityName = document.createElement('h2');
  cityName.innerHTML = weatherObj.name;
  let cityInfos = document.createElement('ul');
  let temperature = document.createElement('li');
  temperature.innerHTML = `Temperatura: ${weatherObj.temp} &#8451;`;
  let pressure = document.createElement('li');
  pressure.innerHTML = `Ciśnienie: ${weatherObj.pressure} hPa`;
  let humidity = document.createElement('li');
  humidity.innerHTML = `Wilgotność: ${weatherObj.humidity}%`;
  let iconUrl = `http://openweathermap.org/img/wn/${weatherObj.icon}@2x.png`;
  let icon = new Image();
  icon.src = iconUrl;
  let removeBtn = document.createElement('div');
  removeBtn.classList.add('removeButton');
  let button = document.createElement('button');
  button.classList.add('delete');
  button.textContent='Usuń Miasto';
  removeBtn.appendChild(button);
  removeBtn.addEventListener('click', (e)=>removeCityBtn(e));
  cityInfos.appendChild(temperature);
  cityInfos.appendChild(pressure);
  cityInfos.appendChild(humidity);
  cityHeader.appendChild(cityName);
  cityHeader.appendChild(icon);
  citySection.appendChild(cityHeader);
  citySection.appendChild(cityInfos);
  citySection.appendChild(removeBtn);
  citySection.classList.add('citySection');
  cityHeader.classList.add('cityHeader');
  if(cityTakenFromArchive){
      citySection.classList.add('outdatedInfo');
      let warning = document.createElement('div');
      warning.innerHTML = 'Outdated';
      warning.classList.add('warningInfo');
      citySection.appendChild(warning);
  }
  citiesSection.appendChild(citySection);
}

function getCityInfoFromInput(){
  let inputCityName = document.getElementById('cityName');
  let nameValue = inputCityName.value;
  if(nameValue !== '' && checkIfCityAlreadyExist(nameValue)){
      checkIfCityIsSupportedByApi(nameValue);
  }
  inputCityName.value = '';
}

function checkIfCityIsSupportedByApi(cityName){
  getCityWeatherDataFromApi(cityName)
      .then(()=>synchronizeCitiesInfo())
      .then(()=>reload())
      .catch(e => console.log(e));
}

function synchronizeCitiesInfo(){
  citiesInLocalStorageArr.length = 0;
  actualCitiesDataFromApiArr.map(city => citiesInLocalStorageArr.push(city));
}

function checkIfCityAlreadyExist(cityName){
  let inputNameTrimmed = cityName.trim();
  let inputNameFormatted = inputNameTrimmed.charAt(0).toUpperCase() + inputNameTrimmed.slice(1).toLowerCase();
  if(actualCitiesDataFromApiArr.some(city => city.name === inputNameFormatted))
      return false;
  return true;
}

function synchronizeLS(){
  localStorage.setItem(LSKey, JSON.stringify(citiesInLocalStorageArr));
}

function renderWeatherInfoFromLS(){
  if(getCitiesFromLS()){
      let cityNamesFromLocalStorageArr = citiesInLocalStorageArr.map(c=>c.name);
      Promise.allSettled(cityNamesFromLocalStorageArr.map(getCityWeatherDataFromApi))
          .then(()=>actualCitiesDataFromApiArr.sort(citiesSort))
          .then(()=>addWeatherInfoToHtml())
          .then(()=> checkIfDataReloadWasComplete())
          .catch(e=>console.log(e));
  }
}

function getCityWeatherDataFromApi(cityName){
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${opwApiKey}&units=metric`;
  return fetch(apiUrl)
      .then(resp => tryToParseResponse(resp))
      .then(weather => createWeatherObj(weather))
      .then(weatherObj => actualCitiesDataFromApiArr.push(weatherObj))
      .catch(e => console.log(e));
}

function checkIfDataReloadWasComplete(){
  for(let city of citiesInLocalStorageArr){
      let archivedCityName = city.name;
      if(!actualCitiesDataFromApiArr.some(cityActualData => cityActualData.name === archivedCityName)){
          let cityTakenFromArchive = true;
          createHTMLObj(city,cityTakenFromArchive);
      }
  }
}

function addWeatherInfoToHtml(){
  let cityTakenFromArchive = false;
  for(let city of actualCitiesDataFromApiArr)
      createHTMLObj(city, cityTakenFromArchive);
}



function createWeatherObj(weather){
  let {name, main:{temp : temp, feels_like : feels_like, pressure : pressure, humidity : humidity}} = weather;
  let icon = weather.weather[0].icon;
  let weatherObj = {name : name, temp : temp, feelsLiketemp : feels_like, pressure : pressure, humidity : humidity, icon : icon};
  return weatherObj;
}

function removeCityBtn(event){
  const icon = event.target;
  const mainCitySection = icon.parentNode.parentNode;
  const cityName = findCityNameToRemoveByBtnClick(mainCitySection);
  removeCityFromCityObjectsList(cityName);
  const parent = mainCitySection.parentNode;
  parent.removeChild(mainCitySection);
  reload();
}

function tryToParseResponse(resp){
  if(resp.ok)
      return resp.json();
  else
      return Promise.reject('failed to parse response');
}

function removeCityFromCityObjectsList(cityName){
  let index = citiesInLocalStorageArr.findIndex(c => c.name === cityName);
  citiesInLocalStorageArr.splice(index,1);
}

function findCityNameToRemoveByBtnClick(citySection){
  return citySection.childNodes[0].childNodes[0].childNodes[0].innerHTML;
}

function getCitiesFromLS(){
  if(localStorage.getItem(LSKey) !== null){
      let citiesFromLS = JSON.parse(localStorage.getItem(LSKey));
      for(let city of citiesFromLS){
          citiesInLocalStorageArr.push(city);
      }
      return true;
  }
  return false;
}

function citiesSort(a, b){
  if(a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
}

function reload(){
  synchronizeLS();
  citiesInLocalStorageArr.length = 0;
  actualCitiesDataFromApiArr.length = 0;
  citiesSection.innerHTML = '';
  renderWeatherInfoFromLS();
}


setInterval(() => {
  reload();
}, 1000*300);