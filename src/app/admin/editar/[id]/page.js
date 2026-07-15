"use client";

import React from 'react';
import { useParams } from 'next/navigation';
// Importamos el nuevo Panel que acabamos de crear
import PanelEditor from '../../../../components/PanelEditor';

export default function EditarNotaPage() {
  const params = useParams();

  // Desplegamos el PanelEditor y le pasamos el ID que extrajimos de la URL
  return (
    <div className="min-h-screen bg-[#0f0f12] py-10">
      <PanelEditor id={params.id} />
    </div>
  );
}