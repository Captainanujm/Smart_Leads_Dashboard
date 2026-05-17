import { useState, useEffect, useCallback } from "react";
import { Lead, LeadFormData } from "../types";
import { getLeads, createLead, updateLead, deleteLead } from "../api/leads";
import LeadTable from "../components/LeadTable";
import LeadForm from "../components/LeadForm";
import Spinner from "../components/Spinner";

export default function DashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getLeads({ page: 1, limit: 10 });
      setLeads(res.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

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
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Lead
        </button>
      </div>

      <div className="bg-surface rounded-xl border border-slate-700/50 shadow-sm overflow-hidden">
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
