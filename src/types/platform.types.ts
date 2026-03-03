// ─────────────────────────────────────────────────────────────────────────────
// Platform-wide TypeScript types
// All course configs, components, and pages should import from here.
// ─────────────────────────────────────────────────────────────────────────────

export type CourseCategory =
  | "AI & Machine Learning"
  | "DevOps & CI/CD"
  | "Cloud & Infrastructure"
  | "Software Engineering";

/** A single nav link inside a course sidebar */
export interface CourseNavLink {
  name: string;
  href: string;
  icon?: string;
}

/** Lightweight course descriptor used in the platform catalog */
export interface CourseMeta {
  /** URL-safe slug, e.g. "ai-agents" */
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: CourseCategory;
  /** Tailwind color name (without prefix) used for theming — e.g. "indigo" */
  accentColor: string;
  /** Ordered list of top-level modules/sections shown in sidebar & course overview */
  navLinks: CourseNavLink[];
  /** Display badge, e.g. "MODULE 01" */
  badge?: string;
  /** Whether the course is published / accessible */
  published: boolean;
}

/** Topic importance category (used in prerequisites-style listings) */
export type TopicCategory = "Mandatory" | "Good to Know" | "Optional";

export interface CourseTopic {
  id: string;
  title: string;
  category: TopicCategory;
}

export interface CourseModule {
  id: string;
  title: string;
  topics: CourseTopic[];
}
