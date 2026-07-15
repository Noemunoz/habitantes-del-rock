"use client";

import React, { useState, useEffect, useRef } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

function Chat() {
  const [mensajes, setMensajes] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [nombre, setNombre] = useState('');
  const [nombreGuardado, setNombreGuardado] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const chatEndRef = useRef(null);
  const emojiPickerRef = useRef(null);

  const emojis = ['🤘', '🔥', '🎸', '🥁', '🎤', '💀', '😈', '😎', '❤️', '🙌', '✨', '⚡', '🍻', '👊', '💿'];

  useEffect(() => {
    // Esto se ejecuta solo en el cliente, evitando el error del servidor de Next.js
    const nombreLocal = localStorage.getItem('chatNombre');
    if (nombreLocal) {
      setNombre(nombreLocal);
      setNombreGuardado(true);
    }
  }, []);

  useEffect(() => {
    const q = query(collection(db, "mensajes"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const lista = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMensajes(lista);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [emojiPickerRef]);

  const enviarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim()) return;

    try {
      await addDoc(collection(db, "mensajes"), {
        texto: nuevoMensaje,
        autor: nombre || "Anónimo", // Fallback de seguridad
        timestamp: serverTimestamp()
      });
      setNuevoMensaje('');
      setShowEmojiPicker(false);
    } catch (error) {
      console.error("🚨 Error al enviar el mensaje:", error);
    }
  };

  const guardarNombre = (e) => {
    e.preventDefault();
    if (nombre.trim()) {
      localStorage.setItem('chatNombre', nombre.trim());
      setNombreGuardado(true);
    }
  };

  return (
    <div className="bg-[#0f0f12] border border-gray-800 rounded-lg overflow-hidden flex flex-col h-125 shadow-2xl relative">
      <div className="bg-black p-4 border-b border-gray-800 text-center shrink-0">
        <h3 className="text-red-600 font-black uppercase tracking-widest text-sm">Chat en Vivo</h3>
      </div>

      <div className="grow overflow-y-auto p-4 space-y-4 bg-[#16161a]">
        {mensajes.map((msg) => (
          <div key={msg.id} className="text-sm">
            <span className="text-red-500 font-bold uppercase text-[10px]">{msg.autor}: </span>
            <span className="text-gray-200">{msg.texto}</span>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {!nombreGuardado ? (
        <form onSubmit={guardarNombre} className="p-4 bg-black border-t border-gray-800 shrink-0">
          <input 
            type="text" 
            value={nombre} // <-- ESTA LÍNEA ES CLAVE, FALTABA EN TU CÓDIGO
            placeholder="¿Cómo te llamas?" 
            className="w-full bg-[#1f1f24] p-3 rounded text-white text-sm outline-none border border-gray-700 focus:border-red-500 transition-colors"
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <button type="submit" className="w-full mt-3 bg-red-600 hover:bg-red-700 transition-colors text-white font-black text-xs py-3 rounded uppercase tracking-widest cursor-pointer">
            Entrar al chat
          </button>
        </form>
      ) : (
        <div className="bg-black border-t border-gray-800 p-3 relative shrink-0">
          
          {showEmojiPicker && (
            <div ref={emojiPickerRef} className="absolute bottom-16 left-2 bg-[#1f1f24] p-2 rounded-lg shadow-xl border border-gray-700 grid grid-cols-5 gap-2 z-50">
              {emojis.map(emoji => (
                <button 
                  key={emoji} 
                  type="button" 
                  className="text-xl hover:bg-gray-700 p-1 rounded transition-colors cursor-pointer"
                  onClick={() => setNuevoMensaje(prev => prev + emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={enviarMensaje} className="flex gap-2">
            <button 
              type="button"
              className="text-gray-400 hover:text-white transition-colors cursor-pointer p-2 bg-[#1f1f24] rounded border border-gray-700"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <span className="text-xl">🤘</span>
            </button>
            <input 
              type="text" 
              value={nuevoMensaje}
              onChange={(e) => setNuevoMensaje(e.target.value)}
              placeholder="Escribe algo..." 
              className="grow bg-[#1f1f24] p-3 rounded text-white text-sm outline-none border border-gray-700 focus:border-red-500 transition-colors"
            />
            <button type="submit" className="bg-red-600 hover:bg-red-700 transition-colors text-white px-5 rounded font-black text-xs uppercase tracking-widest cursor-pointer">
              Enviar
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Chat;