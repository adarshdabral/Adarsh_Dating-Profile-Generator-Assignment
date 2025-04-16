// components/ui/textarea.tsx
import React from 'react';

interface TextareaProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  className?: string;
}

export const Textarea = ({ value, onChange, className = '' }: TextareaProps) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      className={`w-full p-4 border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-200 ${className}`}
      rows={8}
    />
  );
};
