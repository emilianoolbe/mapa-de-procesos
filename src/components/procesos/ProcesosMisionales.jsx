import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../../../public/Icons';
import { faTrashCan, faPlus, faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';

export const ProcesosMisionales = React.memo(({misionales, setMisionales}) => {

  //Estados
  const [edicion, setEdicion] = useState(0);

  //EFectos
  useEffect(() => { handlerMisionales()}, [])
  
  //Métodos
  const handlerMisionales = () => {
    let procesos = JSON.parse(localStorage.getItem('Proceso Misional'));
    procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
    setMisionales(procesos);
    
    return procesos;
  };

  const eliminar = (id) => {
    //Obtengo los procesos 
    let proceso = handlerMisionales();
    
    //Filtro todos los procesos menos el del ID que llega
    let procesos = proceso.filter(elemento => elemento.id !== parseInt(id));

    //Seteo el estado
    setMisionales(procesos);

    //Actualizo el localStorage
    localStorage.setItem('Proceso Misional', JSON.stringify(procesos));
  };

  const editar = (id) => {
    setEdicion(id);
  };

  const moverElemento = (indice, indiceDestino) => {
    // Hacemos una copia del array de misionales
    let misionalesActualizados = [...misionales];
  
    //Capturo el proceso del estado que quiero cambiar
    let proceso = misionalesActualizados[indice];
    
    //Elimino de misionales el proceso
    misionalesActualizados.splice(indice, 1)
  
    //Coloco de nuevo el proceso con Splice en el nuevo índice
    misionalesActualizados.splice(indiceDestino, 0, proceso);
    
    //Actualizo el estado
    setMisionales(misionalesActualizados);
  };
  

  if (misionales !== null && misionales.length > 0) {
    return (
      <div className='misionales'>
          <Link to={`${import.meta.env.VITE_URL}/crear/misional`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 
    
        <div className='titulos'>
          <h3>Procesos Misionales</h3>
        </div>
        <div className='procesos-container'>
          
          {
            misionales.map(proceso => {
              
              return(
                <div onPointerEnter={() => {editar(proceso.id)}} className={proceso.color && proceso.color == 'Amarillo' ? 'procesos-misionales-amarillo' : proceso.color == 'Verde' ? 'procesos-misionales-verde' : proceso.color == 'Naranja' ? 'procesos-misionales-naranja' : proceso.color == 'Azul' ? 'procesos-misionales' : 'procesos-misionales'} key={proceso.id}>
                  <Link  to={`${import.meta.env.VITE_URL}/editar/${edicion}`}>{proceso.titulo}</Link>
              
                  <div className='iconos-misionales'>
                    <p onClick={() => {eliminar(proceso.id)}}><Icons  css='icon-trash-misionales' icon={faTrashCan}/></p>
                    
                  </div>
                  {
                    misionales.length > 1 && misionales.map((proceso, i) => {
                      return(
                        <div className='back-proceso-misionales' key={proceso.id}>
                          <p onClick={() => moverElemento(i, i -1)}>
                            <Icons css='icon-back-misional' icon={faArrowLeftLong} />
                          </p>
                        </div>
                      )
                    })
                  }
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
          <Link to={`${import.meta.env.VITE_URL}/crear/misional`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 

        <div className='titulos'>
          <h3>Procesos Misionales</h3>
        </div>
      </div>
    )
  };
}
);