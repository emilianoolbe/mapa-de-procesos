export const borradoLocalStorage = (clave, objeto) => {
  
    //Obtengo elementos del LocalStorage
    let procesos = JSON.parse(localStorage.getItem(clave));

    //Todos los elementos !== al objeto con ese ID
    let procesosNuevos = procesos.filter(elemento => elemento.id !== objeto.id);

    //Guardado de nuevo array
    localStorage.setItem(clave, JSON.stringify(procesosNuevos));
};
