/**
 * Card Component
 * Based on Figma Frame: "Card/Plan Card"
 */

import { ReactNode } from 'react';
import classNames from 'classnames';

interface CardProps {
  title: string;
  description: string;
  price?: string;
  features?: string[];
  className?: string;
  children?: ReactNode;
}

export default function Card({
  title,
  description,
  price,
  features,
  className,
  children,
}: CardProps) {
  return (
    <div
      className={classNames(
        'bg-white rounded-xl shadow-lg p-6 border border-gray-100',
        className
      )}
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {price && (
        <div className="text-2xl font-bold mb-4">
          {price}
        </div>
      )}

      {features && (
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600">
              <span className="mr-2">•</span>
              {feature}
            </li>
          ))}
        </ul>
      )}

      {children}
    </div>
  );
} 