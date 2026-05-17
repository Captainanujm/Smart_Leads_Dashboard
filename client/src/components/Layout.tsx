import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

export default function Layout() {
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-surface-dark transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-surface border-b border-slate-700/50 flex items-center justify-between px-8 transition-colors duration-300">
          <div />
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2 text-slate-400 hover:text-primary transition-colors rounded-full hover:bg-surface-light"
              title="Toggle Theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-slate-400 hover:text-primary hover:bg-surface-light rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
