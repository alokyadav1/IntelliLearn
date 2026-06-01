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

export default function PlannerExecutorPatternContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Planner-Executor Pattern</SectionTitle>
                <P>
                    The Planner-Executor pattern separates an agent into two roles:
                    <Bold> one component plans what to do</Bold>, and <Bold>another component executes each step</Bold>.
                </P>
                <Callout variant="definition" title="Core Idea">
                    Decompose a complex task once (planner), then run steps reliably (executor).
                </Callout>
                <P>
                    This separation makes behavior easier to control, test, and debug than a single monolithic loop.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why Use Planner-Executor?</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Clarity</Bold>: you can inspect and approve plans before actions run.
                        </>,
                        <>
                            <Bold>Reliability</Bold>: execution logic can be deterministic and strongly validated.
                        </>,
                        <>
                            <Bold>Reusability</Bold>: one executor can run plans from different planners.
                        </>,
                        <>
                            <Bold>Safety</Bold>: policy checks can be applied per step before execution.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Role Responsibilities</SectionTitle>
                <DataTable
                    headers={["Role", "Primary responsibility", "Output"]}
                    rows={[
                        ["Planner", "Break goal into ordered steps", "Structured plan (step list + dependencies)"],
                        ["Executor", "Run one step safely and record results", "Step outcome + evidence + status"],
                        ["Coordinator (optional)", "Track progress and replanning", "Updated plan state"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>End-to-End Flow</SectionTitle>
                <IOBlock
                    inputLabel="Goal"
                    outputLabel="Planner-Executor Flow"
                    input="Prepare weekly support operations report and post summary to Slack."
                    output={`1) Planner builds plan
2) Executor runs step 1 (fetch ticket metrics)
3) Executor runs step 2 (compute trends)
4) Executor runs step 3 (draft summary)
5) Executor runs step 4 (post to Slack)
6) Coordinator marks complete or triggers replan`}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Plan Schema (Recommended)</SectionTitle>
                <P>
                    Plans should be machine-readable. Avoid free-form prose plans that are hard to execute safely.
                </P>
                <CodeBlock label="plan.json (example)">
                    {`{
  "goal": "Prepare weekly support report",
  "steps": [
    {
      "id": "s1",
      "action": "fetch_ticket_metrics",
      "args": { "range": "last_7_days" },
      "dependsOn": []
    },
    {
      "id": "s2",
      "action": "compute_trends",
      "args": { "input": "s1.output" },
      "dependsOn": ["s1"]
    },
    {
      "id": "s3",
      "action": "post_to_slack",
      "args": { "channel": "#ops", "message": "s2.output.summary" },
      "dependsOn": ["s2"]
    }
  ]
}`}
                </CodeBlock>
                <Callout variant="tip" title="Design Tip">
                    Require explicit <InlineCode>dependsOn</InlineCode> and typed <InlineCode>args</InlineCode> for
                    each step.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Execution Rules That Prevent Failures</SectionTitle>
                <NumberedList
                    items={[
                        <>
                            Validate each step action against an <Bold>allowlist</Bold>.
                        </>,
                        <>
                            Validate arguments with a strict schema before execution.
                        </>,
                        <>
                            Enforce auth and policy checks for data scope and side effects.
                        </>,
                        <>
                            Persist step results and errors for replay/debugging.
                        </>,
                        <>
                            Cap retries and escalate after repeated failure.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>When to Replan</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Missing prerequisite data",
                            description: "A step cannot continue because a dependency output is empty or invalid.",
                        },
                        {
                            title: "Tool/action unavailable",
                            description: "Required action fails repeatedly or service is down.",
                        },
                        {
                            title: "Goal changed",
                            description: "User updates constraints, scope, or delivery format.",
                        },
                        {
                            title: "Policy conflict",
                            description: "Planned step violates permissions or compliance rules.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Planner-Executor vs ReAct</SectionTitle>
                <DataTable
                    headers={["Pattern", "Strength", "Best fit"]}
                    rows={[
                        ["ReAct", "Flexible step-by-step reasoning", "Exploratory tasks with uncertain paths"],
                        ["Planner-Executor", "Structured decomposition and controlled execution", "Longer workflows with clear milestones"],
                    ]}
                />
                <P>
                    In practice, many systems combine both: planner-executor for macro flow, and ReAct within
                    individual steps.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Mistakes</SectionTitle>
                <BulletList
                    items={[
                        "Allowing unstructured plans that executors cannot validate.",
                        "Running steps without recording intermediate outputs.",
                        "No replan path when one step fails repeatedly.",
                        "Over-coupling planner prompts to executor implementation details.",
                        "Ignoring idempotency for write actions during retries.",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Quick Practice</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Choose one 4-step workflow",
                            description: "Example: generate, review, and publish weekly analytics digest.",
                        },
                        {
                            title: "Write a structured plan JSON",
                            description: "Add step ids, dependencies, actions, and typed args.",
                        },
                        {
                            title: "Define executor safeguards",
                            description:
                                "Specify schema validation, auth checks, retry caps, and what triggers replanning.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Planner-Executor separates strategic decomposition from operational execution.",
                        "Structured plans with dependencies improve reliability and observability.",
                        "Executors should be deterministic, validated, and policy-enforced.",
                        "Replanning is a required capability, not an edge case.",
                        "The pattern is ideal for multi-step workflows with clear milestones and controls.",
                    ]}
                />
            </Section>
        </article>
    );
}
