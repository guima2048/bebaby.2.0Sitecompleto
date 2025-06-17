"use client";

/**
 * Hero Component
 * Based on Figma Frame: "Hero Section"
 */

import Image from 'next/image';

export default function Hero() {
  return (
    <section className="w-full bg-white font-sans">
      <div className="max-w-screen-xl mx-auto px-8 flex flex-row items-center justify-between py-24 gap-24">
        {/* Left: Texts */}
        <div className="flex-1 flex flex-col items-start justify-center space-y-10">
          <div>
            <h1 className="text-6xl font-extrabold text-gray-200 leading-tight">Transform Your Ideas into</h1>
            <h2 className="text-6xl font-extrabold text-[#2563eb] leading-tight">Digital Reality</h2>
          </div>
          <p className="text-lg text-gray-600 mb-8">
            Encontre o amor da sua vida com nosso sistema de match inteligente. Não perca mais tempo, comece agora!
          </p>
          {/* User Avatars + Text */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              <span className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white inline-block" />
              <span className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white inline-block" />
              <span className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white inline-block" />
            </div>
            <span className="text-gray-400 text-sm">Join 10,000+ happy users</span>
          </div>
          {/* Buttons */}
          <div className="flex items-center gap-4 mt-2">
            <button className="px-6 py-2 bg-[#2563eb] text-white rounded-md font-semibold text-base shadow-sm hover:bg-blue-700 transition-colors">Get Started Free</button>
            <button className="px-6 py-2 bg-gray-100 text-gray-400 rounded-md font-semibold text-base cursor-not-allowed">Watch Demo</button>
          </div>
        </div>
        {/* Right: Image */}
        <div className="flex-1 flex items-center justify-center">
          <Image src="/hero-image.png" alt="Hero Illustration" width={400} height={300} className="rounded-xl shadow-lg" />
        </div>
      </div>
    </section>
  );
} 