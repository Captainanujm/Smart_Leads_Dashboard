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
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </select>

        <select
          value={filters.source}
          onChange={(e) => onChange({ source: e.target.value, page: 1 })}
          className="px-4 py-2 bg-surface-dark border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="">All Sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </select>
        
        <select
          value={filters.sortBy}
          onChange={(e) => onChange({ sortBy: e.target.value, page: 1 })}
          className="px-4 py-2 bg-surface-dark border border-slate-600 rounded-lg text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
        >
          <option value="latest">Latest First</option>
          <option value="oldest">Oldest First</option>
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
