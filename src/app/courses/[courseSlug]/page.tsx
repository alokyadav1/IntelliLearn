import Link from "next/link";
import { getCourseBySlug, courses } from "@/config/platform.config";
import { notFound } from "next/navigation";

interface CoursePageProps {
    params: Promise<{ courseSlug: string }>;
}

// ─── Accent color maps ───────────────────────────────────────────────────────
const heroBg: Record<string, string> = {
    indigo: "from-indigo-50 to-white border-indigo-100",
    orange: "from-orange-50 to-white border-orange-100",
    sky: "from-sky-50 to-white border-sky-100",
    emerald: "from-emerald-50 to-white border-emerald-100",
};
const badgeColor: Record<string, string> = {
    indigo: "text-indigo-600",
    orange: "text-orange-600",
    sky: "text-sky-600",
    emerald: "text-emerald-600",
};
const linkColor: Record<string, string> = {
    indigo: "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200",
    orange: "bg-orange-600 hover:bg-orange-700 shadow-orange-200",
    sky: "bg-sky-600 hover:bg-sky-700 shadow-sky-200",
    emerald: "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200",
};
const borderAccent: Record<string, string> = {
    indigo: "border-l-indigo-500",
    orange: "border-l-orange-500",
    sky: "border-l-sky-500",
    emerald: "border-l-emerald-500",
};

export async function generateStaticParams() {
    return courses.filter((c) => c.published).map((c) => ({ courseSlug: c.slug }));
}

export default async function CourseOverviewPage({ params }: CoursePageProps) {
    const { courseSlug } = await params;
    const course = getCourseBySlug(courseSlug);
    if (!course) notFound();

    const ac = course.accentColor;

    return (
        <div className="max-w-5xl mx-auto px-8 py-16 animate-entry">
            {/* ── Hero ─────────────────────────────────────────────── */}
            <div className={`rounded-3xl border bg-gradient-to-br ${heroBg[ac] ?? heroBg["indigo"]} p-12 mb-12 relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/60 rounded-full blur-3xl -mr-24 -mt-24" />
                <div className="relative">
                    <div className={`label-small ${badgeColor[ac] ?? badgeColor["indigo"]} mb-4 tracking-widest`}>
                        {course.category.toUpperCase()}
                    </div>
                    <h1 className="text-5xl heading-pro text-slate-900 mb-6 tracking-tight">{course.title}</h1>
                    <p className="text-xl text-slate-600 max-w-2xl leading-relaxed mb-8">{course.description}</p>
                    <Link
                        href={course.navLinks[1]?.href ?? `#`}
                        className={`inline-flex items-center gap-2 ${linkColor[ac] ?? linkColor["indigo"]} text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg`}
                    >
                        Start Learning
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* ── Course Modules ────────────────────────────────────── */}
            <section>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-8">Course Curriculum</h2>
                <div className="space-y-4">
                    {course.navLinks.slice(1).map((link, idx) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`card p-6 group flex items-center gap-6 border-l-4 ${borderAccent[ac] ?? borderAccent["indigo"]} hover:shadow-md transition-all`}
                        >
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 font-bold text-slate-500 text-sm group-hover:bg-white transition-colors border border-slate-200">
                                {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-slate-900 tracking-tight group-hover:text-indigo-700 transition-colors">{link.name}</div>
                            </div>
                            <svg className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
