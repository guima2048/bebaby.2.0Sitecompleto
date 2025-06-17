"use client";

/**
 * Pricing Component
 * Based on Figma Frame: "Pricing Section"
 */

import { Check } from 'lucide-react';
import Link from 'next/link';
import { plans } from './mockData';

export default function Pricing() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the plan that's right for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-8 rounded-2xl border ${
                plan.popular
                  ? 'border-blue-600 bg-white shadow-lg'
                  : 'border-gray-200 bg-white'
              }`}
            >
              {plan.popular && (
                <span className="inline-block px-3 py-1 text-sm font-medium text-blue-600 bg-blue-50 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold mb-2 text-gray-900">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-600">/month</span>
              </div>
              <p className="text-gray-600 text-sm mb-6">{plan.description}</p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600 text-sm">
                    <Check className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                href="/get-started"
                className={`block w-full py-3 px-6 text-center rounded-lg font-medium text-sm transition-colors ${
                  plan.popular
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-gray-600">
          Comece sua jornada para encontrar o amor da sua vida com nosso plano básico.
        </p>
      </div>
    </section>
  );
} 