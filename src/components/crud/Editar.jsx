import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icons } from '../../../public/Icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { guardadoLocalStorage } from '../../helpers/guardadoLocalStorage';

export const Editar = ({setEstrategicos, setMisionales, setApoyo, estrategicos, misionales, apoyo, setProcesoEntrada, setSalida, procesoEntrada, salida}) => {

  //Estados
  const [encontrado, setEncontrado] = useState([]);
  //Params
  let {id} = useParams();

  //Métodos
  const handlerEdicion = () => {

  };
  let procesoEstrategico = estrategicos.find(proceso =>  proceso.id === parseInt(id));
  let procesoApoyo = apoyo.find(proceso =>  proceso.id === parseInt(id));
  
  
  console.log(procesoEstrategico);
  console.log(procesoApoyo);
  // if(!procesoEstrategico){
  //   let procesoMisional = misionales.find(proceso =>  proceso.id === parseInt(id));
  //   setEncontrado(procesoMisional);

  //   if (!procesoMisional) {
  //     let procesoApoyo = apoyo.find(proceso =>  proceso.id === parseInt(id));
  //     setEncontrado(procesoApoyo);
    

  //     if (!procesoApoyo) {
  //       let entrada = procesoEntrada.find(proceso => proceso.id === parseInt(id));
  //       setEncontrado(entrada);
      
  //       if (!entrada) {
  //         let procesoSalida = salida.find(proceso => proceso.id === parseInt(id));
  //         setEncontrado(procesoSalida);
  //       };
  //     }
  //   };
  // }
    
  
  return (
    <div className= 'editar-container'>
      <div className='editar'>
      <Link  to={`${import.meta.env.VITE_URL}/`}> <Icons icon={faXmark} css='icon-xmark'/></Link>

        <form onSubmit={handlerEdicion}>
          <select name="proceso">
            <option>Entrada</option>
            <option>Proceso Estratégico</option>
            <option>Proceso Misional</option>
            <option>Proceso de Apoyo</option>
            <option>Salida</option>
          </select>

          <input type="text" name="titulo" />
          <input type="submit" value="Editar" />
        </form>
      </div>
    </div> 
  )
}
