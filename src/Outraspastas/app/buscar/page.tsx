// Arquivo: app/buscar/page.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaMapMarkerAlt, FaLocationArrow, FaCity, FaSearch, FaUser } from "react-icons/fa";
import FundoAnimado from "../components/FundoAnimado";

export default function Buscar() {
  const router = useRouter();
  const distancias = [10, 20, 30, 50, 100, 200, 500, 1000, "País inteiro"];
  const [distanciaIndex, setDistanciaIndex] = useState(0);
  const balaoRef = useRef<HTMLDivElement>(null);
  const [idadeMin, setIdadeMin] = useState(18);
  const [idadeMax, setIdadeMax] = useState(99);
  const [rotacaoMin, setRotacaoMin] = useState(0);
  const [rotacaoMax, setRotacaoMax] = useState(0);
  const [isDraggingMin, setIsDraggingMin] = useState(false);
  const [isDraggingMax, setIsDraggingMax] = useState(false);
  const dialMinRef = useRef<HTMLDivElement>(null);
  const dialMaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = balaoRef.current;
    if (el) {
      el.style.left = `calc(${(distanciaIndex / (distancias.length - 1)) * 100}% - 32px)`;
    }
  }, [distanciaIndex]);

  const handleMouseDown = (tipo: 'min' | 'max') => (e: React.MouseEvent) => {
    if (tipo === 'min') setIsDraggingMin(true);
    else setIsDraggingMax(true);
  };

  const handleMouseUp = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDraggingMin && !isDraggingMax) return;
    const dial = isDraggingMin ? dialMinRef.current : dialMaxRef.current;
    if (!dial) return;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * (180 / Math.PI);
    const normalizedAngle = (angle + 360) % 360;
    const newValue = Math.round(18 + (normalizedAngle / 360) * 81);
    if (isDraggingMin && newValue < idadeMax - 1) {
      setIdadeMin(newValue);
      setRotacaoMin(normalizedAngle);
    } else if (isDraggingMax && newValue > idadeMin + 1) {
      setIdadeMax(newValue);
      setRotacaoMax(normalizedAngle);
    }
  };

  // Funções para touch
  const handleTouchStart = (tipo: 'min' | 'max') => (e: React.TouchEvent) => {
    e.preventDefault();
    if (tipo === 'min') setIsDraggingMin(true);
    else setIsDraggingMax(true);
  };

  const handleTouchEnd = () => {
    setIsDraggingMin(false);
    setIsDraggingMax(false);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDraggingMin && !isDraggingMax) return;
    const dial = isDraggingMin ? dialMinRef.current : dialMaxRef.current;
    if (!dial) return;
    const rect = dial.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const touch = e.touches[0];
    const angle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * (180 / Math.PI);
    const normalizedAngle = (angle + 360) % 360;
    const newValue = Math.round(18 + (normalizedAngle / 360) * 81);
    if (isDraggingMin && newValue < idadeMax - 1) {
      setIdadeMin(newValue);
      setRotacaoMin(normalizedAngle);
    } else if (isDraggingMax && newValue > idadeMin + 1) {
      setIdadeMax(newValue);
      setRotacaoMax(normalizedAngle);
    }
  };

  useEffect(() => {
    if (isDraggingMin || isDraggingMax) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDraggingMin, isDraggingMax, idadeMin, idadeMax]);

  const [isPremium, setIsPremium] = useState(false);

  return (
    <main className="relative min-h-screen w-full font-sans">
      <FundoAnimado />
      <div className="flex flex-col items-center justify-center min-h-screen px-2 py-4">
        <div className="w-full max-w-sm bg-black/60 backdrop-blur-lg rounded-xl p-4 shadow-xl flex flex-col gap-6 mt-4 border border-white/10">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h2 className="text-white text-lg font-bold text-center">Buscar usuários</h2>
            <FaSearch className="text-white text-base" />
          </div>
          {/* Slider de distância */}
          <div className="w-full relative mb-2">
            <label className="block mb-1 text-sm font-medium flex items-center gap-2 text-white">
              <FaMapMarkerAlt className="text-purple-400" /> Distância máxima
            </label>
            <div
              ref={balaoRef}
              className="absolute -top-7 z-50 text-xs font-bold text-white bg-purple-600/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-lg transition-all duration-200"
            >
              {typeof distancias[distanciaIndex] === "number" ? `${distancias[distanciaIndex]} km` : "País inteiro"}
            </div>
            <input
              type="range"
              min={0}
              max={distancias.length - 1}
              step={1}
              value={distanciaIndex}
              onChange={e => setDistanciaIndex(Number(e.target.value))}
              className="w-full h-2 bg-gray-700/50 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-[10px] mt-1 text-gray-300">
              <span>10 km</span>
              <span>País inteiro</span>
            </div>
          </div>
          {/* Dials de idade compactos */}
          <div className="w-full mb-2">
            <label className="block mb-2 text-sm font-medium flex items-center gap-2 text-white">
              <FaUser className="text-purple-400" /> Faixa de idade
            </label>
            <div className="flex justify-center gap-4">
              {/* Dial Idade Mínima */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-purple-300 mb-1">Mín</div>
                <div 
                  ref={dialMinRef}
                  className="relative w-24 h-24 cursor-pointer group"
                  onMouseDown={handleMouseDown('min')}
                  onTouchStart={handleTouchStart('min')}
                >
                  {/* Efeito de partículas */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-500/20 via-transparent to-transparent animate-pulse" />
                  </div>
                  {/* Dial principal */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Anéis concêntricos animados */}
                    <div className="absolute inset-2 rounded-full border border-purple-500/20 animate-spin-slow" />
                    {/* Número central */}
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg">
                        {idadeMin}
                      </div>
                      <div className="text-[10px] text-purple-300 text-center mt-0.5 tracking-wider">ANOS</div>
                    </div>
                    {/* Marcador giratório */}
                    <div 
                      className="absolute w-0.5 h-6 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent -top-3 left-1/2 transform -translate-x-1/2 origin-bottom"
                      style={{ transform: `rotate(${rotacaoMin}deg) translateY(-16px)` }}
                    />
                    <div 
                      className="absolute w-2 h-2 rounded-full -top-0.5 left-1/2 transform -translate-x-1/2"
                      style={{ 
                        transform: `rotate(${rotacaoMin}deg) translateY(-16px)`,
                        background: 'radial-gradient(circle at center, rgba(168,85,247,0.8) 0%, rgba(168,85,247,0) 70%)'
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Dial Idade Máxima */}
              <div className="flex flex-col items-center">
                <div className="text-xs text-purple-300 mb-1">Máx</div>
                <div 
                  ref={dialMaxRef}
                  className="relative w-24 h-24 cursor-pointer group"
                  onMouseDown={handleMouseDown('max')}
                  onTouchStart={handleTouchStart('max')}
                >
                  {/* Efeito de partículas */}
                  <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-pink-500/20 via-transparent to-transparent animate-pulse" />
                  </div>
                  {/* Dial principal */}
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
                    {/* Anéis concêntricos animados */}
                    <div className="absolute inset-2 rounded-full border border-pink-500/20 animate-spin-slow-reverse" />
                    {/* Número central */}
                    <div className="relative z-10">
                      <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 drop-shadow-lg">
                        {idadeMax}
                      </div>
                      <div className="text-[10px] text-purple-300 text-center mt-0.5 tracking-wider">ANOS</div>
                    </div>
                    {/* Marcador giratório */}
                    <div 
                      className="absolute w-0.5 h-6 bg-gradient-to-b from-purple-500 via-pink-500 to-transparent -top-3 left-1/2 transform -translate-x-1/2 origin-bottom"
                      style={{ transform: `rotate(${rotacaoMax}deg) translateY(-16px)` }}
                    />
                    <div 
                      className="absolute w-2 h-2 rounded-full -top-0.5 left-1/2 transform -translate-x-1/2"
                      style={{ 
                        transform: `rotate(${rotacaoMax}deg) translateY(-16px)`,
                        background: 'radial-gradient(circle at center, rgba(236,72,153,0.8) 0%, rgba(236,72,153,0) 70%)'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Ações de localização */}
          <div className="flex flex-col gap-2 w-full mb-1">
            <button
              onClick={() => {
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    () => alert("Localização atualizada!"),
                    () => alert("Não foi possível obter sua localização.")
                  );
                } else {
                  alert("Geolocalização não suportada.");
                }
              }}
              className="w-full flex items-center justify-center gap-2 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white py-2 px-3 rounded-full font-medium shadow transition text-sm"
            >
              <FaLocationArrow className="text-xs" /> Atualizar minha localização
            </button>
            <button
              onClick={() => {
                if (isPremium) alert("Buscar em outras cidades");
                else router.push("/upgrade");
              }}
              className="w-full flex items-center justify-center gap-2 bg-purple-600/80 hover:bg-purple-700/80 backdrop-blur-sm text-white py-2 px-3 rounded-full font-medium shadow transition text-sm"
            >
              <FaCity className="text-xs" /> Ver em outras cidades
            </button>
          </div>
          {/* Filtros visuais bonitos */}
          <div className="w-full">
            <h2 className="font-semibold mb-1 text-purple-200 text-center text-base">Filtre por perfil</h2>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
              {["Loira", "Ruiva", "Morena", "Branca", "Magra", "Gorda", "Alta", "Baixa"].map((filtro) => (
                <div
                  key={filtro}
                  className="relative h-16 rounded-xl overflow-hidden shadow bg-cover bg-center group cursor-pointer transition-transform hover:scale-105"
                  style={{ backgroundImage: `url(/img/filtro-${filtro.toLowerCase()}.jpg)` }}
                >
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center group-hover:bg-black/80 transition">
                    <span className="text-white font-semibold text-xs drop-shadow-lg">{filtro}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Botão Buscar grande e animado */}
          <div className="w-full mt-2">
            <button
              onClick={() => alert("Buscar...")}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-700/80 hover:to-pink-700/80 backdrop-blur-sm text-white py-2 rounded-full text-base font-medium shadow-lg transition-transform hover:scale-105"
            >
              <FaSearch className="text-sm" /> Buscar
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
