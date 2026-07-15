import React from 'react';

export default function NotaMetadata({ nota, setNota }) {
  return (
    <div className="space-y-5">
      
      {/* Título */}
      <div>
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
          Título del Artículo
        </label>
        <input 
          type="text" 
          placeholder="Escribe el título..." 
          value={nota.titulo || ''} 
          onChange={(e) => setNota({...nota, titulo: e.target.value})} 
          className="w-full bg-[#16161a] p-3 rounded border border-gray-700 text-white outline-none focus:border-yellow-500 transition-colors shadow-inner" 
          required 
        />
      </div>
      
      {/* Autor */}
      <div>
        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
          Autor
        </label>
        <input 
          type="text" 
          placeholder="Nombre del redactor..." 
          value={nota.autor || ''} 
          onChange={(e) => setNota({...nota, autor: e.target.value})} 
          className="w-full bg-[#16161a] p-3 rounded border border-gray-700 text-white outline-none focus:border-yellow-500 transition-colors shadow-inner" 
          required 
        />
      </div>
      
      {/* Extracto con Contador SEO */}
      <div>
        <div className="flex justify-between items-center mb-1.5 px-1">
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest">
            Extracto (Resumen SEO)
          </label>
          <span className={`text-[10px] font-bold tracking-widest transition-colors ${
            (nota.extracto || '').length >= 150 ? 'text-yellow-500 animate-pulse' : 'text-gray-500'
          }`}>
            {(nota.extracto || '').length} / 160
          </span>
        </div>
        <textarea 
          placeholder="Un breve resumen de la nota (Atrapa al lector en Google)..." 
          value={nota.extracto || ''} 
          maxLength={160}
          onChange={(e) => setNota({...nota, extracto: e.target.value})} 
          className="w-full h-20 bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-yellow-500 transition-colors shadow-inner resize-none" 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Categoría */}
          <div>
            <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
              Categoría
            </label>
            <select 
              value={nota.categoria || 'Noticias'} 
              onChange={(e) => setNota({...nota, categoria: e.target.value})} 
              className="w-full bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-yellow-500 transition-colors shadow-inner"
            >
                <option value="Noticias">Noticias</option>
                <option value="Entrevistas">Entrevistas</option>
                <option value="Conciertos">Conciertos</option>
                <option value="Reseñas">Reseñas</option>
            </select>
          </div>
          
          {/* Fecha */}
          <div>
              <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1">
                Publicar en (Fecha/Hora)
              </label>
              <input 
                type="datetime-local" 
                value={nota.fechaPublicacion || ''} 
                onChange={(e) => setNota({...nota, fechaPublicacion: e.target.value})} 
                className="w-full bg-[#16161a] border border-gray-700 rounded p-3 text-white outline-none focus:border-yellow-500 transition-colors scheme-dark shadow-inner" 
                title="Deja vacío para publicar ahora mismo"
              />
          </div>
      </div>

    </div>
  );
}