import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Icons } from '../../../public/Icons'
import { faPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons'


export const ProcesosEstrategicos = React.memo(
  ({estrategicos, setEstrategicos}) => {

    //Estados
    const [edicion, setEdicion] = useState(0);
  
    //Efectos
    useEffect(() => {handlerEstrategicos()}, []);
  
    //Métodos
    const handlerEstrategicos = () => {
  
      let procesos = JSON.parse(localStorage.getItem('Proceso Estratégico'));
      procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
      setEstrategicos(procesos);
      return procesos;
    };
    const eliminar = (id) => {
      //Obtengo los procesos
      let proceso = handlerEstrategicos();
  
      //Filtro todas los procesos con id distinto al que llega 
      let procesos = proceso.filter(elemento =>  elemento.id !== parseInt(id))
   
      //Seteo el nuevo estado del componente menos sin el proceso eliminado
      setEstrategicos(procesos);
   
      //Actualizo el localStorage
      localStorage.setItem('Proceso Estratégico', JSON.stringify(procesos));
    };
  
    const editar = (id) => {
      setEdicion(id);
    };
  
    if (estrategicos !== null && estrategicos.length > 0) {
      return (
        <div className='estrategicos'>
          <Link to={`${import.meta.env.VITE_URL}/crear`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 
          <div className='titulos'>
            <h3>Procesos Estratégicos</h3>
          </div>
          <div className='procesos-container'>
            {
              estrategicos.map(proceso => {
  
                return(
                  
                  <div onPointerEnter={() => {editar(proceso.id)}} className='procesos' key={proceso.id}>
                    <Link  to={`${import.meta.env.VITE_URL}/editar/${edicion}`}>{proceso.titulo}</Link>
                
                    <div className='iconos'>
                      <p onClick={() => {eliminar(proceso.id)}}><Icons  css='icon-trash' icon={faTrashCan}/></p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      );
    }else{
      return (
        <div className='estrategicos'>
          <Link to={`${import.meta.env.VITE_URL}/crear`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 
          <div className='titulos'>
            <h3>Procesos Estratégicos</h3>
  
          </div>
        </div>
      )
    }
  }
);
