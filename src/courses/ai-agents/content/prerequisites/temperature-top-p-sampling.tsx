import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard,
    StatBreakdown, TerminalOutput, Diagram, InlineCode,
} from "@/components/TopicContent";

export default function TemperatureTopPSamplingContent() {
    return (
        <article>
            {/* ── The Core Idea ── */}
            <Section>
                <SectionTitle>The Core Idea</SectionTitle>
                <P>
                    When an LLM generates a response, it doesn't just pick the single "correct" next word. It calculates <Bold>probabilities for every possible next token</Bold> and then <Bold>samples</Bold> from those probabilities.
                </P>
                <P>
                    Temperature and Top-p are knobs that control <Bold>how that sampling happens</Bold> — basically, how creative vs. predictable the output is.
                </P>
            </Section>

            <Divider />

            {/* ── How the Model Picks ── */}
            <Section>
                <SectionTitle>How the Model Picks the Next Token</SectionTitle>
                <P>
                    After processing your prompt, the model produces a probability distribution over its entire vocabulary:
                </P>
                <Diagram label='Next token probabilities after "The weather today is..."'>
                    <StatBreakdown
                        items={[
                            { label: '"sunny"', value: "35%", color: "bg-amber-400 dark:bg-amber-500" },
                            { label: '"cloudy"', value: "28%", color: "bg-slate-400 dark:bg-slate-500" },
                            { label: '"rainy"', value: "20%", color: "bg-blue-400 dark:bg-blue-500" },
                            { label: '"perfect"', value: "10%", color: "bg-emerald-400 dark:bg-emerald-500" },
                            { label: '"terrible"', value: "4%", color: "bg-rose-400 dark:bg-rose-500" },
                            { label: '"purple"', value: "0.1%", color: "bg-indigo-400 dark:bg-indigo-500" },
                        ]}
                    />
                </Diagram>
                <P>Now it needs to <Bold>pick one</Bold>. That's where sampling settings come in.</P>
            </Section>

            <Divider />

            {/* ── Temperature ── */}
            <Section>
                <SectionTitle>Temperature</SectionTitle>
                <P>
                    Temperature controls <Bold>how spread out or concentrated</Bold> those probabilities are.
                </P>

                <SubTitle>Low Temperature (0.0 – 0.3) → Focused, Predictable</SubTitle>
                <P>Squishes probabilities toward the top choice. Almost always picks the most likely token.</P>
                <Diagram label="Temperature = 0.1">
                    <StatBreakdown
                        items={[
                            { label: '"sunny"', value: "92%", color: "bg-amber-500 dark:bg-amber-400" },
                            { label: '"cloudy"', value: "7%", color: "bg-slate-300 dark:bg-slate-600" },
                            { label: '"rainy"', value: "1%", color: "bg-blue-200 dark:bg-blue-800" },
                            { label: '"perfect"', value: "0%", color: "bg-slate-100 dark:bg-slate-900" },
                        ]}
                    />
                </Diagram>

                <SubTitle>High Temperature (0.8 – 1.5) → Creative, Varied</SubTitle>
                <P>Flattens the distribution. Lower-ranked tokens get a real chance.</P>
                <Diagram label="Temperature = 1.2">
                    <StatBreakdown
                        items={[
                            { label: '"sunny"', value: "28%", color: "bg-amber-400 dark:bg-amber-500" },
                            { label: '"cloudy"', value: "25%", color: "bg-slate-400 dark:bg-slate-500" },
                            { label: '"rainy"', value: "22%", color: "bg-blue-400 dark:bg-blue-500" },
                            { label: '"perfect"', value: "15%", color: "bg-emerald-400 dark:bg-emerald-500" },
                            { label: '"terrible"', value: "8%", color: "bg-rose-400 dark:bg-rose-500" },
                            { label: '"purple"', value: "2%", color: "bg-indigo-400 dark:bg-indigo-500" },
                        ]}
                    />
                </Diagram>

                <SubTitle>Temperature = 0 → Fully Deterministic</SubTitle>
                <P>Always picks the highest probability token. Same input = same output, every time.</P>
            </Section>

            <Divider />

            {/* ── Real Use Case ── */}
            <Section>
                <SectionTitle>Real Use Case — When to Use Each</SectionTitle>
                <DataTable
                    headers={["Agent Type", "Temp", "Why"]}
                    rows={[
                        ["SQL query generator", "0.0", "Must be exact, no creativity"],
                        ["Customer support bot", "0.3", "Consistent, professional replies"],
                        ["General chat agent", "0.7", "Natural, slightly varied responses"],
                        ["Brainstorming assistant", "1.0", "Diverse, creative ideas"],
                        ["Creative story writer", "1.2", "Unpredictable, imaginative"],
                    ]}
                />
                <P>
                    <Bold>Example:</Bold> You're building an agent that extracts order numbers from emails. You want <InlineCode>temperature: 0</InlineCode> — the same email should always return the same structured result.
                </P>
                <CodeBlock label="deterministic_extraction.js">
                    {`// Data extraction agent — needs to be deterministic
const response = await anthropic.messages.create({
  model: "claude-sonnet-4-20250514",
  max_tokens: 200,
  temperature: 0,   // ← no creativity needed here
  messages: [{
    role: "user",
    content: \`Extract the order number from this email: "\${emailText}"\`
  }]
});`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Top-p ── */}
            <Section>
                <SectionTitle>Top-p (Nucleus Sampling)</SectionTitle>
                <P>
                    Top-p is a <Bold>different way</Bold> to control sampling. Instead of scaling all probabilities, it <Bold>cuts off the tail</Bold> of unlikely tokens.
                </P>
                <P>
                    Top-p = 0.9 means: <Bold>"Only sample from the smallest group of tokens whose probabilities add up to 90%."</Bold>
                </P>
                <TerminalOutput label="Top-p = 0.9 Filtering">
                    {`All token probabilities sorted:

"sunny"      → 35%  ← cumulative: 35%  ✅ include
"cloudy"     → 28%  ← cumulative: 63%  ✅ include
"rainy"      → 20%  ← cumulative: 83%  ✅ include
"perfect"    → 10%  ← cumulative: 93%  ✅ include (just crossed 90%)
"terrible"   → 4%   ← cumulative: 97%  ❌ cut off
"purple"     → 0.1% ← cumulative: 97.1 ❌ cut off`}
                </TerminalOutput>
                <P>With <InlineCode>top_p: 0.9</InlineCode>, "terrible" and "purple" are <Bold>never picked</Bold> — even by accident.</P>

                <SubTitle>Top-p Values Guide</SubTitle>
                <BulletList items={[
                    <><InlineCode>top_p = 0.1</InlineCode> → Very narrow, only the top few tokens considered</>,
                    <><InlineCode>top_p = 0.9</InlineCode> → Broad but cuts off the weird long tail (common default)</>,
                    <><InlineCode>top_p = 1.0</InlineCode> → All tokens eligible (no cutoff)</>,
                ]} />
            </Section>

            <Divider />

            {/* ── Temp vs Top-p ── */}
            <Section>
                <SectionTitle>Temperature vs Top-p — What's the Difference?</SectionTitle>
                <DataTable
                    headers={["", "Temperature", "Top-p"]}
                    rows={[
                        ["What it changes", "Reshapes all probabilities", "Cuts off low-probability tokens"],
                        ["Controls", "How spiky vs flat distribution is", "Which tokens are even eligible"],
                        ["At extreme", "0 = always top token", "1.0 = no restriction"],
                    ]}
                />
                <P><Bold>Practical rule:</Bold> Most teams pick one and leave the other at default.</P>
                <CodeBlock label="Common Production Combos">
                    {`// Precise / factual agent
{ temperature: 0,   top_p: 1.0 }

// Balanced agent  
{ temperature: 0.7, top_p: 0.9 }

// Creative agent
{ temperature: 1.0, top_p: 0.95 }`}
                </CodeBlock>
                <Callout variant="warning">
                    Anthropic recommends not changing both at the same time — adjust one, leave the other at default.
                </Callout>
            </Section>

            <Divider />

            {/* ── Code: Setting Parameters ── */}
            <Section>
                <SectionTitle>Code: Setting These in Your Agent</SectionTitle>
                <CodeBlock label="sampling_config.js">
                    {`import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function runAgent(userMessage, agentType = "precise") {
  
  const configs = {
    precise:   { temperature: 0.0, top_p: 1.0 },  // SQL, data extraction
    balanced:  { temperature: 0.7, top_p: 0.9 },  // support, Q&A
    creative:  { temperature: 1.0, top_p: 0.95 }, // writing, brainstorming
  };

  const config = configs[agentType];

  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    temperature: config.temperature,
    top_p: config.top_p,
    messages: [{ role: "user", content: userMessage }],
  });

  return response.content[0].text;
}

// Usage
const sqlQuery = await runAgent(
  "Write a query to get all orders from last week",
  "precise"    // → always same output
);

const tagline = await runAgent(
  "Write a catchy tagline for a coffee brand",
  "creative"   // → different each time, intentionally
);`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Max Tokens ── */}
            <Section>
                <SectionTitle>One More: Max Tokens</SectionTitle>
                <P>
                    While not a sampling parameter, <InlineCode>max_tokens</InlineCode> is always set alongside these — it caps <Bold>how long the response can be</Bold>.
                </P>
                <DataTable
                    headers={["Use case", "Suggested max_tokens"]}
                    rows={[
                        ["Yes/No classification", "10"],
                        ["Extract order number", "50"],
                        ["Answer a question", "500"],
                        ["Write a report", "2000"],
                        ["Full code generation", "4096"],
                    ]}
                />
                <P>
                    Setting this too low cuts off responses mid-sentence. Too high wastes money on padding.
                </P>
            </Section>

            <Divider />

            {/* ── Agent Config Pattern ── */}
            <Section>
                <SectionTitle>Putting It Together — Agent Config Pattern</SectionTitle>
                <P>A clean pattern you'll use throughout the course:</P>
                <CodeBlock label="agent_patterns.js">
                    {`const AGENT_CONFIGS = {
  // For agents that extract data, run tools, classify
  deterministic: {
    temperature: 0,
    top_p: 1.0,
    max_tokens: 500,
  },
  // For agents that answer questions, help users
  conversational: {
    temperature: 0.7,
    top_p: 0.9,
    max_tokens: 1024,
  },
  // For agents that write content, brainstorm
  generative: {
    temperature: 1.0,
    top_p: 0.95,
    max_tokens: 2048,
  },
};`}
                </CodeBlock>
                <P>You'll reference this pattern when building your first agent in <Bold>Section 2</Bold>.</P>
            </Section>

            <Divider />

            {/* ── Key Takeaways ── */}
            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard items={[
                    "LLMs sample from probability distributions rather than looking up answers.",
                    "Temperature acts as a 'creativity dial': 0 is precise/robotic, 0.8+ is creative/varied.",
                    "Top-p (Nucleus Sampling) cuts off the 'long tail' of unlikely tokens.",
                    "Best practice: adjust either Temperature OR Top-p, but rarely both at once.",
                    "Max tokens should be matched to the expected size of the agent's output.",
                ]} />
                <DataTable
                    headers={["Concept", "What to Remember"]}
                    rows={[
                        ["LLMs sample, not lookup", "Output is probabilistic by default"],
                        ["Temperature = creativity dial", "0 = robotic precise, 1+ = creative"],
                        ["Top-p = token eligibility cutoff", "Removes the weird long tail"],
                        ["Don't change both at once", "Pick one to tune"],
                        ["max_tokens caps length", "Always set this explicitly"],
                        ["Match settings to use case", "SQL agent \u2260 story writer"],
                    ]}
                />
            </Section>
        </article>
    );
}
