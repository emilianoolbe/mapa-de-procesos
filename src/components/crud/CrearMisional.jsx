import React, {useEffect, useState} from 'react'
import { Link, Navigate } from "react-router-dom";
import { Icons } from "../../../public/Icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { guardadoLocalStorage } from "../../helpers/guardadoLocalStorage";

export const CrearMisional = ({misionales, setMisionales, errores, setErrores}) => {
  //Estados 
  const [redireccionar, setRedireccionar] = useState(false);
  //Efectos 
  useEffect(() => {
    setErrores('Cantidad máxima de procesos alcanzada');
  }, []);
  
  //Capturo información del formulario
  const handlerProcesos = (e) => {
    e.preventDefault();

    let proceso = {
      id: Date.now(),
      titulo: e.target.titulo.value,
      color: e.target.color.value,
      proceso: e.target.proceso.value,
    };
  
    //Guardo información en el estado - limito a 5 elementos a guardar
    if (misionales.length < 4) {
      
      setMisionales((elementos) => {
        return [...elementos, proceso];
      });
      //Guardo información en localStorage
      guardadoLocalStorage(proceso.proceso, proceso);
    };
    if (misionales.length <= 4) {
      setErrores('Cantidad máxima de procesos alcanzada');
    };
    setRedireccionar(true)
  };
  if (redireccionar) {
    return <Navigate to={`${import.meta.env.VITE_URL}/`} />;
  };
  if (misionales.length >= 4) {
    return(
      <div className="crear-container">
        <div className="crear">
        <Link to={`${import.meta.env.VITE_URL}/`}>
          {" "}
          <Icons icon={faXmark} css="icon-xmark" />
        </Link>
          <h4 className="errores">{errores}</h4>
        </div>     
      </div>
    )
  };
  return (
    <div className="crear-container">
      <div className="crear">
        <Link to={`${import.meta.env.VITE_URL}/`}>
          {" "}
          <Icons icon={faXmark} css="icon-xmark" />
        </Link>

        <form onSubmit={handlerProcesos}>
          <select name="proceso">
            <option>Proceso Misional</option>
          </select>
          <select name='color'>
              <option>Azul</option>
              <option>Verde</option>
              <option>Amarillo</option>
              <option>Naranja</option>
          </select>

          <input type="text" name="titulo" placeholder="Título" />
          <input type="submit" value="Agregar" />
        </form>
      </div>
    </div>
  );
};
