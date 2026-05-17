export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your leads</p>
        </div>
      </div>
      <div className="bg-surface rounded-xl border border-slate-700/50 p-6">
        <p className="text-slate-400">Leads table will go here...</p>
      </div>
    </div>
  );
}
