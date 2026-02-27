export type TopicCategory = "Mandatory" | "Good to Know" | "Optional";

export interface PrerequisiteTopic {
  id: string;
  title: string;
  category: TopicCategory;
}

export interface PrerequisiteModule {
  id: string;
  title: string;
  topics: PrerequisiteTopic[];
}

export const prerequisiteModules: PrerequisiteModule[] = [
  {
    id: "section-a",
    title: "SECTION A — AI & LLM Foundations",
    topics: [
      { id: "large-language-models", title: "Large Language Models (LLMs)", category: "Mandatory" },
      { id: "tokens-and-tokenization", title: "Tokens and Tokenization", category: "Mandatory" },
      { id: "context-window", title: "Context Window", category: "Mandatory" },
      { id: "temperature-top-p-sampling", title: "Temperature, Top-p, and Sampling", category: "Mandatory" },
      { id: "hallucinations-in-llms", title: "Hallucinations in LLMs", category: "Mandatory" },
      { id: "prompt-engineering-fundamentals", title: "Prompt Engineering Fundamentals", category: "Mandatory" },
      { id: "system-vs-user-prompts", title: "System vs User Prompts", category: "Mandatory" },
      { id: "few-shot-vs-zero-shot", title: "Few-shot vs Zero-shot Learning", category: "Mandatory" },
      { id: "chain-of-thought", title: "Chain-of-Thought Reasoning", category: "Mandatory" },
      { id: "function-calling", title: "Function Calling / Tool Calling in LLMs", category: "Mandatory" },
      { id: "embeddings", title: "Embeddings", category: "Mandatory" },
      { id: "vector-similarity-search", title: "Vector Similarity Search", category: "Mandatory" },
      { id: "retrieval-augmented-generation", title: "Retrieval-Augmented Generation (RAG)", category: "Mandatory" },
      
      { id: "what-is-ai", title: "What is Artificial Intelligence (AI)", category: "Good to Know" },
      { id: "ml-vs-dl", title: "Machine Learning vs Deep Learning", category: "Good to Know" },
      { id: "neural-networks-basics", title: "Neural Networks Basics", category: "Good to Know" },
      { id: "transformers-architecture", title: "Transformers Architecture", category: "Good to Know" },
      { id: "fine-tuning-vs-prompting", title: "Fine-tuning vs Prompting", category: "Good to Know" },
      { id: "model-evaluation-metrics", title: "Model Evaluation Metrics for LLMs", category: "Good to Know" },
      { id: "open-source-vs-closed-source", title: "Open-source vs Closed-source Models", category: "Good to Know" },
    ],
  },
  {
    id: "section-b",
    title: "SECTION B — Programming & Computer Science Foundations",
    topics: [
      { id: "async-programming", title: "Asynchronous Programming", category: "Mandatory" },
      { id: "event-loop-architecture", title: "Event Loop Architecture", category: "Mandatory" },
      { id: "api-design", title: "API Design (REST & WebSockets)", category: "Mandatory" },
      { id: "json-schema-design", title: "JSON Schema Design", category: "Mandatory" },
      { id: "error-handling-retry", title: "Error Handling & Retry Strategies", category: "Mandatory" },
      { id: "logging-observability", title: "Logging & Observability", category: "Mandatory" },
      { id: "rate-limiting", title: "Rate Limiting", category: "Mandatory" },
      { id: "authentication-authorization", title: "Authentication & Authorization (OAuth, JWT)", category: "Mandatory" },
      { id: "secure-secret-management", title: "Secure Secret Management", category: "Mandatory" },

      { id: "concurrency-vs-parallelism", title: "Concurrency vs Parallelism", category: "Good to Know" },
      { id: "design-patterns", title: "Design Patterns (Factory, Strategy, Observer)", category: "Good to Know" },
      { id: "state-machines", title: "State Machines", category: "Good to Know" },
      { id: "idempotency", title: "Idempotency", category: "Good to Know" },
      { id: "microservices-architecture", title: "Microservices Architecture Basics", category: "Good to Know" },
      
      { id: "cli-tool-development", title: "CLI Tool Development Basics", category: "Optional" },
    ],
  },
  {
    id: "section-c",
    title: "SECTION C — Agent-Specific Architecture Concepts",
    topics: [
      { id: "what-is-an-ai-agent", title: "What is an AI Agent", category: "Mandatory" },
      { id: "agent-components", title: "Agent Components (Goal, Memory, Tools, Reasoning)", category: "Mandatory" },
      { id: "react-pattern", title: "ReAct Pattern (Reason + Act)", category: "Mandatory" },
      { id: "planner-executor-pattern", title: "Planner-Executor Pattern", category: "Mandatory" },
      { id: "feedback-loop-architecture", title: "Feedback Loop Architecture", category: "Mandatory" },
      { id: "reflection-self-correction", title: "Reflection & Self-Correction", category: "Mandatory" },
      { id: "tool-abstraction-layer", title: "Tool Abstraction Layer", category: "Mandatory" },
      { id: "agent-orchestration", title: "Agent Orchestration", category: "Mandatory" },
      { id: "deterministic-vs-autonomous", title: "Deterministic vs Autonomous Agents", category: "Mandatory" },
      { id: "agent-state-management", title: "Agent State Management", category: "Mandatory" },
      { id: "agent-evaluation", title: "Agent Evaluation & Benchmarking", category: "Mandatory" },

      { id: "multi-agent-systems", title: "Multi-Agent Systems", category: "Good to Know" },
      { id: "long-running-agents", title: "Long-Running Agents", category: "Good to Know" },
    ],
  },
  {
    id: "section-d",
    title: "SECTION D — Memory Systems",
    topics: [
      { id: "short-term-memory", title: "Short-term Memory (Conversation History)", category: "Mandatory" },
      { id: "long-term-memory", title: "Long-term Memory", category: "Mandatory" },
      { id: "vector-databases", title: "Vector Databases", category: "Mandatory" },
      { id: "embedding-pipelines", title: "Embedding Pipelines", category: "Mandatory" },
      { id: "memory-retrieval", title: "Memory Retrieval Strategies", category: "Mandatory" },

      { id: "context-compression", title: "Context Compression Techniques", category: "Good to Know" },
      { id: "caching-strategies", title: "Caching Strategies", category: "Good to Know" },

      { id: "knowledge-graph-basics", title: "Knowledge Graph Basics", category: "Optional" },
    ],
  },
  {
    id: "section-e",
    title: "SECTION E — Security & Safety",
    topics: [
      { id: "prompt-injection-attacks", title: "Prompt Injection Attacks", category: "Mandatory" },
      { id: "tool-abuse-sandboxing", title: "Tool Abuse & Sandboxing", category: "Mandatory" },
      { id: "output-validation-guardrails", title: "Output Validation & Guardrails", category: "Mandatory" },
      { id: "data-privacy", title: "Data Privacy in AI Systems", category: "Mandatory" },
      { id: "api-key-management", title: "API Key Management", category: "Mandatory" },
      { id: "cost-control-token-monitoring", title: "Cost Control & Token Monitoring", category: "Mandatory" },

      { id: "jailbreak-techniques", title: "Jailbreak Techniques", category: "Good to Know" },
      { id: "model-security-risks", title: "Model Security Risks", category: "Good to Know" },
    ],
  },
  {
    id: "section-f",
    title: "SECTION F — Infrastructure & Production Engineering",
    topics: [
      { id: "stateless-vs-stateful", title: "Stateless vs Stateful Systems", category: "Mandatory" },
      { id: "monitoring-telemetry", title: "Monitoring & Telemetry", category: "Mandatory" },

      { id: "scaling-ai-systems", title: "Scaling AI Systems", category: "Good to Know" },
      { id: "queue-based-processing", title: "Queue-based Processing", category: "Good to Know" },
      { id: "background-workers", title: "Background Workers", category: "Good to Know" },
      { id: "distributed-systems-basics", title: "Distributed Systems Basics", category: "Good to Know" },
      { id: "ci-cd-ai-systems", title: "CI/CD for AI Systems", category: "Good to Know" },
      { id: "latency-optimization", title: "Latency Optimization", category: "Good to Know" },
      { id: "model-versioning", title: "Model Versioning", category: "Good to Know" },
      { id: "failover-resilience", title: "Failover & Resilience Design", category: "Good to Know" },

      { id: "ab-testing-agents", title: "A/B Testing for Agents", category: "Optional" },
    ],
  },
  {
    id: "section-g",
    title: "SECTION G — Tools & Ecosystem Awareness",
    topics: [
      { id: "agent-frameworks", title: "Agent Frameworks (LangChain, CrewAI, etc.)", category: "Mandatory" },
      { id: "llm-providers", title: "LLM Providers (OpenAI, Anthropic, etc.)", category: "Mandatory" },
      { id: "vector-dbs-tools", title: "Vector Databases (Pinecone, Weaviate, Chroma)", category: "Mandatory" },

      { id: "open-source-models", title: "Open-source Models (LLaMA, Mistral, etc.)", category: "Good to Know" },
      { id: "evaluation-frameworks", title: "Evaluation Frameworks", category: "Good to Know" },
      { id: "browser-automation", title: "Browser Automation Integration", category: "Good to Know" },
      { id: "code-execution-sandboxes", title: "Code Execution Sandboxes", category: "Good to Know" },
      { id: "ai-cost-estimation", title: "AI Cost Estimation Tools", category: "Good to Know" },
    ],
  },
];

export function getTopicById(id: string): { module: PrerequisiteModule; topic: PrerequisiteTopic } | null {
  const result = (() => {
    for (const mod of prerequisiteModules) {
      const topic = mod.topics.find((t) => t.id === id);
      if (topic) {
        return { module: mod, topic };
      }
    }
    return null;
  })();
  return result;
}
