import { useMemo } from 'react';
import { Job, MetricsSummary } from '@/types/job';
import { getDaysRemaining } from '@/lib/utils';

export function useMetrics(jobs: Job[]): MetricsSummary {
  return useMemo(() => {
    const totalJobs = jobs.length;

    let inProgressCount = 0;
    let delayedCount = 0;
    let dueSoonCount = 0;
    let completedCount = 0;
    let totalEfficiency = 0;

    jobs.forEach((job) => {
      totalEfficiency += job.machine.efficiencyRating;

      if (job.status === 'In Progress') {
        inProgressCount++;
      } else if (job.status === 'Delayed') {
        delayedCount++;
      } else if (job.status === 'Completed') {
        completedCount++;
      }

      if (job.status !== 'Completed') {
        const daysLeft = getDaysRemaining(job.dueDate);
        if (daysLeft >= 0 && daysLeft <= 2) {
          dueSoonCount++;
        }
      }
    });

    const completionRatePercentage = totalJobs > 0 ? Math.round((completedCount / totalJobs) * 100) : 0;
    const operationalEfficiencyPercentage = totalJobs > 0 ? Math.round(totalEfficiency / totalJobs) : 0;

    return {
      totalJobs,
      inProgressJobs: inProgressCount,
      delayedJobs: delayedCount,
      dueSoonJobs: dueSoonCount,
      completedJobs: completedCount,
      completionRatePercentage,
      operationalEfficiencyPercentage,
    };
  }, [jobs]);
}
