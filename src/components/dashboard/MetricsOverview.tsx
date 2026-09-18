import React from 'react';
import { MetricsSummary } from '@/types/job';
import { Card } from '@/components/ui/Card';
import { Package, AlertOctagon, Clock, CheckCircle2, TrendingUp, Cpu } from 'lucide-react';

interface MetricsOverviewProps {
  metrics: MetricsSummary;
  onFilterStatus?: (status: any) => void;
}

export const MetricsOverview: React.FC<MetricsOverviewProps> = ({
  metrics,
  onFilterStatus,
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card
        onClick={() => onFilterStatus && onFilterStatus('All')}
        className="relative overflow-hidden cursor-pointer hover:border-stone-300 transition-all group"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Total Work Orders
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600 border border-stone-200 group-hover:scale-110 transition-transform">
              <Package className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-stone-800 font-mono tracking-tight">
              {metrics.totalJobs}
            </span>
            <span className="text-xs text-stone-500 font-medium flex items-center gap-1">
              <Cpu className="h-3 w-3 text-stone-400" />
              {metrics.inProgressJobs} In Progress
            </span>
          </div>
          <div className="mt-3.5 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-stone-400 rounded-full transition-all duration-500"
              style={{
                width: `${metrics.totalJobs ? Math.round((metrics.inProgressJobs / metrics.totalJobs) * 100) : 0}%`,
              }}
            />
          </div>
        </div>
      </Card>

      <Card
        onClick={() => onFilterStatus && onFilterStatus('Delayed')}
        className="relative overflow-hidden cursor-pointer hover:border-stone-400 border-stone-200 transition-all group"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-red-500" />
              Delayed Jobs
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600 border border-red-200 group-hover:scale-110 transition-transform">
              <AlertOctagon className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-stone-800 font-mono tracking-tight">
              {metrics.delayedJobs}
            </span>
            <span className="text-xs text-stone-700 font-medium px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
              {metrics.totalJobs > 0
                ? `${Math.round((metrics.delayedJobs / metrics.totalJobs) * 100)}% of total`
                : '0%'}
            </span>
          </div>
          <p className="mt-3 text-[11px] text-stone-500 truncate">
            {metrics.delayedJobs > 0
              ? 'Requires line operator attention'
              : 'All lines operating on schedule'}
          </p>
        </div>
      </Card>

      <Card
        onClick={() => onFilterStatus && onFilterStatus('In Progress')}
        className="relative overflow-hidden cursor-pointer hover:border-stone-400 border-stone-200 transition-all group"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-stone-700 uppercase tracking-wider">
              Due Today / Soon
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-100 text-stone-600 border border-stone-200 group-hover:scale-110 transition-transform">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-stone-800 font-mono tracking-tight">
              {metrics.dueSoonJobs}
            </span>
            <span className="text-xs text-stone-600 font-medium px-2 py-0.5 rounded bg-stone-100 border border-stone-200">
              &le; 48 Hours
            </span>
          </div>
          <p className="mt-3 text-[11px] text-stone-500">
            Pending final quality control checks
          </p>
        </div>
      </Card>

      <Card
        onClick={() => onFilterStatus && onFilterStatus('Completed')}
        className="relative overflow-hidden cursor-pointer hover:border-stone-300 border-stone-200 transition-all group"
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-600 uppercase tracking-wider">
              Completed Jobs
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 group-hover:scale-110 transition-transform">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-stone-800 font-mono tracking-tight">
              {metrics.completedJobs}
            </span>
            <span className="text-xs text-stone-600 font-medium flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              {metrics.completionRatePercentage}% Rate
            </span>
          </div>
          <div className="mt-3.5 h-1.5 w-full rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${metrics.completionRatePercentage}%` }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
