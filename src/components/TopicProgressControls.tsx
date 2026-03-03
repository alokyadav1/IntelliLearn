"use client";

import { useTransition } from "react";
import { markTopicCompleted, resetTopicProgress } from "@/app/actions/progress";
import { useRouter } from "next/navigation";

interface TopicProgressControlsProps {
  topicId: string;
  isCompleted: boolean;
  isAuthenticated: boolean;
}

export default function TopicProgressControls({
  topicId,
  isCompleted,
  isAuthenticated,
}: TopicProgressControlsProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  if (!isAuthenticated) return null;

  const handleMarkCompleted = () => {
    startTransition(async () => {
      await markTopicCompleted(topicId);
      router.refresh();
    });
  };

  const handleReset = () => {
    startTransition(async () => {
      await resetTopicProgress(topicId);
      router.refresh();
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200">
      {isCompleted ? (
        <div className="flex items-center gap-4 w-full justify-between bg-green-50 border border-green-200 p-4 rounded-xl">
          <div className="flex items-center gap-2 text-green-700 font-semibold">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Topic Completed!
          </div>
          <button
            onClick={handleReset}
            disabled={isPending}
            className="text-sm font-semibold text-slate-500 hover:text-rose-500 transition-colors disabled:opacity-50"
          >
            Reset Progress
          </button>
        </div>
      ) : (
        <button
          onClick={handleMarkCompleted}
          disabled={isPending}
          className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all shadow-sm disabled:opacity-70"
        >
          {isPending ? "Updating..." : "Mark as Completed"}
          {!isPending && (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
