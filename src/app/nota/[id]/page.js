import React from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'; 
import PaginaNota from '../../../components/PaginaNota';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  const siteUrl = 'https://www.habitantesdelrock.com';
  
  try {
    const docRef = doc(db, "noticias", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const nota = docSnap.data();
      
      return {
        title: `${nota.titulo} | Habitantes del Rock`,
        description: nota.extracto || "Lee la crónica completa y mira la galería fotográfica.",
        alternates: {
          canonical: `${siteUrl}/nota/${id}`,
        },
        openGraph: {
          title: nota.titulo,
          description: nota.extracto || "Cobertura y fotografía de una sola pieza.",
          url: `${siteUrl}/nota/${id}`, 
          type: 'article',
          images: [
            { 
              url: nota.imagen,
              width: 1200,
              height: 630,
              alt: nota.titulo,
              type: 'image/jpeg'
            }
          ],
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

  return {
    title: 'Nota no encontrada | Habitantes del Rock'
  };
}

export default async function NotaPage({ params }) {
  const resolvedParams = await params;
  const { id } = resolvedParams;
  return <PaginaNota id={id} />;
}