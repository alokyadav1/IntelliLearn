import CourseSidebar from "@/components/CourseSidebar";
import AuthButton from "@/components/AuthButton";
import { getCourseBySlug } from "@/config/platform.config";
import { notFound } from "next/navigation";

interface CourseLayoutProps {
    children: React.ReactNode;
    params: Promise<{ courseSlug: string }>;
}

export default async function CourseLayout({ children, params }: CourseLayoutProps) {
    const { courseSlug } = await params;
    const course = getCourseBySlug(courseSlug);

    if (!course) notFound();

    return (
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
            <CourseSidebar courseSlug={courseSlug} />
            <main className="flex-1 overflow-y-auto scroll-smooth">
                {children}
            </main>
        </div>
    );
}
