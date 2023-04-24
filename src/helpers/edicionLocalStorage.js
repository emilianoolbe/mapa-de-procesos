export const edicionLocalStorage = (clave, indice, indiceDestino) => {
  // Hacemos una copia del array de misionales
  let misionales = JSON.parse(localStorage.getItem(clave));

  //Capturo el proceso del estado que quiero cambiar
  let proceso = misionales[indice];

  //Elimino de misionales el proceso
  misionales.splice(indice, 1);

  //Coloco de nuevo el proceso con Splice en el nuevo índice
  misionales.splice(indiceDestino, 0, proceso);

  //Actualizo localStorage
  localStorage.setItem(clave, JSON.stringify(misionales));
};
