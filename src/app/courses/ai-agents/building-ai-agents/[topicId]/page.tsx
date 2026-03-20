import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getBuildingAIAgentsTopic, buildingAIAgentsModules } from "@/courses/ai-agents/config/building-ai-agents.config";
import { getUserProgress } from "@/app/actions/progress";
import TopicProgressControls from "@/components/TopicProgressControls";
import { auth } from "@/auth";

const COURSE_ID = "ai-agents";

interface PageProps {
    params: Promise<{ topicId: string }>;
}

export function generateStaticParams() {
    const allParams: { topicId: string }[] = [];
    buildingAIAgentsModules.forEach((mod) => {
        mod.topics.forEach((topic) => {
            allParams.push({ topicId: topic.id });
        });
    });
    return allParams;
}

export async function generateMetadata({ params }: PageProps): Promise<import("next").Metadata> {
    const { topicId } = await params;
    const match = getBuildingAIAgentsTopic(topicId);
    
    if (!match) return { title: "Topic Not Found" };

    return {
        title: `${match.topic.title} | AI Agents | IntelliLearn`,
        description: `Learn about ${match.topic.title} in the ${match.module.title} module of our AI Agents course.`,
        openGraph: {
            title: match.topic.title,
            description: `Learn about ${match.topic.title} in the ${match.module.title} module of our AI Agents course.`,
            type: "article",
            url: `https://intelli-learn-jet.vercel.app/courses/ai-agents/building-ai-agents/${topicId}`,
        },
    };
}

export default async function BuildingAIAgentsTopicPage({ params }: PageProps) {
    const { topicId } = await params;
    const match = getBuildingAIAgentsTopic(topicId);

    if (!match) notFound();

    const { module, topic } = match;

    const session = await auth();
    const progress = await getUserProgress(COURSE_ID);
    const isCompleted = progress.completedTopics.includes(topic.id);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: topic.title,
        about: module.title,
        educationalLevel: "beginner",
        author: {
            "@type": "Organization",
            name: "IntelliLearn",
            sameAs: "https://intelli-learn-jet.vercel.app"
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-entry">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Breadcrumb
                items={[
                    { name: "AI Agents", href: "/courses/ai-agents" },
                    { name: "Building AI Agents", href: "/courses/ai-agents/building-ai-agents" },
                    { name: module.title.split(" — ")[1] || module.title },
                    { name: topic.title },
                ]}
            />

            <header className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-indigo-700 dark:text-indigo-400 tracking-tight font-bold bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 rounded-lg w-fit border border-indigo-100 dark:border-indigo-900/30 transition-colors">
                        <span>{module.title}</span>
                    </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl heading-pro text-slate-900 dark:text-white tracking-tight leading-tight">
                    {topic.title}
                </h1>
            </header>

            <section className="card p-12 flex flex-col items-center justify-center text-center border-dashed mb-10 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden transition-colors">
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 dark:bg-indigo-900/10 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>
                <div className="bg-white dark:bg-slate-800 w-24 h-24 rounded-full flex flex-col items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700 relative z-10">
                    <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Content Coming Soon</h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-lg">
                    The curriculum data for <strong>{topic.title}</strong> is currently being assembled. Check back soon for comprehensive materials on this subject.
                </p>
            </section>

            <TopicProgressControls
                courseId={COURSE_ID}
                topicId={topic.id}
                isCompleted={isCompleted}
                isAuthenticated={!!session?.user}
            />
        </div>
    );
}
