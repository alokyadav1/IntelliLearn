import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getTopicById, prerequisiteModules } from "@/courses/ai-agents/config/prerequisites.config";
import { getUserProgress } from "@/app/actions/progress";
import TopicProgressControls from "@/components/TopicProgressControls";
import { auth } from "@/auth";
import contentRegistry from "@/courses/ai-agents/content/prerequisites";

const COURSE_ID = "ai-agents";

interface PageProps {
    params: Promise<{ topicId: string }>;
}

export function generateStaticParams() {
    const allParams: { topicId: string }[] = [];
    prerequisiteModules.forEach((mod) => {
        mod.topics.forEach((topic) => {
            allParams.push({ topicId: topic.id });
        });
    });
    return allParams;
}

const categoryIcons: Record<string, string> = {
    "Mandatory": "🟥",
    "Good to Know": "🟨",
    "Optional": "🟩",
};

export default async function TopicPage({ params }: PageProps) {
    const { topicId } = await params;
    const match = getTopicById(topicId);

    if (!match) notFound();

    const { module, topic } = match;

    const session = await auth();
    const progress = await getUserProgress(COURSE_ID);
    const isCompleted = progress.completedTopics.includes(topic.id);

    const ContentComponent = contentRegistry[topic.id] ?? null;

    return (
        <div className="max-w-4xl mx-auto px-8 py-16 animate-entry">
            <Breadcrumb
                items={[
                    { name: "AI Agents", href: "/courses/ai-agents" },
                    { name: "Prerequisites", href: "/courses/ai-agents/prerequisites" },
                    { name: module.title.split(" — ")[1] || module.title },
                    { name: topic.title },
                ]}
            />

            <header className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-indigo-700 tracking-tight font-medium bg-indigo-50 px-3 py-1 rounded w-fit border border-indigo-100">
                        <span>{module.title}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-700 tracking-tight font-medium bg-white px-3 py-1 rounded w-fit border border-slate-200 shadow-sm">
                        <span>{categoryIcons[topic.category]}</span>
                        <span className="opacity-90">{topic.category}</span>
                    </div>
                </div>
                <h1 className="text-4xl heading-pro text-slate-900 tracking-tight leading-snug">
                    {topic.title}
                </h1>
            </header>

            {ContentComponent ? (
                <div className="mb-10">
                    <ContentComponent />
                </div>
            ) : (
                <section className="card p-12 flex flex-col items-center justify-center text-center border-dashed mb-10 bg-slate-50/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>
                    <div className="bg-white w-24 h-24 rounded-full flex flex-col items-center justify-center mb-6 shadow-sm border border-slate-100 relative z-10">
                        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-2">Content Coming Soon</h2>
                    <p className="text-slate-500 max-w-lg">
                        The curriculum data for <strong>{topic.title}</strong> is currently being assembled. Check back soon for comprehensive materials on this subject.
                    </p>
                </section>
            )}

            <TopicProgressControls
                courseId={COURSE_ID}
                topicId={topic.id}
                isCompleted={isCompleted}
                isAuthenticated={!!session?.user}
            />
        </div>
    );
}
