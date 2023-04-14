import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Icons } from '../../../public/Icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { guardadoLocalStorage } from '../../helpers/guardadoLocalStorage';

export const Editar = ({setEstrategicos, setMisionales, setApoyo, estrategicos, misionales, apoyo, setProcesoEntrada, setSalida, procesoEntrada, salida}) => {

  //Estados
  const [encontrado, setEncontrado] = useState([]);

  //Efectos 
  useEffect(() => {
    handlerEncontrado();
  }, []);
  
  //Params
  let {id} = useParams();

  //Métodos
  const handlerEncontrado = () => {
    
    let procesoEstrategico = estrategicos.find(proceso => proceso.id === parseInt(id));
    setEncontrado(procesoEstrategico);

    if(!procesoEstrategico){
      
      let procesoMisional = misionales.find(proceso =>  proceso.id === parseInt(id));
      setEncontrado(procesoMisional);
  
      if (!procesoMisional) {

        let procesoApoyo = apoyo.find(proceso =>  proceso.id === parseInt(id));
        setEncontrado(procesoApoyo);
      
        if (!procesoApoyo) {

          let entrada = procesoEntrada.find(proceso => proceso.id === parseInt(id));
          setEncontrado(entrada);
        
          if (!entrada) {

            let procesoSalida = salida.find(proceso => proceso.id === parseInt(id));
            setEncontrado(procesoSalida);
          };
        };
      };
    };
  };

  const handlerEdicion = (e, id, clave) =>{
    e.preventDefault();
    
    //Obtengo los procesos guarado en LocalStorage
    let procesos = JSON.parse(localStorage.getItem(clave));
    procesos === null && (procesos = []);

    //Busco el índice del proceso en LocalStorage
    let indice = procesos.findIndex(elemento => elemento.id === id)

    //Creo un objeto nuevo con el ID y los datos obtenidos por el formulario
    let procesoAEditar = {
      id,
      titulo: e.target.titulo.value,
    };

    //Actualizo el array del LocalStorage en el índice encontrado y le asigno el objeto nuevo
    procesos[indice] = procesoAEditar;

    //Actualizo estados
    if (clave=== 'Proceso Estratégico') {

      setEstrategicos(procesos);

    }else if(clave === 'Proceso Misional'){

      setMisionales(procesos);

    }else if(clave === 'Proceso de Apoyo'){
      setApoyo(procesos);

    }else if (clave === 'Entrada'){
      setProcesoEntrada(procesos);
    }else{
      setSalida(procesos);
    };    
    
    //Guardo el nuevo array en LocalStorage
    localStorage.setItem(clave, JSON.stringify(procesos));  
 
  };
 
  return (
    <div className= 'editar-container'>
      <div className='editar'>
      <Link  to={`${import.meta.env.VITE_URL}/`}> <Icons icon={faXmark} css='icon-xmark'/></Link>

        <form  onSubmit={e => handlerEdicion(e, encontrado.id, encontrado.proceso)}>
       
          <input type="text" name="titulo" defaultValue={encontrado.titulo}/>
          <input type="submit" value="Editar" />
        </form>
      </div>
    </div> 
  )
};
