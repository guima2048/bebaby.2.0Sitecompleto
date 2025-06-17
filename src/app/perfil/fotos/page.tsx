"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Photo {
  id: string;
  url: string;
  isPublic: boolean;
  isMain: boolean;
}

const mockPhotos: Photo[] = [
  {
    id: "1",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPublic: true,
    isMain: true
  },
  {
    id: "2",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPublic: true,
    isMain: false
  },
  {
    id: "3",
    url: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    isPublic: false,
    isMain: false
  }
];

export default function FotosPage() {
  const router = useRouter();
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);

  // Funções de manipulação de fotos (mock)
  const handleSetMain = (photoId: string) => {
    setPhotos(prev => prev.map(photo => ({ ...photo, isMain: photo.id === photoId })));
  };
  const handleDelete = (photoId: string) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };
  const handleTogglePrivacy = (photoId: string) => {
    setPhotos(prev => prev.map(photo => photo.id === photoId ? { ...photo, isPublic: !photo.isPublic } : photo));
  };
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    setPhotos(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        url,
        isPublic: true,
        isMain: false
      }
    ]);
  };

  // Foto principal
  const mainPhoto = photos.find(p => p.isMain) || photos[0];
  const otherPhotos = photos.filter(p => !p.isMain);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-0 md:px-0 relative">
      {/* Header mobile */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between px-4 py-4 md:py-6 bg-white border-b border-[#f3e8ff] sticky top-0 z-20">
        <button
          onClick={() => router.push('/perfil')}
          className="text-[#a259cb] bg-white rounded-full p-2 shadow-md hover:bg-[#f3e8ff] transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h1 className="text-xl font-bold text-[#6d2c91]">Minhas Fotos</h1>
        <div className="w-8" />
      </header>

      {/* Foto principal em destaque */}
      <section className="w-full max-w-md mx-auto flex flex-col items-center pt-6 pb-2">
        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-3xl shadow-2xl border-4 border-[#a259cb] overflow-hidden mb-2 bg-black group">
          <Image
            src={mainPhoto.url}
            alt="Foto principal"
            fill
            className="object-cover"
            priority
          />
          <span className="absolute bottom-2 right-2 bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white text-xs px-3 py-1 rounded-full shadow-lg font-bold">Principal</span>
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition">
            <button onClick={() => handleTogglePrivacy(mainPhoto.id)} className="bg-white text-[#a259cb] p-2 rounded-full shadow hover:scale-110 transition mx-1" title="Privacidade">
              {mainPhoto.isPublic ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              )}
            </button>
          </div>
          {!mainPhoto.isPublic && (
            <span className="absolute top-2 left-2 bg-black/80 text-[#a259cb] text-xs px-2 py-1 rounded-full font-bold">Privada</span>
          )}
        </div>
      </section>

      {/* Grid de fotos secundárias */}
      <section className="w-full max-w-md mx-auto px-2 grid grid-cols-3 gap-3 mb-24">
        {otherPhotos.map(photo => (
          <div key={photo.id} className="relative group rounded-2xl overflow-hidden shadow-md bg-black">
            <Image
              src={photo.url}
              alt="Foto do perfil"
              width={200}
              height={200}
              className="object-cover w-full h-28 md:h-32"
            />
            {/* Ações rápidas */}
            <div className="absolute inset-0 flex flex-col items-end justify-between p-2 opacity-0 group-hover:opacity-100 transition bg-black/30">
              <button onClick={() => handleSetMain(photo.id)} className="bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white p-1 rounded-full mb-1 shadow hover:scale-110 transition" title="Definir como principal">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </button>
              <button onClick={() => handleTogglePrivacy(photo.id)} className="bg-white text-[#a259cb] p-1 rounded-full mb-1 shadow hover:scale-110 transition" title="Privacidade">
                {photo.isPublic ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                )}
              </button>
              <button onClick={() => handleDelete(photo.id)} className="bg-red-500 text-white p-1 rounded-full shadow hover:scale-110 transition" title="Excluir">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              </button>
            </div>
            {/* Badge de privacidade */}
            {!photo.isPublic && (
              <span className="absolute top-2 left-2 bg-black/80 text-[#a259cb] text-xs px-2 py-1 rounded-full font-bold">Privada</span>
            )}
          </div>
        ))}
      </section>

      {/* Botão flutuante de upload */}
      <label className="fixed bottom-6 right-6 z-50">
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
        <span className="bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white p-5 rounded-full shadow-2xl cursor-pointer hover:scale-110 transition flex items-center justify-center border-4 border-white">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
        </span>
      </label>
    </main>
  );
} 