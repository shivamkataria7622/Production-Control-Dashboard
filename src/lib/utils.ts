import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { JobStatus, Job } from '@/types/job';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getStatusBadgeTheme = (status: JobStatus) => {
  switch (status) {
    case 'Completed':
      return {
        badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500',
      };
    case 'In Progress':
      return {
        badge: 'bg-blue-50 text-blue-700 border-blue-200',
        dot: 'bg-blue-500',
      };
    case 'Delayed':
      return {
        badge: 'bg-red-50 text-red-700 border-red-200',
        dot: 'bg-red-500',
      };
    default:
      return {
        badge: 'bg-stone-50 text-stone-600 border-stone-200',
        dot: 'bg-stone-400',
      };
  }
};

export const getDueDateUrgency = (dueDateStr: string, status: JobStatus) => {
  if (status === 'Completed') return { label: 'Completed', bg: 'bg-emerald-100 text-emerald-700 border-emerald-200' };

  const dueDate = new Date(dueDateStr);
  const now = new Date();
  
  dueDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return { label: `${Math.abs(diffDays)} days overdue`, bg: 'bg-red-100 text-red-700 border-red-200 font-bold' };
  if (diffDays === 0) return { label: 'Due today', bg: 'bg-amber-100 text-amber-800 border-amber-200 font-bold' };
  if (diffDays <= 2) return { label: 'Due soon', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
  
  return { label: `In ${diffDays} days`, bg: 'bg-stone-100 text-stone-600 border-stone-200' };
};

export const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

export const getDaysRemaining = (dueDateStr: string): number => {
  const dueDate = new Date(dueDateStr);
  const now = new Date();
  
  dueDate.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);

  const diffTime = dueDate.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};
