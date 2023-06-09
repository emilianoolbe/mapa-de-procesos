import React, { useEffect, useState } from 'react'
import { Icons } from '../../../public/Icons';
import { Link } from 'react-router-dom';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';

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
    return procesos
  };

  const eliminar = (id) => {
    //Obtengo procesos
    let proceso = handlerSalida();

    //Filtro todos los procesos !== al ID que llega
    console.log(id);
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
          <Link to={`${import.meta.env.VITE_URL}/crear/salida`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 

        {
          salida.map(proceso => {

            return(
              <div onPointerEnter={() => {editar(proceso.id)}} className={proceso.color && proceso.color == 'Amarillo' ? 'entrada-salida-amarillo' : proceso.color == 'Verde' ? 'entrada-salida-verde' : proceso.color == 'Naranja' ? 'entrada-salida-naranja' : proceso.color == 'Azul' ? 'entrada-salida' : 'entrada-salida'} key={proceso.id}>
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
          <Link to={`${import.meta.env.VITE_URL}/crear/salida`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 

        <div className='entrada-salida'>
          Salida
        </div>
      </div>
    )
  };
});
