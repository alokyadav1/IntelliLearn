"use client";

import { useState, useEffect } from "react";

interface MobileSidebarWrapperProps {
    children: React.ReactNode;
    triggerLabel?: string;
}

export default function MobileSidebarWrapper({ children, triggerLabel = "Menu" }: MobileSidebarWrapperProps) {
    const [isOpen, setIsOpen] = useState(false);

    // Close drawer when route changes (user navigated)
    useEffect(() => {
        setIsOpen(false);
    }, []);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    return (
        <>
            {/* Mobile trigger button */}
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-5 left-5 z-40 flex items-center gap-2 bg-indigo-600 text-white text-sm font-semibold px-4 py-3 rounded-full shadow-lg shadow-indigo-900/30 hover:bg-indigo-700 transition-all active:scale-95"
                aria-label="Open sidebar"
            >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {triggerLabel}
            </button>

            {/* Backdrop */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div
                className={`lg:hidden fixed inset-y-0 left-0 z-50 w-[85vw] max-w-sm bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Close button inside drawer */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
                    aria-label="Close sidebar"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Sidebar content */}
                <div className="h-full overflow-y-auto" onClick={() => setIsOpen(false)}>
                    {children}
                </div>
            </div>
        </>
    );
}
