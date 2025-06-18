"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { CheckCircle, AlertCircle, MapPin } from "lucide-react";
import Cropper from "react-easy-crop";
import { states } from "../data/locations";

type FormData = {
  username: string;
  email: string;
  confirmEmail: string;
  age: string;
  searchFor: string;
  photo: string | null;
  location: {
    type: 'geolocation' | 'manual';
    state: string;
    city: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
};

type FormErrors = {
  username?: string;
  email?: string;
  confirmEmail?: string;
  age?: string;
  searchFor?: string;
  photo?: string;
  location?: string;
  submit?: string;
};

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const STEPS = [
  { id: 1, title: "Dados Pessoais" },
  { id: 2, title: "Foto de Perfil" }
];

export default function CadastroPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    confirmEmail: "",
    age: "",
    searchFor: "",
    photo: null,
    location: {
      type: 'manual',
      state: "",
      city: ""
    }
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [selectedState, setSelectedState] = useState<typeof states[0] | null>(null);

  // Estados para o crop de imagem
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      setLocationPermission(permission.state);

      if (permission.state === 'granted') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setFormData(prev => ({
              ...prev,
              location: {
                type: 'geolocation',
                state: "",
                city: "",
                coordinates: {
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude
                }
              }
            }));
          },
          (error) => {
            console.error('Error getting location:', error);
            setLocationPermission('denied');
          }
        );
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      setLocationPermission('denied');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    if (step === 1) {
      if (!formData.username.trim()) {
        newErrors.username = "Nome de usuário é obrigatório";
      } else if (formData.username.length < 3) {
        newErrors.username = "Nome deve ter pelo menos 3 caracteres";
      }

      if (!formData.email) {
        newErrors.email = "E-mail é obrigatório";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "E-mail inválido";
      }

      if (!formData.confirmEmail) {
        newErrors.confirmEmail = "Confirmação de e-mail é obrigatória";
      } else if (formData.email !== formData.confirmEmail) {
        newErrors.confirmEmail = "E-mails não coincidem";
      }

      if (!formData.age) {
        newErrors.age = "Idade é obrigatória";
      }

      if (!formData.searchFor) {
        newErrors.searchFor = "Selecione o que está buscando";
      }

      if (formData.location.type === 'manual') {
        if (!formData.location.state) {
          newErrors.location = "Estado é obrigatório";
        }
        if (!formData.location.city) {
          newErrors.location = "Cidade é obrigatória";
        }
      }
    }

    if (step === 2 && !formData.photo) {
      newErrors.photo = "Foto de perfil é obrigatória";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitSuccess(true);
    } catch (error) {
      setErrors({ submit: "Erro ao enviar formulário. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  // Funções para manipulação de imagem
  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result as string));
      reader.readAsDataURL(file);
      setFormData(prev => ({ ...prev, photo: null }));
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
            setFormData(prev => ({ ...prev, photo: url }));
            setImageSrc(null);
          }
        },
        "image/webp",
        0.85
      );
    };
  }, [imageSrc, croppedAreaPixels]);

  const handleCancel = () => {
    setImageSrc(null);
    setFormData(prev => ({ ...prev, photo: null }));
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  const handleStateChange = (stateId: string) => {
    const state = states.find(s => s.id.toString() === stateId);
    setSelectedState(state || null);
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        state: state?.name || "",
        city: ""
      }
    }));
  };

  const handleCityChange = (cityId: string) => {
    const city = selectedState?.cities.find(c => c.id.toString() === cityId);
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        city: city?.name || ""
      }
    }));
  };

  return (
    <main className="relative min-h-screen w-full font-sans">
      {/* Banner com overlay preto */}
      <section className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/main_impact.webp')" }}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-black/60" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
          <div className="w-full max-w-md bg-black/70 rounded-2xl p-8 shadow-2xl flex flex-col gap-6 animate-fade-in">
            {/* Progress Steps */}
            <div className="flex justify-between mb-4">
              {STEPS.map((step) => (
                <div key={step.id} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.id ? 'bg-[#a259cb]' : 'bg-white/20'
                  }`}>
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-white">{step.id}</span>
                    )}
                  </div>
                  <span className="text-xs text-white mt-1">{step.title}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-2 mb-2">
              <h2 className="text-white text-xl font-bold text-center">Cadastro de usuário</h2>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" className="text-white">
                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                <path d="M4 20c0-2.21 3.582-4 8-4s8 1.79 8 4" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>

            {submitSuccess ? (
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-white text-xl font-bold mb-2">Cadastro realizado com sucesso!</h3>
                <p className="text-white/80">Você será redirecionado em instantes...</p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleNext(); }} className="flex flex-col gap-4">
                {currentStep === 1 && (
                  <>
                    <div>
                      <label className="text-white text-sm font-medium">Nome de usuário:
                        <input
                          type="text"
                          name="username"
                          value={formData.username}
                          onChange={handleInputChange}
                          className={`mt-1 w-full px-4 py-3 rounded-md bg-white/10 border ${
                            errors.username ? 'border-red-500' : 'border-white/20'
                          } text-white focus:outline-none focus:ring-2 focus:ring-[#a259cb]`}
                          placeholder="Digite seu nome de usuário"
                        />
                      </label>
                      {errors.username && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.username}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">Idade:
                        <select
                          name="age"
                          value={formData.age}
                          onChange={handleInputChange}
                          className={`mt-1 w-full px-4 py-3 rounded-md bg-white/10 border ${
                            errors.age ? 'border-red-500' : 'border-white/20'
                          } text-white focus:outline-none focus:ring-2 focus:ring-[#a259cb]`}
                        >
                          <option value="">Selecione sua idade</option>
                          {Array.from({ length: 82 }, (_, i) => i + 18).map((age) => (
                            <option key={age} value={age.toString()}>
                              {age} anos
                            </option>
                          ))}
                        </select>
                      </label>
                      {errors.age && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.age}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">E-mail:
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`mt-1 w-full px-4 py-3 rounded-md bg-white/10 border ${
                            errors.email ? 'border-red-500' : 'border-white/20'
                          } text-white focus:outline-none focus:ring-2 focus:ring-[#a259cb]`}
                          placeholder="Digite seu e-mail"
                        />
                      </label>
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">Repita o E-mail:
                        <input
                          type="email"
                          name="confirmEmail"
                          value={formData.confirmEmail}
                          onChange={handleInputChange}
                          className={`mt-1 w-full px-4 py-3 rounded-md bg-white/10 border ${
                            errors.confirmEmail ? 'border-red-500' : 'border-white/20'
                          } text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#a259cb]`}
                          placeholder="confirme@email.com"
                        />
                        {errors.confirmEmail && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.confirmEmail}
                          </p>
                        )}
                      </label>
                    </div>

                    <div>
                      <label className="text-white text-sm font-medium">Estou em busca de:
                        <select
                          name="searchFor"
                          value={formData.searchFor}
                          onChange={handleInputChange}
                          className={`mt-1 w-full px-4 py-3 rounded-md bg-white/10 border ${
                            errors.searchFor ? 'border-red-500' : 'border-white/20'
                          } text-white focus:outline-none focus:ring-2 focus:ring-[#a259cb]`}
                        >
                          <option value="">Selecione</option>
                          <option value="homem_mulher">Homem maduro buscando mulher</option>
                          <option value="mulher_homem">Mulher buscando homem maduro</option>
                        </select>
                        {errors.searchFor && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.searchFor}
                          </p>
                        )}
                      </label>
                    </div>

                    <div className="mt-4">
                      <p className="text-white text-sm font-medium mb-2">Localização:</p>
                      
                      {locationPermission === 'prompt' && (
                        <button
                          type="button"
                          onClick={requestLocationPermission}
                          className="w-full py-3 bg-white/10 border border-white/30 rounded-xl text-white text-base font-medium tracking-wide shadow-lg backdrop-blur-sm flex items-center justify-center gap-2 hover:bg-[#a259cb]/80 transition mb-4"
                        >
                          <MapPin className="w-5 h-5" />
                          Usar minha localização atual
                        </button>
                      )}

                      {locationPermission === 'denied' && (
                        <p className="text-yellow-400 text-sm mb-4">
                          Permissão de localização negada. Por favor, selecione manualmente.
                        </p>
                      )}

                      {formData.location.type === 'manual' && (
                        <div className="space-y-4">
                          <div>
                            <label className="text-white text-sm font-medium">Estado:
                              <select
                                value={selectedState?.id || ""}
                                onChange={(e) => handleStateChange(e.target.value)}
                                className={`mt-1 w-full px-4 py-3 rounded-md bg-white/10 border ${
                                  errors.location ? 'border-red-500' : 'border-white/20'
                                } text-white focus:outline-none focus:ring-2 focus:ring-[#a259cb]`}
                              >
                                <option value="">Selecione o estado</option>
                                {states.map((state) => (
                                  <option key={state.id} value={state.id}>
                                    {state.name}
                                  </option>
                                ))}
                              </select>
                            </label>
                          </div>

                          <div>
                            <label className="text-white text-sm font-medium">Cidade:
                              <select
                                value={formData.location.city}
                                onChange={(e) => handleCityChange(e.target.value)}
                                disabled={!selectedState}
                                className={`mt-1 w-full px-4 py-3 rounded-md bg-white/10 border ${
                                  errors.location ? 'border-red-500' : 'border-white/20'
                                } text-white focus:outline-none focus:ring-2 focus:ring-[#a259cb] ${
                                  !selectedState ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                              >
                                <option value="">Selecione a cidade</option>
                                {selectedState?.cities.map((city) => (
                                  <option key={city.id} value={city.id}>
                                    {city.name}
                                  </option>
                                ))}
                              </select>
                            </label>
                            {errors.location && (
                              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                                <AlertCircle className="w-3 h-3" />
                                {errors.location}
                              </p>
                            )}
                          </div>
                        </div>
                      )}

                      {formData.location.type === 'geolocation' && (
                        <div className="bg-white/10 p-4 rounded-lg">
                          <p className="text-white text-sm">
                            <span className="font-medium">Localização atual:</span> Detectada
                          </p>
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              location: {
                                type: 'manual',
                                state: "",
                                city: ""
                              }
                            }))}
                            className="text-white/70 text-sm underline mt-2"
                          >
                            Selecionar manualmente
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {currentStep === 2 && (
                  <>
                    <p className="text-white text-base font-medium mb-1">Insira sua foto de Perfil.</p>
                    <p className="text-xs mb-2">
                      <span className="text-yellow-400 font-bold">Aviso:</span>
                      <span className="text-white/90">Tire uma foto com boa qualidade ou escolha sua melhor foto. Fotos de perfil só podem ser alteradas com autorização dos ADM</span>
                    </p>

                    <div className="mb-4">
                      {!imageSrc && !formData.photo && (
                        <label className="w-full h-48 bg-black/40 border border-white/20 rounded-lg flex flex-col items-center justify-center cursor-pointer transition hover:bg-black/60">
                          <svg width="64" height="64" fill="none" viewBox="0 0 24 24" className="text-white/40 mb-2">
                            <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
                            <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                          </svg>
                          <span className="text-white/70 text-sm">Clique para adicionar sua foto de perfil.</span>
                          <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                        </label>
                      )}

                      {imageSrc && !formData.photo && (
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
                                type="button"
                                className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-medium transition text-sm"
                                onClick={showCroppedImage}
                                disabled={loading}
                              >
                                {loading ? "Cortando..." : "Cortar"}
                              </button>
                              <button
                                type="button"
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

                      {formData.photo && (
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-24 h-48 rounded-lg overflow-hidden border border-white/20 bg-black">
                            <Image src={formData.photo} alt="Preview" width={64} height={128} className="object-cover w-full h-full" />
                          </div>
                          <button
                            type="button"
                            className="mt-2 py-2 px-4 bg-white/10 border border-white/30 rounded-lg text-white font-medium transition text-sm"
                            onClick={handleCancel}
                          >
                            Trocar Foto
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-white text-sm mb-4 text-center">Abaixo alguns exemplos de "ângulos" que irão te destacar mais dentro da plataforma.</p>
                      <div className="flex justify-center items-center gap-4">
                        {formData.searchFor === 'homem_mulher' ? (
                          <>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo5.webp" alt="Exemplo 1" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo6.webp" alt="Exemplo 2" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo7.webp" alt="Exemplo 3" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo8.webp" alt="Exemplo 4" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo1.webp" alt="Exemplo 1" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo2.webp" alt="Exemplo 2" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo3.webp" alt="Exemplo 3" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                            <div className="aspect-[1/2] w-16 flex items-center justify-center overflow-hidden rounded-lg bg-black/30">
                              <Image src="/exemplo4.webp" alt="Exemplo 4" width={64} height={128} className="object-cover w-full h-full object-center" />
                            </div>
                          </>
                        )}
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
                  </>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 mt-2 bg-white/10 border border-white/30 rounded-xl text-white text-base font-medium tracking-wide shadow-lg backdrop-blur-sm flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#a259cb]/80'
                  } transition`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processando...
                    </>
                  ) : (
                    <>
                      {currentStep === STEPS.length ? 'Finalizar Cadastro' : 'Próximo passo'}
                      <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
