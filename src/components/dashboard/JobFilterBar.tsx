import React from 'react';
import { Search, Filter, ArrowUpDown, X, Cpu } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { JobStatus, SortField, SortOrder, JobFilterState } from '@/types/job';

interface JobFilterBarProps {
  filterState: JobFilterState;
  uniqueMachines: { id: string; name: string }[];
  totalResultsCount: number;
  isFiltered: boolean;
  onSearchChange: (query: string) => void;
  onStatusChange: (status: JobStatus | 'All') => void;
  onMachineChange: (machineId: string | 'All') => void;
  onSortChange: (field: SortField) => void;
  onSortOrderToggle: () => void;
  onResetFilters: () => void;
}

export const JobFilterBar: React.FC<JobFilterBarProps> = ({
  filterState,
  uniqueMachines,
  totalResultsCount,
  isFiltered,
  onSearchChange,
  onStatusChange,
  onMachineChange,
  onSortChange,
  onSortOrderToggle,
  onResetFilters,
}) => {
  const statusOptions: { value: JobStatus | 'All'; label: string }[] = [
    { value: 'All', label: 'All Statuses' },
    { value: 'Pending', label: 'Pending' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Delayed', label: 'Delayed' },
    { value: 'Completed', label: 'Completed' },
  ];

  const sortOptions: { value: SortField; label: string }[] = [
    { value: 'dueDate', label: 'Sort by Due Date' },
    { value: 'quantity', label: 'Sort by Quantity' },
    { value: 'id', label: 'Sort by Job ID' },
    { value: 'customer', label: 'Sort by Customer' },
    { value: 'status', label: 'Sort by Status' },
  ];

  const machineOptions = [
    { value: 'All', label: 'All Machines' },
    ...uniqueMachines.map((m) => ({ value: m.id, label: m.name })),
  ];

  const statusPills: (JobStatus | 'All')[] = ['All', 'Pending', 'In Progress', 'Delayed', 'Completed'];

  return (
    <div className="space-y-3 rounded-xl border border-stone-200 bg-white p-4 shadow-sm backdrop-blur-sm">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search by job ID, product, customer, or SKU..."
            value={filterState.searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            icon={<Search className="h-4 w-4" />}
            className="h-10 text-xs bg-stone-50 border-stone-200 focus:border-stone-400"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {statusPills.map((status) => {
            const isActive = filterState.statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => onStatusChange(status)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all whitespace-nowrap border ${
                  isActive
                    ? status === 'Delayed'
                      ? 'bg-stone-200 text-stone-800 border-stone-400 shadow-sm'
                      : status === 'Completed'
                      ? 'bg-stone-100 text-stone-700 border-stone-300 shadow-sm'
                      : status === 'In Progress'
                      ? 'bg-stone-100 text-stone-800 border-stone-300 shadow-sm'
                      : status === 'Pending'
                      ? 'bg-white text-stone-600 border-stone-300 shadow-sm'
                      : 'bg-stone-800 text-white border-stone-800 shadow-sm'
                    : 'bg-white text-stone-500 border-stone-200 hover:bg-stone-50 hover:text-stone-700'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-stone-100">
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <Select
              options={machineOptions}
              value={filterState.machineFilter}
              onChange={(e) => onMachineChange(e.target.value)}
              icon={<Cpu className="h-3.5 w-3.5" />}
              className="bg-stone-50 border-stone-200 text-xs text-stone-700"
            />
          </div>

          <div className="w-48">
            <Select
              options={sortOptions}
              value={filterState.sortBy}
              onChange={(e) => onSortChange(e.target.value as SortField)}
              icon={<Filter className="h-3.5 w-3.5" />}
              className="bg-stone-50 border-stone-200 text-xs text-stone-700"
            />
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onSortOrderToggle}
            className="h-9 px-3 bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-800"
            title={`Toggle sort order (${filterState.sortOrder.toUpperCase()})`}
          >
            <ArrowUpDown className="h-3.5 w-3.5 mr-1 text-stone-400" />
            <span className="font-mono text-[11px] uppercase">{filterState.sortOrder}</span>
          </Button>

          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="h-9 text-stone-600 hover:text-stone-800 hover:bg-stone-100 text-xs"
            >
              <X className="h-3.5 w-3.5 mr-1" />
              Clear Filters
            </Button>
          )}
        </div>

        <div className="text-xs text-stone-500 font-mono">
          Showing <span className="text-stone-800 font-semibold">{totalResultsCount}</span> work order{totalResultsCount !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};
