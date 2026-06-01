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

export default function AgentComponentsContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Agent Components: The Core Building Blocks</SectionTitle>
                <P>
                    A practical AI agent is built from five core parts: <Bold>Goal, Memory, Tools, Reasoning, and
                    Execution Loop</Bold>. If any one is weak, the whole agent becomes unreliable.
                </P>
                <Callout variant="definition" title="Simple Mental Model">
                    Agent quality is not only model quality. It is mostly architecture quality.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>1) Goal: What Success Looks Like</SectionTitle>
                <P>
                    The goal defines what the agent is trying to achieve and when it should stop.
                </P>
                <IOBlock
                    inputLabel="Weak Goal"
                    outputLabel="Strong Goal"
                    input="Help user with orders."
                    output="Find order by ID, return latest status, and create escalation ticket if delayed more than 48 hours."
                />
                <BulletList
                    items={[
                        "A good goal is specific, testable, and bounded.",
                        "It should include completion criteria and constraints.",
                        "Without a clear goal, the agent drifts and over-executes.",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>2) Memory: What the Agent Remembers</SectionTitle>
                <P>
                    Memory helps the agent avoid repeating work and maintain context across steps or sessions.
                </P>
                <DataTable
                    headers={["Memory type", "Purpose", "Example"]}
                    rows={[
                        ["Working memory", "Current task context", "User intent, current plan, latest tool outputs"],
                        ["Short-term memory", "Session continuity", "Earlier turns in this chat"],
                        ["Long-term memory", "Cross-session facts", "User preferences, past successful resolutions"],
                    ]}
                />
                <Callout variant="warning" title="Common failure">
                    Too little memory causes repetition. Too much memory causes noise. Use retrieval and summarization.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>3) Tools: How the Agent Takes Action</SectionTitle>
                <P>
                    Tools convert reasoning into real-world effects: fetch data, update systems, or trigger workflows.
                </P>
                <BulletList
                    items={[
                        <>
                            <Bold>Read tools</Bold>: query tickets, orders, logs, metrics.
                        </>,
                        <>
                            <Bold>Write tools</Bold>: create records, send notifications, change state.
                        </>,
                        <>
                            <Bold>Compute tools</Bold>: transform, summarize, score, or validate outputs.
                        </>,
                    ]}
                />
                <P>
                    Keep tools narrow and typed. A broad tool like <InlineCode>manage_everything(data)</InlineCode> increases
                    error rates and safety risk.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>4) Reasoning: How the Agent Chooses the Next Step</SectionTitle>
                <P>
                    Reasoning is the decision policy: based on current state, what should happen next?
                </P>
                <StepList
                    steps={[
                        {
                            title: "Interpret current state",
                            description: "Parse the goal, constraints, and latest observations.",
                        },
                        {
                            title: "Select next action",
                            description: "Respond directly, ask for clarification, or call an appropriate tool.",
                        },
                        {
                            title: "Evaluate result",
                            description: "Check if the output moved the agent toward completion criteria.",
                        },
                        {
                            title: "Iterate or terminate",
                            description: "Continue loop if needed, otherwise finalize and explain outcome.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>5) Execution Loop: The Runtime Skeleton</SectionTitle>
                <IOBlock
                    inputLabel="Loop Contract"
                    outputLabel="Operational Flow"
                    input={`Goal + Current State + Available Tools + Guardrails`}
                    output={`Observe -> Decide -> Act -> Validate -> Update state -> Repeat/Stop`}
                />
                <P>
                    This loop is where reliability comes from: timeouts, retries, max-step limits, and fallback behavior.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How Components Work Together</SectionTitle>
                <DataTable
                    headers={["Component", "If weak", "System impact"]}
                    rows={[
                        ["Goal", "Ambiguous success condition", "Agent wanders or ends too early"],
                        ["Memory", "No useful context retention", "Repeats steps and asks redundant questions"],
                        ["Tools", "Unsafe or vague interfaces", "Bad actions, poor grounding, higher failures"],
                        ["Reasoning", "Poor action selection", "Inefficient or incorrect task completion"],
                        ["Execution loop", "No runtime controls", "Infinite loops, brittle behavior, high cost"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Mini Design Exercise</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Pick one use case",
                            description: "Example: support triage agent for delayed shipments.",
                        },
                        {
                            title: "Define all five components",
                            description:
                                "Write one sentence each for goal, memory scope, available tools, reasoning policy, and loop limits.",
                        },
                        {
                            title: "Add two safety constraints",
                            description:
                                "Example: require auth for write actions and cap execution to 6 steps before escalation.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Agent architecture depends on five core components: goal, memory, tools, reasoning, and execution loop.",
                        "A strong model cannot compensate for weak tool design or missing runtime controls.",
                        "Reliable agents use bounded goals, scoped memory, narrow tools, and explicit decision loops.",
                        "Production robustness comes from validation, limits, retries, and observability in the loop.",
                    ]}
                />
            </Section>
        </article>
    );
}
