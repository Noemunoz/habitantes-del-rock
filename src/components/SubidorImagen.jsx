"use client";

import React, { useState } from 'react';

const SubidorImagen = ({ onImagenSubida, imagenActual, onImagenEliminada, carpeta = "portadas", titulo = "Subir Foto de Portada" }) => {
  const [progreso, setProgreso] = useState(0);
  const [subiendo, setSubiendo] = useState(false);

  const manejarSubida = async (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;
    setSubiendo(true);

    // ====================================================================
    // SIMULACIÓN DE CARGA LOCAL (Borra esto cuando actives Firebase)
    // ====================================================================
    let progresoSimulado = 0;
    const intervalo = setInterval(() => {
      progresoSimulado += 20;
      setProgreso(progresoSimulado);
      if (progresoSimulado >= 100) {
        clearInterval(intervalo);
        setSubiendo(false);
        setProgreso(0);
        onImagenSubida(URL.createObjectURL(archivo)); 
      }
    }, 400);
  };

  return (
    <div className="w-full bg-[#16161a] border-2 border-dashed border-gray-700 rounded-xl p-4 text-center hover:border-red-500 transition-colors relative mb-6">
      <div className="absolute -top-3 left-4 bg-[#0a0a0c] px-2 text-[10px] font-black text-red-500 uppercase tracking-widest">
        Portada Principal (Obligatorio)
      </div>

      {imagenActual ? (
        <div className="relative group rounded-lg overflow-hidden border border-gray-800 bg-[#0f0f12] aspect-video md:aspect-[21/9] flex items-center justify-center shadow-inner mt-2">
          <img 
            src={imagenActual} 
            alt="Vista previa de portada" 
            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300" 
          />
          <button 
            type="button"
            onClick={onImagenEliminada}
            className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-black text-xl shadow-2xl transition-transform hover:scale-110 border-2 border-red-900"
            title="Eliminar portada"
          >
            ✕
          </button>
          <div className="absolute bottom-0 left-0 w-full bg-black/70 text-gray-300 text-[10px] uppercase tracking-widest py-2 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
            Portada Actual (Haz clic en la X para cambiar)
          </div>
        </div>
      ) : (
        subiendo ? (
          <div className="flex flex-col items-center justify-center h-40">
            <div className="text-gray-300 font-bold mb-3 uppercase tracking-widest text-sm animate-pulse">
              Subiendo Archivo... {progreso}%
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 max-w-[300px] shadow-inner overflow-hidden border border-gray-700">
              <div className="bg-red-600 h-full transition-all duration-300 ease-out" style={{ width: `${progreso}%` }}></div>
            </div>
          </div>
        ) : (
          <label className="cursor-pointer flex flex-col items-center justify-center h-40 group mt-2">
            <svg className="w-12 h-12 text-gray-600 mb-3 group-hover:text-red-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            <span className="text-gray-300 font-black text-sm tracking-widest uppercase">{titulo}</span>
            <span className="text-gray-600 text-[10px] mt-2 uppercase tracking-widest font-bold">
              Haz clic aquí para buscar en tu PC o Celular
            </span>
            <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={manejarSubida} />
          </label>
        )
      )}
    </div>
  );
};

export default SubidorImagen;