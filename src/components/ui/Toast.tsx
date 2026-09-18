import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  onClose,
  duration = 3500,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle2 className="h-4 w-4 text-stone-600 shrink-0" />,
    info: <Info className="h-4 w-4 text-stone-500 shrink-0" />,
    error: <AlertTriangle className="h-4 w-4 text-stone-800 shrink-0" />,
  };

  const borderColors = {
    success: 'border-stone-300 bg-stone-50 text-stone-700',
    info: 'border-stone-200 bg-white text-stone-600',
    error: 'border-stone-400 bg-stone-100 text-stone-800',
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center animate-fade-in">
      <div
        className={cn(
          'flex items-center gap-3 rounded-lg border px-4 py-3 shadow-md text-xs font-medium',
          borderColors[type]
        )}
      >
        {icons[type]}
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 text-stone-400 hover:text-stone-600 transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
