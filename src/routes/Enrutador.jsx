import React, { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Editar } from '../components/crud/Editar'
import { Entrada } from '../components/procesos/Entrada'
import { Salida } from '../components/procesos/Salida'
import { ProcesosEstrategicos } from '../components/procesos/ProcesosEstrategicos'
import { Mapa } from '../components/Mapa'
import { ProcesosEvaluacion } from '../components/procesos/ProcesosEvaluacion'
import { CrearEstrategicos } from '../components/crud/CrearEstrategicos'
import { CrearMisional } from '../components/crud/CrearMisional'
import { CrearApoyo } from '../components/crud/CrearApoyo'
import { CrearEvaluacion } from '../components/crud/CrearEvaluacion'
import { CrearEntrada } from '../components/crud/CrearEntrada'
import { CrearSalida } from '../components/crud/CrearSalida'

export const Enrutador = React.memo(
  () => {

    //Estados
    const [estrategicos, setEstrategicos] = useState([]);
    const [misionales, setMisionales] = useState([]);
    const [apoyo, setApoyo] = useState([]);
    const [procesoEntrada, setProcesoEntrada] = useState([]);
    const [salida, setSalida] = useState([]);
    const [evaluacion, setEvaluacion] = useState([]);
    const [errores, setErrores] = useState('')

    return (
      <>
          <BrowserRouter>
              {/* Procesos de entrada */}
              <Entrada procesoEntrada={procesoEntrada} setProcesoEntrada={setProcesoEntrada}/>
              
              {/* Procesos Estratégicos */}
              <ProcesosEstrategicos estrategicos={estrategicos} setEstrategicos={setEstrategicos}/>
  
              <Routes>
                  <Route path={import.meta.env.VITE_URL} element= {<Mapa evaluacion={evaluacion} setEvaluacion={setEvaluacion} estrategicos={estrategicos} setEstrategicos={setEstrategicos} misionales={misionales} setMisionales={setMisionales} apoyo={apoyo} setApoyo={setApoyo} procesoEntrada={procesoEntrada} setProcesoEntrada= {setProcesoEntrada} salida={salida} setSalida={setSalida} />} />
                  <Route path={`${import.meta.env.VITE_URL}/crear/estrategicos`} element={ <CrearEstrategicos estrategicos={estrategicos} setEstrategicos={setEstrategicos} errores={errores} setErrores={setErrores}/> } />
                  <Route path={`${import.meta.env.VITE_URL}/crear/misional`} element={<CrearMisional setMisionales= {setMisionales} misionales={misionales} errores={errores} setErrores={setErrores} />} />
                  <Route path={`${import.meta.env.VITE_URL}/crear/apoyo`} element={<CrearApoyo setApoyo={setApoyo} apoyo={apoyo} errores={errores} setErrores={setErrores} />} />
                  <Route path={`${import.meta.env.VITE_URL}/crear/evaluacion`} element={<CrearEvaluacion setEvaluacion={setEvaluacion} evaluacion={evaluacion} errores={errores} setErrores={setErrores} />} />
                  <Route path={`${import.meta.env.VITE_URL}/crear/entrada`} element={<CrearEntrada setProcesoEntrada={setProcesoEntrada} procesoEntrada={procesoEntrada} errores={errores} setErrores={setErrores} />} />
                  <Route path={`${import.meta.env.VITE_URL}/crear/salida`} element={<CrearSalida salida={salida} setSalida={setSalida} errores={errores} setErrores={setErrores} />} />

                  <Route path={`${import.meta.env.VITE_URL}/editar/:id`} element={<Editar evaluacion={evaluacion} setEvaluacion={setEvaluacion} procesoEntrada={procesoEntrada} setProcesoEntrada={setProcesoEntrada} salida= {salida} setSalida= {setSalida} estrategicos={estrategicos} misionales={misionales} apoyo= {apoyo} setEstrategicos={setEstrategicos} setMisionales= {setMisionales} setApoyo={setApoyo} errores={errores} setErrores={setErrores}/>} />
              </Routes>
  
              {/* Procesos de Evaluacion */}
              <ProcesosEvaluacion evaluacion={evaluacion} setEvaluacion ={setEvaluacion}/>
  
              {/* Procesos de salida */}
              <Salida salida={salida} setSalida={setSalida}/>
  
          </BrowserRouter>
      </>
    )
  }
)
