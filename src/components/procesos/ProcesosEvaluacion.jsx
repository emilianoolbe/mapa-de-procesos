import React, { useEffect, useState } from "react";
import { Icons } from "../../../public/Icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export const ProcesosEvaluacion = React.memo(({evaluacion, setEvaluacion}) => {
  //Estados
  const [edicion, setEdicion] = useState(0);

  //Efectos
  useEffect(() => {
    handlerEvaluacion();
  }, []);

  //Métodos
  const handlerEvaluacion = () => {
    let procesos = JSON.parse(localStorage.getItem('Proceso de Evaluación'));
    procesos === null && (procesos = []); // Si no al eliminar el localstorage da error de que no existe
    setEvaluacion(procesos);
    return procesos;
  };
  const eliminar = (id) => {
    //Obtengo los procesos
    let proceso = handlerEvaluacion();

    //Filtro todas los procesos con id distinto al que llega
    let procesos = proceso.filter((elemento) => elemento.id !== parseInt(id));

    //Seteo el nuevo estado del componente menos sin el proceso eliminado
    setEvaluacion(procesos);

    //Actualizo el localStorage
    localStorage.setItem("Proceso de Evaluación", JSON.stringify(procesos));
  };

  const editar = (id) => {
    setEdicion(id);
  };

  if (evaluacion !== null && evaluacion.length > 0) {
    return (
      <div className="evaluacion">
        <div className="titulos">
          <h3>Procesos de Evaluación</h3>
        </div>
        <div className="procesos-container">
          {evaluacion.map((proceso) => {
            return (
              <div
                onPointerEnter={() => {
                  editar(proceso.id);
                }}
                className="procesos"
                key={proceso.id}
              >
                <Link to={`${import.meta.env.VITE_URL}/editar/${edicion}`}>
                  {proceso.titulo}
                </Link>

                <div className="iconos">
                  <p
                    onClick={() => {
                      eliminar(proceso.id);
                    }}
                  >
                    <Icons css="icon-trash" icon={faTrashCan} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="evaluacion">
        <div className="titulos">
          <h3>Procesos de Evaluación</h3>
        </div>
      </div>
    );
  }
});
