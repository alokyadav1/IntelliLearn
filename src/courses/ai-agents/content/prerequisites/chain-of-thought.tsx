import {
    Section,
    SectionTitle,
    P,
    Bold,
    BulletList,
    NumberedList,
    Callout,
    CodeBlock,
    IOBlock,
    DataTable,
    StepList,
    Divider,
    SummaryCard,
    InlineCode,
    Diagram,
    TerminalOutput,
} from "@/components/TopicContent";

export default function ChainOfThoughtReasoningContent() {
    return (
        <article>
            <Section>
                <SectionTitle>What is Chain-of-Thought Reasoning?</SectionTitle>
                <P>
                    Chain-of-thought reasoning means guiding a model to <Bold>solve a problem in steps</Bold>{" "}
                    instead of jumping straight to the final answer.
                </P>
                <Callout variant="definition" title="In Simple Terms">
                    The model breaks the task into smaller reasoning steps, then produces a final answer (or
                    next action).
                </Callout>
                <P>
                    This matters for agent builders because most agent tasks are multi-step: interpret the
                    user, check constraints, decide what to do next, and only then respond or call a tool.
                </P>
                <Callout variant="warning" title="Important">
                    Depending on the model or API, you may not see the model&apos;s full internal reasoning.
                    That is okay. The real goal is to design prompts and workflows that encourage careful,
                    step-by-step thinking.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Prerequisites (What This Builds On)</SectionTitle>
                <P>Chain-of-thought works best when the prompt is already well-designed.</P>
                <BulletList
                    items={[
                        <>
                            <Bold>Prompt engineering basics</Bold>: clear tasks, constraints, and output format.
                        </>,
                        <>
                            <Bold>System vs user prompts</Bold>: put reasoning rules in system; put the actual
                            problem in the user message.
                        </>,
                        <>
                            <Bold>Few-shot prompting</Bold>: examples can teach the model what good step-by-step
                            work looks like.
                        </>,
                        <>
                            <Bold>Hallucinations</Bold>: a detailed explanation can still be wrong, so reasoning
                            needs grounding and verification.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The Core Idea</SectionTitle>
                <Diagram label="Mental Model">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Problem</p>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                Understand the request
                            </p>
                        </div>
                        <div className="rounded-2xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/40 dark:bg-indigo-950/20 p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-2">
                                Reasoning Steps
                            </p>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                Decompose, apply rules, check assumptions
                            </p>
                        </div>
                        <div className="rounded-2xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/40 dark:bg-emerald-950/20 p-5">
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">
                                Final Output
                            </p>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">
                                Answer, question, or tool action
                            </p>
                        </div>
                    </div>
                </Diagram>

                <IOBlock
                    inputLabel="Question"
                    outputLabel="Step-by-step Path"
                    input="A cart has 3 items at $25 each, a 10% discount, and $8 shipping. What is the final total?"
                    output={`1. Subtotal = 3 x 25 = 75
2. Discount = 10% of 75 = 7.50
3. Discounted subtotal = 67.50
4. Add shipping = 75.50
Final total: $75.50`}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>A Simple Prompt Pattern</SectionTitle>
                <P>
                    A lightweight way to encourage better reasoning is to explicitly request decomposition
                    and then a final answer.
                </P>

                <TerminalOutput label="Prompt">
                    {`Solve the problem step by step, then give the final answer.

Problem:
A cart has 3 items at $25 each, a 10% discount, and $8 shipping.
What is the final total?`}
                </TerminalOutput>

                <Callout variant="tip" title="Good default phrasing">
                    Try phrases like <InlineCode>work through this carefully in steps</InlineCode>,{" "}
                    <InlineCode>show your intermediate calculations</InlineCode>, or{" "}
                    <InlineCode>list assumptions before answering</InlineCode>.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How Agents Use It (Decision-Making)</SectionTitle>
                <P>
                    For agents, chain-of-thought is often used to decide the <Bold>next move</Bold>, not
                    just to compute answers.
                </P>

                <StepList
                    steps={[
                        {
                            title: "Interpret the request",
                            description: (
                                <P>
                                    Identify the goal, the key entities (order number, date, product), and the
                                    success criteria.
                                </P>
                            ),
                        },
                        {
                            title: "Check constraints",
                            description: (
                                <P>
                                    Apply system rules, safety policies, and output requirements (JSON, length,
                                    tone).
                                </P>
                            ),
                        },
                        {
                            title: "Decide the next action",
                            description: (
                                <P>
                                    Choose whether to answer directly, ask one follow-up question, retrieve
                                    context, or call a tool.
                                </P>
                            ),
                        },
                        {
                            title: "Produce a final response",
                            description: (
                                <P>
                                    Return a user-facing answer or a structured action that your code can safely
                                    execute.
                                </P>
                            ),
                        },
                    ]}
                />

                <CodeBlock label="agent-decision-process.txt">
                    {`You are a support triage agent.

Process:
1. Identify the user's intent.
2. Extract key fields (order_number, issue_type).
3. Decide: answer | ask_follow_up | escalate.
4. Return JSON only.

Message: "My order hasn't arrived and I was charged twice."`}
                </CodeBlock>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Production-Friendly Alternative: Structured Checks</SectionTitle>
                <P>
                    In production, you usually want something your system can test and log, not a long
                    free-form reasoning essay.
                </P>

                <CodeBlock label="structured-output.json">
                    {`Return JSON only:
{
  "checks": [
    "Did the user provide an order number?",
    "Is the issue billing, shipping, or product?",
    "Do we have enough info to proceed?"
  ],
  "decision": "answer | ask_follow_up | escalate",
  "final_answer": "string"
}`}
                </CodeBlock>

                <Callout variant="info" title="Why this works well">
                    Your application can validate fields, write unit tests for outputs, and build reliable
                    logs for debugging.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Chain-of-Thought vs Related Concepts</SectionTitle>
                <DataTable
                    headers={["Concept", "Meaning", "Best use case"]}
                    rows={[
                        ["Direct prompting", "Ask for the answer immediately", "Simple tasks with low ambiguity"],
                        ["Chain-of-thought", "Decompose into reasoning steps", "Multi-step logic and decision-making"],
                        ["Few-shot reasoning", "Show examples of reasoning patterns", "Hard-to-describe formats or edge cases"],
                        ["ReAct", "Reason + tool actions + new observations", "Agents that need tools to be correct"],
                    ]}
                />

                <NumberedList
                    items={[
                        <>
                            Use <Bold>direct prompting</Bold> for easy tasks.
                        </>,
                        <>
                            Use <Bold>chain-of-thought</Bold> when there are multiple steps or constraints.
                        </>,
                        <>
                            Use <Bold>few-shot</Bold> when you need to teach the pattern.
                        </>,
                        <>
                            Use <Bold>ReAct</Bold> when the agent must think and use tools together.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Mistakes to Avoid</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Using it everywhere</Bold>: step-by-step prompting can increase token usage and
                            latency. Save it for multi-step tasks.
                        </>,
                        <>
                            <Bold>Confusing explanation with truth</Bold>: a model can produce a convincing chain
                            of reasoning that is still wrong.
                        </>,
                        <>
                            <Bold>Reasoning without data</Bold>: if the task depends on facts, use retrieval or
                            tools instead of guessing.
                        </>,
                        <>
                            <Bold>No verification</Bold>: important calculations, policy decisions, and tool
                            choices should be checked by code when possible.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <P>Use this as a mini drill. The goal is decomposition + structured output.</P>
                <TerminalOutput label="Practice prompt">
                    {`You are a support triage agent.

Customer message:
"I was charged twice for order #7712 and the package still hasn't arrived."

Task:
1. Identify every issue mentioned.
2. Decide which team should handle it first.
3. Return JSON with: issues, urgency, first_action`}
                </TerminalOutput>
                <Callout variant="tip" title="What you should look for">
                    The model should separate billing vs shipping, choose an urgency, and propose a first action
                    (for example: <InlineCode>confirm duplicate charge and check shipment status</InlineCode>).
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Chain-of-thought encourages step-by-step reasoning before the final answer or action.",
                        "It is most useful for multi-step tasks: planning, classification, diagnosis, and tool selection.",
                        "A detailed explanation is not proof of correctness, so grounding and verification still matter.",
                        "For production agents, structured checks and decisions are often more useful than long prose reasoning.",
                        "This topic is a bridge into later patterns like ReAct and agent reasoning loops.",
                    ]}
                />
            </Section>
        </article>
    );
}
