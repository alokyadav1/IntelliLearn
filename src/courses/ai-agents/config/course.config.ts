// ─────────────────────────────────────────────────────────────────────────────
// AI Agents — Unified Course Config
// Single source of truth for ALL topics across the entire AI Agents course.
// Combines both the Prerequisites (Module 01) and Building AI Agents (Module 02).
// ─────────────────────────────────────────────────────────────────────────────

import { prerequisiteModules } from "./prerequisites.config";
import { buildingAIAgentsModules } from "./building-ai-agents.config";
import type { CourseModule, CourseTopic } from "@/types/platform.types";

export { prerequisiteModules, buildingAIAgentsModules };

/** All modules across the entire AI Agents course */
export const allAIAgentsModules: CourseModule[] = [
    ...prerequisiteModules,
    ...buildingAIAgentsModules,
];

/** Total topic count across the entire course */
export const totalCourseTopics = allAIAgentsModules.reduce(
    (acc, mod) => acc + mod.topics.length,
    0
);

/** Look up any topic by ID, searching across all course modules */
export function getAIAgentsTopic(id: string): { module: CourseModule; topic: CourseTopic } | null {
    for (const mod of allAIAgentsModules) {
        const topic = mod.topics.find((t) => t.id === id);
        if (topic) return { module: mod, topic };
    }
    return null;
}
