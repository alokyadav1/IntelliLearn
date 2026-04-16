import Link from "next/link";
import { getCourseBySlug, courses } from "@/config/platform.config";
import { notFound } from "next/navigation";
import { auth } from "@/auth";
import { getUserProgress } from "@/app/actions/progress";
import ProgressBar from "@/components/ProgressBar";
import ResetAllProgressDialog from "@/components/ResetAllProgressDialog";
import { totalCourseTopics as aiAgentsTotalTopics } from "@/courses/ai-agents/config/course.config";
import { jenkinsModules } from "@/courses/jenkins/config/modules.config";
import { awsModules } from "@/courses/aws/config/modules.config";
import { DESIGN_TOKENS, DEFAULT_DESIGN, type AccentColor } from "@/config/design.config";
import type { Metadata } from "next";

interface CoursePageProps {
    params: Promise<{ courseSlug: string }>;
}

/** Map course slugs to their total topic count */
const courseTotalTopics: Record<string, number> = {
    "ai-agents": aiAgentsTotalTopics,
    "jenkins": jenkinsModules.reduce((acc, mod) => acc + mod.topics.length, 0),
    "aws": awsModules.reduce((acc, mod) => acc + mod.topics.length, 0),
};

export async function generateStaticParams() {
    return courses.filter((c) => c.published).map((c) => ({ courseSlug: c.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
    const { courseSlug } = await params;
    const course = getCourseBySlug(courseSlug);

    if (!course) return { title: "Course Not Found" };

    return {
        title: `${course.title} | IntelliLearn`,
        description: course.description,
        openGraph: {
            title: course.title,
            description: course.description,
            type: "website",
        },
    };
}

export default async function CourseOverviewPage({ params }: CoursePageProps) {
    const { courseSlug } = await params;
    const course = getCourseBySlug(courseSlug);
    if (!course) notFound();

    const ac = (course.accentColor as AccentColor) || "indigo";
    const tokens = DESIGN_TOKENS[ac] || DEFAULT_DESIGN;

    // ── Progress (only for courses that have a topic config) ────────────────
    const session = await auth();
    const totalTopics = courseTotalTopics[courseSlug] ?? 0;
    let completedCount = 0;

    if (session?.user && totalTopics > 0) {
        const progress = await getUserProgress(courseSlug);
        completedCount = progress.completedTopics.length;
    }

    const hasProgress = totalTopics > 0;

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.title,
        description: course.description,
        provider: {
            "@type": "Organization",
            name: "IntelliLearn",
            sameAs: "https://intelli-learn-jet.vercel.app"
        },
        hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online"
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-entry">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {/* ── Hero ─────────────────────────────────────────────── */}
            <div className={`rounded-3xl border border-border bg-gradient-to-br ${tokens.heroBg} p-6 sm:p-8 lg:p-12 mb-8 sm:mb-12 relative overflow-hidden group transition-colors duration-300`}>
                <div className="absolute top-0 right-0 w-72 h-72 bg-white/20 dark:bg-white/5 rounded-full blur-3xl -mr-24 -mt-24 transition-transform group-hover:scale-110 duration-700" />
                <div className="relative">
                    <div className={`label-small ${tokens.badgeText} mb-4 tracking-widest animate-in fade-in slide-in-from-left-4 duration-500`}>
                        {course.category.toUpperCase()}
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl heading-pro text-foreground mb-4 sm:mb-6 tracking-tight animate-in fade-in slide-in-from-left-6 duration-700">{course.title}</h1>
                    <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-6 sm:mb-8 animate-in fade-in slide-in-from-left-8 duration-1000">{course.description}</p>
                    <Link
                        href={course.navLinks[1]?.href ?? `#`}
                        className={`inline-flex items-center gap-2 ${tokens.linkBg} text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-lg hover:scale-105 active:scale-95`}
                    >
                        Start Learning
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            {/* ── Course-level Progress ─────────────────────────────── */}
            {hasProgress && session?.user && (
                <section className="card p-6 sm:p-8 mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                        <div>
                            <h2 className="text-lg font-bold text-foreground tracking-tight">Your Progress</h2>
                            <p className="text-sm text-muted-foreground mt-0.5">Across all modules in this course</p>
                        </div>
                        <div className="flex justify-start sm:justify-end">
                            <ResetAllProgressDialog courseId={courseSlug} />
                        </div>
                    </div>
                    <ProgressBar completedCount={completedCount} totalCount={totalTopics} />
                </section>
            )}

            {/* ── Course Modules ────────────────────────────────────── */}
            <section className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                <h2 className="text-2xl font-extrabold tracking-tight text-foreground mb-8">Course Curriculum</h2>
                <div className="grid gap-4 lg:grid-cols-1">
                    {course.navLinks.slice(1).map((link, idx) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`card p-6 group flex items-center gap-6 border-l-4 ${tokens.borderAccent} hover:shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]`}
                        >
                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 font-bold text-muted-foreground text-sm group-hover:bg-card group-hover:text-primary transition-colors border border-border">
                                {String(idx + 1).padStart(2, "0")}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-foreground tracking-tight group-hover:text-primary transition-colors truncate">{link.name}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-xs font-bold uppercase tracking-widest text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity hidden sm:inline`}>View Module</span>
                                <svg className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}
