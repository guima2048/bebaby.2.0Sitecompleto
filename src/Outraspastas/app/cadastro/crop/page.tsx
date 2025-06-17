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

export default function CropPage() {
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
    <main className="relative min-h-screen w-full font-sans flex flex-col items-center justify-center bg-black">
      <div className="w-full max-w-md bg-black/80 rounded-2xl p-6 shadow-2xl flex flex-col gap-6 mt-10">
        <h2 className="text-white text-xl font-bold text-center mb-2">Ajuste sua foto de perfil</h2>
        {!imageSrc && (
          <label className="w-full h-48 bg-black/40 border border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition hover:bg-black/60 mb-4">
            <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="text-white/40 mb-2"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/></svg>
            <span className="text-white/70 text-sm">Trocar Foto</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        )}
        {imageSrc && !croppedImage && (
          <div className="relative w-full h-80 bg-black rounded-lg overflow-hidden">
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
        )}
        {imageSrc && !croppedImage && (
          <div className="flex flex-col gap-3 mt-4">
            <input
              type="range"
              min={1}
              max={3}
              step={0.01}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="flex gap-2">
              <button
                className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition"
                onClick={showCroppedImage}
                disabled={loading}
              >
                {loading ? "Cortando..." : "Cortar"}
              </button>
              <button
                className="flex-1 py-2 bg-white/10 border border-white/30 rounded-lg text-white font-medium transition"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
        {croppedImage && (
          <div className="flex flex-col items-center gap-3 mt-4">
            <span className="text-white text-sm">Preview:</span>
            <div className="w-24 h-48 rounded-lg overflow-hidden border border-white/20 bg-black">
              <Image src={croppedImage} alt="Preview" width={64} height={128} className="object-cover w-full h-full" />
            </div>
            <button
              className="mt-2 py-2 px-4 bg-white/10 border border-white/30 rounded-lg text-white font-medium transition"
              onClick={handleCancel}
            >
              Trocar Foto
            </button>
          </div>
        )}
      </div>
    </main>
  );
} 