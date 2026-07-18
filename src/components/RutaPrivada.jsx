"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function RutaPrivada({ children }) {
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Escuchamos si hay un usuario válido logueado en Firebase
    const cancelarSuscripcion = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Si hay usuario, le damos pase libre
        setCargando(false);
      } else {
        // Si no hay usuario, lo pateamos inmediatamente al login
        router.push('/login');
      }
    });

    return () => cancelarSuscripcion();
  }, [router]);

  if (cargando) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="text-center text-white font-black uppercase tracking-widest text-sm animate-pulse border border-gray-800 bg-[#16161a] p-8 rounded-xl shadow-2xl">
          <span className="text-red-600">Verificando</span> credenciales de seguridad...
        </div>
      </div>
    );
  }

  // Si pasa la verificación, mostramos el panel
  return <>{children}</>;
}