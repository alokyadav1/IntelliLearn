import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard,
    TerminalOutput, Diagram, InlineCode,
} from "@/components/TopicContent";

export default function FewShotVsZeroShotLearningContent() {
    return (
        <article>
            {/* ── The Simple Version ── */}
            <Section>
                <SectionTitle>The Simple Version</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/30">
                        <SubTitle className="text-blue-700 mt-0">Zero-shot</SubTitle>
                        <P>You give the model a task with <Bold>no examples</Bold>. Just instructions.</P>
                    </div>
                    <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/30">
                        <SubTitle className="text-indigo-700 mt-0">Few-shot</SubTitle>
                        <P>You give the model a task <Bold>plus a few examples</Bold> of the input/output pattern you want.</P>
                    </div>
                </div>
            </Section>

            <Divider />

            {/* ── Zero-shot ── */}
            <Section>
                <SectionTitle>Zero-shot</SectionTitle>
                <P>You're trusting the model to figure out what you want from instructions alone.</P>
                <TerminalOutput label="Zero-shot Prompt">
                    {`Classify this support message as: billing, shipping, or product.

Message: "My package hasn't arrived and it's been 2 weeks."`}
                </TerminalOutput>
                <P>
                    The model has never seen your specific classification task before — but it generalizes from its training to give you an answer. Works well for simple, clear tasks.
                </P>
            </Section>

            <Divider />

            {/* ── Few-shot ── */}
            <Section>
                <SectionTitle>Few-shot</SectionTitle>
                <P>You show examples <Bold>before</Bold> the actual task. The model picks up the pattern and follows it.</P>
                <TerminalOutput label="Few-shot Pattern">
                    {`Classify support messages as: billing, shipping, or product.

Message: "I was charged twice for my order"
Category: billing

Message: "My package hasn't arrived"
Category: shipping

Message: "The headphones stopped working after one day"
Category: product

Message: "Still waiting on my delivery from last Tuesday"
Category:`}
                </TerminalOutput>
                <P>
                    The model completes the pattern. No ambiguity about format or classification logic.
                </P>
            </Section>

            <Divider />

            {/* ── Why for Agents ── */}
            <Section>
                <SectionTitle>Why Few-shot Works Better for Agents</SectionTitle>
                <P>
                    When you're building an agent, consistency matters more than raw intelligence. You need the output to be <Bold>predictable and parseable</Bold> every single time.
                </P>
                <P>
                    Zero-shot leaves room for the model to interpret the task differently on each call. Few-shot locks in the pattern.
                </P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div>
                        <P className="text-xs font-bold text-rose-600 uppercase mb-2">❌ Zero-shot (Unpredictable)</P>
                        <CodeBlock className="min-h-[150px]">
                            {`Extract the order number:
"Order #ORD-8821"

// Possible returns:
// "ORD-8821"
// "8821"
// "Order: ORD-8821"`}
                        </CodeBlock>
                    </div>
                    <div>
                        <P className="text-xs font-bold text-emerald-600 uppercase mb-2">✅ Few-shot (Locked In)</P>
                        <CodeBlock className="min-h-[150px]">
                            {`Msg: "order 123" -> Num: 123
Msg: "ORD-456" -> Num: ORD-456
Msg: "order #ORD-8821" -> Num:

// Returns:
// "ORD-8821" (Every time)`}
                        </CodeBlock>
                    </div>
                </div>
            </Section>

            <Divider />

            {/* ── Real Use Case ── */}
            <Section>
                <SectionTitle>Real Use Case — Email Triage Agent</SectionTitle>
                <CodeBlock label="triage_agent.js">
                    {`const systemPrompt = \`
  You are an email triage agent for ShopEasy.
  Classify each email and return JSON only. No extra text.
\`;

const fewShotExamples = \`
  Email: "I was charged $49.99 twice on March 3rd"
  {"category": "billing", "urgency": "high", "team": "finance"}

  Email: "Do you guys sell gift cards?"
  {"category": "product", "urgency": "low", "team": "sales"}

  Email: "My order #7712 shows delivered but I got nothing"
  {"category": "shipping", "urgency": "high", "team": "logistics"}
\`;

async function triageEmail(emailText) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 100,
    temperature: 0,
    system: systemPrompt,
    messages: [{
      role: "user",
      content: \`\${fewShotExamples}\\n\\nEmail: "\${emailText}"\\n\`
    }]
  });

  return JSON.parse(response.content[0].text);
}

const result = await triageEmail("Package arrived damaged, order #9934");
// → { category: "shipping", urgency: "high", team: "logistics" }`}
                </CodeBlock>
                <P>Zero-shot might give you inconsistent JSON keys or skip fields. Few-shot locks the structure.</P>
            </Section>

            <Divider />

            {/* ── When to Use Each ── */}
            <Section>
                <SectionTitle>When to Use Each</SectionTitle>
                <DataTable
                    headers={["Situation", "Use"]}
                    rows={[
                        ["Simple, clear task", "Zero-shot"],
                        ["Custom output format needed", "Few-shot"],
                        ["Edge cases the model might mishandle", "Few-shot"],
                        ["Quick prototype / exploration", "Zero-shot"],
                        ["Production agent with parsed output", "Few-shot"],
                        ["Task is hard to describe but easy to show", "Few-shot"],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── Tips ── */}
            <Section>
                <SectionTitle>Tips for Writing Good Few-shot Examples</SectionTitle>
                <BulletList items={[
                    <><Bold>Cover your edge cases.</Bold> If order numbers sometimes have # prefix and sometimes don't — show both in examples.</>,
                    <><Bold>Keep examples consistent.</Bold> Same format, same style, every example. The model follows the pattern exactly.</>,
                    <>3–5 examples is usually enough. More than 5 and you're burning tokens without much benefit.</>,
                    <><Bold>Use real data.</Bold> Made-up examples that don't reflect actual inputs will mislead the model about what to expect.</>
                ]} />
            </Section>

            <Divider />

            {/* ── Key Takeaways ── */}
            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard items={[
                    "Zero-shot is instructions-only; Few-shot includes pattern-confirming examples.",
                    "Few-shot is the standard for production agents because it guarantees consistency.",
                    "Locking output formats (like JSON) is significantly easier with few-shot prompting.",
                    "3-5 well-chosen examples are more effective than 10 tokens-heavy ones.",
                    "Ensure your examples represent the actual variety of data your agent will see.",
                ]} />
                <DataTable
                    headers={["Concept", "What to Remember"]}
                    rows={[
                        ["Zero-shot = instructions only", "Fast to write, less predictable output"],
                        ["Few-shot = instructions + examples", "More consistent, better for parsing"],
                        ["Few-shot locks output format", "Critical for production agents"],
                        ["3–5 examples is usually enough", "More = token waste"],
                        ["Use real data in examples", "Fake examples mislead the model"],
                        ["Structured output", "Always use few-shot for reliable JSON parsing"],
                    ]}
                />
            </Section>
        </article>
    );
}
