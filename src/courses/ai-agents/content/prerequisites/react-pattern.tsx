import {
    Section,
    SectionTitle,
    P,
    Bold,
    BulletList,
    NumberedList,
    Callout,
    DataTable,
    StepList,
    Divider,
    SummaryCard,
    IOBlock,
    InlineCode,
    CodeBlock,
} from "@/components/TopicContent";

export default function ReActPatternContent() {
    return (
        <article>
            <Section>
                <SectionTitle>ReAct Pattern (Reason + Act)</SectionTitle>
                <P>
                    ReAct stands for <Bold>Reason + Act</Bold>. It is a pattern where an agent alternates between
                    thinking about the next best step and taking an external action (usually via tools).
                </P>
                <Callout variant="definition" title="In One Line">
                    ReAct = reason about what to do, act using a tool, observe the result, and repeat until done.
                </Callout>
                <P>
                    This pattern is one of the most practical foundations for production agents because it structures
                    multi-step work into explicit, debuggable loops.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why ReAct Matters</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Grounding</Bold>: the agent checks real data through tools instead of guessing.
                        </>,
                        <>
                            <Bold>Control</Bold>: each loop step can be validated, logged, and bounded.
                        </>,
                        <>
                            <Bold>Recoverability</Bold>: failed actions can be retried or replaced.
                        </>,
                        <>
                            <Bold>Traceability</Bold>: you can inspect how the agent reached an answer.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The ReAct Loop</SectionTitle>
                <IOBlock
                    inputLabel="Agent Context"
                    outputLabel="Next Step"
                    input={`Goal + Current state + Tool list + Prior observations`}
                    output={`Thought -> Action -> Observation -> Thought -> ... -> Final Answer`}
                />
                <StepList
                    steps={[
                        {
                            title: "Thought",
                            description: "The agent reasons about what information is missing and chooses next action.",
                        },
                        {
                            title: "Action",
                            description: "The agent invokes a tool call with structured arguments.",
                        },
                        {
                            title: "Observation",
                            description: "Tool output is returned and becomes new evidence for the next reasoning step.",
                        },
                        {
                            title: "Repeat or Finish",
                            description: "The loop continues until completion criteria are met.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example: Support Agent for Delayed Orders</SectionTitle>
                <IOBlock
                    inputLabel="User Request"
                    outputLabel="Agent ReAct Flow"
                    input="My package is late. Can you help?"
                    output={`Thought: Need order id and latest shipment event.
Action: get_order(user_id)
Observation: order_id = ORD-8821
Thought: Need carrier timeline.
Action: get_tracking_events(order_id)
Observation: no movement for 3 days
Thought: Delay threshold exceeded; escalate.
Action: create_escalation_ticket(order_id, reason)
Final: Ticket created and next steps shared.`}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Prompt Structure for ReAct</SectionTitle>
                <P>
                    A ReAct-capable system prompt usually defines what decisions are allowed and when the loop should
                    terminate.
                </P>
                <CodeBlock label="ReAct policy sketch">
                    {`You are an operations assistant.
For each user request:
1) Think about the next best step.
2) If external data is needed, call one tool.
3) Use observation results to continue.
4) Stop when success criteria are met.

Rules:
- Never fabricate tool results.
- Validate required arguments before tool calls.
- Max 6 tool steps, then escalate or ask user.`}
                </CodeBlock>
                <Callout variant="tip" title="Production Tip">
                    Keep reasoning concise and structured. Overly long thoughts increase token cost and drift risk.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>ReAct vs Single-Step Tool Use</SectionTitle>
                <DataTable
                    headers={["Pattern", "Best for", "Limitation"]}
                    rows={[
                        ["Single-step tool use", "Simple lookup + answer", "Breaks for multi-hop tasks"],
                        ["ReAct loop", "Uncertain, multi-step workflows", "Needs runtime limits and monitoring"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Guardrails You Should Always Add</SectionTitle>
                <NumberedList
                    items={[
                        <>
                            <Bold>Step limit</Bold> (for example <InlineCode>maxSteps = 6</InlineCode>) to avoid
                            infinite loops.
                        </>,
                        <>
                            <Bold>Tool allowlist</Bold> so the agent can only call approved actions.
                        </>,
                        <>
                            <Bold>Schema validation</Bold> before every tool execution.
                        </>,
                        <>
                            <Bold>Authorization checks</Bold> for user-scoped data and write operations.
                        </>,
                        <>
                            <Bold>Fallback path</Bold> when tools fail repeatedly (retry, ask clarifying question, or
                            escalate).
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Mistakes</SectionTitle>
                <BulletList
                    items={[
                        "Letting the agent call tools without argument validation.",
                        "No termination condition, causing runaway loops and high token cost.",
                        "Treating model reasoning as trusted truth instead of hypotheses.",
                        "Returning raw tool errors directly to users without handling.",
                        "Skipping logs, making failures impossible to debug later.",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Quick Practice</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Pick a 2-3 step task",
                            description: "Example: retrieve incident details, fetch service health, produce summary.",
                        },
                        {
                            title: "Define Thought/Action/Observation transitions",
                            description: "Write what each step should output before moving to the next.",
                        },
                        {
                            title: "Set loop controls",
                            description:
                                "Add max steps, retry policy, and one fallback route if tools fail more than twice.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "ReAct is a practical loop for agent systems: reason, act, observe, and iterate.",
                        "It improves grounding and reliability for multi-step tasks.",
                        "Every ReAct implementation needs strict runtime controls and safety checks.",
                        "The strongest implementations combine clear prompts, narrow tools, and robust loop orchestration.",
                    ]}
                />
            </Section>
        </article>
    );
}
