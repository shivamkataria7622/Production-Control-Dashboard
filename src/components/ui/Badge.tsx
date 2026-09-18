import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'destructive' | 'success' | 'warning' | 'info';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className,
  children,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-stone-100 text-stone-800 border-stone-200',
    secondary: 'bg-stone-50 text-stone-600 border-stone-100',
    outline: 'bg-transparent text-stone-600 border-stone-200',
    destructive: 'bg-stone-200 text-stone-800 border-stone-400',
    success: 'bg-white text-stone-600 border-stone-200',
    warning: 'bg-stone-50 text-stone-600 border-stone-300',
    info: 'bg-stone-100 text-stone-700 border-stone-300',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-stone-400 focus:ring-offset-2',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
