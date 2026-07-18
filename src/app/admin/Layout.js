import React from 'react';
import RutaPrivada from '../../components/RutaPrivada';

export default function AdminLayout({ children }) {
  return (
    // Envolvemos TODO el panel de administración con nuestro Guardia de Seguridad
    <RutaPrivada>
      {children}
    </RutaPrivada>
  );
}