"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Cropper from 'react-easy-crop';
import './perfil.css';
import Modal from 'react-modal';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useRouter } from "next/navigation";

// Função para calcular idade
function calcularIdade(dataNascimento) {
  const hoje = new Date();
  const nasc = new Date(dataNascimento);
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const m = hoje.getMonth() - nasc.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
    idade--;
  }
  return idade;
}

// Função para calcular signo
function getSigno(data) {
  const d = new Date(data);
  const dia = d.getDate();
  const mes = d.getMonth() + 1;
  const signos = [
    "Capricórnio", "Aquário", "Peixes", "Áries", "Touro", "Gêmeos", "Câncer", "Leão", "Virgem", "Libra", "Escorpião", "Sagitário", "Capricórnio"
  ];
  const datas = [20, 19, 20, 20, 21, 21, 22, 22, 22, 22, 21, 21];
  return dia <= datas[mes - 1] ? signos[mes - 1] : signos[mes];
}

const user = {
  nomeCompleto: "Rias Gremory",
  dataNascimento: "1999-01-01",
  genero: "feminino",
  estadoCivil: "solteiro",
  cidade: "São Luiz",
  estado: "MA",
  pais: "Brasil",
  profissao: "Empreendedora",
  biografia: "Apaixonada por novas experiências, viagens e bons momentos. Sempre buscando evoluir e conhecer pessoas interessantes.",
  interesses: ["Viajar", "Gastronomia", "Arte", "Tecnologia"],
  escolaridade: "Ensino médio",
  temFilhos: false,
  querFilhos: true,
  tipoFisico: "Magra",
  altura: 168,
  faixaRenda: "100mil_200mil",
  idiomas: ["Português", "Inglês"],
  dispostoMudar: true,
  oQueBusca: ["Relacionamento sério", "Amizade"],
  papelSugar: "sugar_baby",
  procuraPor: ["Relacionamento sério", "Amizade"],
  preferenciaIdade: { min: 25, max: 40 },
  fotos: ["/perfil-exemplo.png"],
  statusVerificacao: "verificado",
};

const isPagante = true; // Troque para false para testar não pagante

const initialFotosPublicas = [
  { id: '1', url: '/perfil-exemplo.png', isMain: true },
  { id: '2', url: '/perfil-exemplo.png', isMain: false },
  { id: '3', url: '/perfil-exemplo.png', isMain: false },
];
const initialFotosPrivadas = [
  { id: '4', url: '/perfil-exemplo.png' },
  { id: '5', url: '/perfil-exemplo.png' },
];

export default function Perfil() {
  const router = useRouter();
  const [fotosPublicas, setFotosPublicas] = useState(initialFotosPublicas);
  const [fotosPrivadas, setFotosPrivadas] = useState(initialFotosPrivadas);
  const [fotoPerfil, setFotoPerfil] = useState<string | null>(initialFotosPublicas.find(f => f.isMain)?.url || null);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImage, setCropImage] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [pendingIsPublica, setPendingIsPublica] = useState(true);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{id: string, isPublica: boolean} | null>(null);
  const [rotate, setRotate] = useState(0);
  const [modalIndex, setModalIndex] = useState<number>(0);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const bannerFotos = [...fotosPublicas, ...fotosPrivadas];

  const [sliderRefPublic, sliderPublic] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 2.5, spacing: 12 },
    mode: 'free',
    rubberband: true,
    breakpoints: {
      '(max-width: 640px)': { slides: { perView: 1.2, spacing: 8 } },
      '(max-width: 900px)': { slides: { perView: 2, spacing: 8 } },
    },
  });
  const [sliderRefPrivate, sliderPrivate] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 2.5, spacing: 12 },
    mode: 'free',
    rubberband: true,
    breakpoints: {
      '(max-width: 640px)': { slides: { perView: 1.2, spacing: 8 } },
      '(max-width: 900px)': { slides: { perView: 2, spacing: 8 } },
    },
  });

  // Simular loading inicial
  useEffect(() => {
    setTimeout(() => setLoadingInitial(false), 1000);
  }, []);

  // Limite de fotos
  const maxFotosPublicas = 9;
  const maxFotosPrivadas = 9;

  const handleAddFoto = (e: React.ChangeEvent<HTMLInputElement>, isPublica: boolean) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    if (isPublica) setFotosPublicas(f => [...f, { id: Date.now().toString(), url, isMain: false }]);
    else setFotosPrivadas(f => [...f, { id: Date.now().toString(), url }]);
    setMsg('Foto adicionada!');
    setTimeout(() => setMsg(null), 2000);
  };
  const handleDeleteFoto = (id: string, isPublica: boolean) => {
    setConfirmDelete({id, isPublica});
  };
  const handleSetPerfil = (id: string) => {
    setFotosPublicas(f => f.map(foto => ({ ...foto, isMain: foto.id === id })));
    setFotoPerfil(fotosPublicas.find(f => f.id === id)?.url || null);
    setMsg('Foto principal alterada!');
    setTimeout(() => setMsg(null), 2000);
  };
  const handlePreview = (url: string) => {
    setModalImg(url);
    setModalOpen(true);
  };

  const totalFotos = fotosPublicas.length + fotosPrivadas.length;
  const maxFotos = isPagante ? 9 : 3;

  // Função para abrir crop ao selecionar imagem
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, isPublica: boolean) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Apenas imagens são permitidas.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('A imagem deve ter no máximo 5MB.');
      return;
    }
    if (isPublica && fotosPublicas.length >= maxFotosPublicas) {
      setErrorMsg('Limite de 9 fotos públicas atingido.');
      return;
    }
    if (!isPublica && fotosPrivadas.length >= maxFotosPrivadas) {
      setErrorMsg('Limite de 9 fotos privadas atingido.');
      return;
    }
    const url = URL.createObjectURL(file);
    setCropImage(url);
    setCropModalOpen(true);
    setPendingIsPublica(isPublica);
    setRotate(0);
  };

  // Função para obter imagem croppada e rotacionada em webp
  async function getCroppedImg(imageSrc: string, cropPixels: any, rotate: number) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    canvas.width = cropPixels.width;
    canvas.height = cropPixels.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.save();
    if (rotate !== 0) {
      ctx.translate(canvas.width / 2, canvas.height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.translate(-canvas.width / 2, -canvas.height / 2);
    }
    ctx.drawImage(
      image,
      cropPixels.x,
      cropPixels.y,
      cropPixels.width,
      cropPixels.height,
      0,
      0,
      cropPixels.width,
      cropPixels.height
    );
    ctx.restore();
    return new Promise<string>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const croppedUrl = URL.createObjectURL(blob);
          resolve(croppedUrl);
        }
      }, 'image/webp');
    });
  }
  function createImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      img.addEventListener('load', () => resolve(img));
      img.addEventListener('error', error => reject(error));
      img.setAttribute('crossOrigin', 'anonymous');
      img.src = url;
    });
  }

  // Ao confirmar crop
  const handleCropConfirm = async () => {
    if (!cropImage || !croppedAreaPixels) return;
    setLoading(true);
    try {
      const croppedUrl = await getCroppedImg(cropImage, croppedAreaPixels, rotate);
      if (pendingIsPublica) setFotosPublicas(f => [...f, { id: Date.now().toString(), url: croppedUrl, isMain: false }]);
      else setFotosPrivadas(f => [...f, { id: Date.now().toString(), url: croppedUrl }]);
      setCropModalOpen(false);
      setCropImage(null);
      setMsg('Foto adicionada!');
      setTimeout(() => setMsg(null), 2000);
    } catch {
      setErrorMsg('Erro ao recortar a imagem.');
    } finally {
      setLoading(false);
    }
  };

  // Confirmação de exclusão
  const confirmDeleteFoto = () => {
    if (!confirmDelete) return;
    if (confirmDelete.isPublica) setFotosPublicas(f => f.filter(foto => foto.id !== confirmDelete.id));
    else setFotosPrivadas(f => f.filter(foto => foto.id !== confirmDelete.id));
    setMsg('Foto removida!');
    setTimeout(() => setMsg(null), 2000);
    setConfirmDelete(null);
  };

  // Navegação entre fotos no modal
  const openModalAt = (idx: number, isPublica: boolean) => {
    setModalIndex(idx);
    setModalOpen(true);
  };
  const fotosAtuais = modalOpen && modalImg ? (modalIndex < fotosPublicas.length ? fotosPublicas : fotosPrivadas) : [];

  // Placeholder para quando não há fotos
  const renderFotos = (fotos: any[], isPublica: boolean) =>
    fotos.length === 0 ? (
      <div className="flex items-center justify-center w-full h-[160px] text-gray-500 italic">Nenhuma foto {isPublica ? 'pública' : 'privada'}.</div>
    ) : null;

  // Mock de notificações
  const notifications = {
    visualizacoes: 3,
    mensagens: 5,
    favoritos: 2,
  };

  // Ícones SVG universais
  const icons = {
    home: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path d="M3 11.5L12 4l9 7.5V20a2 2 0 0 1-2 2h-3.5a.5.5 0 0 1-.5-.5V16a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v5.5a.5.5 0 0 1-.5.5H5a2 2 0 0 1-2-2V11.5z" strokeLinejoin="round"/><path d="M9 22V16h6v6" strokeLinejoin="round"/></svg>
    ),
    perfil: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 8-6 8-6s8 2 8 6"/></svg>
    ),
    visualizacoes: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>
    ),
    mensagem: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    ),
    favorito: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path d="M12 21c-.3 0-.6-.1-.8-.3l-6.6-6.6A5.5 5.5 0 0 1 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 1.61-.62 3.16-1.6 4.37l-6.6 6.63c-.2.2-.5.3-.8.3z"/></svg>
    ),
    sair: (
      <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2"><path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 4v16a2 2 0 0 0 2 2h7" strokeLinecap="round"/></svg>
    ),
  };

  // Barra de navegação
  const navItems = [
    { key: 'home', label: 'Home', icon: icons.home, onClick: () => router.push('/') },
    { key: 'perfil', label: 'Perfil', icon: icons.perfil, onClick: () => router.push('/perfil') },
    { key: 'visualizacoes', label: 'Visualizações', icon: icons.visualizacoes, badge: notifications.visualizacoes },
    { key: 'mensagem', label: 'Mensagem', icon: icons.mensagem, badge: notifications.mensagens },
    { key: 'favorito', label: 'Favoritamento', icon: icons.favorito, badge: notifications.favoritos },
    { key: 'sair', label: 'Sair', icon: icons.sair, onClick: () => {/* lógica de logout */} },
  ];

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center relative overflow-x-hidden font-sans">
      <div className="fixed top-0 left-0 w-full h-[30vh] z-0 bg-black" />
      <div className="relative w-full md:max-w-[480px] mx-auto flex flex-col items-center">
        {/* Banner/Capa */}
        <div className="relative w-full max-w-[480px] aspect-[3/4] bg-black flex items-end justify-center rounded-t-2xl overflow-hidden animate-fade-in" style={{ boxShadow: '0 4px 16px rgba(61, 39, 107, 0.08)' }}>
          {bannerFotos.length > 0 ? (
            <>
              <Image
                src={bannerFotos[bannerIndex]?.url}
                alt="Banner do perfil"
                fill
                className="object-cover object-center w-full h-full cursor-pointer"
                priority
                onClick={() => setBannerModalOpen(true)}
              />
              {/* Overlay degradê preto na base do banner */}
              <div
                className="absolute bottom-0 left-0 w-full"
                style={{
                  height: '75%',
                  background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
                  pointerEvents: 'none',
                  zIndex: 10
                }}
              />
              {/* Seta esquerda */}
              {bannerIndex > 0 && (
                <button onClick={() => setBannerIndex(i => Math.max(0, i - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 z-20 hover:bg-[#FF2800] transition">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
                </button>
              )}
              {/* Seta direita */}
              {bannerIndex < bannerFotos.length - 1 && (
                <button onClick={() => setBannerIndex(i => Math.min(bannerFotos.length - 1, i + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 z-20 hover:bg-[#FF2800] transition">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                </button>
              )}
              {/* Indicador visual de mais imagens */}
              {(bannerIndex < bannerFotos.length - 1) && (
                <span className="absolute right-8 bottom-4 text-xs text-white bg-[#FF2800] px-2 py-1 rounded-full z-10">→</span>
              )}
              {(bannerIndex > 0) && (
                <span className="absolute left-8 bottom-4 text-xs text-white bg-[#FF2800] px-2 py-1 rounded-full z-10">←</span>
              )}
            </>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500 italic">Nenhuma foto disponível</div>
          )}
          <div className="absolute top-4 left-4 z-40">
            <button className="flex flex-col gap-1 p-0 m-0 w-8 h-8 items-start justify-center" aria-label="Menu">
              <span className="block w-7 h-0.5 bg-white rounded transition-all duration-200"></span>
              <span className="block w-7 h-0.5 bg-white rounded transition-all duration-200"></span>
            </button>
          </div>
          <div className="absolute bottom-0 left-0 w-full flex flex-row items-end justify-between px-4 pb-4 z-20 gap-2">
            <div className="flex flex-col gap-1">
              <span className="font-extrabold text-2xl leading-tight tracking-tight drop-shadow-lg text-white flex items-center gap-2">
                {user.nomeCompleto}
                {user.statusVerificacao === "verificado" && (
                  <span className="ml-1 text-lg" title="Verificado">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M5 13l4 4L19 7" stroke="#FF2800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </span>
              <span className="text-base flex items-center gap-1 font-bold drop-shadow-lg" style={{ color: '#FF2800' }}>
                {calcularIdade(user.dataNascimento)} anos
              </span>
              <span className="mt-1 text-base font-semibold drop-shadow-lg text-gray-200 capitalize">
                {user.genero === "feminino" ? "Feminino" : "Masculino"} • {user.estadoCivil.charAt(0).toUpperCase() + user.estadoCivil.slice(1)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span className="flex items-center gap-2 text-base font-semibold drop-shadow-lg text-gray-200">
                {user.cidade}, {user.estado} - {user.pais}
              </span>
              <span className="flex items-center gap-2 text-base font-semibold drop-shadow-lg text-gray-200">
                {user.profissao}
              </span>
              <button
                className="mt-2 px-4 py-1 rounded-full text-white text-xs font-semibold shadow hover:brightness-110 transition-all duration-200"
                style={{ background: '#FF2800', boxShadow: '0 4px 16px rgba(61, 39, 107, 0.08)' }}
                onClick={() => router.push('/perfil/editar')}
              >
                Editar perfil
              </button>
            </div>
          </div>
          {/* Barra de navegação sobre o banner */}
          <div className="absolute top-3 right-3 z-30 flex flex-col items-center gap-1">
            {navItems.map((item, idx) => (
              <button
                key={item.key}
                aria-label={item.label}
                onClick={item.onClick}
                className="relative flex items-center justify-center w-7 h-7 rounded-full hover:bg-[#FF2800]/80 transition group"
                tabIndex={0}
              >
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 rounded-full bg-[#FF2800] text-white text-[10px] font-bold border-2 border-black">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Card principal refinado */}
        <div className="relative w-full max-w-[480px] pb-4 px-3 flex flex-col items-center z-20 text-white border-2 border-transparent rounded-2xl bg-[#18181b] bg-clip-padding transition-all duration-300 hover:shadow-2xl hover:brightness-105 overflow-visible mt-0 -mt-6"
          style={{
            boxShadow: "0 4px 16px rgba(61, 39, 107, 0.08)"
          }}
        >
          <div className="h-4 md:h-6" />
          {/* Biografia e interesses */}
          <div className="w-full flex flex-col md:flex-row md:gap-8">
            <div className="flex-1 mb-3 md:mb-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-base text-gray-400">Sobre Mim</span>
              </div>
              <p className="text-base text-white opacity-80">{user.interesses.join(", ")}</p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-base text-gray-400">O que Busca</span>
              </div>
              <p className="text-base text-white opacity-80">{user.biografia}</p>
            </div>
          </div>
          {/* Grid de campos principais */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-[15px] mt-4">
            <div>
              <span className="font-semibold text-base text-gray-300">Escolaridade:</span>
              <div className="font-bold text-base text-white">{user.escolaridade}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Filhos:</span>
              <div className="font-bold text-base text-white">{user.temFilhos ? "Sim" : "Não"}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Quer filhos:</span>
              <div className="font-bold text-base text-white">{user.querFilhos ? "Sim" : "Não"}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Tipo físico:</span>
              <div className="font-bold text-base text-white">{user.tipoFisico}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Altura:</span>
              <div className="font-bold text-base text-white">{user.altura} cm</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Faixa de renda:</span>
              <div className="font-bold text-base text-white">{user.faixaRenda.replace(/_/g, " a ")}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Idiomas:</span>
              <div className="font-bold text-base text-white">{user.idiomas.join(", ")}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Disposto a mudar:</span>
              <div className="font-bold text-base text-white">{user.dispostoMudar ? "Sim" : "Não"}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Signo:</span>
              <div className="font-bold text-base text-white">{getSigno(user.dataNascimento)}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">O que busca:</span>
              <div className="font-bold text-base text-white">{user.oQueBusca.join(", ")}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Papel:</span>
              <div className="font-bold text-base text-white">{user.papelSugar === "sugar_baby" ? "Sugar Baby" : user.papelSugar === "sugar_daddy" ? "Sugar Daddy" : "Sugar Mommy"}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Procura por:</span>
              <div className="font-bold text-base text-white">{user.procuraPor.join(", ")}</div>
            </div>
            <div>
              <span className="font-semibold text-base text-gray-300">Faixa de idade desejada:</span>
              <div className="font-bold text-base text-white">{user.preferenciaIdade.min} - {user.preferenciaIdade.max} anos</div>
            </div>
          </div>
          {/* Seções de fotos públicas e privadas agora dentro do card */}
          {/*
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
          */}
        </div>
        {/* Seção de fotos ao final */}
        <div className="w-full max-w-[480px] mt-8 mb-8 px-3 flex flex-col items-center z-10">
          <h2 className="text-xl font-bold text-gray-400 mb-4">Minhas Fotos</h2>
          {msg && <div className="mb-2 text-green-400 font-semibold">{msg}</div>}
          <div className="w-full">
            <h3 className="text-base font-semibold text-gray-300 mb-2">Fotos Públicas</h3>
            <div ref={sliderRefPublic} className="keen-slider mb-6">
              {fotosPublicas.map((foto, idx) => (
                <div key={foto.id} className="keen-slider__slide relative rounded-2xl overflow-hidden shadow-md bg-black border border-gray-800 flex items-center justify-center aspect-[3/4] min-w-[120px] max-w-[160px] h-auto group">
                  <Image src={foto.url} alt="Foto pública" width={120} height={160} className="object-cover w-full h-full cursor-pointer" onClick={() => openModalAt(idx, true)} />
                  {foto.isMain && (
                    <span className="absolute bottom-2 right-2 bg-[#FF2800] text-white text-xs px-3 py-1 rounded-full shadow font-bold">Principal</span>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => handleSetPerfil(foto.id)} className="bg-[#FF2800] text-white p-1 rounded-full shadow mx-1" title="Definir como principal" aria-label="Definir como principal">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24"><path stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <button onClick={() => handleDeleteFoto(foto.id, true)} className="bg-red-500 text-white p-1 rounded-full shadow mx-1" title="Excluir" aria-label="Excluir foto">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-3 flex justify-end mt-2">
              <label className="cursor-pointer text-[#FF2800] font-bold text-base hover:underline">
                + Foto Pública
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, true)} aria-label="Adicionar foto pública" />
              </label>
            </div>
          </div>
          <div className="w-full mt-4">
            <h3 className="text-base font-semibold text-gray-300 mb-2">Fotos Privadas</h3>
            <div ref={sliderRefPrivate} className="keen-slider">
              {fotosPrivadas.map((foto, idx) => (
                <div key={foto.id} className="keen-slider__slide relative rounded-2xl overflow-hidden shadow-md bg-black border border-gray-800 flex items-center justify-center aspect-[3/4] min-w-[120px] max-w-[160px] h-auto group">
                  <Image src={foto.url} alt="Foto privada" width={120} height={160} className="object-cover w-full h-full cursor-pointer" onClick={() => openModalAt(idx, false)} />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition">
                    <button onClick={() => handleDeleteFoto(foto.id, false)} className="bg-red-500 text-white p-1 rounded-full shadow mx-1" title="Excluir" aria-label="Excluir foto">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-3 flex justify-end mt-2">
              <label className="cursor-pointer text-[#FF2800] font-bold text-base hover:underline">
                + Foto Privada
                <input type="file" accept="image/*" className="hidden" onChange={e => handleFileChange(e, false)} aria-label="Adicionar foto privada" />
              </label>
            </div>
          </div>
        </div>
        {/* Modal de preview de foto */}
        {loadingInitial ? (
          <div className="w-full min-h-screen flex items-center justify-center bg-black text-white text-xl">Carregando perfil...</div>
        ) : errorMsg && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-[#FF2800] text-white px-4 py-2 rounded shadow z-[200]">{errorMsg}</div>
        )}
        {confirmDelete && (
          <Modal isOpen={!!confirmDelete} onRequestClose={() => setConfirmDelete(null)} ariaHideApp={false} overlayClassName="fixed inset-0 z-[120] bg-black/80 flex items-center justify-center" className="relative z-[130]">
            <div className="bg-black rounded-2xl p-6 max-w-[90vw] flex flex-col items-center">
              <div className="text-white text-lg mb-4">Tem certeza que deseja excluir esta foto?</div>
              <div className="flex gap-4">
                <button onClick={confirmDeleteFoto} className="px-4 py-2 rounded bg-[#FF2800] text-white font-bold">Excluir</button>
                <button onClick={() => setConfirmDelete(null)} className="px-4 py-2 rounded bg-gray-700 text-white font-bold">Cancelar</button>
              </div>
            </div>
          </Modal>
        )}
        {modalOpen && (
          <Modal isOpen={modalOpen} onRequestClose={() => setModalOpen(false)} ariaHideApp={false} overlayClassName="fixed inset-0 z-[90] bg-black/80 flex items-center justify-center" className="relative z-[100]">
            <div className="bg-black rounded-2xl p-4 max-w-[90vw] max-h-[90vh] flex flex-col items-center">
              <div className="flex items-center gap-4">
                <button disabled={modalIndex === 0} onClick={() => setModalIndex(i => Math.max(0, i - 1))} className="text-white text-2xl disabled:opacity-30">&#8592;</button>
                <Image src={fotosAtuais[modalIndex]?.url} alt="Preview" width={320} height={420} className="object-contain max-h-[70vh]" />
                <button disabled={modalIndex === fotosAtuais.length - 1} onClick={() => setModalIndex(i => Math.min(fotosAtuais.length - 1, i + 1))} className="text-white text-2xl disabled:opacity-30">&#8594;</button>
              </div>
              <button onClick={() => setModalOpen(false)} className="mt-4 px-4 py-2 rounded bg-[#FF2800] text-white font-bold">Fechar</button>
            </div>
          </Modal>
        )}
        {cropModalOpen && cropImage && (
          <Modal isOpen={cropModalOpen} onRequestClose={() => setCropModalOpen(false)} ariaHideApp={false} overlayClassName="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center" className="relative z-[110]">
            <div className="bg-black rounded-2xl p-4 max-w-[90vw] max-h-[90vh] flex flex-col items-center">
              <div className="relative w-[320px] h-[426px] bg-gray-900">
                <Cropper
                  image={cropImage}
                  crop={crop}
                  zoom={zoom}
                  aspect={3/4}
                  rotation={rotate}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={(_, croppedAreaPixels) => setCroppedAreaPixels(croppedAreaPixels)}
                />
              </div>
              <div className="flex gap-4 mt-4 items-center">
                <input type="range" min={1} max={3} step={0.01} value={zoom} onChange={e => setZoom(Number(e.target.value))} />
                <button onClick={() => setRotate(r => (r + 90) % 360)} className="px-3 py-2 rounded bg-gray-700 text-white font-bold">Girar 90°</button>
                <button onClick={handleCropConfirm} className="px-4 py-2 rounded bg-[#FF2800] text-white font-bold">Recortar</button>
                <button onClick={() => setCropModalOpen(false)} className="px-4 py-2 rounded bg-gray-700 text-white font-bold">Cancelar</button>
              </div>
            </div>
          </Modal>
        )}
        {bannerModalOpen && (
          <Modal isOpen={bannerModalOpen} onRequestClose={() => setBannerModalOpen(false)} ariaHideApp={false} overlayClassName="fixed inset-0 z-[95] bg-black/80 flex items-center justify-center" className="relative z-[105]">
            <div className="bg-black rounded-2xl p-4 max-w-[90vw] max-h-[90vh] flex flex-col items-center">
              <Image src={bannerFotos[bannerIndex]?.url || user.fotos[0]} alt="Banner expandido" width={480} height={640} className="object-contain max-h-[80vh]" />
              <button onClick={() => setBannerModalOpen(false)} className="mt-4 px-4 py-2 rounded bg-[#FF2800] text-white font-bold">Fechar</button>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
} 