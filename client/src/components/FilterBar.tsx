import type { LeadFilters } from "../types";

interface FilterBarProps {
  filters: LeadFilters;
  onChange: (filters: Partial<LeadFilters>) => void;
  onExport: () => void;
  exporting: boolean;
}

export default function FilterBar({ filters, onChange, onExport, exporting }: FilterBarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value, page: 1 })}
          className="w-full px-4 py-2 bg-surface-dark border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        />
      </div>

      <div className="flex gap-4">
        <select
          value={filters.status}
          onChange={(e) => onChange({ status: e.target.value, page: 1 })}
          className="px-4 py-2 bg-surface-dark border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="" className="bg-surface-dark text-white">All Statuses</option>
          <option value="New" className="bg-surface-dark text-white">New</option>
          <option value="Contacted" className="bg-surface-dark text-white">Contacted</option>
          <option value="Qualified" className="bg-surface-dark text-white">Qualified</option>
          <option value="Lost" className="bg-surface-dark text-white">Lost</option>
        </select>

        <select
          value={filters.source}
          onChange={(e) => onChange({ source: e.target.value, page: 1 })}
          className="px-4 py-2 bg-surface-dark border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="" className="bg-surface-dark text-white">All Sources</option>
          <option value="Website" className="bg-surface-dark text-white">Website</option>
          <option value="Instagram" className="bg-surface-dark text-white">Instagram</option>
          <option value="Referral" className="bg-surface-dark text-white">Referral</option>
        </select>
        
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value, page: 1 })}
          className="px-4 py-2 bg-surface-dark border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="latest" className="bg-surface-dark text-white">Latest First</option>
          <option value="oldest" className="bg-surface-dark text-white">Oldest First</option>
        </select>

        <button
          onClick={onExport}
          disabled={exporting}
          className="px-4 py-2 bg-surface-light border border-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors disabled:opacity-50 whitespace-nowrap"
        >
          {exporting ? "Exporting..." : "Export CSV"}
        </button>
      </div>
    </div>
  );
}
