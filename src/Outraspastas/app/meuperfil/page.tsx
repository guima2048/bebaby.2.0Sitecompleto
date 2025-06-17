"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";

const user = {
  nome: "Rias Gremory",
  idade: 25,
  status: "Solteira",
  cidade: "São Luiz, MA",
  profissao: "Empreendedora",
  fotoPerfil: "/perfil-exemplo.png",
  biografia: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eget tellus non metus gravida suscipit. Curabitur elementum non sapien non porttitor. Nullam at neque sit amet elit mattis efficitur. Nam molestie urna eu nisi iaculis, quis consectetur neque sagittis.",
  interesses: "Gosto de Viajar e viver novas experiências.",
  hobbies: "Praias, Clubes",
  escolaridade: "Ensino médio",
  filhos: "Não tenho",
  corpo: "Magra",
  etnia: "Branca",
  jaFoiBaby: "Sim, já fui"
};

// Simulação: se o usuário é pagante
const isPagante = true; // Troque para false para testar não pagante

interface Photo {
  id: string;
  url: string;
  isMain: boolean;
}

interface UserProfile {
  id: string;
  name: string;
  age: number;
  location: string;
  photos: Photo[];
  // Add other profile fields as needed
}

export default function Perfil() {
  // Estado global compartilhado
  const [fotosPublicas, setFotosPublicas] = useState<string[]>([]);
  const [fotosPrivadas, setFotosPrivadas] = useState<string[]>([]);
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  // Funções para manipular fotos
  const handleAddFoto = (url: string, isPublica: boolean) => {
    if (isPublica) setFotosPublicas((f) => [...f, url]);
    else setFotosPrivadas((f) => [...f, url]);
  };
  const handleDeleteFoto = (idx: number, isPublica: boolean) => {
    if (isPublica) setFotosPublicas((f) => f.filter((_, i) => i !== idx));
    else setFotosPrivadas((f) => f.filter((_, i) => i !== idx));
  };
  const handleSetPerfil = (url: string) => setFotoPerfil(url);

  const totalFotos = fotosPublicas.length + fotosPrivadas.length;
  const maxFotos = isPagante ? 9 : 3;

  return (
    <div className="w-full min-h-screen bg-[#120015] flex flex-col items-center relative overflow-x-hidden">
      {/* Overlay de ruído/textura no fundo - agora visível em todas as telas */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-30 mix-blend-soft-light" style={{backgroundImage: 'url("https://www.transparenttextures.com/patterns/noise.png")'}} />
      {/* Fundo gradiente suave com blur aumentado para melhor integração - agora visível em todas as telas */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#a259cb22] via-[#6d2c91aa] to-[#120015] blur-[4px]" />
      
      {/* Container único que agrupa todos os elementos */}
      <div className="relative w-full md:max-w-[450px] mx-auto flex flex-col items-center">
        {/* Banner/Capa 3x4 com overlay de degradê animado */}
        <div className="relative w-full aspect-[3/4] bg-[#120015] flex items-end justify-center rounded-t-2xl overflow-hidden animate-fade-in">
          <Image
            src="/perfil-exemplo.png"
            alt="Banner do perfil"
            fill
            className="object-cover object-center w-full h-full"
            priority
          />
          {/* Overlay degradê animado */}
          <div className="absolute bottom-0 left-0 w-full h-full pointer-events-none animate-gradient-move"
            style={{
              background: "linear-gradient(to top, #120015 0%, rgba(18,0,21,0.95) 30%, rgba(18,0,21,0.7) 60%, rgba(18,0,21,0) 100%)"
            }}
          />
          {/* Menu hambúrguer de 2 linhas, canto superior esquerdo sobre a foto */}
          <div className="absolute top-4 left-4 z-40">
            <button className="flex flex-col gap-1 p-0 m-0 w-8 h-8 items-start justify-center" aria-label="Menu">
              <span className="block w-7 h-0.5 bg-white rounded"></span>
              <span className="block w-7 h-0.5 bg-white rounded"></span>
            </button>
          </div>
          {/* Barra lateral de ações, canto superior direito sobre a foto */}
          {/* Removido menu lateral de ícones SVG conforme solicitado */}
          {/* Bloco de dados principais sobre a imagem, centralizado na parte inferior, igual desktop e mobile */}
          <div className="absolute bottom-0 left-0 w-full flex flex-row items-end justify-between px-4 pb-4 z-20 gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-xl md:text-2xl leading-tight tracking-tight drop-shadow-lg" style={{color:'#C3B1E1'}}>{user.nome}</span>
              <span className="text-pink-300 text-base md:text-lg flex items-center gap-1 font-semibold drop-shadow-lg">{user.idade} anos</span>
              <span className="mt-1 text-base md:text-lg font-semibold drop-shadow-lg" style={{color:'#B8B8D1'}}>{user.status}</span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="flex items-center gap-2 text-base font-semibold drop-shadow-lg" style={{color:'#B8B8D1'}}>{user.cidade}</span>
              <span className="flex items-center gap-2 text-base font-semibold drop-shadow-lg" style={{color:'#B8B8D1'}}>{user.profissao}</span>
              <button
                className="mt-2 px-4 py-1 rounded-full bg-gradient-to-r from-[#a259cb] to-[#6d2c91] text-white text-xs font-semibold shadow hover:brightness-110 transition"
                onClick={() => setModoEdicao((v) => !v)}
              >
                {modoEdicao ? 'Cancelar' : 'Editar perfil'}
              </button>
            </div>
          </div>
        </div>
        {/* Card principal refinado, elegante e igual desktop e mobile */}
        <div className="relative w-full max-w-[450px] pb-4 px-3 flex flex-col items-center z-20 text-white
          border-2 border-transparent rounded-2xl shadow-lg
          bg-clip-padding transition-all duration-300 hover:shadow-2xl hover:brightness-105 overflow-visible mt-0 -mt-6">
          {/* Espaço para o bloco superior não sobrepor o restante do card */}
          <div className="h-4 md:h-6" />
          {/* Biografia e interesses */}
          <div className="w-full flex flex-col md:flex-row md:gap-8">
            <div className="flex-1 mb-3 md:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-base" style={{color:'#C3B1E1'}}>Biografia</span>
              </div>
              <p className="text-base" style={{color:'#B8B8D1'}}>{user.biografia}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-base" style={{color:'#C3B1E1'}}>O que gosto de fazer?</span>
              </div>
              <p className="text-base" style={{color:'#B8B8D1'}}>{user.interesses}</p>
            </div>
          </div>
          {/* Grid de campos */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-4 text-[14px]">
            <div>
              <span className="font-semibold text-base" style={{color:'#B8B8D1'}}>Hobbies:</span>
              <div className="font-bold text-base" style={{color:'#C3B1E1'}}>{user.hobbies}</div>
            </div>
            <div>
              <span className="font-semibold text-base" style={{color:'#B8B8D1'}}>Escolaridade:</span>
              <div className="font-bold text-base" style={{color:'#C3B1E1'}}>{user.escolaridade}</div>
            </div>
            <div>
              <span className="font-semibold text-base" style={{color:'#B8B8D1'}}>Filhos:</span>
              <div className="font-bold text-base" style={{color:'#C3B1E1'}}>{user.filhos}</div>
            </div>
            <div>
              <span className="font-semibold text-base" style={{color:'#B8B8D1'}}>Corpo:</span>
              <div className="font-bold text-base" style={{color:'#C3B1E1'}}>{user.corpo}</div>
            </div>
            <div>
              <span className="font-semibold text-base" style={{color:'#B8B8D1'}}>Etnia:</span>
              <div className="font-bold text-base" style={{color:'#C3B1E1'}}>{user.etnia}</div>
            </div>
            <div>
              <span className="font-semibold text-base" style={{color:'#B8B8D1'}}>Já foi baby?</span>
              <div className="font-bold text-base" style={{color:'#C3B1E1'}}>{user.jaFoiBaby}</div>
            </div>
          </div>
          {/* Seções de fotos públicas e privadas agora dentro do card */}
          <div className="w-full">
            <FotosSection
              isPublica={true}
              fotos={fotosPublicas}
              onAddFoto={(url) => handleAddFoto(url, true)}
              onDeleteFoto={(idx) => handleDeleteFoto(idx, true)}
              onSetPerfil={handleSetPerfil}
              fotoPerfil={fotoPerfil}
              podeAdicionar={totalFotos < maxFotos}
            />
            <FotosSection
              isPublica={false}
              fotos={fotosPrivadas}
              onAddFoto={(url) => handleAddFoto(url, false)}
              onDeleteFoto={(idx) => handleDeleteFoto(idx, false)}
              onSetPerfil={handleSetPerfil}
              fotoPerfil={fotoPerfil}
              podeAdicionar={totalFotos < maxFotos}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente FotosSection recebe props do pai
function FotosSection({
  isPublica,
  fotos,
  onAddFoto,
  onDeleteFoto,
  onSetPerfil,
  fotoPerfil,
  podeAdicionar
}: {
  isPublica: boolean;
  fotos: string[];
  onAddFoto: (url: string) => void;
  onDeleteFoto: (idx: number) => void;
  onSetPerfil: (url: string) => void;
  fotoPerfil: string | null;
  podeAdicionar: boolean;
}) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeType, setActiveType] = useState<'publica' | 'privada' | null>(null);

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result as string));
      reader.readAsDataURL(file);
      setActiveType(isPublica ? 'publica' : 'privada');
    }
  };

  const showCroppedImage = useCallback(() => {
    if (!imageSrc || !croppedAreaPixels || activeType === null) return;
    setLoading(true);
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = croppedAreaPixels.width;
      canvas.height = croppedAreaPixels.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return setLoading(false);
      ctx.drawImage(
        image,
        croppedAreaPixels.x,
        croppedAreaPixels.y,
        croppedAreaPixels.width,
        croppedAreaPixels.height,
        0,
        0,
        croppedAreaPixels.width,
        croppedAreaPixels.height
      );
      canvas.toBlob(
        (blob) => {
          setLoading(false);
          if (blob) {
            const url = URL.createObjectURL(blob);
            onAddFoto(url);
            setImageSrc(null);
            setActiveType(null);
          }
        },
        "image/webp",
        0.85
      );
    };
  }, [imageSrc, croppedAreaPixels, activeType, onAddFoto]);

  const handleCancel = () => {
    setImageSrc(null);
    setActiveType(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="mb-6">
      <span className="font-semibold text-base block mb-2 text-left w-full mt-8 md:mt-10" style={{color:'#B8B8D1'}}>
        {isPublica ? "Fotos Públicas" : "Fotos Privadas"}
      </span>
      <div className="grid grid-cols-3 gap-2 md:gap-7 w-full">
        {fotos.map((foto, idx) => (
          <div key={idx} className="aspect-[3/4] bg-neutral-800 rounded-xl flex items-center justify-center border-2 border-dashed border-gray-500 relative overflow-hidden group shadow-md md:hover:shadow-xl transition-all duration-200 md:scale-100 md:hover:scale-105 cursor-pointer">
            <Image
              src={foto}
              alt={`Foto ${idx + 1}`}
              width={300}
              height={300}
              className="object-cover w-full h-full"
            />
            {/* Relógio amarelo sobre a foto */}
            <span className="absolute top-1 right-1 bg-yellow-400 rounded-full p-1 flex items-center justify-center">
              <svg width="18" height="18" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </span>
            {/* Botão deletar */}
            <button onClick={() => onDeleteFoto(idx)} className="absolute top-2 left-2 bg-black/70 hover:bg-red-600 text-white rounded-full p-1.5 z-10 transition md:scale-110 md:hover:scale-125">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
            </button>
            {/* Botão definir como perfil */}
            <button onClick={() => onSetPerfil(foto)} className={`absolute bottom-2 right-2 rounded-full p-1.5 z-10 transition md:scale-110 md:hover:scale-125 ${fotoPerfil === foto ? 'bg-yellow-400 text-black' : 'bg-black/70 text-white hover:bg-yellow-400 hover:text-black'}`} title="Definir como foto de perfil">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"/></svg>
            </button>
          </div>
        ))}
        {podeAdicionar && (
          <div className="aspect-[3/4] bg-neutral-800 rounded-xl flex items-center justify-center cursor-pointer border-2 border-dashed border-gray-500 hover:border-pink-400 transition relative overflow-hidden shadow-md md:hover:shadow-xl md:scale-100 md:hover:scale-105">
            <label className="w-full h-full flex items-center justify-center cursor-pointer">
              <span className="text-3xl text-white">+</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
            {/* Modal de crop */}
            {imageSrc && activeType === (isPublica ? 'publica' : 'privada') && (
              <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                <div className="bg-neutral-900 rounded-2xl shadow-2xl p-6 flex flex-col items-center w-[95vw] max-w-[520px] md:p-10">
                  <span className="text-white font-bold text-lg mb-4">Ajuste sua foto</span>
                  <div className="relative w-[85vw] max-w-[420px] h-[85vw] max-h-[420px] bg-black rounded-lg overflow-hidden mb-6">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={0.5}
                      cropShape="rect"
                      showGrid={false}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                      minZoom={1}
                      maxZoom={3}
                      restrictPosition={true}
                    />
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-purple-500 my-6 md:my-8 md:h-3"
                  />
                  <div className="flex gap-4 w-full mt-4 md:mt-6">
                    <button
                      className="flex-1 py-3 md:py-4 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-bold text-base transition text-center"
                      onClick={showCroppedImage}
                      disabled={loading}
                    >
                      {loading ? "Cortando..." : "Cortar"}
                    </button>
                    <button
                      className="flex-1 py-3 md:py-4 bg-white/10 border border-white/30 rounded-lg text-white font-bold text-base transition text-center"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* Legenda de aprovação */}
      {(fotos.length > 0) && (
        <div className="flex items-center gap-2 mt-2 text-yellow-400 text-sm">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <span>Aguardando aprovação</span>
        </div>
      )}
    </div>
  );
}

/*
@keyframes gradient-move {
  0% { background-position: 0% 100%; }
  100% { background-position: 100% 0%; }
}
.animate-gradient-move { animation: gradient-move 6s ease-in-out infinite alternate; background-size: 200% 200%; }
*/ 