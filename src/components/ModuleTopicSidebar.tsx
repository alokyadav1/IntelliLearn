"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Topic {
    id: string;
    title: string;
    category: string;
    href: string;
}

interface ModuleTopicSidebarProps {
    moduleTitle: string;
    topics: Topic[];
    completedTopics: string[];
    accentColor: "indigo" | "orange" | "sky";
    backHref: string;
    backLabel: string;
}

const categoryDot: Record<string, string> = {
    "Mandatory": "bg-red-400",
    "Good to Know": "bg-yellow-400 dark:bg-yellow-500",
    "Optional": "bg-green-400 dark:bg-green-500",
};

const accentClasses: Record<string, { active: string; dot: string }> = {
    indigo: {
        active: "bg-indigo-50 text-indigo-700 border-indigo-400 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-500",
        dot: "bg-indigo-500",
    },
    orange: {
        active: "bg-orange-50 text-orange-700 border-orange-400 dark:bg-orange-900/30 dark:text-orange-300 dark:border-orange-500",
        dot: "bg-orange-500",
    },
    sky: {
        active: "bg-sky-50 text-sky-700 border-sky-400 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-500",
        dot: "bg-sky-500",
    },
};

export default function ModuleTopicSidebar({
    moduleTitle,
    topics,
    completedTopics,
    accentColor,
    backHref,
    backLabel,
}: ModuleTopicSidebarProps) {
    const pathname = usePathname();
    const accent = accentClasses[accentColor] ?? accentClasses["indigo"];

    return (
        <aside className="w-72 shrink-0 border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-[#020617]/40 h-full flex flex-col overflow-hidden">
            {/* Header */}
            <div className="px-5 pt-6 pb-4 border-b border-slate-200 dark:border-slate-800">
                <Link
                    href={backHref}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors font-medium mb-4"
                >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    {backLabel}
                </Link>
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">Current Module</p>
                <h2 className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-snug">
                    {moduleTitle}
                </h2>
            </div>

            {/* Topic list */}
            <nav className="flex-1 overflow-y-auto py-3 px-3 custom-scrollbar">
                {topics.map((topic, index) => {
                    const isActive = pathname.includes(topic.id);
                    const isCompleted = completedTopics.includes(topic.id);

                    return (
                        <Link
                            key={topic.id}
                            href={topic.href}
                            className={`group flex items-start gap-3 px-3 py-2.5 rounded-lg mb-1 transition-all text-sm border ${isActive
                                ? `${accent.active} border-l-2 shadow-sm`
                                : isCompleted
                                    ? "bg-green-50/70 text-green-700 border-transparent hover:bg-green-100/80 dark:bg-green-900/10 dark:text-green-400 dark:hover:bg-green-900/20"
                                    : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-white dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white hover:shadow-sm"
                                }`}
                        >
                            {/* Index or checkmark */}
                            <span className="shrink-0 mt-0.5 w-5 flex items-center justify-center">
                                {isCompleted ? (
                                    <svg className={`w-4 h-4 ${isActive ? "text-green-600 dark:text-green-400" : "text-green-500 dark:text-green-500/80"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                ) : (
                                    <span className={`text-xs font-mono ${isActive ? "font-bold opacity-100" : "text-slate-400 dark:text-slate-600"}`}>
                                        {index + 1}
                                    </span>
                                )}
                            </span>

                            {/* Title + category */}
                            <div className="flex-1 min-w-0">
                                <span className={`block text-[13px] font-semibold leading-snug truncate ${isActive
                                    ? ""
                                    : isCompleted
                                        ? "text-green-700 dark:text-green-400"
                                        : "text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-slate-100"
                                    }`}>
                                    {topic.title}
                                </span>
                                <span className="flex items-center gap-1.5 mt-0.5">
                                    <span className={`inline-block w-1.5 h-1.5 rounded-full shrink-0 ${isCompleted ? "bg-green-400 dark:bg-green-500" : categoryDot[topic.category] ?? "bg-slate-300 dark:bg-slate-600"
                                        }`} />
                                    <span className={`text-[10px] uppercase tracking-wider font-medium ${isCompleted
                                        ? "text-green-500 dark:text-green-500/80"
                                        : isActive
                                            ? "opacity-70 dark:text-indigo-200"
                                            : "text-slate-400 dark:text-slate-500"
                                        }`}>
                                        {isCompleted ? "Completed" : topic.category}
                                    </span>
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer summary */}
            <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800 px-3 py-2.5 shadow-sm">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Progress</span>
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                            {topics.filter((t) => completedTopics.includes(t.id)).length}/{topics.length}
                        </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                        <div
                            className="bg-green-400 dark:bg-green-500 h-1.5 rounded-full transition-all duration-500"
                            style={{
                                width: `${topics.length > 0
                                    ? (topics.filter((t) => completedTopics.includes(t.id)).length / topics.length) * 100
                                    : 0}%`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </aside>
    );
}
