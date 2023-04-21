import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Icons } from "../../../public/Icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { guardadoLocalStorage } from "../../helpers/guardadoLocalStorage";


export const CrearEntrada = ({procesoEntrada, setProcesoEntrada, errores, setErrores}) => {

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
    if (procesoEntrada.length < 1) {
      
      setProcesoEntrada((elementos) => {
        return [...elementos, proceso];
      });
        guardadoLocalStorage(proceso.proceso, proceso);
      };
    if (procesoEntrada.length == 1) {
       setErrores('Cantidad máxima de procesos alcanzada');
    };
  };

  if (procesoEntrada.length >= 1) {
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
  }
  return (
    <div className="crear-container">
      <div className="crear">
        <Link to={`${import.meta.env.VITE_URL}/`}>
          {" "}
          <Icons icon={faXmark} css="icon-xmark" />
        </Link>

        <form onSubmit={handlerProcesos}>
          <select name="proceso">
            <option>Entrada</option>
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
}
