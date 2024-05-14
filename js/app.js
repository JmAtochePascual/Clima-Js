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
    mostrarAlerta('Error!', 'Todos los campos son obligatorios', false);
    return
  };
};


// Validar formulario
const validarFormulario = () => {
  const ciudad = ciudadInputElement.value.trim();
  const pais = paisInputElement.value.trim();

  return [ciudad, pais].includes('') ? false : true;
};


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



// Cargar Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  formularioElement.addEventListener('submit', init);
});