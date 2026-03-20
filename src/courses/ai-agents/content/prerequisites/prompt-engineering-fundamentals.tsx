import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard,
    TerminalOutput, Diagram, InlineCode,
} from "@/components/TopicContent";

export default function PromptEngineeringFundamentalsContent() {
    return (
        <article>
            {/* ── What is Prompt Engineering ── */}
            <Section>
                <SectionTitle>What is Prompt Engineering?</SectionTitle>
                <P>
                    It's the practice of <Bold>crafting inputs to an LLM to get reliable, useful outputs</Bold>. As an agent builder, your prompt is essentially your code — a poorly written prompt breaks your agent just like a bug does.
                </P>
            </Section>

            <Divider />

            {/* ── Basic Structure ── */}
            <Section>
                <SectionTitle>The Basic Structure of a Prompt</SectionTitle>
                <P>Most LLM interactions have three parts:</P>

                <BulletList items={[
                    <><Bold>System Prompt</Bold> — Sets the context, persona, and rules. Runs once.</>,
                    <><Bold>User Message</Bold> — The actual input from the user or your agent logic.</>,
                    <><Bold>Assistant Message</Bold> — The model's response (or a pre-filled example in few-shot prompting).</>
                ]} />

                <CodeBlock label="Simple Prompt Structure">
                    {`const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  system: "You are a support agent for ShopEasy. Only answer questions about orders, shipping, and returns. If asked anything else, politely decline.",
  messages: [
    { role: "user", content: "Where is my order #8821?" }
  ]
});`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Core Techniques ── */}
            <Section>
                <SectionTitle>The Core Techniques</SectionTitle>

                <SubTitle>1. Be Specific, Not Vague</SubTitle>
                <P>The vaguer your prompt, the more the model fills gaps with assumptions — which leads to hallucinations and off-topic responses.</P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20">
                        <P className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase mb-2">❌ Vague</P>
                        <P>"Summarize the email."</P>
                    </div>
                    <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20">
                        <P className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2">✅ Specific</P>
                        <P>"Summarize this customer email in 2 sentences. Focus on: what they want and their order number if mentioned."</P>
                    </div>
                </div>

                <SubTitle>2. Give the Model a Role</SubTitle>
                <P>Telling the model <Bold>who it is</Bold> shapes the tone, style, and focus of every response.</P>
                <CodeBlock label="Role Prompting">
                    {`"You are a senior software engineer doing code reviews.
 Be concise, direct, and focus on bugs and performance issues."`}
                </CodeBlock>
                <P>Vs just saying <InlineCode>"Review this code"</InlineCode> — the role-primed version will give you tighter, more professional feedback.</P>

                <SubTitle>3. Show, Don't Just Tell (Few-Shot)</SubTitle>
                <P>Instead of describing the format you want, show an example:</P>
                <TerminalOutput label="Few-Shot Pattern">
                    {`Extract the order number from the message.

Example 1:
Message: "Hi, my order 1234 hasn't arrived"
Output: 1234

Example 2:
Message: "I want to return order number 8821"
Output: 8821

Now extract from:
Message: "Still waiting on #ORD-5566, it's been 2 weeks"
Output:`}
                </TerminalOutput>
                <P>The model follows the pattern. You'll cover this deeper in <Bold>Section 3</Bold>.</P>

                <SubTitle>4. Ask for Structured Output</SubTitle>
                <P>For agents, you almost always want JSON — not prose. It's parseable and predictable.</P>
                <CodeBlock label="Structured Output Requirement">
                    {`Analyze this support message and return JSON only. No extra text.

{
  "issue": "billing | shipping | product | other",
  "order_number": "string or null",
  "urgency": "high | medium | low"
}

Message: "My package was supposed to arrive Monday, order #7712"`}
                </CodeBlock>
                <P>This makes your agent code clean — you just <InlineCode>JSON.parse()</InlineCode> the response and move on.</P>

                <SubTitle>5. Set Explicit Constraints</SubTitle>
                <P>Tell the model what <Bold>not</Bold> to do, not just what to do. Models respond well to boundaries.</P>
                <Callout variant="tip" title="Negative Constraints">
                    <BulletList items={[
                        "Answer only using the provided context.",
                        "If the answer isn't in the context, say 'I don't have that info.'",
                        "Never make up prices, dates, or policies.",
                        "Keep responses under 3 sentences."
                    ]} />
                </Callout>

                <SubTitle>6. Use Delimiters for Clarity</SubTitle>
                <P>When you're injecting dynamic content, wrap it in clear markers so the model knows what's instruction vs. what's data.</P>
                <TerminalOutput label="Using XML Tags">
                    {`Here is the customer's message:
<customer_message>
  I ordered headphones last Tuesday and got the wrong color.
  Order #9934.
</customer_message>

Summarize their issue in one sentence.`}
                </TerminalOutput>
                <P>Without delimiters, a malicious user could inject instructions into the data section and manipulate your agent (Prompt Injection).</P>
            </Section>

            <Divider />

            {/* ── Practical Template ── */}
            <Section>
                <SectionTitle>A Practical Template</SectionTitle>
                <P>Here's a reusable structure for most agent prompts:</P>
                <CodeBlock label="Universal Prompt Template">
                    {`[ROLE]
You are a {role} for {company/context}.

[RULES]
- Rule 1
- Rule 2

[CONTEXT] (if any)
<context>
  {dynamic data injected here}
</context>

[TASK]
{what you want the model to do}

[OUTPUT FORMAT]
Return JSON in this format: { ... }`}
                </CodeBlock>
                <P>This structure alone will put your prompts ahead of most beginners.</P>
            </Section>

            <Divider />

            {/* ── Common Mistakes ── */}
            <Section>
                <SectionTitle>Common Mistakes to Avoid</SectionTitle>
                <BulletList items={[
                    <><Bold>Overloading one prompt</Bold> — Split complex tasks into multiple steps or chain agents.</>,
                    <><Bold>Assuming the model remembers</Bold> — Every API call is stateless. Re-supply context every time.</>,
                    <><Bold>No output format specified</Bold> — Always define exactly what you want back (JSON vs Prose).</>,
                    <><Bold>Being polite instead of clear</Bold> — Avoid "Could you please..."; use direct commands like "Summarize in 2 sentences."</>
                ]} />
            </Section>

            <Divider />

            {/* ── Key Takeaways ── */}
            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard items={[
                    "Your system prompt is essentially the source code for your agent's behavior.",
                    "Be specific: Vague instructions lead directly to hallucinations.",
                    "Few-shot prompting (giving examples) is more effective than long descriptions.",
                    "Agents require structured output (JSON) for reliability and parsing.",
                    "Delimiters like XML tags protect against basic prompt injection and clarify context.",
                ]} />
                <DataTable
                    headers={["Concept", "What to Remember"]}
                    rows={[
                        ["System prompt = rules", "Set it carefully, it governs everything"],
                        ["Specificity", "Reduces hallucination: Vague in = vague out"],
                        ["Few-shot prompting", "Show an example rather than describe the format"],
                        ["Structured output", "JSON for agent tasks, always parseable"],
                        ["Delimiters", "Use markers like <tags> for dynamic data"],
                        ["Constraints", "Tell it what NOT to do explicitly"],
                    ]}
                />
            </Section>
        </article>
    );
}
