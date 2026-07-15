"use client";

import React from 'react';
// Subimos 3 niveles (nueva -> admin -> app -> src) para llegar a components
import PanelColaborador from '../../../components/PanelColaborador';

export default function NuevaNotaPage() {
  return (
    <div className="min-h-screen bg-[#0f0f12] py-10">
      <PanelColaborador />
    </div>
  );
}