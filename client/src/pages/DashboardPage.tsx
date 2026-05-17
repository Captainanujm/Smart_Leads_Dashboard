import { useState, useEffect, useCallback } from "react";
import type { Lead, LeadFormData, LeadFilters } from "../types";
import { getLeads, createLead, updateLead, deleteLead, exportLeadsCsv } from "../api/leads";
import LeadTable from "../components/LeadTable";
import LeadForm from "../components/LeadForm";
import FilterBar from "../components/FilterBar";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import { useDebounce } from "../hooks/useDebounce";

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [filters, setFilters] = useState<LeadFilters>({
    status: "",
    source: "",
    search: "",
    sortBy: "latest",
    page: 1,
  });
  
  const [totalPages, setTotalPages] = useState(1);
  const [exporting, setExporting] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);

  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = {
        page: filters.page,
        limit: 10,
        sortBy: filters.sortBy,
      };
      
      if (filters.status) params.status = filters.status;
      if (filters.source) params.source = filters.source;
      if (debouncedSearch) params.search = debouncedSearch;

      const res = await getLeads(params);
      setLeads(res.data?.data || []);
      setTotalPages(res.data?.totalPages || 1);
    } catch {
      // API error handled by interceptor
    } finally {
      setLoading(false);
    }
  }, [filters.page, filters.status, filters.source, filters.sortBy, debouncedSearch]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleFilterChange = (newFilters: Partial<LeadFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleExport = async () => {
    try {
      setExporting(true);
      const params: Record<string, string> = { sortBy: filters.sortBy };
      if (filters.status) params.status = filters.status;
      if (filters.source) params.source = filters.source;
      if (debouncedSearch) params.search = debouncedSearch;

      const blob = await exportLeadsCsv(params);
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "leads_export.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Export failed", error);
    } finally {
      setExporting(false);
    }
  };

  const handleCreateOrUpdate = async (data: LeadFormData) => {
    if (editingLead) {
      await updateLead(editingLead._id, data);
    } else {
      await createLead(data);
    }
    setIsFormOpen(false);
    setEditingLead(null);
    fetchLeads();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this lead?")) {
      await deleteLead(id);
      fetchLeads();
    }
  };

  const openNewLeadModal = () => {
    setEditingLead(null);
    setIsFormOpen(true);
  };

  const openEditLeadModal = (lead: Lead) => {
    setEditingLead(lead);
    setIsFormOpen(true);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your leads</p>
        </div>
        <button
          onClick={openNewLeadModal}
          className="px-4 py-2 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <span>+</span> New Lead
        </button>
      </div>

      <FilterBar 
        filters={filters} 
        onChange={handleFilterChange} 
        onExport={handleExport}
        exporting={exporting}
      />

      <div className="bg-surface rounded-xl border border-slate-700/50 shadow-sm overflow-hidden mb-6">
        {loading ? (
          <Spinner />
        ) : (
          <LeadTable
            leads={leads}
            onEdit={openEditLeadModal}
            onDelete={handleDelete}
          />
        )}
      </div>

      {!loading && leads.length > 0 && (
        <Pagination 
          page={filters.page} 
          totalPages={totalPages} 
          onPageChange={(p) => handleFilterChange({ page: p })} 
        />
      )}

      {isFormOpen && (
        <LeadForm
          initialData={editingLead}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => {
            setIsFormOpen(false);
            setEditingLead(null);
          }}
        />
      )}
    </div>
  );
}
