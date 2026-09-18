import { useState, useMemo, useCallback } from 'react';
import { Job, JobStatus, SortField, SortOrder, JobFilterState } from '@/types/job';

export function useJobFilters(initialJobs: Job[]) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<JobStatus | 'All'>('All');
  const [machineFilter, setMachineFilter] = useState<string | 'All'>('All');
  const [sortBy, setSortBy] = useState<SortField>('dueDate');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  const uniqueMachines = useMemo(() => {
    const map = new Map<string, string>();
    initialJobs.forEach((job) => {
      if (!map.has(job.machine.id)) {
        map.set(job.machine.id, job.machine.name);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [initialJobs]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleStatusFilterChange = useCallback((status: JobStatus | 'All') => {
    setStatusFilter(status);
  }, []);

  const handleMachineFilterChange = useCallback((machineId: string | 'All') => {
    setMachineFilter(machineId);
  }, []);

  const handleSortChange = useCallback((field: SortField) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  }, [sortBy]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setStatusFilter('All');
    setMachineFilter('All');
    setSortBy('dueDate');
    setSortOrder('asc');
  }, []);

  const filteredAndSortedJobs = useMemo(() => {
    return initialJobs
      .filter((job) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesProduct = job.productName.toLowerCase().includes(q);
          const matchesCustomer = job.customer.toLowerCase().includes(q);
          const matchesId = job.id.toLowerCase().includes(q);
          const matchesSku = job.sku.toLowerCase().includes(q);
          if (!matchesProduct && !matchesCustomer && !matchesId && !matchesSku) {
            return false;
          }
        }

        if (statusFilter !== 'All' && job.status !== statusFilter) {
          return false;
        }

        if (machineFilter !== 'All' && job.machine.id !== machineFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let modifier = sortOrder === 'asc' ? 1 : -1;

        if (sortBy === 'dueDate') {
          return (new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()) * modifier;
        }

        if (sortBy === 'quantity') {
          return (a.quantity - b.quantity) * modifier;
        }

        if (sortBy === 'id') {
          return a.id.localeCompare(b.id) * modifier;
        }

        if (sortBy === 'customer') {
          return a.customer.localeCompare(b.customer) * modifier;
        }

        if (sortBy === 'status') {
          return a.status.localeCompare(b.status) * modifier;
        }

        return 0;
      });
  }, [initialJobs, searchQuery, statusFilter, machineFilter, sortBy, sortOrder]);

  const filterState: JobFilterState = {
    searchQuery,
    statusFilter,
    machineFilter,
    sortBy,
    sortOrder,
  };

  const isFiltered = searchQuery !== '' || statusFilter !== 'All' || machineFilter !== 'All';

  return {
    filterState,
    filteredJobs: filteredAndSortedJobs,
    uniqueMachines,
    isFiltered,
    setSearchQuery: handleSearchChange,
    setStatusFilter: handleStatusFilterChange,
    setMachineFilter: handleMachineFilterChange,
    handleSortChange,
    setSortOrder,
    resetFilters,
  };
}
