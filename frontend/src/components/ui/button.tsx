// components/ui/button.tsx
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'outline' | 'solid';
}

export const Button = ({
  onClick,
  children,
  className = '',
  variant = 'solid',
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${
        variant === 'solid'
          ? 'bg-pink-600 hover:bg-pink-700 text-white'
          : 'border-2 border-gray-300 text-gray-800 hover:bg-gray-100'
      } px-6 py-2 rounded-lg shadow-md transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
};
