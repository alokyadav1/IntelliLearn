// ─────────────────────────────────────────────────────────────────────────────
// Platform Course Catalog
// Single source of truth for all courses offered on the platform.
// The homepage, category pages, and navigation all derive from this config.
// ─────────────────────────────────────────────────────────────────────────────

import type { CourseMeta, CourseCategory } from "@/types/platform.types";
import { jenkinsModules } from "@/courses/jenkins/config/modules.config";
import { awsModules } from "@/courses/aws/config/modules.config";

export const PLATFORM_NAME = "Dev Learning Portal";
export const PLATFORM_TAGLINE = "Master Modern Engineering";
export const PLATFORM_EDITION = "PRO EDITION";
export const PLATFORM_VERSION = "v2.0.0";

export const courses: CourseMeta[] = [
  {
    slug: "ai-agents",
    title: "Building AI Agents",
    tagline: "Mastery Portal",
    description:
      "A scientific, comprehensive guide to conceptualizing, designing, and building state-of-the-art autonomous AI agents over LLM foundations.",
    category: "AI & Machine Learning",
    accentColor: "indigo",
    published: true,
    navLinks: [
      { name: "Course Overview", href: "/courses/ai-agents" },
      { name: "Prerequisites", href: "/courses/ai-agents/prerequisites" },
      { name: "Building AI Agents", href: "/courses/ai-agents/building-ai-agents" },
    ],
  },
  {
    slug: "jenkins",
    title: "Jenkins Mastery",
    tagline: "CI/CD Engineering",
    description:
      "A hands-on, production-grade guide to mastering Jenkins — from foundational pipeline concepts to advanced plugin ecosystems and enterprise CI/CD patterns.",
    category: "DevOps & CI/CD",
    accentColor: "orange",
    published: true,
    navLinks: [
      { name: "Course Overview", href: "/courses/jenkins" },
      ...jenkinsModules.map(m => ({
        name: m.title,
        href: `/courses/jenkins/modules/${m.topics[0].id}`
      }))
    ],
  },
  {
    slug: "aws",
    title: "AWS Cloud Expert",
    tagline: "Cloud Engineering",
    description:
      "A comprehensive roadmap matching the AWS DevOps curriculum covering Core Services, Networking, Storage, Scaling, Containers, and Serverless architectures.",
    category: "DevOps & CI/CD",
    accentColor: "sky",
    published: true,
    navLinks: [
      { name: "Course Overview", href: "/courses/aws" },
      ...awsModules.map(m => ({
        name: m.title.split(". ")[1] || m.title,
        href: `/courses/aws/modules/${m.topics[0]?.id}`
      }))
    ],
  },
];

/** All unique categories derived from the course catalog */
export const categories: CourseCategory[] = Array.from(
  new Set(courses.map((c) => c.category))
) as CourseCategory[];

/** Lookup a course by its slug */
export function getCourseBySlug(slug: string): CourseMeta | undefined {
  return courses.find((c) => c.slug === slug);
}

/** Get all published courses for a given category */
export function getCoursesByCategory(category: CourseCategory): CourseMeta[] {
  return courses.filter((c) => c.category === category && c.published);
}
