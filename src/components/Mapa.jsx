import React from 'react'
import { Entrada } from './procesos/Entrada'
import { ProcesosEstrategicos } from './procesos/ProcesosEstrategicos'
import { ProcesosMisionales } from './procesos/ProcesosMisionales'
import { ProcesosDeApoyo } from './procesos/ProcesosDeApoyo'
import { Salida } from './procesos/Salida'



export const Mapa = ({estrategicos, setEstrategicos, misionales, setMisionales, apoyo, setApoyo, procesoEntrada, setProcesoEntrada, salida, setSalida}) => {
   

  return (
    <>
        {/* Procesos de entrada */}
        <Entrada procesoEntrada={procesoEntrada} setProcesoEntrada={setProcesoEntrada}/>

        {/* Procesos Estratégicos */}
        <ProcesosEstrategicos estrategicos={estrategicos} setEstrategicos={setEstrategicos} />

        {/* Procesos Misionales */}
        <ProcesosMisionales misionales={misionales} setMisionales={setMisionales} />

        {/* Procesos de Apoyo */}
        <ProcesosDeApoyo apoyo={apoyo} setApoyo={setApoyo} />

        {/* Procesos de salida */}
        <Salida salida={salida} setSalida={setSalida} />
    </>
  )
}
