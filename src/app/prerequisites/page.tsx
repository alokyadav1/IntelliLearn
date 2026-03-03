import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { prerequisiteModules, TopicCategory } from "@/config/prerequisites.config";
import ProgressBar from "@/components/ProgressBar";
import { getUserProgress } from "@/app/actions/progress";
import ResetAllProgressDialog from "@/components/ResetAllProgressDialog";
import { auth } from "@/auth";

const categories: TopicCategory[] = ["Mandatory", "Good to Know", "Optional"];

const categoryIcons = {
    "Mandatory": "🟥",
    "Good to Know": "🟨",
    "Optional": "🟩"
};

export default async function Prerequisites() {
    const session = await auth();
    const progress = await getUserProgress();
    const completedTopics = progress.completedTopics;

    // Calculate totals
    const totalTopics = prerequisiteModules.reduce((acc, mod) => acc + mod.topics.length, 0);
    const completedCount = completedTopics.length;

    return (
        <div className="max-w-6xl mx-auto px-8 py-16 animate-entry">
            <Breadcrumb
                items={[
                    { name: "Prerequisites", href: "/prerequisites" },
                ]}
            />

            <header className="mb-10">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <div className="label-small text-rose-500 mb-4 tracking-widest">MODULE 01</div>
                        <h1 className="text-5xl heading-pro text-slate-900 mb-6 tracking-tight">Prerequisites</h1>
                        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                            Foundational concepts to master before assembling your first autonomous AI structure over an LLM base. Select a topic to explore.
                        </p>
                    </div>
                    {session?.user && (
                        <div className="self-start">
                            <ResetAllProgressDialog />
                        </div>
                    )}
                </div>
                
                {session?.user && (
                    <ProgressBar completedCount={completedCount} totalCount={totalTopics} />
                )}
            </header>

            <div className="space-y-12">
                {prerequisiteModules.map((module) => (
                    <section key={module.id} className="card overflow-hidden">
                        <div className="bg-slate-50 border-b border-slate-100 px-8 py-6 flex items-center">
                            <div className="bg-white border border-rose-100 text-rose-600 h-10 w-10 min-w-10 rounded-xl flex items-center justify-center mr-4 text-sm font-bold shadow-sm">
                                {module.title.split(" ")[1]}
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                                {module.title.split(" — ")[1] || module.title}
                            </h2>
                        </div>

                        <div className="p-8 pb-4">
                            {categories.map((category) => {
                                const categoryTopics = module.topics.filter(t => t.category === category);
                                if (categoryTopics.length === 0) return null;

                                return (
                                    <div key={category} className="mb-8 last:mb-0">
                                        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center">
                                            <span className="mr-2 text-base">{categoryIcons[category]}</span>
                                            {category}
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                                            {categoryTopics.map((topic, index) => (
                                                <Link
                                                    key={topic.id}
                                                    href={`/prerequisites/${topic.id}`}
                                                    className="group flex flex-row items-start p-4 -mx-4 rounded-xl hover:bg-slate-50 transition-colors"
                                                >
                                                    <span className="text-slate-400 font-mono text-sm mt-0.5 mr-3 w-5 text-right shrink-0">
                                                        {index + 1}.
                                                    </span>
                                                    <div className="flex flex-col">
                                                        <span className="text-[15px] font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors tracking-tight line-clamp-1">
                                                            {topic.title}
                                                        </span>
                                                        <span className="text-xs text-slate-400 mt-1 uppercase tracking-wider group-hover:text-indigo-400 transition-colors flex items-center">
                                                            Read Topic <span className="ml-1 leading-none">&rarr;</span>
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
