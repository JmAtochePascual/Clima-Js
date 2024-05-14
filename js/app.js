// Seleccionar elementos del DOM
const formularioElement = document.querySelector('#formulario');
const resultadoElement = document.querySelector('#resultado');
const ciudadInputElement = document.querySelector('#ciudad');
const paisInputElement = document.querySelector('#pais');
const containerElement = document.querySelector('.container');


// Funcion que inicializa la busqueda
const init = (vent) => {
  vent.preventDefault();

  const ciudad = ciudadInputElement.value.trim();
  const pais = paisInputElement.value.trim();

  // Validar formulario
  if (!validarFormulario(ciudad, pais)) {
    mostrarAlerta('Error!', 'Todos los campos son obligatorios', false);
    return
  };

  // Consultar API
  consultarAPI(ciudad, pais);
};


// Validar formulario
const validarFormulario = (ciudad, pais) => [ciudad, pais].includes('') ? false : true;


// Mostrar alerta
const mostrarAlerta = (initMesage, mensaje, tipo = true) => {
  const alerta = document.querySelector('.alerta');

  if (!alerta) {
    const alertaElement = document.createElement('div');
    alertaElement.innerHTML = `<strong class="font-bold">${initMesage}</strong>  <span>${mensaje}</span>`;
    alertaElement.classList.add('px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center', 'alerta');

    tipo ? alertaElement.classList.add('bg-green-100', 'border-green-400', 'text-green-700') : alertaElement.classList.add('bg-red-100', 'border-red-400', 'text-red-700');

    containerElement.appendChild(alertaElement);

    setTimeout(() => {
      alertaElement.remove();
    }, 3000);
  }
};


// Consultar API
const consultarAPI = (ciudad, pais) => {
  const APIKEY = 'bd9f8a2fab2b3fa26d17df27a6ab522e';
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APIKEY}`;

  fetch(URL)
    .then(response => response.json())
    .then(data => {
      if (data.cod === '404') {
        mostrarAlerta('Error!', 'Ciudad no encontrada', false);
        return
      };
    });
};

// Cargar Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});