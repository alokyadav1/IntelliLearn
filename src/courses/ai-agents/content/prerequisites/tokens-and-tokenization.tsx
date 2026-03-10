import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard, InlineCode,
} from "@/components/TopicContent";

export default function TokensAndTokenizationContent() {
    return (
        <article>
            {/* ── What is a Token ── */}
            <Section>
                <SectionTitle>What is a Token?</SectionTitle>
                <P>
                    When you send text to an LLM, it doesn&apos;t read words like humans do. It breaks
                    text into smaller chunks called <Bold>tokens</Bold>.
                </P>
                <Callout variant="definition" title="A token is roughly">
                    <ul className="space-y-1.5 mt-1">
                        <li className="flex items-center gap-2 text-[14px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-0.5" />
                            <span><Bold>~4 characters</Bold> of English text, or</span>
                        </li>
                        <li className="flex items-center gap-2 text-[14px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0 mt-0.5" />
                            <span><Bold>~¾ of a word</Bold></span>
                        </li>
                    </ul>
                    <p className="mt-3 text-[14px] font-semibold text-indigo-700">1,000 tokens ≈ 750 words</p>
                </Callout>
            </Section>

            <Divider />

            {/* ── How Tokenization Works ── */}
            <Section>
                <SectionTitle>How Tokenization Works</SectionTitle>
                <P>
                    Text gets split into pieces before the model ever &quot;sees&quot; it. Those pieces are tokens.
                </P>
                <CodeBlock label="Basic Example">
                    {`"Hello, how are you?"

→ ["Hello", ",", " how", " are", " you", "?"]
   = 6 tokens`}
                </CodeBlock>

                <P>Common words are usually 1 token. Rare or long words get split:</P>
                <CodeBlock label="Word Splitting">
                    {`"tokenization"  →  ["token", "ization"]        = 2 tokens
"AI"            →  ["AI"]                        = 1 token
"unbelievable"  →  ["un", "believ", "able"]      = 3 tokens`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Real-World Example ── */}
            <Section>
                <SectionTitle>Real-World Example — Customer Support Bot</SectionTitle>
                <P>
                    Imagine you&apos;re building an AI agent that handles customer emails. A customer writes:
                </P>
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 mb-5 italic text-slate-600 text-[15px] leading-relaxed">
                    &ldquo;Hi, I ordered a blue wireless headphone last Tuesday and it hasn&apos;t arrived yet.
                    My order number is #ORD-8821. Can you help?&rdquo;
                </div>
                <P>Before your agent processes this, the LLM tokenizes it:</P>
                <CodeBlock label="Tokenized Output">
                    {`["Hi", ",", " I", " ordered", " a", " blue", " wireless",
 " headphone", " last", " Tuesday", " and", " it", " hasn",
 "'t", " arrived", " yet", ".", " My", " order", " number",
 " is", " #", "OR", "D", "-", "88", "21", ".", " Can",
 " you", " help", "?"]`}
                </CodeBlock>
                <Callout variant="warning" title="~33 tokens just for the customer message">
                    Your system prompt + conversation history + response all add up on top of this.
                </Callout>
            </Section>

            <Divider />

            {/* ── Why Tokens Matter ── */}
            <Section>
                <SectionTitle>Why Tokens Matter for Agent Builders</SectionTitle>

                <SubTitle>1. Cost</SubTitle>
                <P>You&apos;re billed <Bold>per token</Bold> — both input and output.</P>
                <CodeBlock label="Token Cost Breakdown">
                    {`Your system prompt:     500 tokens
User message:           100 tokens
Agent response:         300 tokens
──────────────────────────────────
Total billed:           900 tokens  ← this is what costs money`}
                </CodeBlock>
                <Callout variant="warning">
                    A busy agent handling 1,000 users/day can get expensive fast if your prompts are bloated.
                </Callout>

                <SubTitle>2. Context Window Limits</SubTitle>
                <P>
                    Every model has a <Bold>max token limit</Bold> (context window). Think of it as the
                    model&apos;s working memory.
                </P>
                <DataTable
                    headers={["Model", "Context Window"]}
                    rows={[
                        ["GPT-4o", "128,000 tokens"],
                        ["Claude Sonnet", "200,000 tokens"],
                    ]}
                />
                <Callout variant="info">
                    If your agent has a long conversation history + big system prompt + large documents,
                    you can hit this limit. The model either errors out or forgets earlier parts of the
                    conversation. This is why <Bold>Section 6 (Memory Management)</Bold> exists — you&apos;ll
                    learn to trim, summarize, and manage history to stay within limits.
                </Callout>

                <SubTitle>3. Latency</SubTitle>
                <P>
                    More tokens = slower response. For a real-time chat agent, a bloated 2,000-token prompt
                    feels sluggish compared to a lean 400-token one.
                </P>
            </Section>

            <Divider />

            {/* ── Code: Counting Tokens ── */}
            <Section>
                <SectionTitle>Code: Counting Tokens (Node.js)</SectionTitle>
                <P>
                    Before you can manage tokens, you need to count them. Use the{" "}
                    <InlineCode>tiktoken</InlineCode> library:
                </P>
                <CodeBlock label="Install">
                    {`npm install tiktoken`}
                </CodeBlock>
                <CodeBlock label="count-tokens.js">
                    {`import { encoding_for_model } from "tiktoken";

function countTokens(text) {
  const enc = encoding_for_model("gpt-4o");
  const tokens = enc.encode(text);
  console.log(\`Token count: \${tokens.length}\`);
  enc.free(); // free memory
  return tokens.length;
}

// Example
countTokens("Hello, how are you?");           // → 6
countTokens("My order number is #ORD-8821");  // → 9`}
                </CodeBlock>
                <Callout variant="tip">
                    For Claude models, Anthropic doesn&apos;t use <InlineCode>tiktoken</InlineCode>, but
                    token counts are similar. You can use tiktoken as a close estimate.
                </Callout>
            </Section>

            <Divider />

            {/* ── Mental Model ── */}
            <Section>
                <SectionTitle>Quick Mental Model</SectionTitle>
                <P>Think of tokens like <Bold>Lego bricks</Bold>:</P>
                <BulletList items={[
                    "The model builds understanding by snapping bricks together",
                    <>Common words = <Bold>1 big brick</Bold></>,
                    <>Rare / long words = <Bold>several small bricks</Bold> snapped together</>,
                    <>Your context window = the <Bold>size of your Lego baseplate</Bold> (fixed limit)</>,
                    <>Your monthly bill = <Bold>total number of bricks used</Bold></>,
                ]} />
            </Section>

            <Divider />

            {/* ── Key Takeaways ── */}
            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <DataTable
                    headers={["Concept", "What to Remember"]}
                    rows={[
                        ["Token ≈ 4 chars / ¾ word", "It's not 1 word = 1 token"],
                        ["You're billed per token", "Keep prompts lean"],
                        ["Context window is a hard limit", "Manage history or you'll hit it"],
                        ["Rare words cost more tokens", `"ORD-8821" splits into many tokens`],
                        ["Count tokens before sending", "Avoid surprises in production"],
                    ]}
                />
                <Callout variant="info" title="Coming up">
                    When you get to <Bold>Section 6 (Adding Memory)</Bold> and{" "}
                    <Bold>Section 11 (Token Usage Monitoring)</Bold>, everything here will directly apply
                    — you&apos;ll be writing code to track and trim token usage in your live agent.
                </Callout>
                <SummaryCard items={[
                    "Tokens are sub-word chunks — not full words",
                    "1,000 tokens ≈ 750 words — use this for quick estimates",
                    "You're billed on total token count: input + output",
                    "Every model has a context window limit — treat it as working memory",
                    "Use tiktoken to count tokens before sending requests",
                    "Lean prompts → lower cost, lower latency, fewer context overflows",
                ]} />
            </Section>
        </article>
    );
}
