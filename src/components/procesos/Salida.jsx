import React, { useEffect } from 'react'

export const Salida = ({salida, setSalida}) => {

  //Efectos
  useEffect(() => { handlerSalida()}, []);

  //Métodos
  const handlerSalida = () => {

    let procesos = JSON.parse(localStorage.getItem('Salida'));
    procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
    setSalida(procesos);
  };

  if (salida !== null && salida.length >= 0) {
    return (
      <div className='salida'>
        {
          salida.map(proceso => {

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
      <div className='salida'>
        <div className='entrada-salida'>
          Salida
        </div>
      </div>
    )
  };
}
