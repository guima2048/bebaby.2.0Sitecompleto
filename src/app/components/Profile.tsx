"use client";
import { useState, useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';

interface ProfileProps {
  profileId: string;
  name: string;
  age: number;
  bio: string;
  images: string[];
  interests: string[];
}

export default function Profile({ profileId, name, age, bio, images, interests }: ProfileProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addNotification } = useNotifications();

  // Simular visualizações do perfil
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% de chance de alguém ver o perfil
        addNotification({
          type: 'view',
          title: 'Novo visualizador',
          message: `${name} visualizou seu perfil`,
          image: images[0],
          link: `/perfil/${profileId}`
        });
      }
    }, 15000); // Verificar a cada 15 segundos

    return () => clearInterval(interval);
  }, [profileId, name, images, addNotification]);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
    
    if (!isFavorite) {
      // Notificar quando alguém favorita o perfil
      addNotification({
        type: 'favorite',
        title: 'Novo favorito',
        message: `${name} favoritou seu perfil`,
        image: images[0],
        link: `/perfil/${profileId}`
      });
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-[#1a1a1a] rounded-xl overflow-hidden shadow-lg">
      {/* Carrossel de Imagens */}
      <div className="relative h-[400px]">
        <img
          src={images[currentImageIndex]}
          alt={`${name} - Foto ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navegação do Carrossel */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            >
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Indicadores de Imagem */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Informações do Perfil */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">{name}, {age}</h2>
            <p className="text-gray-400">São Paulo, SP</p>
          </div>
          <button
            onClick={handleFavorite}
            className={`p-3 rounded-full transition-colors ${
              isFavorite ? 'bg-pink-500 text-white' : 'bg-[#333] text-white'
            }`}
          >
            <svg width="24" height="24" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <p className="text-gray-300 mb-6">{bio}</p>

        {/* Interesses */}
        <div className="flex flex-wrap gap-2">
          {interests.map((interest, index) => (
            <span
              key={index}
              className="bg-[#333] text-white px-3 py-1 rounded-full text-sm"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
} 