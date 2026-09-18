import { useState, useEffect, useCallback } from 'react';
import { Job, JobStatus, JobNote } from '@/types/job';
import { INITIAL_MOCK_JOBS } from '@/data/mockJobs';

const STORAGE_KEY = 'factory_production_jobs_v1';

export function useJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setJobs(parsed);
          setIsLoading(false);
          return;
        }
      }
    } catch {}
    setJobs(INITIAL_MOCK_JOBS);
    setIsLoading(false);
  }, []);

  const persistJobs = useCallback((updatedJobs: Job[]) => {
    setJobs(updatedJobs);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedJobs));
    } catch {}
  }, []);

  const updateJobStatus = useCallback((jobId: string, newStatus: JobStatus) => {
    setJobs((prevJobs) => {
      const updated = prevJobs.map((job) => {
        if (job.id === jobId) {
          const statusNote: JobNote = {
            id: `note-${Date.now()}`,
            author: 'Operations Manager',
            role: 'Control System User',
            content: `Status updated from "${job.status}" to "${newStatus}".`,
            createdAt: new Date().toISOString(),
            type: 'status_change',
          };

          const newCompletion = newStatus === 'Completed' ? 100 : job.completionPercentage;

          return {
            ...job,
            status: newStatus,
            completionPercentage: newCompletion,
            notes: [statusNote, ...job.notes],
          };
        }
        return job;
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}

      return updated;
    });

    setNotification({
      message: `Job ${jobId} status updated to ${newStatus}`,
      type: 'success',
    });
  }, []);

  const addJobNote = useCallback((jobId: string, content: string, type: 'general' | 'issue' = 'general') => {
    if (!content.trim()) return;

    setJobs((prevJobs) => {
      const updated = prevJobs.map((job) => {
        if (job.id === jobId) {
          const newNote: JobNote = {
            id: `note-${Date.now()}`,
            author: 'Operations Manager',
            role: 'Control System User',
            content: content.trim(),
            createdAt: new Date().toISOString(),
            type,
          };
          return {
            ...job,
            notes: [newNote, ...job.notes],
          };
        }
        return job;
      });

      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}

      return updated;
    });

    setNotification({
      message: `New ${type === 'issue' ? 'issue alert' : 'note'} added to job ${jobId}`,
      type: type === 'issue' ? 'error' : 'info',
    });
  }, []);

  const resetToDefaultData = useCallback(() => {
    persistJobs(INITIAL_MOCK_JOBS);
    setNotification({
      message: 'Factory jobs dataset restored to default mock data',
      type: 'info',
    });
  }, [persistJobs]);

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || null;

  return {
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
  };
}
