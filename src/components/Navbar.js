"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import logoHR from "../assets/Logo HR.svg";

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleRadio = async () => {
    if (!audioRef.current) return;
    try {
      if (audioRef.current.paused) {
        await audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error("No fue posible reproducir la radio.", error);
    }
  };

  return (
    <div className="bg-[#222227] border border-gray-800 rounded-full px-4 py-2 flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-start">
      <audio ref={audioRef} src="https://sonic2.sistemahost.es/8024/stream" preload="none"></audio>
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
        </span>
        <span className="text-xs font-black uppercase tracking-wider text-gray-300">En Vivo</span>
      </div>
      <button 
        onClick={toggleRadio} 
        className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all flex items-center gap-1 text-white cursor-pointer ${
          isPlaying ? 'bg-gray-700 hover:bg-gray-600' : 'bg-red-600 hover:bg-red-700'
        }`}
      >
        {isPlaying ? '⏸ DETENER' : '▶ ESCUCHAR'}
      </button>
    </div>
  );
};

const SearchBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') || "");

  // Debounce: espera 500ms antes de actualizar la URL para no saturar
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentQuery = searchParams.get('q') || "";
      if (inputValue !== currentQuery) {
        router.push(inputValue ? `/?q=${encodeURIComponent(inputValue)}` : '/');
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, router, searchParams]);

  return (
    <div className="flex items-center gap-2 bg-[#0f0f12] border border-gray-700 rounded-full px-4 py-2 w-full lg:w-72 focus-within:border-red-500 transition-colors">
      <span className="text-gray-400 text-sm">🔍</span>
      <input 
        type="text" 
        placeholder="Buscar bandas, notas..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="bg-transparent text-white text-sm outline-none w-full placeholder-gray-500"
      />
    </div>
  );
};

// 1. RENOMBRAMOS EL NAVBAR ORIGINAL A "NavbarContent"
function NavbarContent() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoriaActualURL = searchParams.get('categoria') || "Inicio";

  const categorias = [
    { nombre: "Inicio", ruta: "/" },
    { nombre: "Noticias", ruta: "/?categoria=Noticias" },
    { nombre: "Entrevistas", ruta: "/?categoria=Entrevistas" },
    { nombre: "Conciertos", ruta: "/?categoria=Conciertos" },
    { nombre: "Reseñas", ruta: "/?categoria=Reseñas" }
  ];

  return (
    <header className="border-b border-gray-800 bg-[#16161a] sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => router.push('/')}>
          <Image 
            src={logoHR} 
            alt="Habitantes del Rock" 
            width={48} 
            height={48}
            className="h-10 md:h-12 w-auto object-contain shrink-0"
            priority 
          />
          <h1 className="text-base md:text-2xl font-black tracking-tighter text-white uppercase leading-tight flex flex-col sm:block">
            <span>HABITANTES</span>
            <span className="text-red-600 sm:ml-1">DEL ROCK</span>
          </h1>
        </div>

        <button 
          className="lg:hidden text-white hover:text-red-500 transition-colors p-2 text-xl cursor-pointer"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          {menuAbierto ? '✖' : '☰'}
        </button>

        <div className="hidden lg:flex items-center gap-4">
          <SearchBar />
          <RadioPlayer />
        </div>
      </div>

      {menuAbierto && (
        <div className="lg:hidden bg-[#0f0f12] border-t border-gray-800 px-4 py-4 flex flex-col gap-4 shadow-inner">
          <SearchBar />
          <RadioPlayer />
        </div>
      )}

      <div className="bg-[#0f0f12] border-t border-gray-800 overflow-hidden">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex overflow-x-auto gap-3 md:gap-6 text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider justify-between md:justify-center whitespace-nowrap scrollbar-none [-ms-overflow-style:none]">
          {categorias.map((cat) => {
            const estaActivo = (cat.nombre === "Inicio" && !searchParams.has('categoria')) || categoriaActualURL === cat.nombre;
            return (
              <button
                key={cat.nombre}
                onClick={() => router.push(cat.ruta)}
                className={`transition-colors uppercase pt-1 pb-1 border-b-2 shrink-0 cursor-pointer ${
                  estaActivo ? 'text-red-500 border-red-500' : 'text-gray-400 hover:text-red-500 border-transparent'
                }`}
              >
                {cat.nombre}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

// 2. EXPORTAMOS UN NUEVO NAVBAR QUE ENVUELVE TODO EN UN <Suspense>
export default function Navbar() {
  return (
    <Suspense fallback={<header className="h-28 bg-[#16161a] border-b border-gray-800 sticky top-0 z-50"></header>}>
      <NavbarContent />
    </Suspense>
  );
}