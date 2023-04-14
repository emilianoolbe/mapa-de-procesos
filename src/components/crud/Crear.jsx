import React from 'react';
import { Link } from 'react-router-dom';
import { Icons } from '../../../public/Icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { guardadoLocalStorage } from '../../helpers/guardadoLocalStorage';

export const Crear = ({setEstrategicos, setMisionales, setApoyo, setProcesoEntrada, setSalida}) => {

  //Capturo información del formulario
  const handlerProcesos = e => {
    e.preventDefault();

    let proceso = {
      id: Date.now(),
      titulo: e.target.titulo.value,
      proceso: e.target.proceso.value
    };
    
    //Guardo información en el estado
    if (proceso.proceso === 'Proceso Estratégico') {

      setEstrategicos(elementos => {
        return [...elementos, proceso]
      });

    }else if(proceso.proceso === 'Proceso Misional'){

      setMisionales(elementos => {
        return [...elementos, proceso]
      });

    }else if(proceso.proceso === 'Proceso de Apoyo'){
      setApoyo(elementos => {
        return [...elementos, proceso]
      });

    }else if (proceso.proceso === 'Entrada'){
      setProcesoEntrada(elementos => {
        return [...elementos, proceso]
      });
    }else{
      setSalida(elementos => {
        return [...elementos, proceso]
      });
    };    
     //Guardo información en localStorage
     guardadoLocalStorage(proceso.proceso, proceso);
  };

  return (
    <div className= 'crear-container'>
      <div className='crear'>
      <Link  to={`${import.meta.env.VITE_URL}/`}> <Icons icon={faXmark} css='icon-xmark'/></Link>

        <form onSubmit={handlerProcesos}>
          <select name="proceso">
            <option>Entrada</option>
            <option>Proceso Estratégico</option>
            <option>Proceso Misional</option>
            <option>Proceso de Apoyo</option>
            <option>Salida</option>
          </select>

          <input type="text" name="titulo" placeholder='Título'/>
          <input type="submit" value="Agregar" />
        </form>
      </div>
    </div> 
  )
};
