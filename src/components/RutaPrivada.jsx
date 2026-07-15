"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function RutaPrivada({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Escuchamos los cambios en el estado de autenticación
    const cancelarSuscripcion = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setCargando(false);
      } else {
        // Si no hay usuario, lo expulsamos inmediatamente al login
        router.push('/login');
      }
    });

    // Limpiamos el observador cuando se desmonta el componente
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

  // Si pasa la verificación y hay usuario, renderizamos la pantalla protegida (children)
  return <>{children}</>;
}