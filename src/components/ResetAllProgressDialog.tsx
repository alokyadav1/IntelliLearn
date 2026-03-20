"use client";

import { useTransition, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { resetAllProgress } from "@/app/actions/progress";
import { useRouter } from "next/navigation";

export default function ResetAllProgressDialog({ courseId }: { courseId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Ensure we're client-side before using portals
  useEffect(() => { setMounted(true); }, []);

  // Lock body scroll and block background interactions when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isPending) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, isPending]);

  // Focus cancel button when modal opens (safe default)
  useEffect(() => {
    if (isOpen) cancelRef.current?.focus();
  }, [isOpen]);

  const handleReset = () => {
    startTransition(async () => {
      await resetAllProgress(courseId);
      setIsOpen(false);
      router.refresh();
    });
  };

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reset-dialog-title"
      aria-describedby="reset-dialog-desc"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
    >
      {/* Backdrop — covers everything including sticky header */}
      <div className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm" aria-hidden="true" />

      {/* Dialog panel */}
      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-sm p-6 ring-1 ring-slate-900/5 dark:ring-slate-800 transition-colors duration-300">
        {/* Icon */}
        <div className="w-11 h-11 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center mb-4">
          <svg className="w-5 h-5 text-rose-600 dark:text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        {/* Content */}
        <h3 id="reset-dialog-title" className="text-[17px] font-bold text-slate-900 dark:text-white mb-1">
          Reset all progress?
        </h3>
        <p id="reset-dialog-desc" className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
          This will permanently clear all completed topics for this course. This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            ref={cancelRef}
            onClick={() => setIsOpen(false)}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            disabled={isPending}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl transition-colors shadow-sm disabled:opacity-70 flex items-center justify-center gap-1.5"
          >
            {isPending ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Resetting…
              </>
            ) : (
              "Reset progress"
            )}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm font-bold text-rose-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/20"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Reset All Progress
      </button>

      {/* Render modal via portal so it's outside all stacking contexts */}
      {mounted && isOpen && createPortal(modal, document.body)}
    </>
  );
}
