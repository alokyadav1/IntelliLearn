export default function ProgressBar({
  completedCount,
  totalCount,
}: {
  completedCount: number;
  totalCount: number;
}) {
  const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="w-full mt-6 bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-2 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-1">Overall Progress</h3>
          <p className="text-sm text-slate-500 font-medium">
            {completedCount} of {totalCount} topics completed
          </p>
        </div>
        <span className="text-2xl font-extrabold text-indigo-600">{percentage}%</span>
      </div>
      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
        <div
          className="bg-indigo-500 h-3 rounded-full transition-all duration-1000 ease-out relative"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/20 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
