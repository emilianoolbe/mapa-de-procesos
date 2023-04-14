import React, { useEffect } from 'react'

export const Entrada = ({procesoEntrada, setProcesoEntrada}) => {
  
  //Efectos
  useEffect(() => { handlerEntrada()}, []);

  //Métodos
  const handlerEntrada = () => {

    let procesos = JSON.parse(localStorage.getItem('Entrada'));
    procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
    setProcesoEntrada(procesos);
    return procesos;
  };

  if (procesoEntrada !== null && procesoEntrada.length >= 0) {
    return (
      <div className='entrada'>
        {
          procesoEntrada.map(proceso => {

            return(
              <div className='entrada-salida' key={proceso.id}>
                <p>{proceso.titulo}</p>
              </div>
            )
          })
        }
      </div>
    );
  }else{
    return(

      <div className='entrada'>
        <div className='entrada-salida'>
          Entrada
        </div>
      </div>
    )
  };
};
