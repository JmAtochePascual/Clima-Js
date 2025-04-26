const formElement = document.querySelector('#formulario');
const resultElement = document.querySelector('#resultado');
const cityInputElement = document.querySelector('#ciudad');
const countryInputELement = document.querySelector('#pais');
const containerElement = document.querySelector('.container');

const startApp = async (event) => {
  event.preventDefault();

  const city = cityInputElement.value.trim();
  const country = countryInputELement.value.trim();

  if ([city, country].includes('')) {
    showAlert('Error!', 'Todos los campos son obligatorios', false);
    return;
  };

  const wheather = await getWeather(city, country);

  showWeather(wheather);

  formElement.reset();
  cityInputElement.focus();
};

const showAlert = (tag, message, type = true) => {
  const hasAlert = document.querySelector('.alerta');

  if (hasAlert) return;

  const alertElement = document.createElement('div');
  alertElement.innerHTML = `<strong class="font-bold">${tag}</strong>  <span>${message}</span>`;
  alertElement.classList.add('px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');

  type ? alertElement.classList.add('bg-green-100', 'border-green-400', 'text-green-700') : alertElement.classList.add('bg-red-100', 'border-red-400', 'text-red-700');

  containerElement.appendChild(alertElement);

  setTimeout(() => {
    alertElement.remove();
  }, 3000);
};


const getWeather = async (ciudad, pais) => {
  const APIKEY = 'bd9f8a2fab2b3fa26d17df27a6ab522e';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIKEY}`;

  showSpinner();

  try {
    const response = await fetch(URL);
    const weather = await response.json();

    if (weather.cod === '404') {
      cleanHTML();
      showAlert('Error!', 'Ciudad no encontrada', false);
      return;
    };

    return weather;

  } catch (error) {
    console.error(error, "Error en la consulta de la API");
  };
};


const showWeather = (weather) => {
  cleanHTML();

  const { name, main: { temp, temp_max, temp_min } } = weather;
  const centigrados = kelvinACentigrados(temp);
  const max = kelvinACentigrados(temp_max);
  const min = kelvinACentigrados(temp_min);

  const weatherElement = document.createElement('div');
  weatherElement.classList.add('text-center', 'text-white');
  weatherElement.innerHTML = `
    <p class="font-bold text-2xl">Clima en: ${name}</p>
    <p class="font-bold text-6xl">${centigrados} &#8451;</p>
    <p class="font-bold">Max: ${max} &#8451;</p>
    <p class="font-bold">Min: ${min} &#8451;</p>
  `;

  resultElement.appendChild(weatherElement);
};


const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

const cleanHTML = () => {
  while (resultElement.firstChild) {
    resultElement.removeChild(resultElement.firstChild);
  };
};

const showSpinner = () => {
  cleanHTML();

  const spinnerElement = document.createElement('div');
  spinnerElement.classList.add('sk-fading-circle');

  spinnerElement.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;

  resultElement.appendChild(spinnerElement);
};

document.addEventListener('DOMContentLoaded', () => {
  formElement.addEventListener('submit', startApp);
});