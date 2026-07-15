"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Chat from '../components/Chat';

function FeedNoticias() {
  const [noticias, setNoticias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [cantidadVisible, setCantidadVisible] = useState(7); // 1 destacada + 6 grid
  const searchParams = useSearchParams();

  const categoriaActual = searchParams.get('categoria') || 'Inicio';
  const textoBusqueda = searchParams.get('q') || '';

  useEffect(() => {
    const q = collection(db, "noticias");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      docs.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
      setNoticias(docs);
      setCargando(false);
    });
    return () => unsubscribe();
  }, []);

  const notasFiltradas = noticias.filter(nota => {
    const coincideCategoria = categoriaActual === 'Inicio' || nota.categoria === categoriaActual;
    const coincideBusqueda = nota.titulo?.toLowerCase().includes(textoBusqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  if (cargando) return <div className="text-white text-center py-32 font-bold tracking-widest uppercase">Cargando coberturas...</div>;

  const notasAMostrar = notasFiltradas.slice(0, cantidadVisible);
  const [notaDestacada, ...restoNotas] = notasAMostrar;

  return (
    <div className="py-8 max-w-7xl mx-auto px-4">
      
      {/* 1. NOTA PRINCIPAL (DESTACADA) */}
      {notaDestacada && (
        <div className="mb-12">
          <Link href={`/nota/${notaDestacada.id}`} className="group block relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
            <div className="aspect-21/9 w-full overflow-hidden bg-gray-900">
               <img src={notaDestacada.imagen} alt={notaDestacada.titulo} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="absolute bottom-0 left-0 p-6 md:p-10 bg-linear-to-t from-black via-black/80 to-transparent w-full">
               <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg">{notaDestacada.categoria}</span>
               <h2 className="text-2xl md:text-5xl text-white font-black mt-3 leading-tight mb-2">{notaDestacada.titulo}</h2>
               <p className="hidden md:block text-gray-300 text-lg line-clamp-2 max-w-4xl">
                 {notaDestacada.extracto || (notaDestacada.descripcion ? notaDestacada.descripcion.replace(/<[^>]+>/g, '') : '')}
               </p>
            </div>
          </Link>
        </div>
      )}

      {/* 2. CHAT */}
      <div className="mb-12">
        <Chat />
      </div>

      {/* 3. GRID DE NOTICIAS */}
      {restoNotas.length === 0 ? (
        <div className="text-center text-gray-400 py-20 uppercase tracking-widest font-bold">No se encontraron más notas.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {restoNotas.map(nota => (
             <Link key={nota.id} href={`/nota/${nota.id}`} className="bg-[#16161a] p-0 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all group flex flex-col h-full shadow-lg">
                 <div className="aspect-video w-full overflow-hidden bg-gray-900 shrink-0">
                    <img src={nota.imagen} alt={nota.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                 </div>
                 <div className="p-5 flex flex-col grow">
                     <span className="text-red-600 font-black uppercase text-[10px] tracking-widest">{nota.categoria}</span>
                     <h3 className="font-bold text-white uppercase mt-2 mb-3 leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
                       {nota.titulo}
                     </h3>
                     <p className="text-gray-400 text-sm font-medium leading-relaxed line-clamp-3 mt-auto">
                        {nota.extracto || (nota.descripcion ? nota.descripcion.replace(/<[^>]+>/g, '') : '')}
                     </p>
                 </div>
             </Link>
          ))}
        </div>
      )}

      {/* BOTÓN CARGAR MÁS */}
      {cantidadVisible < notasFiltradas.length && (
        <div className="mt-12 text-center">
          <button 
            onClick={() => setCantidadVisible(prev => prev + 6)}
            className="bg-transparent border border-red-600 text-red-600 hover:bg-red-600 hover:text-white font-bold uppercase tracking-widest py-3 px-8 rounded-full transition-all cursor-pointer"
          >
            Cargar más noticias
          </button>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-white text-center py-32">Cargando coberturas...</div>}>
      <FeedNoticias />
    </Suspense>
  );
}