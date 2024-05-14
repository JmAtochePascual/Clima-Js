// Seleccionar elementos del DOM
const formularioElement = document.querySelector('#formulario');
const resultadoElement = document.querySelector('#resultado');
const ciudadInputElement = document.querySelector('#ciudad');
const paisInputElement = document.querySelector('#pais');
const containerElement = document.querySelector('.container');


// Funcion que inicializa la busqueda
const init = (vent) => {
  vent.preventDefault();

  // Validar formulario

  if (!validarFormulario()) {
    console.log('Todos los campos son obligatorios');
    return
  };

  console.log('Formulario completado');
};


// Validar formulario
const validarFormulario = () => {
  const ciudad = ciudadInputElement.value.trim();
  const pais = paisInputElement.value.trim();

  return [ciudad, pais].includes('') ? false : true;
};

// Cargar Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});