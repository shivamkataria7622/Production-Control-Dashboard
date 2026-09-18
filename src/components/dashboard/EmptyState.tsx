import React from "react";
import { SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface EmptyStateProps {
  onResetFilters: () => void;
  searchQuery?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onResetFilters,
  searchQuery,
}) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-stone-300 bg-stone-50 p-12 text-center my-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-stone-400 border border-stone-200 shadow-sm">
        <SearchX className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-bold text-stone-800 uppercase font-mono tracking-tight">
        No Production Orders Found
      </h3>
      <p className="mt-1 max-w-sm text-xs text-stone-500">
        {searchQuery
          ? `No work orders matched your query "${searchQuery}". Try adjusting your search term or status filters.`
          : "No production jobs match the active filter criteria."}
      </p>
      <div className="mt-5">
        <Button variant="secondary" size="sm" onClick={onResetFilters}>
          <RotateCcw className="h-3.5 w-3.5 mr-1.5 text-stone-500" />
          Reset All Filters
        </Button>
      </div>
    </div>
  );
};
