export type JobStatus = 'Pending' | 'In Progress' | 'Delayed' | 'Completed';

export type MachineStatus = 'Operational' | 'Maintenance Required' | 'Idle' | 'Busy';

export interface Machine {
  id: string;
  name: string;
  type: string;
  location: string;
  status: MachineStatus;
  efficiencyRating: number;
}

export interface JobNote {
  id: string;
  author: string;
  role: string;
  content: string;
  createdAt: string;
  type: 'general' | 'issue' | 'status_change';
}

export interface Job {
  id: string;
  productName: string;
  sku: string;
  customer: string;
  customerLogoInitials: string;
  quantity: number;
  unit: string;
  dueDate: string;
  status: JobStatus;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  machine: Machine;
  assignedOperator: string;
  shift: 'Shift A (Morning)' | 'Shift B (Evening)' | 'Shift C (Night)';
  completionPercentage: number;
  notes: JobNote[];
  createdAt: string;
}

export type SortField = 'dueDate' | 'quantity' | 'id' | 'customer' | 'status';
export type SortOrder = 'asc' | 'desc';

export interface JobFilterState {
  searchQuery: string;
  statusFilter: JobStatus | 'All';
  machineFilter: string | 'All';
  sortBy: SortField;
  sortOrder: SortOrder;
}

export interface MetricsSummary {
  totalJobs: number;
  inProgressJobs: number;
  delayedJobs: number;
  dueSoonJobs: number;
  completedJobs: number;
  completionRatePercentage: number;
  operationalEfficiencyPercentage: number;
}
