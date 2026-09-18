import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  label?: string;
  icon?: React.ReactNode;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, options, icon, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-3 pointer-events-none text-stone-400 z-10">
            {icon}
          </div>
        )}
        <select
          className={cn(
            'flex h-9 w-full appearance-none rounded-lg border border-stone-200 bg-white px-3 py-1 pr-8 text-xs text-stone-800 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer transition-colors',
            icon && 'pl-9',
            className
          )}
          ref={ref}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-white text-stone-800">
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 h-3.5 w-3.5 pointer-events-none text-stone-400" />
      </div>
    );
  }
);

Select.displayName = 'Select';
