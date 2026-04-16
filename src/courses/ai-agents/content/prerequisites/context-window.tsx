import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard, StepList,
    StatBreakdown, LayerStack, TerminalOutput, Diagram,
} from "@/components/TopicContent";

export default function ContextWindowContent() {
    return (
        <article>
            {/* ── What is a Context Window ── */}
            <Section>
                <SectionTitle>What is a Context Window?</SectionTitle>
                <P>
                    The context window is the <Bold>maximum amount of text (in tokens) an LLM can &quot;see&quot; at one time</Bold>.
                </P>
                <P>
                    Think of it like the model&apos;s <Bold>short-term working memory</Bold> — everything it knows about your conversation exists only within this window. Outside of it? The model has zero awareness.
                </P>
                <Diagram label="Context Window Usage">
                    <StatBreakdown
                        items={[
                            { label: "System Prompt", value: 500, color: "bg-indigo-400 dark:bg-indigo-500" },
                            { label: "Conversation History", value: 3000, color: "bg-emerald-400 dark:bg-emerald-500" },
                            { label: "Retrieved Docs", value: 2000, color: "bg-amber-400 dark:bg-amber-500" },
                            { label: "Current User Msg", value: 100, color: "bg-sky-400 dark:bg-sky-500" },
                        ]}
                        total={5600}
                        limit={128000}
                    />
                </Diagram>
            </Section>

            <Divider />

            {/* ── Real-World Analogy ── */}
            <Section>
                <SectionTitle>Real-World Analogy</SectionTitle>
                <P>
                    Imagine you&apos;re a detective solving a case, but you can only keep <Bold>a fixed number of pages</Bold> on your desk at once. Everything on the desk = what you can reason about. Older pages fall off the desk as new ones come in — and you can&apos;t reference them anymore.
                </P>
                <Callout variant="definition" title="The Desktop Analogy">
                    That desk = the context window.
                </Callout>
            </Section>

            <Divider />

            {/* ── What Goes Inside ── */}
            <Section>
                <SectionTitle>What Goes Inside a Context Window</SectionTitle>
                <P>For an AI agent, the window is typically filled with:</P>
                <StepList
                    steps={[
                        { title: "System Prompt", description: "Instructions, persona, and constraints (300-1k tokens)" },
                        { title: "Conversation History", description: "Recent back-and-forth messages (2k-10k tokens)" },
                        { title: "Tool Results", description: "Output from API calls or functions (varies)" },
                        { title: "Retrieved Documents (RAG)", description: "Relevant context from the knowledge base (2k-5k tokens)" },
                        { title: "Current User Message", description: "The latest input from the user (10-500 tokens)" },
                        { title: "Model's Response", description: "What the model generates (next tokens)" },
                    ]}
                />
                <P>All of these <Bold>compete for the same limited space</Bold>.</P>
            </Section>

            <Divider />

            {/* ── Real Use Case ── */}
            <Section>
                <SectionTitle>Real Use Case — Support Agent</SectionTitle>
                <P>You&apos;re building a customer support agent. Here&apos;s what fills the window mid-conversation:</P>
                <Diagram label="Token Distribution — Active Session">
                    <StatBreakdown
                        items={[
                            { label: "System Prompt", value: 300, color: "bg-indigo-500 dark:bg-indigo-400" },
                            { label: "Conversation History (10 msgs)", value: 2400, color: "bg-indigo-300 dark:bg-indigo-600" },
                            { label: "Order Status (Tool result)", value: 400, color: "bg-indigo-200 dark:bg-indigo-700" },
                            { label: "Return FAQ (RAG Doc)", value: 800, color: "bg-indigo-100 dark:bg-indigo-800" },
                            { label: "Latest User Input", value: 18, color: "bg-emerald-400 dark:bg-emerald-500" },
                        ]}
                        total={3918}
                        limit={128000}
                    />
                </Diagram>
                <P>
                    This fits comfortably. But after 50 messages + multiple tool calls + large docs, you can start hitting limits.
                </P>
            </Section>

            <Divider />

            {/* ── Exceeding Limits ── */}
            <Section>
                <SectionTitle>What Happens When You Exceed the Limit?</SectionTitle>
                <P>Two things can happen depending on how you handle it:</P>

                <SubTitle>Option 1: Hard Error</SubTitle>
                <TerminalOutput label="Runtime Exception">
                    {`Error: This model's maximum context length is 128,000 tokens. 
Your request used 130,452 tokens (130,452 > 128,000).

Status: 400 Bad Request
Type: invalid_request_error`}
                </TerminalOutput>
                <P>Your agent crashes. Bad user experience.</P>

                <SubTitle>Option 2: Silent Truncation (Worse)</SubTitle>
                <P>
                    Some older setups silently drop the oldest messages. The model answers without the full context — giving wrong or confused responses. No error, just bad output.
                </P>
                <Callout variant="warning">
                    Silent truncation is more dangerous than an error because you might not notice your agent is hallucinating or forgetting instructions.
                </Callout>
            </Section>

            <Divider />

            {/* ── Model Sizes ── */}
            <Section>
                <SectionTitle>Context Window Sizes (2024–2025)</SectionTitle>
                <DataTable
                    headers={["Model", "Context Window"]}
                    rows={[
                        ["Claude Sonnet 3.5", "200,000 tokens"],
                        ["GPT-4o", "128,000 tokens"],
                        ["Gemini 1.5 Pro", "1,000,000 tokens"],
                        ["LLaMA 3 (8B)", "8,000 tokens"],
                    ]}
                />
                <Callout variant="info">
                    Bigger isn&apos;t always better — larger contexts cost more and can slow responses. You still want to be efficient.
                </Callout>
            </Section>

            <Divider />

            {/* ── Code: Tracking Usage ── */}
            <Section>
                <SectionTitle>Code: Tracking Context Usage</SectionTitle>
                <P>Here&apos;s a simple utility you&apos;ll reuse throughout your agent building journey:</P>
                <CodeBlock label="contextUsage.js">
                    {`import { encoding_for_model } from "tiktoken";

function getContextUsage(messages, model = "gpt-4o") {
  const enc = encoding_for_model(model);

  let totalTokens = 0;

  for (const message of messages) {
    totalTokens += enc.encode(message.role).length;
    totalTokens += enc.encode(message.content).length;
    totalTokens += 4; // every message has ~4 tokens of overhead
  }

  enc.free();

  const MODEL_LIMIT = 128_000;
  const remaining = MODEL_LIMIT - totalTokens;

  return {
    used: totalTokens,
    remaining,
    percentUsed: ((totalTokens / MODEL_LIMIT) * 100).toFixed(1),
  };
}

// Example usage
const messages = [
  { role: "system", content: "You are a helpful support agent..." },
  { role: "user", content: "I need help with my order #8821" },
  { role: "assistant", content: "Sure! Let me look that up for you." },
];

console.log(getContextUsage(messages));
// → { used: 47, remaining: 127953, percentUsed: '0.0' }`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── The Sliding Window ── */}
            <Section>
                <SectionTitle>The Sliding Window Problem</SectionTitle>
                <P>
                    As conversations grow, you need a strategy. The most common approach is a <Bold>sliding window</Bold> — keep recent messages, drop old ones:
                </P>
                <CodeBlock label="slidingWindow.js">
                    {`function trimConversationHistory(messages, maxTokens = 4000) {
  const enc = encoding_for_model("gpt-4o");

  // Always keep the system prompt (index 0)
  const systemPrompt = messages[0];
  let trimmed = [systemPrompt];
  let tokenCount = enc.encode(systemPrompt.content).length;

  // Add messages from most recent → backwards
  const history = messages.slice(1).reverse();

  for (const message of history) {
    const msgTokens = enc.encode(message.content).length + 4;
    if (tokenCount + msgTokens > maxTokens) break; // stop adding
    trimmed.unshift(message); // add to front
    tokenCount += msgTokens;
  }

  enc.free();
  return trimmed;
}`}
                </CodeBlock>
                <Callout variant="tip">
                    You&apos;ll build this properly in <Bold>Section 6 — Adding Memory</Bold>, where you&apos;ll also learn summarization as an alternative to dropping messages entirely.
                </Callout>
            </Section>

            <Divider />

            {/* ── Strategies ── */}
            <Section>
                <SectionTitle>Three Strategies to Handle Context Limits</SectionTitle>
                <BulletList items={[
                    <>
                        <Bold>1. Sliding Window:</Bold> Drop oldest messages when limit approaches. Simple but loses early context.
                    </>,
                    <>
                        <Bold>2. Summarization:</Bold> Compress old messages into a short summary, keep recent ones in full.
                    </>,
                    <>
                        <Bold>3. Selective Retrieval (RAG):</Bold> Don&apos;t stuff all documents in upfront — retrieve only what&apos;s relevant per query. You&apos;ll build this in <Bold>Section 7</Bold>.
                    </>,
                ]} />
            </Section>

            <Divider />

            {/* ── Key Takeaways ── */}
            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <DataTable
                    headers={["Concept", "What to Remember"]}
                    rows={[
                        ["Context window = model's working memory", "It resets every API call"],
                        ["Everything competes for the same space", "Prompts, history, tools, docs"],
                        ["Exceeding it = errors or wrong answers", "You must manage it actively"],
                        ["More tokens in = higher cost + slower", "Keep it lean"],
                        ["Strategies: trim, summarize, retrieve", "You'll implement all three"],
                    ]}
                />
                <SummaryCard items={[
                    "The context window is the 'workspace' an LLM uses to reason.",
                    "System prompts, tool results, and history all share this limited space.",
                    "Hard limits result in errors; missing limits results in loss of context.",
                    "Active management (trimming/summarization) is required for long-running agents.",
                    "Efficiency remains crucial even with massive windows like Gemini's 1M+.",
                ]} />
            </Section>
        </article>
    );
}
