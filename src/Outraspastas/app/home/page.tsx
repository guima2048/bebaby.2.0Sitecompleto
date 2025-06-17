"use client";
import React, { useState } from "react";
import Image from "next/image";

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

const fotos = [
  "/exemplo5.png",
  "/exemplo6.png",
  "/exemplo7.png",
  "/exemplo8.png"
];

interface SectionGridProps {
  title: string;
  images: string[];
  names: string[];
}

function SectionGrid({ title, images, names }: SectionGridProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-1 px-1">
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <button className="text-sm text-gray-500">Ver mais</button>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div key={index} className="aspect-square rounded-lg overflow-hidden">
            <Image
              src={image}
              alt={names[index]}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UsuarioPerfil() {
  const [fotoIndex, setFotoIndex] = useState(0);

  const handlePrev = () => setFotoIndex((idx) => (idx === 0 ? fotos.length - 1 : idx - 1));
  const handleNext = () => setFotoIndex((idx) => (idx === fotos.length - 1 ? 0 : idx + 1));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setFotoIndex((idx) => (idx === fotos.length - 1 ? 0 : idx + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#120015] flex flex-col items-center pb-24">
      {/* Menu hambúrguer de 2 linhas, canto superior esquerdo */}
      <div className="absolute top-4 left-4 z-40">
        <button className="flex flex-col gap-1 p-0 m-0 w-8 h-8 items-start justify-center" aria-label="Menu">
          <span className="block w-7 h-0.5 bg-white rounded"></span>
          <span className="block w-7 h-0.5 bg-white rounded"></span>
        </button>
      </div>
      {/* Banner/Capa 3x4 com overlay de degradê escuro */}
      <div className="relative w-full aspect-[3/4] bg-[#120015] flex items-end justify-center overflow-hidden p-0 m-0">
        <Image
          src={fotos[fotoIndex]}
          alt="Banner do perfil"
          fill
          className="object-cover object-center w-full h-full"
          priority
        />
        {/* Overlay de degradê escuro */}
        <div className="absolute bottom-0 left-0 w-full h-[60%] pointer-events-none"
          style={{
            background: "linear-gradient(to top, #120015 0%, rgba(18,0,21,0.85) 40%, rgba(18,0,21,0) 100%)"
          }}
        />
        {/* Botões de navegação de fotos */}
        {fotos.length > 1 && (
          <>
            <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 z-20 hover:bg-black/70 transition">
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 rounded-full p-2 z-20 hover:bg-black/70 transition">
              <svg width="20" height="20" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>
            </button>
          </>
        )}
        {/* Barra lateral de ações */}
        <div className="absolute top-4 right-2 flex flex-col gap-2 z-30 items-end">
          {/* Home */}
          <div className="relative flex items-center justify-center w-[22px] h-[22px]">
            <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 12l9-9 9 9" />
              <path d="M9 21V9h6v12" />
            </svg>
          </div>
          {/* Mensagem */}
          <div className="relative flex items-center justify-center w-[22px] h-[22px]">
            <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-purple-700 text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">3</span>
          </div>
          {/* Visualizações */}
          <div className="relative flex items-center justify-center w-[22px] h-[22px]">
            <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-purple-700 text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">7</span>
          </div>
          {/* Favoritos */}
          <div className="relative flex items-center justify-center w-[22px] h-[22px]">
            <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-purple-700 text-white text-[11px] font-bold rounded-full w-4 h-4 flex items-center justify-center border-2 border-white">1</span>
          </div>
          {/* Lupa (search) */}
          <div className="relative flex items-center justify-center w-[22px] h-[22px]">
            <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          {/* Perfil */}
          <div className="relative flex items-center justify-center w-[22px] h-[22px]">
            <svg width="17" height="17" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4"/>
              <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
            </svg>
          </div>
        </div>
      </div>
      {/* Bloco preto de informações, mobile first, sobrepondo a imagem */}
      <div className="relative w-full shadow-none pt-4 pb-4 px-[15px] flex flex-col items-start -mt-20 z-20 mx-auto text-white">
        {/* Nome e status */}
        <div className="flex flex-col w-full items-start mt-1">
          <span className="text-pink-400 font-bold text-xs tracking-widest mb-1">DESTAQUES</span>
          <span className="text-white font-bold text-[17px] font-serif leading-tight">{user.nome}</span>
          <div className="flex items-center gap-2 text-pink-300 text-[13px] font-semibold mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E11D48" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            <span>{user.idade} anos, {user.status}</span>
          </div>
        </div>
        {/* Cidade e profissão */}
        <div className="flex flex-row gap-8 mt-2 w-full text-[13px]">
          <div>
            <span className="text-gray-300 font-semibold">Vive em</span>
            <div className="text-white font-medium">{user.cidade}</div>
          </div>
          <div>
            <span className="text-gray-300 font-semibold">Profissão</span>
            <div className="text-white font-medium">{user.profissao}</div>
          </div>
        </div>
        {/* Indicador do carrossel */}
        {fotos.length > 1 && (
          <div className="flex justify-center items-center w-full mt-6 mb-2 gap-2">
            {fotos.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${i === fotoIndex ? 'bg-pink-400' : 'bg-gray-400/40'} block`}
                style={{ margin: '0 3px' }}
              ></span>
            ))}
          </div>
        )}

        {/* Seções de cards 3x4 com rolagem horizontal */}
        <div className="w-full flex flex-col gap-6 mt-2">
          <SectionGrid title="Pessoas Perto de você" images={['/exemplo1.png','/exemplo2.png','/exemplo3.png','/exemplo4.png']} names={['Ana, 25 anos','Bruna, 28 anos','Carla, 22 anos','Duda, 30 anos']} />
          <SectionGrid title="Meus favoritos" images={['/exemplo5.png','/exemplo6.png','/exemplo7.png','/exemplo8.png']} names={['Eli, 27 anos','Fabi, 24 anos','Gabi, 29 anos','Helô, 26 anos']} />
          <SectionGrid title="Me Viu" images={['/exemplo11.jpg','/exemplo12.jpg','/exemplo13.jpg','/exemplo14.jpg']} names={['Isa, 23 anos','Júlia, 31 anos','Karla, 21 anos','Lia, 32 anos']} />
          <SectionGrid title="Me favoritou" images={['/Usuário_1.png','/Usuário_12.png','/Usuário_Teste.png','/perfil-exemplo.png']} names={['Mari, 27 anos','Nina, 24 anos','Olívia, 29 anos','Paula, 26 anos']} />
          {/* Uma linha para cada capital do Brasil, cada uma com 4 cards */}
          {[
            'Rio Branco','Maceió','Macapá','Manaus','Salvador','Fortaleza','Brasília','Vitória',
            'Goiânia','São Luís','Cuiabá','Campo Grande','Belo Horizonte','Belém','João Pessoa','Curitiba',
            'Recife','Teresina','Rio de Janeiro','Natal','Porto Alegre','Porto Velho','Boa Vista','Florianópolis',
            'São Paulo','Aracaju','Palmas'
          ].map((capital, idx) => (
            <SectionGrid
              key={capital}
              title={capital}
              images={['/exemplo1.png','/exemplo2.png','/exemplo3.png','/exemplo4.png'].map((img, i) => `/exemplo${(i + (idx % 8) + 1)}.png`)}
              names={[
                `${capital} - Maria, ${20 + ((idx*4+1)%10)} anos`,
                `${capital} - Ana, ${22 + ((idx*4+2)%10)} anos`,
                `${capital} - Julia, ${24 + ((idx*4+3)%10)} anos`,
                `${capital} - Carla, ${26 + ((idx*4+4)%10)} anos`
              ]}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 