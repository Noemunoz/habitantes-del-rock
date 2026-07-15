"use client";

import React, { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { limpiarHTML } from '../utils/limpiarHTML'; 

// Importamos nuestras nuevas "piezas de lego"
import NotaMetadata from './NotaMetadata';
import NotaMedia from './NotaMedia';
import NotaEditor from './NotaEditor';

export default function PanelColaborador() {
  const [nota, setNota] = useState({ 
    titulo: '', extracto: '', categoria: 'Noticias', contenido: '', 
    autor: '', imagen: '', spotifyLink: '', galeria: [], fechaPublicacion: '' 
  });
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });
  const router = useRouter();

  // El useCallback sigue aquí para proteger la galería de bucles infinitos
  const manejarGaleriaSubida = useCallback((urls) => {
    setNota((notaAnterior) => {
      if (JSON.stringify(notaAnterior.galeria) === JSON.stringify(urls)) return notaAnterior;
      return { ...notaAnterior, galeria: urls };
    });
  }, []);

  const guardarNota = async (e) => {
    e.preventDefault();
    if (!nota.imagen) { 
      setMensaje({ tipo: 'error', texto: "Sube una imagen de portada antes de continuar." }); 
      return; 
    }

    setMensaje({ tipo: 'cargando', texto: "Guardando tu nota y limpiando formato..." });

    const tiempoReal = nota.fechaPublicacion ? new Date(nota.fechaPublicacion).getTime() : Date.now();
    const contenidoLimpio = limpiarHTML(nota.contenido); // Nuestra barredora en acción

    try {
      await addDoc(collection(db, "noticias"), {
        ...nota,
        descripcion: contenidoLimpio,
        timestamp: tiempoReal,
        fecha: nota.fechaPublicacion 
            ? new Date(nota.fechaPublicacion).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
            : new Date().toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
      });
      
      setMensaje({ tipo: 'exito', texto: "¡Nota publicada con éxito! Redirigiendo..." });
      setTimeout(() => router.push('/admin'), 1500);

    } catch (error) { 
      setMensaje({ tipo: 'error', texto: "Hubo un error: " + error.message }); 
    }
  };

  return (
    <div className="p-6 text-white max-w-4xl mx-auto font-sans">
      
      <div className="flex items-center gap-4 mb-8 border-b border-gray-800 pb-6">
        <button 
          type="button"
          onClick={() => router.push('/admin')} 
          className="text-red-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest bg-[#16161a] px-4 py-2 rounded-full border border-gray-800 hover:border-red-500 cursor-pointer"
        >
          ← Regresar
        </button>
        <h2 className="text-3xl font-black border-l-4 border-red-600 pl-4 uppercase tracking-tight m-0">Panel de Redacción</h2>
      </div>

      {mensaje.texto && (
        <div className={`p-4 mb-8 rounded-lg font-bold uppercase tracking-widest text-sm text-center border shadow-lg ${
          mensaje.tipo === 'error' ? 'bg-red-900/50 border-red-500 text-red-200' : 
          mensaje.tipo === 'exito' ? 'bg-green-900/50 border-green-500 text-green-200' : 
          'bg-yellow-900/50 border-yellow-500 text-yellow-200 animate-pulse'
        }`}>
          {mensaje.texto}
        </div>
      )}

      <form onSubmit={guardarNota} className="bg-[#0a0a0c] p-6 md:p-8 rounded-2xl border border-gray-800 shadow-2xl space-y-2">
        
        {/* BLOQUE 1: Textos */}
        <NotaMetadata nota={nota} setNota={setNota} />
        
        {/* BLOQUE 2: Imágenes y Spotify */}
        <NotaMedia nota={nota} setNota={setNota} manejarGaleriaSubida={manejarGaleriaSubida} />
        
        {/* BLOQUE 3: Editor Quill */}
        <NotaEditor nota={nota} setNota={setNota} />
        
        {/* BOTÓN FINAL */}
        <div className="pt-8">
          <button 
            type="submit" 
            disabled={mensaje.tipo === 'cargando'}
            className={`p-5 w-full font-black text-lg uppercase tracking-widest rounded-xl shadow-lg transition-all ${
              mensaje.tipo === 'cargando' ? 'bg-gray-700 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 text-white cursor-pointer hover:scale-[1.01]'
            }`}
          >
            {nota.fechaPublicacion ? "Guardar y Programar 🗓️" : "Publicar Ahora 🚀"}
          </button>
        </div>
      </form>
    </div>
  );
}