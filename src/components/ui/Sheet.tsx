import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const Sheet: React.FC<SheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={onClose}
      />

      <div
        className={cn(
          'relative z-10 flex h-full w-full max-w-xl flex-col border-l border-stone-200 bg-[#faf8f5] shadow-2xl transition-transform animate-slide-in text-stone-800 overflow-hidden'
        )}
      >
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4 bg-white">
          <div>
            {title && (
              <h2 className="text-base font-bold text-stone-900 tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-stone-500 mt-0.5">{subtitle}</p>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            aria-label="Close detail panel"
            className="text-stone-500 hover:text-stone-800"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};
