import type { Lead } from "../types";
import StatusBadge from "./StatusBadge";
import { useAuth } from "../context/AuthContext";

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

export default function LeadTable({ leads, onEdit, onDelete }: LeadTableProps) {
  const { user } = useAuth();

  if (leads.length === 0) {
    return (
      <div className="p-8 text-center text-slate-400">
        No leads found yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="text-xs uppercase bg-surface-light text-slate-400">
          <tr>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium">Source</th>
            <th className="px-6 py-4 font-medium">Assigned To</th>
            <th className="px-6 py-4 font-medium">Created</th>
            <th className="px-6 py-4 font-medium text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {leads.map((lead) => (
            <tr
              key={lead._id}
              className="hover:bg-surface-light/50 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="font-medium text-white">{lead.name}</div>
                <div className="text-xs text-slate-500">{lead.email}</div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={lead.status} />
              </td>
              <td className="px-6 py-4">{lead.source}</td>
              <td className="px-6 py-4 text-xs">
                {lead.assignedTo?.name || "Unassigned"}
              </td>
              <td className="px-6 py-4 text-xs">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={() => onEdit(lead)}
                    className="text-primary-light hover:text-white transition-colors"
                  >
                    Edit
                  </button>
                  {user?.role === "admin" && (
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="text-danger hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
