import React, { useEffect, useState } from 'react'
import { Icons } from '../../../public/Icons';
import { Link } from 'react-router-dom';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';

export const Entrada = React.memo(
  ({procesoEntrada, setProcesoEntrada}) => {

    //Estados
    const [edicion, setEdicion] =  useState(0);
    
    //Efectos
    useEffect(() => { handlerEntrada()}, []);
  
    //Métodos
    const handlerEntrada = () => {
  
      let procesos = JSON.parse(localStorage.getItem('Entrada'));
      procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
      setProcesoEntrada(procesos);
      return procesos;
    };
  
    const eliminar = (id) => {
      //Obtego procesos
      let proceso = handlerEntrada();
  
      //Filtro todos los procesos !== al id que llega
      let procesos = proceso.filter(elemento => elemento.id !== id);
  
      //Seteo el estado
      setProcesoEntrada(procesos);
  
      //Actualizo el localStorage
      localStorage.setItem('Entrada', JSON.stringify(procesos));
    };
  
    const editar = (id) => {setEdicion(id)};
  
    if (procesoEntrada !== null && procesoEntrada.length >= 0) {
      return (
        <div className='entrada'>
          <Link to={`${import.meta.env.VITE_URL}/crear/entrada`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 

          {
            procesoEntrada.map(proceso => {
              return(
                <div onPointerEnter={() => {editar(proceso.id)}} className={proceso.color && proceso.color == 'Amarillo' ? 'entrada-salida-amarillo' : proceso.color == 'Verde' ? 'entrada-salida-verde' : proceso.color == 'Naranja' ? 'entrada-salida-naranja' : proceso.color == 'Azul' ? 'entrada-salida' : 'entrada-salida'} key={proceso.id}>
                    <Link to={`${import.meta.env.VITE_URL}/editar/${edicion}`}>{proceso.titulo}</Link>
                  <p onClick={() => {eliminar(proceso.id)}}><Icons  css='icon-trash-entrada' icon={faTrashCan}/></p>
                </div>
              )
            })
          }
        </div>
      );
    }else{
  
      return(
        <div className='entrada'>
          <Link to={`${import.meta.env.VITE_URL}/crear/entrada`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 

          <div className='entrada-salida'>
            Entrada
          </div>
        </div>
      )
    };
  }
);
