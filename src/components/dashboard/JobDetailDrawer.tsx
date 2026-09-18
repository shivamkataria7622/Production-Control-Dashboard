import React, { useState } from "react";
import { Job, JobStatus } from "@/types/job";
import { Sheet } from "@/components/ui/Sheet";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import {
  formatDate,
  getDueDateUrgency,
  getStatusBadgeTheme,
  cn,
} from "@/lib/utils";
import {
  Cpu,
  User,
  Calendar,
  Layers,
  AlertTriangle,
  Send,
  Building2,
  Clock,
  Activity,
  CheckCircle2,
  AlertOctagon,
  FileText,
} from "lucide-react";

interface JobDetailDrawerProps {
  job: Job | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (jobId: string, status: JobStatus) => void;
  onAddNote: (
    jobId: string,
    content: string,
    type: "general" | "issue",
  ) => void;
}

export const JobDetailDrawer: React.FC<JobDetailDrawerProps> = ({
  job,
  isOpen,
  onClose,
  onStatusChange,
  onAddNote,
}) => {
  const [newNoteContent, setNewNoteContent] = useState("");
  const [noteType, setNoteType] = useState<"general" | "issue">("general");

  if (!job) return null;

  const statusTheme = getStatusBadgeTheme(job.status);
  const urgency = getDueDateUrgency(job.dueDate, job.status);

  const statusOptions: { value: JobStatus; label: string }[] = [
    { value: "Pending", label: "Set Status: Pending" },
    { value: "In Progress", label: "Set Status: In Progress" },
    { value: "Delayed", label: "Set Status: Delayed" },
    { value: "Completed", label: "Set Status: Completed" },
  ];

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim()) return;
    onAddNote(job.id, newNoteContent, noteType);
    setNewNoteContent("");
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={onClose}
      title={`Work Order ${job.id}`}
      subtitle={`Customer: ${job.customer}`}
    >
      <div className="space-y-6 text-xs text-stone-700">
        <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-4 shadow-sm">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-stone-500">
                Product Name
              </span>
              <h3 className="text-base font-bold text-stone-900 tracking-tight mt-0.5">
                {job.productName}
              </h3>
              <p className="text-stone-500 text-xs font-mono mt-0.5">
                SKU: {job.sku}
              </p>
            </div>

            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold",
                statusTheme.badge,
              )}
            >
              <span className={cn("h-2 w-2 rounded-full", statusTheme.dot)} />
              {job.status}
            </span>
          </div>

          <div className="pt-3 border-t border-stone-100">
            <label className="block text-[11px] font-semibold text-stone-600 uppercase tracking-wider mb-2">
              Update Order Status
            </label>
            <div className="flex items-center gap-3">
              <Select
                options={statusOptions}
                value={job.status}
                onChange={(e) =>
                  onStatusChange(job.id, e.target.value as JobStatus)
                }
                className="bg-stone-50 border-stone-200 text-xs h-9 font-medium"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-1.5 text-stone-500 text-[11px] uppercase tracking-wider font-mono">
              <Layers className="h-3.5 w-3.5 text-stone-400" />
              <span>Target Quantity</span>
            </div>
            <div className="mt-1 text-sm font-bold text-stone-800 font-mono">
              {job.quantity.toLocaleString()} {job.unit}
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-1.5 text-stone-500 text-[11px] uppercase tracking-wider font-mono">
              <Calendar className="h-3.5 w-3.5 text-stone-400" />
              <span>Target Due Date</span>
            </div>
            <div className="mt-1 text-sm font-bold text-stone-800 font-mono">
              {formatDate(job.dueDate)}
            </div>
            <div className="mt-1">
              <span
                className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded border",
                  urgency.bg,
                )}
              >
                {urgency.label}
              </span>
            </div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-1.5 text-stone-500 text-[11px] uppercase tracking-wider font-mono">
              <User className="h-3.5 w-3.5 text-stone-400" />
              <span>Assigned Operator</span>
            </div>
            <div className="mt-1 text-xs font-semibold text-stone-800">
              {job.assignedOperator}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">{job.shift}</div>
          </div>

          <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-sm">
            <div className="flex items-center gap-1.5 text-stone-500 text-[11px] uppercase tracking-wider font-mono">
              <Building2 className="h-3.5 w-3.5 text-stone-400" />
              <span>Customer</span>
            </div>
            <div className="mt-1 text-xs font-semibold text-stone-800">
              {job.customer}
            </div>
            <div className="text-[10px] text-stone-500 mt-0.5">
              PO: #{job.id.replace("JOB-", "PO-")}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-stone-500 uppercase tracking-wider text-[11px] font-mono">
              Production Completion
            </span>
            <span className="font-mono text-stone-700 font-bold">
              {job.completionPercentage}%
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-stone-100 overflow-hidden">
            <div
              className={cn(
                "h-full rounded-full transition-all duration-500",
                job.status === "Completed"
                  ? "bg-stone-500"
                  : job.status === "Delayed"
                    ? "bg-stone-800"
                    : "bg-stone-400",
              )}
              style={{ width: `${job.completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-stone-200 bg-white p-4 space-y-3 shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 pb-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-4 w-4 text-stone-500" />
              <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider font-mono">
                Assigned Machine Telemetry
              </h4>
            </div>
            <Badge
              variant={
                job.machine.status === "Operational" ? "success" : "destructive"
              }
              className="text-[10px]"
            >
              {job.machine.status}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-mono">
                Machine ID
              </span>
              <p className="font-mono font-semibold text-stone-800">
                {job.machine.id}
              </p>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-mono">
                Machine Name
              </span>
              <p className="font-medium text-stone-800 truncate">
                {job.machine.name}
              </p>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-mono">
                Location
              </span>
              <p className="text-stone-700">{job.machine.location}</p>
            </div>
            <div>
              <span className="text-stone-500 text-[10px] uppercase font-mono">
                Efficiency
              </span>
              <p className="font-mono text-stone-600 font-semibold">
                {job.machine.efficiencyRating}% OEE
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-stone-400" />
              <h4 className="font-bold text-stone-800 text-xs uppercase tracking-wider font-mono">
                Notes & Operational Issues ({job.notes.length})
              </h4>
            </div>
          </div>

          <form
            onSubmit={handleAddNoteSubmit}
            className="space-y-2 rounded-xl border border-stone-200 bg-white p-3 shadow-sm"
          >
            <textarea
              rows={2}
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Add an operational log note or issue alert..."
              className="w-full rounded-lg border border-stone-200 bg-stone-50 p-2.5 text-xs text-stone-800 placeholder:text-stone-400 focus:border-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-400 resize-none"
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 text-[11px] text-stone-600 cursor-pointer">
                  <input
                    type="radio"
                    name="noteType"
                    checked={noteType === "general"}
                    onChange={() => setNoteType("general")}
                    className="text-stone-500 focus:ring-stone-500 border-stone-300"
                  />
                  <span>General Log</span>
                </label>
                <label className="flex items-center gap-1.5 text-[11px] text-stone-800 cursor-pointer">
                  <input
                    type="radio"
                    name="noteType"
                    checked={noteType === "issue"}
                    onChange={() => setNoteType("issue")}
                    className="text-stone-700 focus:ring-stone-700 border-stone-300"
                  />
                  <span>Issue Alert</span>
                </label>
              </div>

              <Button
                type="submit"
                size="sm"
                disabled={!newNoteContent.trim()}
                className="h-8 bg-stone-800 text-white"
              >
                <Send className="h-3 w-3 mr-1.5" />
                <span>Post Note</span>
              </Button>
            </div>
          </form>

          <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
            {job.notes.length === 0 ? (
              <p className="text-stone-500 italic text-center py-4 text-xs">
                No operational notes recorded yet.
              </p>
            ) : (
              job.notes.map((note) => (
                <div
                  key={note.id}
                  className={cn(
                    "rounded-lg border p-3 text-xs space-y-1 shadow-sm",
                    note.type === "issue"
                      ? "border-stone-400 bg-stone-100"
                      : note.type === "status_change"
                        ? "border-stone-300 bg-stone-50"
                        : "border-stone-200 bg-white",
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {note.type === "issue" ? (
                        <AlertOctagon className="h-3.5 w-3.5 text-stone-600" />
                      ) : note.type === "status_change" ? (
                        <Activity className="h-3.5 w-3.5 text-stone-500" />
                      ) : (
                        <CheckCircle2 className="h-3.5 w-3.5 text-stone-400" />
                      )}
                      <span className="font-semibold text-stone-800">
                        {note.author}
                      </span>
                      <span className="text-[10px] text-stone-500 font-mono">
                        ({note.role})
                      </span>
                    </div>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {formatDate(note.createdAt)}
                    </span>
                  </div>
                  <p className="text-stone-700 text-xs leading-relaxed pt-0.5">
                    {note.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </Sheet>
  );
};
