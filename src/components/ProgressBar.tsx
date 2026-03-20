export default function ProgressBar({
  completedCount,
  totalCount,
}: {
  completedCount: number;
  totalCount: number;
}) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4">
        <div>
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1 leading-none">Overall Progress</h3>
          <p className="text-sm text-slate-900 dark:text-slate-100 font-bold">
            {completedCount} of {totalCount} topics completed
          </p>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{percentage}</span>
          <span className="text-xs font-bold text-slate-400 uppercase">%</span>
        </div>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-3 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-indigo-600 to-indigo-400 h-3 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse transition-opacity duration-300 group-hover:opacity-40"></div>
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-white/30 blur-sm transform translate-x-1"></div>
        </div>
      </div>
    </div>
  );
}
