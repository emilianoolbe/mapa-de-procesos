export const guardadoLocalStorage = (clave, objeto) => {
    
    //Conseguir los elementos que ya tenemos en LocalStorage
    let proceso = JSON.parse(localStorage.getItem(clave));

    //Compruebo si items es un array - si tiene algo?
    if (Array.isArray(proceso)) {
      //Si es array agrego la peli nueva
      proceso.push(objeto)

    }else{
      //Si no es array creo uno con la peli nueva
      proceso = [objeto];
    };
    //Guardado en LocalStorage - *No olvidar el stringify (local solo guarda n° o strings)
    localStorage.setItem(clave, JSON.stringify(proceso));

    return objeto
};
