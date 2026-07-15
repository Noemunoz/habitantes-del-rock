import React from 'react';

const ArticuloMultimedia = ({ link }) => {
  if (!link) return null;
  
  try {
    if (link.includes('spotify.com')) {
      const match = link.match(/(track|album|playlist|artist|episode|show)\/([a-zA-Z0-9]+)/);
      if (match) {
        const tipo = match[1];
        const idSpotify = match[2];
        const embedUrl = `https://open.spotify.com/embed/${tipo}/${idSpotify}?utm_source=generator&theme=0`;
        return (
          <div className="mt-12 mb-8">
            <iframe src={embedUrl} width="100%" height="352" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" className="rounded-2xl shadow-xl border border-gray-800 bg-[#0f0f12]"></iframe>
          </div>
        );
      }
    }
    
    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      let videoId = '';
      if (link.includes('youtu.be/')) {
        videoId = link.split('youtu.be/')[1].split('?')[0];
      } else {
        const urlObj = new URL(link.startsWith('http') ? link : `https://${link}`);
        videoId = urlObj.searchParams.get('v');
      }
      
      if (videoId) {
        return (
          <div className="mt-12 mb-8 aspect-video rounded-2xl overflow-hidden shadow-xl border border-gray-800 bg-[#0f0f12]">
            <iframe width="100%" height="100%" src={`https://www.youtube.com/embed/${videoId}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        );
      }
    }
  } catch (error) {
    console.error("Error parseando link:", error);
  }
  
  return (
    <a href={link.startsWith('http') ? link : `https://${link}`} target="_blank" rel="noopener noreferrer" className="block mt-8 text-red-500 hover:text-red-400 font-bold break-all transition-colors">
      🎵 Escuchar / Ver material adjunto
    </a>
  );
};

export default ArticuloMultimedia;