import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className, children, disabled, ...props }, ref) => {
    const baseStyles =
      'inline-flex items-center justify-center rounded-lg font-medium text-xs tracking-wide transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] select-none';

    const variants = {
      primary: 'bg-stone-800 text-white hover:bg-stone-700 shadow-sm border border-stone-800',
      secondary: 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200 shadow-sm',
      outline: 'border border-stone-200 bg-transparent text-stone-600 hover:bg-stone-50',
      ghost: 'bg-transparent text-stone-500 hover:bg-stone-100 hover:text-stone-800',
      destructive: 'bg-stone-900 text-stone-100 hover:bg-stone-800 shadow-sm border border-stone-900',
      danger: 'bg-stone-100 text-stone-800 border border-stone-300 hover:bg-stone-200',
    };

    const sizes = {
      sm: 'h-8 px-3 py-1 text-xs gap-1.5',
      md: 'h-9 px-4 py-1.5 text-xs gap-2',
      lg: 'h-10 px-5 py-2 text-sm gap-2',
      icon: 'h-9 w-9 p-0 text-xs',
    };

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
