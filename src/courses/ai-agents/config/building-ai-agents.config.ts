// ─────────────────────────────────────────────────────────────────────────────
// AI Agents — Building AI Agents Config
// Hands-on learning path covering 13 sections of practical agent development.
// ─────────────────────────────────────────────────────────────────────────────

import type { CourseTopic, CourseModule } from "@/types/platform.types";

export const buildingAIAgentsModules: CourseModule[] = [
  {
    id: "section-1",
    title: "SECTION 1 — Environment Setup for Agent Development",
    topics: [
      { id: "choosing-programming-language", title: "Choosing the Programming Language (Node.js / Python)", category: "Mandatory" },
      { id: "setting-up-dev-environment", title: "Setting Up the Development Environment", category: "Mandatory" },
      { id: "managing-api-keys-securely", title: "Managing API Keys Securely (.env Setup)", category: "Mandatory" },
      { id: "installing-llm-sdks", title: "Installing LLM SDKs", category: "Mandatory" },
      { id: "project-structure-ai-apps", title: "Project Structure for AI Applications", category: "Mandatory" },
      { id: "minimal-agent-project", title: "Creating a Minimal Agent Project", category: "Mandatory" },
    ],
  },
  {
    id: "section-2",
    title: "SECTION 2 — Building Your First Simple AI Agent",
    topics: [
      { id: "first-llm-api-call", title: "Making the First LLM API Call", category: "Mandatory" },
      { id: "system-user-assistant-messages", title: "Sending System, User, and Assistant Messages", category: "Mandatory" },
      { id: "controlling-model-behavior", title: "Controlling Model Behavior (Temperature, Max Tokens)", category: "Mandatory" },
      { id: "parsing-llm-responses", title: "Parsing LLM Responses", category: "Mandatory" },
      { id: "handling-api-errors", title: "Handling API Errors", category: "Mandatory" },
      { id: "simple-chat-agent", title: "Building a Simple Chat-Based Agent", category: "Mandatory" },
    ],
  },
  {
    id: "section-3",
    title: "SECTION 3 — Designing Reliable Prompts",
    topics: [
      { id: "instruction-prompting", title: "Instruction Prompting", category: "Mandatory" },
      { id: "role-prompting", title: "Role Prompting", category: "Mandatory" },
      { id: "prompt-templates", title: "Prompt Templates", category: "Mandatory" },
      { id: "few-shot-prompting", title: "Few-Shot Prompting", category: "Mandatory" },
      { id: "structured-prompt-design", title: "Structured Prompt Design", category: "Mandatory" },
      { id: "producing-structured-outputs", title: "Producing Structured Outputs (JSON)", category: "Mandatory" },
      { id: "prompt-versioning", title: "Prompt Versioning", category: "Good to Know" },
    ],
  },
  {
    id: "section-4",
    title: "SECTION 4 — Building Tool-Using Agents",
    topics: [
      { id: "understanding-tool-calling", title: "Understanding Tool / Function Calling", category: "Mandatory" },
      { id: "defining-tool-schemas", title: "Defining Tool Schemas", category: "Mandatory" },
      { id: "registering-tools-with-model", title: "Registering Tools with the Model", category: "Mandatory" },
      { id: "executing-tools-from-output", title: "Executing Tools from Model Output", category: "Mandatory" },
      { id: "handling-tool-responses", title: "Handling Tool Responses", category: "Mandatory" },
      { id: "managing-multiple-tools", title: "Managing Multiple Tools", category: "Mandatory" },
      { id: "tool-error-handling", title: "Tool Error Handling", category: "Mandatory" },
    ],
  },
  {
    id: "section-5",
    title: "SECTION 5 — Implementing the Agent Reasoning Loop",
    topics: [
      { id: "react-pattern-implementation", title: "ReAct Pattern Implementation", category: "Mandatory" },
      { id: "thought-action-observation-loop", title: "Thought → Action → Observation Loop", category: "Mandatory" },
      { id: "agent-decision-making", title: "Agent Decision Making", category: "Mandatory" },
      { id: "iterative-reasoning", title: "Iterative Reasoning", category: "Mandatory" },
      { id: "preventing-infinite-loops", title: "Preventing Infinite Loops", category: "Mandatory" },
      { id: "termination-conditions", title: "Termination Conditions", category: "Mandatory" },
      { id: "retry-strategies", title: "Retry Strategies", category: "Good to Know" },
    ],
  },
  {
    id: "section-6",
    title: "SECTION 6 — Adding Memory to Agents",
    topics: [
      { id: "managing-conversation-history", title: "Managing Conversation History", category: "Mandatory" },
      { id: "context-window-management", title: "Context Window Management", category: "Mandatory" },
      { id: "implementing-short-term-memory", title: "Implementing Short-Term Memory", category: "Mandatory" },
      { id: "implementing-long-term-memory", title: "Implementing Long-Term Memory", category: "Mandatory" },
      { id: "memory-retrieval-strategies", title: "Memory Retrieval Strategies", category: "Mandatory" },
      { id: "memory-summarization", title: "Memory Summarization", category: "Good to Know" },
    ],
  },
  {
    id: "section-7",
    title: "SECTION 7 — Building Knowledge Agents (RAG)",
    topics: [
      { id: "creating-embeddings", title: "Creating Embeddings", category: "Mandatory" },
      { id: "document-chunking-strategies", title: "Document Chunking Strategies", category: "Mandatory" },
      { id: "storing-embeddings-vector-db", title: "Storing Embeddings in Vector Databases", category: "Mandatory" },
      { id: "query-embeddings", title: "Query Embeddings", category: "Mandatory" },
      { id: "similarity-search", title: "Similarity Search", category: "Mandatory" },
      { id: "injecting-retrieved-context", title: "Injecting Retrieved Context into Prompts", category: "Mandatory" },
      { id: "ranking-retrieved-results", title: "Ranking Retrieved Results", category: "Good to Know" },
    ],
  },
  {
    id: "section-8",
    title: "SECTION 8 — Designing Real Agent Architectures",
    topics: [
      { id: "single-agent-architecture", title: "Single-Agent Architecture", category: "Mandatory" },
      { id: "planner-executor-architecture", title: "Planner–Executor Architecture", category: "Mandatory" },
      { id: "task-decomposition", title: "Task Decomposition", category: "Mandatory" },
      { id: "agent-workflow-design", title: "Agent Workflow Design", category: "Mandatory" },
      { id: "agent-state-management", title: "Agent State Management", category: "Mandatory" },
      { id: "agent-lifecycle-management", title: "Agent Lifecycle Management", category: "Good to Know" },
    ],
  },
  {
    id: "section-9",
    title: "SECTION 9 — Building Multi-Agent Systems",
    topics: [
      { id: "designing-specialized-agents", title: "Designing Specialized Agents", category: "Mandatory" },
      { id: "role-based-agents", title: "Role-Based Agents", category: "Mandatory" },
      { id: "agent-to-agent-communication", title: "Agent-to-Agent Communication", category: "Mandatory" },
      { id: "delegation-patterns", title: "Delegation Patterns", category: "Mandatory" },
      { id: "supervisor-agents", title: "Supervisor Agents", category: "Mandatory" },
      { id: "coordinating-multiple-agents", title: "Coordinating Multiple Agents", category: "Mandatory" },
    ],
  },
  {
    id: "section-10",
    title: "SECTION 10 — Guardrails and Safety",
    topics: [
      { id: "output-validation", title: "Output Validation", category: "Mandatory" },
      { id: "structured-output-enforcement", title: "Structured Output Enforcement", category: "Mandatory" },
      { id: "preventing-prompt-injection", title: "Preventing Prompt Injection", category: "Mandatory" },
      { id: "tool-execution-safety", title: "Tool Execution Safety", category: "Mandatory" },
      { id: "limiting-agent-autonomy", title: "Limiting Agent Autonomy", category: "Mandatory" },
      { id: "fallback-mechanisms", title: "Fallback Mechanisms", category: "Mandatory" },
    ],
  },
  {
    id: "section-11",
    title: "SECTION 11 — Observability & Debugging",
    topics: [
      { id: "logging-agent-reasoning", title: "Logging Agent Reasoning Steps", category: "Mandatory" },
      { id: "prompt-tracing", title: "Prompt Tracing", category: "Mandatory" },
      { id: "tool-execution-logs", title: "Tool Execution Logs", category: "Mandatory" },
      { id: "token-usage-monitoring", title: "Token Usage Monitoring", category: "Mandatory" },
      { id: "debugging-failed-agent-runs", title: "Debugging Failed Agent Runs", category: "Mandatory" },
      { id: "evaluating-agent-performance", title: "Evaluating Agent Performance", category: "Good to Know" },
    ],
  },
  {
    id: "section-12",
    title: "SECTION 12 — Production Deployment",
    topics: [
      { id: "packaging-agents-as-services", title: "Packaging Agents as Services", category: "Mandatory" },
      { id: "building-agent-apis", title: "Building Agent APIs", category: "Mandatory" },
      { id: "queue-based-task-execution", title: "Queue-Based Task Execution", category: "Mandatory" },
      { id: "scaling-agent-systems", title: "Scaling Agent Systems", category: "Mandatory" },
      { id: "monitoring-production-agents", title: "Monitoring Production Agents", category: "Mandatory" },
      { id: "cicd-integration", title: "CI/CD Integration", category: "Good to Know" },
    ],
  },
  {
    id: "section-13",
    title: "SECTION 13 — Using Agent Frameworks",
    topics: [
      { id: "understanding-agent-frameworks", title: "Understanding Agent Frameworks", category: "Mandatory" },
      { id: "building-agents-with-libraries", title: "Building Agents Using Orchestration Libraries", category: "Mandatory" },
      { id: "creating-custom-tools-frameworks", title: "Creating Custom Tools in Frameworks", category: "Mandatory" },
      { id: "managing-memory-frameworks", title: "Managing Memory in Frameworks", category: "Mandatory" },
      { id: "debugging-framework-agents", title: "Debugging Framework-Based Agents", category: "Mandatory" },
      { id: "langchain-overview", title: "LangChain Overview", category: "Good to Know" },
      { id: "crewai-overview", title: "CrewAI Overview", category: "Good to Know" },
      { id: "semantic-kernel-overview", title: "Microsoft Semantic Kernel Overview", category: "Good to Know" },
    ],
  },
];

export function getBuildingAIAgentsTopic(id: string): { module: CourseModule; topic: CourseTopic } | null {
  for (const mod of buildingAIAgentsModules) {
    const topic = mod.topics.find((t) => t.id === id);
    if (topic) return { module: mod, topic };
  }
  return null;
}
