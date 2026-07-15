import React from 'react';

const ArticuloGaleria = ({ galeria }) => {
  if (!galeria || galeria.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-800">
      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8 flex items-center gap-3">
        <span className="h-6 w-1.5 bg-red-600 rounded"></span>
        Cobertura Fotográfica
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
        {galeria.map((foto, index) => (
          <div key={index} className="relative overflow-hidden rounded-xl border border-gray-800 group bg-gray-900 aspect-video cursor-pointer">
            <img src={foto} alt={`Fotografía ${index + 1}`} className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArticuloGaleria;