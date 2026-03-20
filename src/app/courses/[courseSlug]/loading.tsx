export default function CourseLoading() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-pulse">
      {/* Skeleton Hero */}
      <div className="h-64 sm:h-80 bg-slate-200 rounded-3xl mb-12" />
      
      {/* Skeleton Progress */}
      <div className="h-24 bg-slate-100 rounded-2xl mb-10" />
      
      {/* Skeleton Curriculum */}
      <div className="space-y-4">
        <div className="h-10 w-48 bg-slate-200 rounded mb-8" />
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-50 rounded-2xl border border-slate-100" />
        ))}
      </div>
    </div>
  );
}
