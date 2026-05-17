import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
    { to: "/leads/new", label: "Add Lead", icon: "M12 4v16m8-8H4" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-surface border-r border-slate-700/50 min-h-screen flex flex-col">
      <div className="p-6 border-b border-slate-700/50">
        <h1 className="text-xl font-bold text-white">Smart Leads</h1>
        <p className="text-xs text-slate-400 mt-1">Lead Management System</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
              isActive(link.to)
                ? "bg-primary/10 text-primary-light font-medium"
                : "text-slate-400 hover:bg-surface-light hover:text-slate-200"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={link.icon} />
            </svg>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="flex items-center gap-3 px-3">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary-light text-sm font-medium">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
