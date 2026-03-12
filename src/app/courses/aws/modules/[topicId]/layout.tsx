import { notFound } from "next/navigation";
import { getAwsTopic } from "@/courses/aws/config/modules.config";
import { getUserProgress } from "@/app/actions/progress";
import ModuleTopicSidebar from "@/components/ModuleTopicSidebar";
import MobileSidebarWrapper from "@/components/MobileSidebarWrapper";

interface TopicLayoutProps {
    children: React.ReactNode;
    params: Promise<{ topicId: string }>;
}

const COURSE_ID = "aws";

export default async function AwsTopicLayout({ children, params }: TopicLayoutProps) {
    const { topicId } = await params;
    const match = getAwsTopic(topicId);

    if (!match) notFound();

    const { module } = match;

    const progress = await getUserProgress(COURSE_ID);
    const completedTopics = progress.completedTopics;

    const topics = module.topics.map((t) => ({
        id: t.id,
        title: t.title,
        category: t.category,
        href: `/courses/aws/modules/${t.id}`,
    }));

    const moduleLabel = module.title.split(". ")[1] || module.title;

    const sidebar = (
        <ModuleTopicSidebar
            moduleTitle={moduleLabel}
            topics={topics}
            completedTopics={completedTopics}
            accentColor="sky"
            backHref="/courses/aws"
            backLabel="Course Overview"
        />
    );

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            {/* Desktop sidebar */}
            <div className="hidden lg:flex shrink-0">
                {sidebar}
            </div>

            {/* Mobile sidebar drawer */}
            <MobileSidebarWrapper triggerLabel="Topics">
                {sidebar}
            </MobileSidebarWrapper>

            <main className="flex-1 overflow-y-auto scroll-smooth">
                {children}
            </main>
        </div>
    );
}
