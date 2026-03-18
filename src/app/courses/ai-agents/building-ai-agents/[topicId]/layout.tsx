import { notFound } from "next/navigation";
import { getBuildingAIAgentsTopic } from "@/courses/ai-agents/config/building-ai-agents.config";
import { getUserProgress } from "@/app/actions/progress";
import ModuleTopicSidebar from "@/components/ModuleTopicSidebar";
import MobileSidebarWrapper from "@/components/MobileSidebarWrapper";

interface TopicLayoutProps {
    children: React.ReactNode;
    params: Promise<{ topicId: string }>;
}

const COURSE_ID = "ai-agents";

export default async function AIAgentsTopicLayout({ children, params }: TopicLayoutProps) {
    const { topicId } = await params;
    const match = getBuildingAIAgentsTopic(topicId);

    if (!match) notFound();

    const { module } = match;

    const progress = await getUserProgress(COURSE_ID);
    const completedTopics = progress.completedTopics;

    const topics = module.topics.map((t) => ({
        id: t.id,
        title: t.title,
        category: t.category,
        href: `/courses/ai-agents/building-ai-agents/${t.id}`,
    }));

    const moduleLabel = module.title.split(" — ")[1] || module.title;

    const sidebar = (
        <ModuleTopicSidebar
            moduleTitle={moduleLabel}
            topics={topics}
            completedTopics={completedTopics}
            accentColor="indigo"
            backHref="/courses/ai-agents/building-ai-agents"
            backLabel="All Modules"
        />
    );

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            <div className="hidden lg:flex shrink-0">
                {sidebar}
            </div>
            <MobileSidebarWrapper triggerLabel="Topics">
                {sidebar}
            </MobileSidebarWrapper>
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {children}
            </main>
        </div>
    );
}
