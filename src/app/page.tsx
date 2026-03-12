import Link from "next/link";
import { auth, signIn } from "@/auth";
import { courses, categories } from "@/config/platform.config";
import type { CourseMeta } from "@/types/platform.types";

// ─── Accent color maps (Tailwind-safe, avoids dynamic class purging) ──────────
const cardAccentBg: Record<string, string> = {
  indigo: "bg-indigo-50 border-indigo-100",
  orange: "bg-orange-50 border-orange-100",
  sky: "bg-sky-50 border-sky-100",
  emerald: "bg-emerald-50 border-emerald-100",
};
const iconBg: Record<string, string> = {
  indigo: "bg-indigo-50 border-indigo-100 text-indigo-600 group-hover:bg-indigo-100",
  orange: "bg-orange-50 border-orange-100 text-orange-600 group-hover:bg-orange-100",
  sky: "bg-sky-50 border-sky-100 text-sky-600 group-hover:bg-sky-100",
  emerald: "bg-emerald-50 border-emerald-100 text-emerald-600 group-hover:bg-emerald-100",
};
const ctaColor: Record<string, string> = {
  indigo: "text-indigo-600",
  orange: "text-orange-600",
  sky: "text-sky-600",
  emerald: "text-emerald-600",
};
const glow: Record<string, string> = {
  indigo: "bg-indigo-50",
  orange: "bg-orange-50",
  sky: "bg-sky-50",
  emerald: "bg-emerald-50",
};

// ─── Course icons ─────────────────────────────────────────────────────────────
const courseIcons: Record<string, React.ReactNode> = {
  "ai-agents": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
  "jenkins": (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

function CourseCard({ course }: { course: CourseMeta }) {
  const ac = course.accentColor;
  return (
    <Link href={`/courses/${course.slug}`} className="card p-8 group block relative overflow-hidden">
      <div className={`absolute top-0 right-0 w-32 h-32 ${glow[ac] ?? "bg-slate-50"} rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-opacity group-hover:opacity-100`} />
      <div className="relative">
        <div className={`h-12 w-12 rounded-xl ${iconBg[ac] ?? iconBg["indigo"]} border flex items-center justify-center mb-6 group-hover:scale-110 transition-all shadow-sm`}>
          {courseIcons[course.slug] ?? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          )}
        </div>
        <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${ctaColor[ac] ?? "text-indigo-600"}`}>{course.category}</div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">{course.title}</h3>
        <p className="text-slate-600 leading-relaxed mb-6 text-sm">{course.description}</p>
        <div className={`font-semibold text-sm flex items-center label-small tracking-wider ${ctaColor[ac] ?? "text-indigo-600"}`}>
          START LEARNING
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export default async function Home() {
  const session = await auth();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-entry">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <header className="mb-12">
        <div className="label-small text-indigo-600 mb-4">Engineering Learning Portal</div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl heading-pro text-slate-900 mb-6 tracking-tight">
          Master Modern <span className="text-indigo-600">Engineering</span>.
        </h1>
        <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-2xl leading-relaxed">
          Production-grade courses on AI Agents, DevOps, CI/CD, and beyond — built for engineers who want to ship, not just learn.
        </p>
      </header>

      {/* ── Auth Banner ──────────────────────────────────────────── */}
      {!session ? (
        <div className="bg-white border-2 border-indigo-100/50 rounded-2xl p-6 sm:p-8 lg:p-10 mb-10 sm:mb-16 shadow-xl shadow-indigo-900/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60" />
          <div className="relative">
            <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Track Your Progress</h2>
            <p className="text-slate-600 mb-8 max-w-xl text-lg">
              Sign in to track completed topics and resume exactly where you left off across all courses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <form action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/courses/ai-agents/prerequisites" });
              }}>
                <button type="submit" className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all shadow-md shadow-slate-900/10 border border-slate-800">
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  Sign in with GitHub — Progress Tracked
                </button>
              </form>
              <Link href="/courses/ai-agents" className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-center gap-3 px-6 py-4 rounded-xl transition-all shadow-sm border border-slate-200">
                Browse Courses
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-6 mb-16 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">Welcome back, {session.user?.name || "Engineer"}!</h2>
            <p className="text-slate-600 text-sm">Your progress is being tracked. Resume where you left off.</p>
          </div>
        </div>
      )}

      {/* ── Course Catalog ───────────────────────────────────────── */}
      {categories.map((category) => {
        const categoryCourses = courses.filter((c) => c.category === category && c.published);
        if (categoryCourses.length === 0) return null;
        return (
          <section key={category} className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">{category}</h2>
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400 font-medium tracking-wider uppercase">{categoryCourses.length} Course{categoryCourses.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {categoryCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
