"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import Image from "next/image";

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

export default function CadastroFotosHomemPage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result as string));
      reader.readAsDataURL(file);
      setCroppedImage(null);
    }
  };

  const showCroppedImage = useCallback(() => {
    if (!imageSrc || !croppedAreaPixels) return;
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
            setCroppedImage(url);
          }
        },
        "image/webp",
        0.85
      );
    };
  }, [imageSrc, croppedAreaPixels]);

  const handleCancel = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <main className="relative min-h-screen w-full font-sans">
      {/* Background image escurecida */}
      <div className="absolute inset-0 -z-10">
        <Image src="/main_impact.png" alt="Fundo" fill className="object-cover w-full h-full" priority />
        {/* Overlay preto para escurecer */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
      </div>
      {/* Header */}
      <header className="flex items-center justify-between px-4 pt-6">
        <button className="text-white mr-2" aria-label="Menu">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><rect y="5" width="24" height="2" rx="1" fill="currentColor"/><rect y="11" width="24" height="2" rx="1" fill="currentColor"/><rect y="17" width="24" height="2" rx="1" fill="currentColor"/></svg>
        </button>
        <div className="flex-1 flex justify-center">
          <span className="text-2xl font-extrabold text-white tracking-tight font-sans">BeBaby</span>
        </div>
        <button className="text-white ml-2" aria-label="Usuário">
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/></svg>
        </button>
      </header>
      {/* Caixa de Fotos */}
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md bg-black/70 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 mt-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <h2 className="text-white text-xl font-bold text-center">Cadastro de usuário</h2>
            <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white"><circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/><path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/></svg>
          </div>
          <p className="text-white text-base font-medium mb-1">Insira sua foto de Perfil.</p>
          <p className="text-xs mb-2"><span className="text-yellow-400 font-bold">Aviso:</span> <span className="text-white/90">Tire uma foto com boa qualidade ou escolha sua melhor foto. Fotos de perfil só podem ser alteradas com autorização dos ADM</span></p>
          {/* Upload de foto com crop */}
          <div className="mb-4">
            {!imageSrc && !croppedImage && (
              <label className="w-full h-48 bg-black/40 border border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition hover:bg-black/60">
                <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="text-white/40 mb-2"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
                <span className="text-white/70 text-sm">Clique para adicionar sua foto de perfil.</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
            )}
            {imageSrc && !croppedImage && (
              <>
                <div className="relative w-full h-48 bg-black rounded-lg overflow-hidden">
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / 2}
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
                <div className="flex flex-col items-center gap-3 mt-3">
                  <input
                    type="range"
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full accent-purple-500 mb-2"
                  />
                  <div className="flex gap-2 w-full">
                    <button
                      className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition text-sm"
                      onClick={showCroppedImage}
                      disabled={loading}
                    >
                      {loading ? "Cortando..." : "Cortar"}
                    </button>
                    <button
                      className="flex-1 py-2 bg-white/10 border border-white/30 rounded-lg text-white font-medium transition text-sm"
                      onClick={handleCancel}
                      disabled={loading}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </>
            )}
            {croppedImage && (
              <div className="flex flex-col items-center gap-3">
                <div className="w-24 h-48 rounded-lg overflow-hidden border border-white/20 bg-black">
                  <Image src={croppedImage} alt="Preview" width={64} height={128} className="object-cover w-full h-full" />
                </div>
                <button
                  className="mt-2 py-2 px-4 bg-white/10 border border-white/30 rounded-lg text-white font-medium transition text-sm"
                  onClick={handleCancel}
                >
                  Trocar Foto
                </button>
              </div>
            )}
          </div>
          <div>
            <p className="text-white text-sm mb-4 text-center">Abaixo alguns exemplos de &quot;ângulos&quot; que irão te destacar mais dentro da plataforma.</p>
            <div className="flex justify-center items-center gap-4">
              <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                <Image src="/exemplo5.png" alt="Exemplo 1" width={64} height={128} className="object-cover w-full h-full object-center" />
              </div>
              <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                <Image src="/exemplo6.png" alt="Exemplo 2" width={64} height={128} className="object-cover w-full h-full object-center" />
              </div>
              <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                <Image src="/exemplo7.png" alt="Exemplo 3" width={64} height={128} className="object-cover w-full h-full object-center" />
              </div>
              <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                <Image src="/exemplo8.png" alt="Exemplo 4" width={64} height={128} className="object-cover w-full h-full object-center" />
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <p className="text-white text-sm font-medium">Dicas de fotos:</p>
              <ul className="text-white/90 text-xs space-y-1">
                <li>• Use fotos verticais, nítidas e com boa luz (natural de preferência)</li>
                <li>• Evite filtros pesados e fundos bagunçados</li>
                <li>• Sempre sorrir ou manter expressão confiante — nada de "cara fechada misteriosa"</li>
                <li>• Proibido fotos de roupas sensuais ou nudes explícita</li>
              </ul>
            </div>
          </div>
          <button className="w-full py-3 mt-6 bg-white/10 border border-white/30 rounded-xl text-white text-base font-medium tracking-wide shadow-lg backdrop-blur-sm">Finalizar cadastro</button>
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-4">
        Você pode clicar em &quot;Entrar&quot; para acessar.
      </p>
    </main>
  );
}
