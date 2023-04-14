import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Crear } from '../components/crud/Crear'
import { Editar } from '../components/crud/Editar'
import { Entrada } from '../components/procesos/Entrada'
import { Salida } from '../components/procesos/Salida'
import { ProcesosDeApoyo } from '../components/procesos/ProcesosDeApoyo'
import { ProcesosEstrategicos } from '../components/procesos/ProcesosEstrategicos'
import { Mapa } from '../components/Mapa'

export const Enrutador = () => {

  //Estados
  const [estrategicos, setEstrategicos] = useState([]);
  const [misionales, setMisionales] = useState([]);
  const [apoyo, setApoyo] = useState([]);
  const [procesoEntrada, setProcesoEntrada] = useState([]);
  const [salida, setSalida] = useState([]);

  return (
    <>
        <BrowserRouter>
            {/* Procesos de entrada */}
            <Entrada procesoEntrada={procesoEntrada} setProcesoEntrada={setProcesoEntrada}/>
            
            {/* Procesos Estratégicos */}
            <ProcesosEstrategicos estrategicos={estrategicos} setEstrategicos={setEstrategicos}/>

            <Routes>
                <Route path={`${import.meta.env.VITE_URL}/`} element= {<Mapa estrategicos={estrategicos} setEstrategicos={setEstrategicos} misionales={misionales} setMisionales={setMisionales} apoyo={apoyo} setApoyo={setApoyo} procesoEntrada={procesoEntrada} setProcesoEntrada= {setProcesoEntrada} salida={salida} setSalida={setSalida} />} />
                
                <Route path={`${import.meta.env.VITE_URL}/crear`} element={<Crear setEstrategicos={setEstrategicos} setMisionales= {setMisionales} setApoyo={setApoyo} setProcesoEntrada= {setProcesoEntrada} setSalida= {setSalida}/>} />

                <Route path={`${import.meta.env.VITE_URL}/editar/:id`} element={<Editar procesoEntrada={procesoEntrada} setProcesoEntrada={setProcesoEntrada} salida= {salida} setSalida= {setSalida} estrategicos={estrategicos} misionales={misionales} apoyo= {apoyo} setEstrategicos={setEstrategicos} setMisionales= {setMisionales} setApoyo={setApoyo}/>} />
            </Routes>

            {/* Procesos de Apoyo */}
            <ProcesosDeApoyo  apoyo= {apoyo} setApoyo={setApoyo} />

            {/* Procesos de salida */}
            <Salida salida={salida} setSalida={setSalida}/>

        </BrowserRouter>
    </>
  )
}
