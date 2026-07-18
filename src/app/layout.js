import React from 'react';
import RutaPrivada from '../../components/RutaPrivada';

export default function AdminLayout({ children }) {
  return (
    // Envolvemos TODO el panel con nuestro Guardia
    <RutaPrivada>
      {children}
    </RutaPrivada>
  );
}