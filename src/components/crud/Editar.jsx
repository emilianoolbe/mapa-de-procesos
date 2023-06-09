import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Icons } from '../../../public/Icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { guardadoLocalStorage } from '../../helpers/guardadoLocalStorage';
import { borradoLocalStorage } from '../../helpers/borradoLocalStorage';

export const Editar = ({setEstrategicos, setMisionales, setApoyo, estrategicos, misionales, apoyo, setProcesoEntrada, setSalida, procesoEntrada, salida, evaluacion, setEvaluacion, errores, setErrores}) => {

  //Estados
  const [encontrado, setEncontrado] = useState([]);
  const [redireccionar, setRedireccionar] = useState(false);

  //Efectos 
  useEffect(() => {
    handlerEncontrado();
    setErrores('')
  }, []);
  
  //Params
  let {id} = useParams();

  //Métodos

  const handlerEncontrado = () => {
    
    //Primero busco en que estado se encuentra el elemento que me llega por ID
    //Luego de encontrado dicho elemento, lo guardo en un nuevo estado(encontrado)
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

            if (!procesoSalida) {
              let procesoEvaluacion = evaluacion.find(proceso => proceso.id === parseInt(id));
              setEncontrado(procesoEvaluacion);
            };
          };
        };
      };
    };
  };

  const handlerEdicion = (e, id) =>{
    e.preventDefault();
    
    //Obtengo los procesos guardados en LocalStorage
    let procesos = JSON.parse(localStorage.getItem(e.target.proceso.value));
    procesos === null && (procesos = []);

    //Busco el índice del proceso en LocalStorage
    let indice = procesos.findIndex(elemento => elemento.id === id)
    
    //Creo un objeto nuevo con el ID y los datos obtenidos del formulario
    let procesoAEditar = {
      id,
      titulo: e.target.titulo.value,
      proceso: e.target.proceso.value,
      color: e.target.color.value
    };

     //Si índice es === -1 es porque no se encuentra ese ID en el LOcalStorage
     if (indice === -1) {

      setErrores('No se puede editar - límite de procesos alcanzado')
      //Actualizo estados
      if (e.target.proceso.value === 'Proceso Estratégico' && estrategicos.length < 4) {
         
          setEstrategicos(elemento => {return [...elemento, procesoAEditar]});

          //Guardo en localStorage si se cambia de proceso
          guardadoLocalStorage(e.target.proceso.value, procesoAEditar);

          //Elimino del localStorage anterior
          borradoLocalStorage(encontrado.proceso, encontrado);
          setErrores('');
        
      }else if(e.target.proceso.value === 'Proceso Misional' && misionales.length < 4){
         
          setMisionales(elemento => {return [...elemento, procesoAEditar]});

          //Guardo en localStorage si se cambia de proceso
          guardadoLocalStorage(e.target.proceso.value, procesoAEditar);

          //Elimino del localStorage anterior
          borradoLocalStorage(encontrado.proceso, encontrado);
          setErrores('');
          
      }else if(e.target.proceso.value === 'Proceso de Apoyo' && apoyo.length < 4){

        setApoyo(elemento => {return [...elemento, procesoAEditar]});
          
        //Guardo en localStorage si se cambia de proceso
        guardadoLocalStorage(e.target.proceso.value, procesoAEditar);

        //Elimino del localStorage anterior
        borradoLocalStorage(encontrado.proceso, encontrado);
        setErrores('');        

      }else if (e.target.proceso.value === 'Entrada' && procesoEntrada.length < 1){

          setProcesoEntrada(elemento => {return [...elemento, procesoAEditar]});
            
          //Guardo en localStorage si se cambia de proceso
          guardadoLocalStorage(e.target.proceso.value, procesoAEditar);

          //Elimino del localStorage anterior
          borradoLocalStorage(encontrado.proceso, encontrado);
          setErrores('');

      }else if (e.target.proceso.value === 'Proceso de Evaluación' && evaluacion.length < 4){
    
          setEvaluacion(elemento => {return [...elemento, procesoAEditar]});

          //Guardo en localStorage si se cambia de proceso
          guardadoLocalStorage(e.target.proceso.value, procesoAEditar);

          //Elimino del localStorage anterior
          borradoLocalStorage(encontrado.proceso, encontrado);
          setErrores('');

      }else{
        if (salida.length < 1) {
          setSalida(elemento => {return [...elemento, procesoAEditar]});
          
          //Guardo en localStorage si se cambia de proceso
          guardadoLocalStorage(e.target.proceso.value, procesoAEditar);

          //Elimino del localStorage anterior
          borradoLocalStorage(encontrado.proceso, encontrado);
          setErrores('');
        };
      };
      
    }else{
      //SI  indice es !== -1 Actualizo el array del LocalStorage en el índice encontrado y le asigno el objeto nuevo
      procesos[indice] = procesoAEditar;

      //Actualizo estados
      if (e.target.proceso.value === 'Proceso Estratégico') {

        setEstrategicos(procesos);

      }else if(e.target.proceso.value === 'Proceso Misional'){

        setMisionales(procesos);

      }else if(e.target.proceso.value === 'Proceso de Apoyo'){
        setApoyo(procesos);

      }else if (e.target.proceso.value === 'Entrada'){
        setProcesoEntrada(procesos);

      }else if (e.target.proceso.value === 'Proceso de Evaluación'){
        setEvaluacion(procesos);

      }else{
        setSalida(procesos);
      };  

      //Guardo el nuevo array en LocalStorage
      localStorage.setItem(e.target.proceso.value, JSON.stringify(procesos));
      };
    setRedireccionar(true)
  };
  if (redireccionar) {
    return <Navigate to={`${import.meta.env.VITE_URL}/`} />;
  };
    return (
      <div className= 'editar-container'>
        <div className='editar'>
        <Link  to={`${import.meta.env.VITE_URL}/`}> <Icons icon={faXmark} css='icon-xmark'/></Link>
  
          <form  onSubmit={e => handlerEdicion(e, encontrado.id)}>
            
            <input type="text" name="titulo" defaultValue={encontrado.titulo}/> 
  
            <select name="proceso">
              <option >Entrada</option>
              <option >Proceso Estratégico</option>
              <option >Proceso Misional</option>
              <option >Proceso de Apoyo</option>
              <option >Proceso de Evaluación</option>
              <option >Salida</option>
            </select>
  
            <select name='color'>
                <option>Azul</option>
                <option>Verde</option>
                <option>Amarillo</option>
                <option>Naranja</option>
            </select>
            <input type="submit" value="Editar" />
          </form>
        </div>
        <p className="errores-editar">{errores}</p>
      </div> 
    )
  
};
