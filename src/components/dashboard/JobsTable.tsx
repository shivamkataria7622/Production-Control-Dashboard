import React from 'react';
import { Job, JobStatus, SortField } from '@/types/job';
import { formatDate, getDueDateUrgency, getStatusBadgeTheme, cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { ChevronRight, Cpu, AlertTriangle, ArrowUpDown, Calendar, Hash, Building2, Package } from 'lucide-react';

interface JobsTableProps {
  jobs: Job[];
  selectedJobId: string | null;
  onSelectJob: (jobId: string) => void;
  onSortChange: (field: SortField) => void;
  currentSortBy: SortField;
}

export const JobsTable: React.FC<JobsTableProps> = ({
  jobs,
  selectedJobId,
  onSelectJob,
  onSortChange,
  currentSortBy,
}) => {
  return (
    <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-stone-200 bg-stone-50 text-stone-500 font-medium uppercase tracking-wider select-none">
              <th
                onClick={() => onSortChange('id')}
                className="py-3.5 px-4 cursor-pointer hover:text-stone-800 transition-colors"
              >
                <div className="flex items-center gap-1.5 font-mono">
                  <Hash className="h-3.5 w-3.5 text-stone-400" />
                  <span>Job ID</span>
                  {currentSortBy === 'id' && <ArrowUpDown className="h-3 w-3 text-stone-500" />}
                </div>
              </th>

              <th className="py-3.5 px-4">
                <div className="flex items-center gap-1.5">
                  <Package className="h-3.5 w-3.5 text-stone-400" />
                  <span>Product Name & SKU</span>
                </div>
              </th>

              <th
                onClick={() => onSortChange('customer')}
                className="py-3.5 px-4 cursor-pointer hover:text-stone-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Building2 className="h-3.5 w-3.5 text-stone-400" />
                  <span>Customer</span>
                  {currentSortBy === 'customer' && <ArrowUpDown className="h-3 w-3 text-stone-500" />}
                </div>
              </th>

              <th
                onClick={() => onSortChange('quantity')}
                className="py-3.5 px-4 text-right cursor-pointer hover:text-stone-800 transition-colors"
              >
                <div className="flex items-center justify-end gap-1.5">
                  <span>Quantity</span>
                  {currentSortBy === 'quantity' && <ArrowUpDown className="h-3 w-3 text-stone-500" />}
                </div>
              </th>

              <th
                onClick={() => onSortChange('dueDate')}
                className="py-3.5 px-4 cursor-pointer hover:text-stone-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-stone-400" />
                  <span>Due Date</span>
                  {currentSortBy === 'dueDate' && <ArrowUpDown className="h-3 w-3 text-stone-500" />}
                </div>
              </th>

              <th
                onClick={() => onSortChange('status')}
                className="py-3.5 px-4 cursor-pointer hover:text-stone-800 transition-colors"
              >
                <div className="flex items-center gap-1.5">
                  <span>Status</span>
                  {currentSortBy === 'status' && <ArrowUpDown className="h-3 w-3 text-stone-500" />}
                </div>
              </th>

              <th className="py-3.5 px-4">
                <div className="flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5 text-stone-400" />
                  <span>Assigned Machine</span>
                </div>
              </th>

              <th className="py-3.5 px-4 text-right pr-6">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-stone-100 font-sans">
            {jobs.map((job) => {
              const statusTheme = getStatusBadgeTheme(job.status);
              const urgency = getDueDateUrgency(job.dueDate, job.status);
              const isSelected = selectedJobId === job.id;
              const isDelayed = job.status === 'Delayed';

              return (
                <tr
                  key={job.id}
                  onClick={() => onSelectJob(job.id)}
                  className={cn(
                    'group cursor-pointer transition-all hover:bg-stone-50',
                    isSelected && 'bg-stone-100/50 border-l-4 border-l-stone-500',
                    isDelayed && !isSelected && 'bg-stone-100/30 hover:bg-stone-200/50'
                  )}
                >
                  <td className="py-3.5 px-4 font-mono font-semibold text-stone-800 group-hover:text-stone-900">
                    <div className="flex items-center gap-2">
                      {isDelayed && (
                        <AlertTriangle className="h-3.5 w-3.5 text-stone-500 shrink-0" />
                      )}
                      <span>{job.id}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-stone-800 truncate">
                      {job.productName}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono mt-0.5">
                      SKU: {job.sku}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-stone-100 text-[10px] font-bold font-mono text-stone-600 border border-stone-200">
                        {job.customerLogoInitials}
                      </div>
                      <span className="font-medium text-stone-700">{job.customer}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-medium text-stone-800">
                    <div>{job.quantity.toLocaleString()}</div>
                    <div className="text-[10px] text-stone-500">{job.unit}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-stone-800 font-mono">
                      {formatDate(job.dueDate)}
                    </div>
                    <div className="mt-1">
                      <span
                        className={cn(
                          'inline-block text-[10px] px-2 py-0.5 rounded border',
                          urgency.bg
                        )}
                      >
                        {urgency.label}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide',
                        statusTheme.badge
                      )}
                    >
                      <span className={cn('h-1.5 w-1.5 rounded-full', statusTheme.dot)} />
                      {job.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="font-medium text-stone-800 text-[11px]">
                      {job.machine.name}
                    </div>
                    <div className="text-[10px] text-stone-500 flex items-center gap-1 mt-0.5">
                      <span
                        className={cn(
                          'h-1.5 w-1.5 rounded-full',
                          job.machine.status === 'Operational'
                            ? 'bg-stone-400'
                            : 'bg-stone-700'
                        )}
                      />
                      <span>{job.machine.type}</span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 text-right pr-6">
                    <div className="flex items-center justify-end text-stone-400 group-hover:text-stone-600 transition-colors">
                      <span className="hidden sm:inline text-[11px] mr-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        Details
                      </span>
                      <ChevronRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
