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

export default function FunctionCallingContent() {
    return (
        <article>
            <Section>
                <SectionTitle>What is Function Calling (Tool Calling)?</SectionTitle>
                <P>
                    Function calling (also called tool calling) is when an LLM <Bold>does not return plain
                    text</Bold> as the next step, but instead returns a <Bold>structured request</Bold> to run a
                    specific function (tool) with specific arguments.
                </P>
                <Callout variant="definition" title="In Simple Terms">
                    The model becomes a planner. Your code becomes the executor.
                </Callout>
                <P>
                    This is one of the core building blocks of AI agents: it&apos;s how the model can use your
                    APIs, database, files, web search, or internal services.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why This Matters for Agents</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Accuracy</Bold>: tools fetch real data (orders, policies, metrics) instead of the
                            model guessing.
                        </>,
                        <>
                            <Bold>Action</Bold>: your agent can do work, not just talk (create tickets, send emails,
                            update records).
                        </>,
                        <>
                            <Bold>Safety</Bold>: tools create a controlled interface. You can validate inputs and
                            block dangerous actions.
                        </>,
                        <>
                            <Bold>Reliability</Bold>: structured calls are easier to parse than free-form text.
                        </>,
                    ]}
                />
                <Callout variant="info" title="Mental Model">
                    The LLM decides <InlineCode>what</InlineCode> to call. Your code decides <InlineCode>whether</InlineCode>{" "}
                    it is allowed, then performs the call, then feeds the result back.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The Core Loop</SectionTitle>
                <Diagram label="Tool-Using Loop">
                    <TerminalOutput label="Flow">
                        {`User request
  ↓
LLM chooses: respond OR call a tool
  ↓
If tool call:
  Your app validates arguments + permissions
  ↓
  Run tool (DB/API/Service)
  ↓
  Send tool result back to LLM
  ↓
LLM produces final answer (or another tool call)`}
                    </TerminalOutput>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 1: Define Tools (Schemas)</SectionTitle>
                <P>
                    Tools are defined like APIs: name, description, and an argument schema. Keep them small and
                    specific.
                </P>
                <CodeBlock label="tools.ts (example schema)">
                    {`export const tools = [{
  name: "get_order_status",
  description: "Look up shipping status for an order id.",
  parameters: {
    type: "object",
    properties: {
      order_id: { type: "string", description: "Order id like ORD-8821" }
    },
    required: ["order_id"],
    additionalProperties: false
  }
}];`}
                </CodeBlock>
                <Callout variant="tip" title="Design Tips">
                    <BulletList
                        items={[
                            <>
                                Use <Bold>strong schemas</Bold>: required fields +{" "}
                                <InlineCode>additionalProperties: false</InlineCode>.
                            </>,
                            <>
                                Prefer multiple small tools over one mega tool with dozens of options.
                            </>,
                            <>
                                Add descriptions that remove ambiguity (formats, examples, constraints).
                            </>,
                        ]}
                    />
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 2: Model Emits a Tool Call</SectionTitle>
                <P>
                    When a user asks something that requires data, the model should request a tool call rather
                    than inventing an answer.
                </P>

                <IOBlock
                    inputLabel="User"
                    outputLabel="Model (Tool Call)"
                    input="Where is my order ORD-8821?"
                    output={`tool: "get_order_status"
args: { "order_id": "ORD-8821" }`}
                />

                <Callout variant="warning" title="Key rule">
                    Never execute a tool call blindly. Your app must validate permissions, argument types, and
                    allowable values first.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 3: Your App Executes the Tool</SectionTitle>
                <P>
                    After validation, your application runs the tool and returns a structured result. Then the
                    model uses that result to respond.
                </P>

                <CodeBlock label="tool-implementation.ts (sketch)">
                    {`export async function get_order_status({ order_id }) {
  // Validate format early
  if (!/^ORD-\\d{4,}$/.test(order_id)) {
    throw new Error("Invalid order_id format");
  }

  // Fetch from your database or shipping provider API
  const status = await db.orders.getStatus(order_id);

  return {
    order_id,
    status,
    last_updated: new Date().toISOString()
  };
}`}
                </CodeBlock>

                <IOBlock
                    inputLabel="Tool Result"
                    outputLabel="Model Final Answer"
                    input={`{ "order_id": "ORD-8821", "status": "in_transit", "last_updated": "2026-04-16T10:10:00Z" }`}
                    output="Your order ORD-8821 is in transit. Latest update: 2026-04-16."
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Production Guardrails (Non-Negotiable)</SectionTitle>
                <P>Tool calling is powerful, which means it is also a risk surface.</P>

                <DataTable
                    headers={["Guardrail", "Why it matters"]}
                    rows={[
                        ["Allowlist tools", "Only expose tools you are comfortable executing"],
                        ["Validate args with a schema", "Prevents prompt injection via tool arguments"],
                        ["AuthZ checks", "Ensure user is allowed to access that resource"],
                        ["Timeouts + retries", "Prevents hung calls and cascading failures"],
                        ["Rate limiting", "Prevents abuse and cost spikes"],
                        ["Audit logs", "Debugging + compliance: who called what and why"],
                    ]}
                />

                <Callout variant="warning" title="Common failure mode">
                    The model is not the security boundary. Your tool layer is.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Mistakes to Avoid</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>One giant tool</Bold>: makes arguments ambiguous and increases invalid calls.
                        </>,
                        <>
                            <Bold>No schema validation</Bold>: you end up executing garbage input.
                        </>,
                        <>
                            <Bold>Skipping authorization</Bold>: a user could fetch another user&apos;s data.
                        </>,
                        <>
                            <Bold>Tool results not grounded</Bold>: if the tool returns text, the model can misread it;
                            prefer structured JSON objects.
                        </>,
                        <>
                            <Bold>No error strategy</Bold>: tools fail. Decide when to retry, ask the user, or escalate.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <P>Design a small set of tools for a support agent. Keep tools narrow and safe.</P>
                <StepList
                    steps={[
                        {
                            title: "List 3 tools",
                            description: (
                                <BulletList
                                    items={[
                                        <>Example: <InlineCode>get_order_status(order_id)</InlineCode></>,
                                        <>Example: <InlineCode>get_return_policy(category)</InlineCode></>,
                                        <>Example: <InlineCode>create_support_ticket(order_id, issue)</InlineCode></>,
                                    ]}
                                />
                            ),
                        },
                        {
                            title: "Write argument schemas",
                            description: (
                                <P>
                                    Add required fields, limit allowed values, and set{" "}
                                    <InlineCode>additionalProperties: false</InlineCode>.
                                </P>
                            ),
                        },
                        {
                            title: "Add guardrails",
                            description: (
                                <P>
                                    Decide: who can call each tool, what to log, and what to do on tool errors.
                                </P>
                            ),
                        },
                    ]}
                />

                <Callout variant="tip" title="Rule of thumb">
                    If you cannot clearly explain a tool in one sentence, it is probably too broad.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Tool calling lets an LLM request structured function executions instead of guessing.",
                        "Agents use tools to fetch real data and take real actions.",
                        "Tools must be defined with narrow schemas and validated before execution.",
                        "Authorization and safety checks belong in your code, not in the model.",
                        "Tool calling is the foundation for ReAct and multi-step agent loops.",
                    ]}
                />

                <NumberedList
                    items={[
                        <>
                            Keep tools <Bold>small</Bold>.
                        </>,
                        <>
                            Validate <Bold>every</Bold> argument.
                        </>,
                        <>
                            Enforce <Bold>permissions</Bold>.
                        </>,
                        <>
                            Log <Bold>everything</Bold>.
                        </>,
                    ]}
                />
            </Section>
        </article>
    );
}
