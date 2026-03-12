import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { awsModules } from "@/courses/aws/config/modules.config";
import type { TopicCategory } from "@/types/platform.types";
import { getUserProgress } from "@/app/actions/progress";

const COURSE_ID = "aws";

const categories: TopicCategory[] = ["Mandatory", "Good to Know", "Optional"];

const categoryIcons: Record<TopicCategory, string> = {
    "Mandatory": "🟥",
    "Good to Know": "🟨",
    "Optional": "🟩",
};

export default async function AwsCoreConceptsPage() {
    const progress = await getUserProgress(COURSE_ID);
    const completedTopics = progress.completedTopics;
    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 animate-entry">
            <Breadcrumb
                items={[
                    { name: "AWS", href: "/courses/aws" },
                    { name: "Core Concepts", href: "/courses/aws/modules" },
                ]}
            />

            <header className="mb-16">
                <div className="label-small text-sky-500 mb-4 tracking-widest">CORE CONCEPTS</div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl heading-pro text-slate-900 mb-6 tracking-tight">AWS Curriculum</h1>
                <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                    From fundamentals to cloud patterns — every AWS concept categorised by importance. Master the topics that matter most for production Cloud Architecture.
                </p>
            </header>

            <div className="space-y-12">
                {awsModules.map((module) => (
                    <section key={module.id} className="card overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-100 px-8 py-6 flex items-center">
                            <div className="bg-white border border-sky-100 text-sky-600 h-10 w-10 min-w-10 rounded-xl flex items-center justify-center mr-4 text-sm font-bold shadow-sm">
                                {module.title.split(".")[0]}
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900">
                                {module.title.split(". ")[1] || module.title}
                            </h2>
                        </div>

                        <div className="p-8 pb-4">
                            {categories.map((category) => {
                                const categoryTopics = module.topics.filter((t) => t.category === category);
                                if (categoryTopics.length === 0) return null;
                                return (
                                    <div key={category} className="mb-8 last:mb-0">
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                                            <span className="mr-2 text-base">{categoryIcons[category]}</span>
                                            {category}
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                            {categoryTopics.map((topic, index) => (
                                                <Link
                                                    key={topic.id}
                                                    href={`/courses/aws/modules/${topic.id}`}
                                                    className={`group flex flex-row items-start p-4 -mx-4 rounded-xl transition-colors ${completedTopics.includes(topic.id)
                                                        ? "bg-green-50 hover:bg-green-100"
                                                        : "hover:bg-slate-50"
                                                        }`}
                                                >
                                                    {completedTopics.includes(topic.id) ? (
                                                        <span className="mt-0.5 mr-3 shrink-0 w-5 flex items-center justify-center">
                                                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </span>
                                                    ) : (
                                                        <span className="text-slate-400 font-mono text-sm mt-0.5 mr-3 w-5 text-right shrink-0">
                                                            {index + 1}.
                                                        </span>
                                                    )}
                                                    <div className="flex flex-col">
                                                        <span className={`text-[15px] font-semibold tracking-tight line-clamp-1 transition-colors ${completedTopics.includes(topic.id)
                                                            ? "text-green-700 group-hover:text-green-800"
                                                            : "text-slate-700 group-hover:text-sky-600"
                                                            }`}>
                                                            {topic.title}
                                                        </span>
                                                        <span className={`text-xs mt-1 uppercase tracking-wider flex items-center transition-colors ${completedTopics.includes(topic.id)
                                                            ? "text-green-500 group-hover:text-green-600"
                                                            : "text-slate-400 group-hover:text-sky-400"
                                                            }`}>
                                                            {completedTopics.includes(topic.id) ? "Completed" : "Read Topic"}
                                                            <span className="ml-1 leading-none">&rarr;</span>
                                                        </span>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </div>
        </div>
    );
}
