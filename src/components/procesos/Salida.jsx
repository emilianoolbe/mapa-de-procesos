import React, { useEffect, useState } from 'react'
import { Icons } from '../../../public/Icons';
import { Link } from 'react-router-dom';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const Salida = React.memo(({salida, setSalida}) => {

  //Estados
  const [edicion, setEdicion] = useState(0);

  //Efectos
  useEffect(() => { handlerSalida()}, []);

  //Métodos
  const handlerSalida = () => {

    let procesos = JSON.parse(localStorage.getItem('Salida'));
    procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
    setSalida(procesos);
  };

  const eliminar = (id) => {
    //Obtengo procesos
    let proceso = handlerSalida();

    //Filtro todos los procesos !== al ID que llega
    let procesos = proceso.filter(elemento => elemento.id !== id);

    //Seteo Estado
    setSalida(procesos);

    //Actualizo LocalStorage
    localStorage.setItem('Salida', JSON.stringify(procesos));
  };

  const editar = (id) => {setEdicion(id)};

  if (salida !== null && salida.length >= 0) {
    return (
      <div className='salida'>
        {
          salida.map(proceso => {

            return(
              <div onPointerEnter={() => {editar(proceso.id)}} className='entrada-salida' key={proceso.id}>
                  <Link  to={`${import.meta.env.VITE_URL}/editar/${edicion}`}>{proceso.titulo}</Link>
                <p onClick={() => {eliminar(proceso.id)}}><Icons  css='icon-trash-entrada' icon={faTrashCan}/></p>
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
});
