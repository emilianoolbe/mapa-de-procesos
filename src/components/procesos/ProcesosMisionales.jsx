import React, {useEffect} from 'react';

export const ProcesosMisionales = ({misionales, setMisionales}) => {

  //EFectos
  useEffect(() => { handlerMisionales()}, [])
  
  //Métodos
  const handlerMisionales = () => {
    let procesos = JSON.parse(localStorage.getItem('Proceso Misional'));
    procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
    setMisionales(procesos);
    return procesos;
  };

  if (misionales !== null && misionales.length > 0) {
    return (
      <div className='misionales'>
        <div className='titulos'>
          <h3>Procesos Misionales</h3>
        </div>
        <div className='procesos-container'>
          {
            misionales.map(proceso => {
              return(
                <div className='procesos' key={proceso.id}>
                  <p>{proceso.titulo}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }else{
    return (

      <div className='misionales'>
        <div className='titulos'>
          <h3>Procesos Misionales</h3>
        </div>
      </div>
    )
  };
};
