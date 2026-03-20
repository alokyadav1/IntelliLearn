import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { getJenkinsTopic, jenkinsModules } from "@/courses/jenkins/config/modules.config";
import { getUserProgress } from "@/app/actions/progress";
import TopicProgressControls from "@/components/TopicProgressControls";
import { auth } from "@/auth";

import contentRegistry from "@/courses/jenkins/content";

const COURSE_ID = "jenkins";

interface PageProps {
    params: Promise<{ topicId: string }>;
}

export function generateStaticParams() {
    const allParams: { topicId: string }[] = [];
    jenkinsModules.forEach((mod) => {
        mod.topics.forEach((topic) => {
            allParams.push({ topicId: topic.id });
        });
    });
    return allParams;
}

export async function generateMetadata({ params }: PageProps): Promise<import("next").Metadata> {
    const { topicId } = await params;
    const match = getJenkinsTopic(topicId);
    
    if (!match) return { title: "Topic Not Found" };

    return {
        title: `${match.topic.title} - ${match.module.title} | Jenkins | IntelliLearn`,
        description: `Master ${match.topic.title} in the ${match.module.title} module. This comprehensive curriculum in our Jenkins course equips you with real-world CI/CD skills and professional pipeline workflows.`,
        openGraph: {
            title: `${match.topic.title} - ${match.module.title} | Jenkins CI/CD Course`,
            description: `Master ${match.topic.title} in the ${match.module.title} module. This comprehensive curriculum in our Jenkins course equips you with real-world CI/CD skills and professional pipeline workflows.`,
            type: "article",
            url: `https://intelli-learn-jet.vercel.app/courses/jenkins/modules/${topicId}`,
        },
    };
}

const categoryIcons: Record<string, string> = {
    "Mandatory": "🟥",
    "Good to Know": "🟨",
    "Optional": "🟩",
};

export default async function JenkinsTopicPage({ params }: PageProps) {
    const { topicId } = await params;
    const match = getJenkinsTopic(topicId);

    if (!match) notFound();

    const { module, topic } = match;

    const session = await auth();
    const progress = await getUserProgress(COURSE_ID);
    const isCompleted = progress.completedTopics.includes(topic.id);

    const Content = contentRegistry[topicId as keyof typeof contentRegistry];

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
                    { name: "Jenkins", href: "/courses/jenkins" },
                    { name: module.title.split(" — ")[1] || module.title },
                    { name: topic.title },
                ]}
            />

            <header className="mb-12">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="flex items-center space-x-2 text-sm text-orange-700 dark:text-orange-400 tracking-tight font-bold bg-orange-50 dark:bg-orange-950/30 px-3 py-1.5 rounded-lg w-fit border border-orange-100 dark:border-orange-900/30 transition-colors">
                        <span>{module.title}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-700 dark:text-slate-300 tracking-tight font-bold bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg w-fit border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
                        <span>{categoryIcons[topic.category]}</span>
                        <span className="opacity-90">{topic.category}</span>
                    </div>
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl heading-pro text-slate-900 dark:text-white tracking-tight leading-tight">
                    {topic.title}
                </h1>
            </header>

            {Content ? (
                <div className="mb-16 prose dark:prose-invert max-w-none">
                    <Content />
                </div>
            ) : (
                <section className="card p-12 flex flex-col items-center justify-center text-center border-dashed mb-10 bg-slate-50/50 dark:bg-slate-900/50 relative overflow-hidden transition-colors">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 dark:bg-orange-900/10 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>
                    <div className="bg-white dark:bg-slate-800 w-24 h-24 rounded-full flex flex-col items-center justify-center mb-6 shadow-sm border border-slate-100 dark:border-slate-700 relative z-10">
                        <svg className="w-8 h-8 text-slate-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Content Coming Soon</h2>
                    <p className="text-slate-600 dark:text-slate-400 max-w-lg">
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
