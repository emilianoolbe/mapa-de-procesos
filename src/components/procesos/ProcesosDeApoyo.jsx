import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Icons } from '../../../public/Icons';
import { faTrashCan, faPlus } from '@fortawesome/free-solid-svg-icons';


export const ProcesosDeApoyo = React.memo(({apoyo, setApoyo}) => {

  //Estados
  const [edicion, setEdicion] = useState(0);

  //Efectos
  useEffect(() => {handlerApoyo()}, []);

  //Métodos
  const handlerApoyo = () => {

    let procesos = JSON.parse(localStorage.getItem('Proceso de Apoyo'));
    procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
    setApoyo(procesos);
    return procesos;
  };
  const eliminar = (id) => {
    //Obtengo los procesos
    let proceso = handlerApoyo();

    //Filtro todas los procesos con id distinto al que llega 
    let procesos = proceso.filter(elemento =>  elemento.id !== parseInt(id))
 
    //Seteo el nuevo estado del componente menos sin el proceso eliminado
    setApoyo(procesos);
 
    //Actualizo el localStorage
    localStorage.setItem('Proceso de Apoyo', JSON.stringify(procesos));
  };

  const editar = (id) => {
    setEdicion(id);
  };

  if (apoyo !== null && apoyo.length > 0) {
    return (
      <div className='apoyo'>
          <Link to={`${import.meta.env.VITE_URL}/crear/apoyo`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 

        <div className='titulos'>
          <h3>Procesos Apoyo</h3>
        </div>
        <div className='procesos-container'>
          {
            apoyo.map(proceso => {

              return(

                <div onPointerEnter={() => {editar(proceso.id)}} className={proceso.color && proceso.color == 'Amarillo' ? 'procesos-amarillo' : proceso.color == 'Verde' ? 'procesos-verde' : proceso.color == 'Naranja' ? 'procesos-naranja' : proceso.color == 'Azul' ? 'procesos' : 'procesos'} key={proceso.id}>
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
      <div className='apoyo'>
          <Link to={`${import.meta.env.VITE_URL}/crear/apoyo`}> <Icons css='icon-agregar' icon={faPlus} /></Link> 
        <div className='titulos'>
          <h3>Procesos Apoyo</h3>

        </div>
      </div>
    )
  }
}); 