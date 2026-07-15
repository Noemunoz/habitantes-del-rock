"use client";

import React from 'react';
import Link from 'next/link'; // Importación correcta para Next.js
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaXTwitter } from 'react-icons/fa6';
// IMPORTANTE: Asegúrate de que esta ruta a tu logo sea correcta
import logoHR from '../assets/Logo HR.svg'; 

function Footer() {
  const añoActual = new Date().getFullYear();

  return (
    <footer className="bg-[#16161a] border-t border-gray-850 mt-20 text-gray-400 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <img src={logoHR.src || logoHR} alt="Logo Habitantes del Rock" className="h-10 w-auto object-contain" />
            <span className="text-lg font-black tracking-tighter text-white uppercase">
              HABITANTES <span className="text-red-600">DEL ROCK</span>
            </span>
          </div>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed font-medium">
            Medio de comunicación independiente dedicado a la cobertura, fotografía y difusión del rock, metal y la cultura alternativa.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-white font-black uppercase text-xs tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
            <span className="h-3 w-1 bg-red-600 rounded"></span>
            Secciones
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs uppercase font-bold tracking-wider">
            {/* Ahora usamos los parámetros de URL como en el Navbar */}
            <Link href="/" className="hover:text-red-500 transition-colors">Inicio</Link>
            <Link href="/?categoria=Noticias" className="hover:text-red-500 transition-colors">Noticias</Link>
            <Link href="/?categoria=Entrevistas" className="hover:text-red-500 transition-colors">Entrevistas</Link>
            <Link href="/?categoria=Conciertos" className="hover:text-red-500 transition-colors">Conciertos</Link>
            <Link href="/?categoria=Reseñas" className="hover:text-red-500 transition-colors">Reseñas</Link>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-white font-black uppercase text-xs tracking-widest border-b border-gray-800 pb-2 flex items-center gap-2">
            <span className="h-3 w-1 bg-red-600 rounded"></span>
            Comunidad
          </h4>
          <p className="text-xs text-gray-500 mb-2">Síguenos en nuestras plataformas oficiales:</p>
          <div className="flex flex-wrap gap-3">
            <a href="https://www.facebook.com/habitantesdelrock1" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all">
              <FaFacebookF size={14} />
            </a>
            <a href="https://www.instagram.com/habitantes_del_rock/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all">
              <FaInstagram size={14} />
            </a>
            <a href="https://www.youtube.com/c/HabitantesdelRock" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all">
              <FaYoutube size={14} />
            </a>
            <a href="https://www.tiktok.com/@habitantesdelrock" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all">
              <FaTiktok size={14} />
            </a>
            <a href="https://x.com/habitantesdrock" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-600 text-white hover:border-red-600 hover:text-red-600 hover:bg-red-600/10 transition-all">
              <FaXTwitter size={14} />
            </a>
          </div>
        </div>

      </div>

      <div className="bg-[#0f0f12] border-t border-gray-850 py-6 text-center text-xs font-semibold tracking-wider text-gray-600 uppercase">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p>© {añoActual} Habitantes del Rock. Todos los derechos reservados.</p>
          <p className="text-[10px] text-gray-700">Fotografía y Periodismo de una sola pieza</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;