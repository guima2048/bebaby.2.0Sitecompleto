'use client';
import { useRouter } from "next/navigation";

export default function BackArrow({ className = "", href }: { className?: string, href?: string }) {
  const router = useRouter();
  return (
    <button
      onClick={() => href ? router.push(href) : router.back()}
      aria-label="Voltar"
      className={`flex items-center gap-2 text-[#a259cb] hover:text-[#6d2c91] font-semibold py-2 px-3 rounded-full bg-[#18122B] hover:bg-[#2a1a3a] shadow transition ${className}`}
    >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      <span className="hidden md:inline">Voltar</span>
    </button>
  );
} 