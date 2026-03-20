"use client";

import { useTransition } from "react";
import { markTopicCompleted, resetTopicProgress } from "@/app/actions/progress";
import { useRouter } from "next/navigation";

interface TopicProgressControlsProps {
  courseId: string;
  topicId: string;
  isCompleted: boolean;
  isAuthenticated: boolean;
}

export default function TopicProgressControls({
  courseId,
  topicId,
  isCompleted,
  isAuthenticated,
}: TopicProgressControlsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!isAuthenticated) return null;

  const handleMarkCompleted = () => {
    startTransition(async () => {
      await markTopicCompleted(courseId, topicId);
      router.refresh();
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      await resetTopicProgress(courseId, topicId);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {isCompleted ? (
        <div className="flex items-center gap-4 w-full justify-between bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800/30 p-4 rounded-xl transition-colors">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-bold">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            Topic Completed!
          </div>
          <button
            onClick={handleReset}
            disabled={isPending}
            className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-all disabled:opacity-50 px-3 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
          >
            Reset Progress
          </button>
        </div>
      ) : (
        <button
          onClick={handleMarkCompleted}
          disabled={isPending}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-400 text-white font-bold flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/10 active:scale-95 disabled:opacity-70"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating...
            </div>
          ) : (
            <>
              Mark as Completed
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </>
          )}
        </button>
      )}
    </div>
  );
}
