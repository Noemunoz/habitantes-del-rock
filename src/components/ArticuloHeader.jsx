"use client";

import React, { useState } from 'react';
import Link from 'next/link'; 
import { FaFacebook, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';

const ArticuloHeader = ({ nota, urlActual }) => {
  const [pantallaCompleta, setPantallaCompleta] = useState(false);

  const tituloCompartir = encodeURIComponent(`¡Checa esta nota en Habitantes del Rock!: ${nota.titulo}`);
  const urlCompartir = encodeURIComponent(urlActual);

  const linkFacebook = `https://www.facebook.com/sharer/sharer.php?u=${urlCompartir}`;
  const linkX = `https://twitter.com/intent/tweet?url=${urlCompartir}&text=${tituloCompartir}`;
  const linkWhatsApp = `https://api.whatsapp.com/send?text=${tituloCompartir}%20${urlCompartir}`;

  return (
    <>
      <header className="mb-8">
        <Link href="/" className="inline-flex text-red-500 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest items-center gap-2 mb-8 bg-[#16161a] px-4 py-2 rounded-full border border-gray-800 hover:border-red-500">
          ← Volver al inicio
        </Link>
        
        <div>
          <span className="bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-md shadow-lg shadow-red-900/20">
            {nota.categoria}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mt-6 uppercase leading-tight tracking-tighter">
          {nota.titulo}
        </h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 border-b border-gray-800 pb-6">
          <div className="flex flex-wrap items-center gap-3 text-gray-500 text-sm font-semibold uppercase tracking-wider">
            <span>{nota.fecha}</span>
            <span className="text-red-600 hidden sm:inline">•</span>
            <span className="text-gray-300">Por {nota.autor}</span>
          </div>

          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Compartir:</span>
            <a href={linkFacebook} target="_blank" rel="noopener noreferrer" className="text-[#1877F2] hover:scale-110 transition-transform">
              <FaFacebook size={26} />
            </a>
            <a href={linkX} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform">
              <FaXTwitter size={26} />
            </a>
            <a href={linkWhatsApp} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:scale-110 transition-transform">
              <FaWhatsapp size={26} />
            </a>
          </div>
        </div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl mt-8 border border-gray-800 bg-[#0f0f12] cursor-pointer group" onClick={() => setPantallaCompleta(true)}>
          <img src={nota.imagen} alt={nota.titulo} className="w-full aspect-21/9 object-cover opacity-90 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-500" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30">
             <span className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase backdrop-blur-sm border border-white/20">Ampliar</span>
          </div>
        </div>
      </header>

      {/* Modal de Pantalla Completa */}
      {pantallaCompleta && (
        <div className="fixed inset-0 z-100 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-10" onClick={() => setPantallaCompleta(false)}>
          <button className="absolute top-6 right-6 text-white bg-red-600 hover:bg-red-700 w-12 h-12 rounded-full text-2xl font-black transition-transform hover:scale-110 flex items-center justify-center cursor-pointer shadow-2xl z-50">✕</button>
          <img src={nota.imagen} alt={nota.titulo} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </>
  );
};

export default ArticuloHeader;