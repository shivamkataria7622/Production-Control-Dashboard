import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { JobStatus, MachineStatus } from '@/types/job';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getDaysRemaining(dueDateString: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(dueDateString);
  due.setHours(0, 0, 0, 0);
  const diffTime = due.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getDueDateUrgency(dueDateString: string, status: JobStatus) {
  if (status === 'Completed') {
    return { label: 'Completed', level: 'completed' as const, bg: 'bg-white text-stone-500 border-stone-200' };
  }
  const days = getDaysRemaining(dueDateString);
  if (days < 0) {
    return { label: `${Math.abs(days)} day${Math.abs(days) > 1 ? 's' : ''} overdue`, level: 'overdue' as const, bg: 'bg-stone-200 text-stone-800 border-stone-400 font-medium' };
  }
  if (days === 0) {
    return { label: 'Due Today', level: 'today' as const, bg: 'bg-stone-100 text-stone-700 border-stone-300 font-medium' };
  }
  if (days === 1) {
    return { label: 'Due Tomorrow', level: 'soon' as const, bg: 'bg-stone-50 text-stone-600 border-stone-200' };
  }
  if (days <= 3) {
    return { label: `Due in ${days} days`, level: 'soon' as const, bg: 'bg-stone-50 text-stone-600 border-stone-200' };
  }
  return { label: `Due in ${days} days`, level: 'normal' as const, bg: 'bg-white text-stone-500 border-stone-200' };
}

export function getStatusBadgeTheme(status: JobStatus) {
  switch (status) {
    case 'Pending':
      return {
        bg: 'bg-white text-stone-500 border-stone-200',
        dot: 'bg-stone-300',
        badge: 'border-stone-200 bg-white text-stone-500',
      };
    case 'In Progress':
      return {
        bg: 'bg-stone-100 text-stone-700 border-stone-300',
        dot: 'bg-stone-500',
        badge: 'border-stone-300 bg-stone-100 text-stone-700',
      };
    case 'Delayed':
      return {
        bg: 'bg-stone-200 text-stone-800 border-stone-400',
        dot: 'bg-stone-700',
        badge: 'border-stone-400 bg-stone-200 text-stone-800',
      };
    case 'Completed':
      return {
        bg: 'bg-stone-50 text-stone-600 border-stone-200',
        dot: 'bg-stone-400',
        badge: 'border-stone-200 bg-stone-50 text-stone-600',
      };
  }
}

export function getMachineStatusBadge(status: MachineStatus) {
  switch (status) {
    case 'Operational':
    case 'Busy':
      return { label: status, bg: 'bg-stone-50 text-stone-600 border-stone-200' };
    case 'Maintenance Required':
      return { label: status, bg: 'bg-stone-200 text-stone-800 border-stone-400' };
    case 'Idle':
      return { label: status, bg: 'bg-white text-stone-500 border-stone-200' };
  }
}
