'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function CourseError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center justify-center text-center animate-entry">
      <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-500">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">Something went wrong!</h2>
      <p className="text-slate-600 mb-10 max-w-md mx-auto leading-relaxed">
        An error occurred while loading this course. This might be a temporary issue.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg active:scale-95"
        >
          Try again
        </button>
        <Link
          href="/"
          className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold px-8 py-4 rounded-xl transition-all shadow-sm active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
