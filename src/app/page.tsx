'use client';

import React from 'react';
import { useJobs } from '@/hooks/useJobs';
import { useJobFilters } from '@/hooks/useJobFilters';
import { useMetrics } from '@/hooks/useMetrics';
import { Header } from '@/components/dashboard/Header';
import { MetricsOverview } from '@/components/dashboard/MetricsOverview';
import { JobFilterBar } from '@/components/dashboard/JobFilterBar';
import { JobsTable } from '@/components/dashboard/JobsTable';
import { JobDetailDrawer } from '@/components/dashboard/JobDetailDrawer';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { Toast } from '@/components/ui/Toast';
import { JobStatus } from '@/types/job';

export default function DashboardPage() {
  const {
    jobs,
    selectedJob,
    selectedJobId,
    isLoading,
    notification,
    setSelectedJobId,
    updateJobStatus,
    addJobNote,
    resetToDefaultData,
    clearNotification,
  } = useJobs();

  const {
    filterState,
    filteredJobs,
    uniqueMachines,
    isFiltered,
    setSearchQuery,
    setStatusFilter,
    setMachineFilter,
    handleSortChange,
    setSortOrder,
    resetFilters,
  } = useJobFilters(jobs);

  const metrics = useMetrics(jobs);

  const handleStatusCardClick = (status: JobStatus | 'All') => {
    setStatusFilter(status);
  };

  const handleSortOrderToggle = () => {
    setSortOrder(filterState.sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-stone-800 flex flex-col font-sans">
      <Header onResetData={resetToDefaultData} />

      <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 max-w-7xl w-full mx-auto space-y-6">
        <MetricsOverview
          metrics={metrics}
          onFilterStatus={handleStatusCardClick}
        />

        <JobFilterBar
          filterState={filterState}
          uniqueMachines={uniqueMachines}
          totalResultsCount={filteredJobs.length}
          isFiltered={isFiltered}
          onSearchChange={setSearchQuery}
          onStatusChange={setStatusFilter}
          onMachineChange={setMachineFilter}
          onSortChange={handleSortChange}
          onSortOrderToggle={handleSortOrderToggle}
          onResetFilters={resetFilters}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 rounded-xl border border-stone-200 bg-white">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-stone-300 border-t-stone-600" />
            <p className="mt-3 text-xs text-stone-500 font-mono">Loading telemetry stream...</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <JobsTable
            jobs={filteredJobs}
            selectedJobId={selectedJobId}
            onSelectJob={(id) => setSelectedJobId(id)}
            onSortChange={handleSortChange}
            currentSortBy={filterState.sortBy}
          />
        ) : (
          <EmptyState
            onResetFilters={resetFilters}
            searchQuery={filterState.searchQuery}
          />
        )}
      </main>

      <JobDetailDrawer
        job={selectedJob}
        isOpen={Boolean(selectedJobId)}
        onClose={() => setSelectedJobId(null)}
        onStatusChange={updateJobStatus}
        onAddNote={addJobNote}
      />

      {notification && (
        <Toast
          message={notification.message}
          type={notification.type}
          onClose={clearNotification}
        />
      )}
    </div>
  );
}
