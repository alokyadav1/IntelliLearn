import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard,
    TerminalOutput, Diagram, InlineCode,
} from "@/components/TopicContent";

export default function SystemVsUserPromptsContent() {
    return (
        <article>
            {/* ── The Simple Version ── */}
            <Section>
                <SectionTitle>The Simple Version</SectionTitle>
                <DataTable
                    headers={["", "System Prompt", "User Prompt"]}
                    rows={[
                        ["Who writes it", "You (the developer)", "The end user (or your agent logic)"],
                        ["When it runs", "Once, at the start", "Every turn of the conversation"],
                        ["Purpose", "Sets rules, persona, constraints", "The actual question or task"],
                        ["User can see it", "Usually not", "Yes"],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── How They Work Together ── */}
            <Section>
                <SectionTitle>How They Work Together</SectionTitle>
                <P>Think of it like a job briefing:</P>
                <BulletList items={[
                    <><Bold>System prompt</Bold> = the briefing you give a new employee before their first day. <InlineCode>"You work for ShopEasy, only discuss orders and returns, always be polite."</InlineCode></>,
                    <><Bold>User prompt</Bold> = what the customer actually walks in and says.</>
                ]} />
                <P>The employee (model) always operates within the briefing, no matter what the customer asks.</P>
            </Section>

            <Divider />

            {/* ── In Code ── */}
            <Section>
                <SectionTitle>In Code</SectionTitle>
                <CodeBlock label="Anthropic Message API">
                    {`const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 1024,
  system: \`You are a support agent for ShopEasy.
           Only answer questions about orders, shipping, and returns.
           Always ask for an order number if not provided.
           Never discuss competitors.\`,
  messages: [
    { role: "user", content: "Where is my order #8821?" }
  ]
});`}
                </CodeBlock>
                <P>
                    The <InlineCode>system</InlineCode> field = system prompt. The <InlineCode>messages</InlineCode> array = conversation (user + assistant turns).
                </P>
            </Section>

            <Divider />

            {/* ── What Goes in Each ── */}
            <Section>
                <SectionTitle>What Goes in Each</SectionTitle>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <SubTitle>System Prompt</SubTitle>
                        <BulletList items={[
                            "Role / persona definition",
                            "Behavioral rules and constraints",
                            "Output format instructions",
                            "Tone and style guidelines",
                            "What to do when it doesn't know something",
                            "Safety boundaries"
                        ]} />
                    </div>
                    <div>
                        <SubTitle>User Prompt</SubTitle>
                        <BulletList items={[
                            "The user's actual question or request",
                            "Dynamic data your agent injects (order details, docs)",
                            "Task-specific instructions that change per request"
                        ]} />
                    </div>
                </div>
            </Section>

            <Divider />

            {/* ── Real Use Case ── */}
            <Section>
                <SectionTitle>Real Use Case — Support Agent</SectionTitle>
                <P>Here's how a real agent separates the two:</P>
                <CodeBlock label="dynamic_agent.js">
                    {`// SYSTEM — written once by you, never changes
const system = \`
  You are Maya, a support agent for ShopEasy.
  
  Rules:
  - Only help with orders, shipping, returns, and product questions.
  - If the user hasn't provided an order number, ask for it first.
  - Keep replies under 3 sentences.
  - If you can't resolve the issue, say: "Let me escalate this to our team."
  - Never make up order statuses or delivery dates.
\`;

// USER — built dynamically each request
const orderContext = await fetchOrder(orderId); // from your database

const userMessage = \`
  Customer message: "\${customerText}"
  
  Order context:
  <order>
    \${JSON.stringify(orderContext)}
  </order>
\`;

const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 512,
  system,
  messages: [{ role: "user", content: userMessage }]
});`}
                </CodeBlock>
                <P>
                    The system prompt stays constant across every customer. The user prompt is rebuilt fresh with each request, injecting the relevant order data.
                </P>
            </Section>

            <Divider />

            {/* ── Multi-Turn ── */}
            <Section>
                <SectionTitle>Multi-Turn Conversations</SectionTitle>
                <P>In a real chat, you maintain the full conversation history in the <InlineCode>messages</InlineCode> array. The system prompt stays outside it, always active.</P>
                <CodeBlock label="chat_logic.js">
                    {`const conversationHistory = [];

async function chat(userInput) {
  conversationHistory.push({ role: "user", content: userInput });

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    system: "You are Maya, a support agent for ShopEasy...", // always the same
    messages: conversationHistory // grows with each turn
  });

  const reply = response.content[0].text;
  conversationHistory.push({ role: "assistant", content: reply });

  return reply;
}

await chat("Hi, my order hasn't arrived");
// → "I'd be happy to help! Could you share your order number?"

await chat("It's #8821");
// → Model now has full context of both messages + system rules`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Common Mistakes ── */}
            <Section>
                <SectionTitle>A Mistake Beginners Often Make</SectionTitle>
                <P>Putting behavioral rules in the user prompt instead of the system prompt:</P>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                    <div className="p-4 rounded-xl border border-rose-100 dark:border-rose-900/50 bg-rose-50/30 dark:bg-rose-950/20">
                        <P className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase mb-2">❌ Bad — mixed instructions</P>
                        <CodeBlock label="user message injection">
                            {`messages: [{
  role: "user",
  content: "You are a support agent. Only discuss orders. Now answer this: where is my order?"
}]`}
                        </CodeBlock>
                    </div>
                    <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-950/20">
                        <P className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase mb-2">✅ Good — clean separation</P>
                        <CodeBlock label="system + user">
                            {`system: "You are a support agent. Only discuss orders.",
messages: [{
  role: "user", 
  content: "Where is my order #8821?"
}]`}
                        </CodeBlock>
                    </div>
                </div>

                <P>
                    When rules are in the user prompt, a clever user can override them by just continuing the conversation. The system prompt is more resistant to this — it acts as a persistent anchor throughout the entire conversation.
                </P>
            </Section>

            <Divider />

            {/* ── Key Takeaways ── */}
            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard items={[
                    "System prompt acts as the developer-defined 'source code' for the model's behavior.",
                    "User prompt is the dynamic payload representing the current request or user input.",
                    "Always put rules, personas, and safety boundaries in the system prompt.",
                    "Use the user prompt for task-specific data injection (JSON contexts, retrieved docs).",
                    "System prompts are isolated from conversation history, providing a persistent anchor.",
                ]} />
                <DataTable
                    headers={["Concept", "What to Remember"]}
                    rows={[
                        ["System = developer instructions", "Persistent, always active"],
                        ["User = conversation input", "Changes every turn"],
                        ["Rules belong in system", "Harder for users to override"],
                        ["Dynamic data goes in user", "Inject order info, docs, tool results here"],
                        ["System stays outside messages", "It's a separate field in the API"],
                        ["Both work together", "System sets the boundaries, user drives the task"],
                    ]}
                />
            </Section>
        </article>
    );
}
