import { Lead } from "../types";

interface StatusBadgeProps {
  status: Lead["status"];
}

const statusColors: Record<Lead["status"], string> = {
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Qualified: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Lost: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex px-2.5 py-0.5 text-xs font-medium rounded-full border ${statusColors[status]}`}
    >
      {status}
    </span>
  );
}
