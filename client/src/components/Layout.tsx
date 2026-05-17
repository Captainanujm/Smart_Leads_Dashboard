import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-surface-dark">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-surface border-b border-slate-700/50 flex items-center justify-between px-8">
          <div />
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-surface-light rounded-lg transition-colors"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
