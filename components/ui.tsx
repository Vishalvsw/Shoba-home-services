
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}
export const Button: React.FC<ButtonProps> = ({ className, variant = 'primary', size = 'md', ...props }) => {
  const variants = {
    primary: 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20 border-none',
    secondary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20',
    outline: 'bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50',
    ghost: 'text-gray-500 hover:bg-gray-100 hover:text-gray-900',
    success: 'bg-green-600 text-white hover:bg-green-700 shadow-lg shadow-green-500/20',
  };
  const sizes = {
    sm: 'px-4 py-2 text-xs font-bold uppercase tracking-widest',
    md: 'px-6 py-3 text-sm font-bold',
    lg: 'px-8 py-4 text-base font-bold',
    xl: 'px-10 py-5 text-lg font-black w-full',
  };
  return (
    <button
      className={cn('rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.97]', variants[variant], sizes[size], className)}
      {...props}
    />
  );
};

// Card
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={cn('bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden', className)} {...props} />
);

// Input
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...props }) => (
  <input
    className={cn('w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none transition-all placeholder:text-gray-400 text-gray-900 font-medium', className)}
    {...props}
  />
);

// Select
export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, ...props }) => (
  <div className="relative">
    <select
      className={cn('w-full px-6 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-blue-600 focus:bg-white outline-none appearance-none transition-all text-gray-900 font-bold', className)}
      {...props}
    />
    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  </div>
);

// Badge
export const Badge: React.FC<{ children: React.ReactNode; className?: string; variant?: 'default' | 'price' }> = ({ children, className, variant = 'default' }) => {
  const styles = {
    default: 'bg-blue-50 text-blue-700 border border-blue-100',
    price: 'bg-green-50 text-green-700 border border-green-100 font-black'
  };
  
  return (
    <span className={cn('inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest', styles[variant], className)}>
      {children}
    </span>
  );
};
