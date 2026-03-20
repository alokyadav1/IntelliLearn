"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCourseBySlug } from "@/config/platform.config";

interface CourseSidebarProps {
    courseSlug: string;
    children?: React.ReactNode;
}

const accentActiveMap: Record<string, string> = {
    indigo: "text-indigo-700 dark:text-indigo-400 border-indigo-600 dark:border-indigo-500",
    orange: "text-orange-700 dark:text-orange-400 border-orange-600 dark:border-orange-500",
    sky: "text-sky-700 dark:text-sky-400 border-sky-600 dark:border-sky-500",
    emerald: "text-emerald-700 dark:text-emerald-400 border-emerald-600 dark:border-emerald-500",
};

export default function CourseSidebar({ courseSlug }: CourseSidebarProps) {
    const pathname = usePathname();
    const course = getCourseBySlug(courseSlug);

    if (!course) return null;

    const activeClass = accentActiveMap[course.accentColor] ?? accentActiveMap["indigo"];

    return (
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 h-full flex flex-col pt-8 pb-4 shrink-0 overflow-hidden">
            {/* Course branding */}
            <div className="px-6 mb-3">
                <Link href="/#courses" className="text-xs text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium flex items-center gap-1 mb-4">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    All Courses
                </Link>
                <h1 className="text-xl heading-pro text-slate-900 dark:text-white tracking-tight leading-tight">{course.title}</h1>
                <p className="label-small text-slate-500 dark:text-slate-400 mt-1.5">{course.tagline}</p>
            </div>

            {/* Divider */}
            <div className="mx-6 mb-4 border-t border-slate-200 dark:border-slate-800" />

            {/* Course nav links */}
            <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
                {course.navLinks.map((link) => {
                    const isActive =
                        pathname === link.href ||
                        (link.href !== `/courses/${courseSlug}` &&
                            pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                ? `bg-white dark:bg-slate-800 ${activeClass} border-l-4 shadow-sm font-bold`
                                : "text-slate-600 dark:text-slate-400 hover:bg-white/60 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white border-l-4 border-transparent"
                                }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </nav>

            <div className="px-6 mt-auto">
                <div className="p-4 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-slate-200/50 dark:border-slate-700/50">
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Course Context</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">{course.category}</p>
                </div>
            </div>
        </aside>
    );
}
