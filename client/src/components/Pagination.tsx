interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="px-3 py-1.5 text-sm rounded-lg bg-surface-light text-slate-300 hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
            p === page
              ? "bg-primary text-white"
              : "bg-surface-light text-slate-300 hover:bg-surface"
          }`}
        >
          {p}
        </button>
      ))}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="px-3 py-1.5 text-sm rounded-lg bg-surface-light text-slate-300 hover:bg-surface disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
}
