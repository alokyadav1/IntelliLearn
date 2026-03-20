import Link from "next/link";
import { auth } from "@/auth";
import { courses, categories } from "@/config/platform.config";
import type { CourseMeta } from "@/types/platform.types";
import { DESIGN_TOKENS, DEFAULT_DESIGN, type AccentColor } from "@/config/design.config";
import { COURSE_ICONS, DEFAULT_COURSE_ICON } from "@/config/icons.config";
import { handleGitHubSignIn } from "@/actions/auth.actions";

function CourseCard({ course }: { course: CourseMeta }) {
  const ac = (course.accentColor as AccentColor) || "indigo";
  const tokens = DESIGN_TOKENS[ac] || DEFAULT_DESIGN;
  
  return (
    <Link href={`/courses/${course.slug}`} className="group flex flex-col justify-between p-8 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-[2rem] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:bg-slate-900 relative overflow-hidden backdrop-blur-xl">
      <div className={`absolute -right-16 -top-16 w-48 h-48 ${tokens.glow} rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500`} />
      
      <div>
        <div className="flex items-start justify-between mb-8">
          <div className={`w-16 h-16 rounded-2xl ${tokens.iconBg} border border-white/40 dark:border-slate-700/50 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
            {COURSE_ICONS[course.slug] || DEFAULT_COURSE_ICON}
          </div>
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${tokens.badgeText} bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/50 dark:border-slate-700/50 backdrop-blur-md`}>
            {course.category}
          </span>
        </div>
        
        <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{course.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 leading-loose mb-8 line-clamp-3 font-medium">{course.description}</p>
      </div>

      <div className="flex items-center text-sm font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-widest label-small">
        <span>Explore Course</span>
        <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </div>
    </Link>
  );
}

export default async function Home() {
  const session = await auth();

  return (
    <div className="animate-entry min-h-screen">
      {/* ── Hero Section ─────────────────────────────────────────────────── */}
      <section className="relative pt-24 pb-28 sm:pt-36 sm:pb-36 overflow-hidden border-b border-slate-200/50 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#020617]">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 inset-x-0 h-[600px] w-full bg-gradient-to-b from-indigo-500/10 via-transparent to-transparent pointer-events-none dark:from-indigo-600/10"></div>
        <div className="absolute -left-40 top-20 w-96 h-96 bg-rose-400/20 dark:bg-rose-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        <div className="absolute -right-40 top-40 w-96 h-96 bg-sky-400/20 dark:bg-sky-600/10 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] font-bold uppercase tracking-[0.2em] mb-8 shadow-sm backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Engineering Portal 2.0
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-8 max-w-4xl mx-auto leading-[1.1] drop-shadow-sm">
            Master the art of <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-rose-500 dark:from-indigo-400 dark:to-rose-400 inline-block mt-2">modern engineering.</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            Production-grade courses on AI Agents, DevOps, CI/CD, and architecture. Designed explicitly for engineers who intend to ship world-class software.
          </p>
          
          {!session ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <form action={handleGitHubSignIn} className="w-full sm:w-auto">
                <button type="submit" className="w-full sm:w-auto bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 text-white font-bold flex items-center justify-center gap-3 px-8 py-4 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-900/10 dark:shadow-indigo-900/20 active:scale-95 group">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                  Connect with GitHub
                </button>
              </form>
              <Link href="#courses" className="w-full sm:w-auto bg-white dark:bg-slate-900/80 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold flex items-center justify-center gap-3 px-8 py-4 rounded-2xl transition-all shadow-sm border border-slate-200 dark:border-slate-800 backdrop-blur-md active:scale-95 group">
                Browse Curriculum
                <svg className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="max-w-xl mx-auto bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800 rounded-3xl p-3 flex flex-col sm:flex-row items-center gap-4 shadow-xl shadow-slate-200/50 dark:shadow-none transition-all">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-rose-100 dark:from-indigo-900/50 dark:to-rose-900/50 rounded-2xl flex items-center justify-center shrink-0 shadow-inner border border-white/50 dark:border-slate-700/50 hidden sm:flex">
                <span className="text-xl">👋</span>
              </div>
              <div className="text-center sm:text-left flex-1 px-4 sm:px-0 py-2 sm:py-0">
                <div className="font-extrabold text-slate-900 dark:text-white text-[17px]">Welcome back, {session.user?.name || "Engineer"}!</div>
                <div className="text-slate-500 dark:text-slate-400 text-sm font-medium mt-0.5">Ready to pick up where you left off?</div>
              </div>
              <Link href="#courses" className="w-full sm:w-auto sm:ml-auto px-7 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-slate-900/10 dark:shadow-indigo-900/20 transition-all hover:-translate-y-0.5 active:scale-95 text-center">
                Resume
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Course Catalog ───────────────────────────────────────── */}
      <section id="courses" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-50 dark:bg-indigo-900/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
        
        {categories.map((category) => {
          const categoryCourses = courses.filter((c) => c.category === category && c.published);
          if (categoryCourses.length === 0) return null;
          return (
            <div key={category} className="mb-24 last:mb-0">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-3">{category}</h2>
                  <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">Curated progression paths to elevate your technical prowess.</p>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-slate-400 pb-1.5">
                  <span>{categoryCourses.length} Course{categoryCourses.length !== 1 ? "s" : ""}</span>
                  <div className="w-12 h-px bg-slate-200 dark:bg-slate-800" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {categoryCourses.map((course) => (
                  <CourseCard key={course.slug} course={course} />
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
