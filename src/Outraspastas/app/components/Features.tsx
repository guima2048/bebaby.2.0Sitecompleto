"use client";

/**
 * Features Component
 * Based on Figma Frame: "Features Section"
 */

import { Code, Zap, Shield, BarChart } from 'lucide-react';
import { features } from './mockData';

const iconMap = {
  code: Code,
  zap: Zap,
  shield: Shield,
  "bar-chart": BarChart
};

export default function Features() {
  return (
    <section className="py-20 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Development
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to build, deploy, and scale your applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-gray-100 hover:border-blue-100 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 