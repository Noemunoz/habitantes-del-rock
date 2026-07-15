import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; 
import PaginaNota from '../../../components/PaginaNota';

// 1. ESTA FUNCIÓN ES EL SUPERPODER DE NEXT.JS
// Se ejecuta en el servidor de Vercel ANTES de enviarle la página al usuario o a Facebook
export async function generateMetadata({ params }) {
  // En versiones recientes de Next.js, los params son promesas
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  try {
    const docRef = doc(db, "noticias", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const nota = docSnap.data();
      
      // Aquí armamos la tarjeta visual que leerá Facebook, X y WhatsApp
      return {
        title: `${nota.titulo} | Habitantes del Rock`,
        description: nota.extracto || "Lee la crónica completa y mira la galería fotográfica en Habitantes del Rock.",
        openGraph: {
          title: nota.titulo,
          description: nota.extracto || "Cobertura y fotografía de una sola pieza.",
          images: [{ url: nota.imagen }],
          type: 'article',
        },
        twitter: {
          card: 'summary_large_image',
          title: nota.titulo,
          description: nota.extracto,
          images: [nota.imagen],
        }
      };
    }
  } catch (error) {
    console.error("Error cargando metadatos:", error);
  }

  // Fallback por si la nota fue borrada
  return {
    title: 'Nota no encontrada | Habitantes del Rock'
  };
}

// 2. RENDERIZAMOS LA PÁGINA NORMAL
export default async function NotaPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  
  // Tu componente PaginaNota ya hace todo el trabajo visual
  return <PaginaNota id={id} />;
}