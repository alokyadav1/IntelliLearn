import {
    Section,
    SectionTitle,
    P,
    Bold,
    BulletList,
    Callout,
    DataTable,
    StepList,
    Divider,
    SummaryCard,
    IOBlock,
    InlineCode,
} from "@/components/TopicContent";

export default function WhatIsAnAIAgentContent() {
    return (
        <article>
            <Section>
                <SectionTitle>What Is an AI Agent?</SectionTitle>
                <P>
                    An AI agent is a software system that uses a model (usually an LLM) to pursue a goal by
                    deciding what to do next, optionally using tools, and adapting from intermediate results.
                </P>
                <Callout variant="definition" title="Simple Definition">
                    An AI agent is not just a chatbot response. It is a goal-directed loop:
                    <Bold> think, act, observe, and continue until done</Bold>.
                </Callout>
                <P>
                    If an app only answers once and stops, it behaves like a single model call. If it can
                    choose actions, use memory, call tools, and iterate toward completion, it behaves like an
                    agent.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Agent vs Plain LLM Call</SectionTitle>
                <DataTable
                    headers={["Capability", "Plain LLM call", "AI agent"]}
                    rows={[
                        ["Goal handling", "Answers one prompt", "Works toward an explicit task outcome"],
                        ["Actions", "Text generation only", "Can call tools/APIs and trigger actions"],
                        ["Memory", "Mostly prompt-bound", "Can store and retrieve short/long-term context"],
                        ["Control flow", "Single turn by default", "Multi-step loop with decisions"],
                        ["Recovery", "Limited retries", "Can reflect, retry, or choose fallback steps"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The Core Agent Loop</SectionTitle>
                <IOBlock
                    inputLabel="User Goal"
                    outputLabel="Agent Behavior"
                    input="Find the best laptop under $1200 for coding and summarize top 3 choices."
                    output={`1) Understand goal + constraints
2) Plan search strategy
3) Call tools (web/product APIs)
4) Evaluate options and trade-offs
5) Return recommendation
6) Continue if user asks follow-up`}
                />
                <P>
                    This loop is the heart of agent architecture. The model reasons about what to do, your
                    system executes actions safely, and the next decision uses new observations.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Core Building Blocks of an Agent</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Goal</Bold>: the target outcome (for example, resolve a ticket, generate a report,
                            or book a meeting).
                        </>,
                        <>
                            <Bold>Reasoning policy</Bold>: how the agent chooses the next step from available
                            options.
                        </>,
                        <>
                            <Bold>Tools</Bold>: executable capabilities such as database queries, APIs, search,
                            file access, or internal services.
                        </>,
                        <>
                            <Bold>Memory/state</Bold>: what the agent remembers across turns and steps.
                        </>,
                        <>
                            <Bold>Guardrails</Bold>: constraints like authz checks, schema validation, and action
                            limits.
                        </>,
                    ]}
                />
                <Callout variant="info" title="Architecture mindset">
                    The model is the <InlineCode>decision engine</InlineCode>, but your software is the
                    <InlineCode>execution and safety boundary</InlineCode>.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What Makes an Agent Useful in Production</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Clear objective",
                            description:
                                "Define the success condition first, not just a prompt. Example: 'Create a weekly sales summary in Slack by 9 AM.'",
                        },
                        {
                            title: "Reliable tool layer",
                            description:
                                "Expose narrow, validated tools. Broad tools cause ambiguity and unsafe execution.",
                        },
                        {
                            title: "State management",
                            description:
                                "Track progress, prior attempts, and key facts so the agent does not restart reasoning each turn.",
                        },
                        {
                            title: "Failure handling",
                            description:
                                "Design retries, fallbacks, and escalation paths for missing data or tool failures.",
                        },
                        {
                            title: "Observability",
                            description:
                                "Log decisions, tool calls, and outcomes so you can debug behavior and evaluate quality.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>An agent is not just 'LLM + fancy prompt'</Bold>. Prompting helps, but agents
                            require orchestration logic and tool execution.
                        </>,
                        <>
                            <Bold>Autonomy is not all-or-nothing</Bold>. Good systems often mix deterministic rules
                            with controlled model decisions.
                        </>,
                        <>
                            <Bold>More tools does not mean better agent</Bold>. Fewer, clearer tools usually improve
                            reliability.
                        </>,
                        <>
                            <Bold>Reasoning does not replace backend checks</Bold>. Validation and permissions stay in
                            application code.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Quick Practice</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Pick one workflow",
                            description: "Example: customer support triage, bug reproduction, or report generation.",
                        },
                        {
                            title: "Write the goal as a measurable outcome",
                            description: "Define what 'done' means in one sentence.",
                        },
                        {
                            title: "List 3 tools and 2 guardrails",
                            description:
                                "Tools are capabilities; guardrails are safety constraints (auth, limits, schema checks).",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "An AI agent is a goal-driven system that can reason, act, observe results, and iterate.",
                        "The defining difference from a plain LLM call is multi-step action toward outcomes.",
                        "Useful agents combine five parts: goal, reasoning, tools, memory, and guardrails.",
                        "The model chooses actions, but your app enforces execution safety and permissions.",
                        "Agent architecture quality is measured by reliability, recoverability, and observability.",
                    ]}
                />
            </Section>
        </article>
    );
}
