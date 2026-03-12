import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList,
    Callout, CodeBlock, DataTable, Divider, SummaryCard,
    TerminalOutput, Diagram, InlineCode,
} from "@/components/TopicContent";

export default function HallucinationsContent() {
    return (
        <article>
            {/* ── What is a Hallucination ── */}
            <Section>
                <SectionTitle>What is a Hallucination?</SectionTitle>
                <P>
                    A hallucination is when an LLM <Bold>confidently generates information that is factually wrong, made up, or doesn't exist</Bold> — and presents it as if it were true.
                </P>
                <P>
                    The model isn't lying. It doesn't know it's wrong. It's doing exactly what it's trained to do — predict the most probable next token — but the output doesn't match reality.
                </P>
                <TerminalOutput label="Hallucination Example">
                    {`User:   "Who wrote the book 'The Art of Agent Design'?"

Model:  "The Art of Agent Design was written by Dr. Sarah Mitchell 
         in 2019, published by O'Reilly Media."

Reality: This book doesn't exist. Dr. Sarah Mitchell doesn't exist.
         O'Reilly never published it. Everything is made up.`}
                </TerminalOutput>
            </Section>

            <Divider />

            {/* ── Why Does It Happen ── */}
            <Section>
                <SectionTitle>Why Does It Happen?</SectionTitle>
                <P>
                    The model learned patterns from massive amounts of text. It learned that questions like <InlineCode>"Who wrote the book X?"</InlineCode> are typically followed by <InlineCode>"X was written by [Author] in [Year]..."</InlineCode>
                </P>
                <P>
                    So it generates that pattern — <Bold>even when the specific answer doesn't exist in its training data</Bold>. It's filling in the blank with what <Bold>sounds right</Bold>, not what <Bold>is right</Bold>.
                </P>
                <CodeBlock label="Learned Pattern Application">
                    {`Training pattern the model learned:
"Who wrote [book]?" → "[Name] wrote [book] in [year], published by [publisher]"

Model applies pattern confidently, regardless of whether 
the book actually exists.`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Types of Hallucinations ── */}
            <Section>
                <SectionTitle>Types of Hallucinations</SectionTitle>

                <SubTitle>1. Factual Hallucination</SubTitle>
                <P>Inventing facts that sound plausible but are wrong.</P>
                <TerminalOutput>
                    {`User:   "What's the population of Bilaspur, Chhattisgarh?"
Model:  "Bilaspur has a population of 4.2 million."
Reality: It's closer to 400,000. Off by 10x.`}
                </TerminalOutput>

                <SubTitle>2. Citation Hallucination</SubTitle>
                <P>Making up sources, papers, URLs, or books that don't exist.</P>
                <TerminalOutput>
                    {`Model:  "According to a 2023 Stanford study published in 
         Nature AI (doi:10.1038/s41586-023-0291-x)..."
Reality: That DOI doesn't exist. The study was never published.`}
                </TerminalOutput>

                <SubTitle>3. Code Hallucination</SubTitle>
                <P>Inventing libraries, functions, or APIs that don't exist.</P>
                <CodeBlock label="Hallucinated SDK Usage">
                    {`// Model confidently generates:
import { AgentRunner } from "langchain/agents/v2";
const runner = new AgentRunner({ autoRetry: true, memoryScope: "global" });

// Reality: AgentRunner doesn't exist in LangChain.
// This code will crash immediately.`}
                </CodeBlock>

                <SubTitle>4. Reasoning Hallucination</SubTitle>
                <P>The logic chain looks correct but reaches a wrong conclusion.</P>
                <TerminalOutput>
                    {`User:   "If I have 3 agents each handling 100 tasks, 
         and each task takes 2 minutes, how long total?"

Model:  "That's 3 × 100 × 2 = 600 minutes total."

Reality: If agents run in parallel, it's just 200 minutes. 
         The math is right but the reasoning ignored parallelism.`}
                </TerminalOutput>
            </Section>

            <Divider />

            {/* ── Real Use Case ── */}
            <Section>
                <SectionTitle>Real Use Case — Why This is Dangerous in Agents</SectionTitle>
                <P>This is where hallucinations go from annoying to <Bold>actually harmful</Bold>.</P>

                <SubTitle>Scenario: Customer Support Agent</SubTitle>
                <TerminalOutput label="Compliance Risk">
                    {`User:   "What's your return policy for electronics?"

Hallucinating agent: "You can return electronics within 60 days 
                      for a full refund, including opened items."

Reality: The actual policy is 30 days, unopened only.`}
                </TerminalOutput>
                <P>
                    The customer returns an opened item 45 days later expecting a refund. Your company either eats the loss or has an angry customer. Either way — bad.
                </P>

                <SubTitle>Scenario: Coding Agent</SubTitle>
                <TerminalOutput label="Broken Workflow">
                    {`User:   "Install the package to connect to Pinecone"

Agent:  npm install @pinecone/node-client

Reality: The real package is "@pinecone-database/pinecone"
         Running the hallucinated command installs nothing useful.`}
                </TerminalOutput>

                <SubTitle>Scenario: Research Agent</SubTitle>
                <P>
                    An agent listing 5 fabricated papers with valid-looking DOIs can cause a user to waste hours searching for non-existent research.
                </P>
            </Section>

            <Divider />

            {/* ── How to Detect ── */}
            <Section>
                <SectionTitle>How to Detect Hallucinations</SectionTitle>

                <SubTitle>1. Consistency Check — Ask Twice</SubTitle>
                <P>Generic phrasing of the same question. A hallucination often gives different answers.</P>
                <CodeBlock label="consistency_check.js">
                    {`async function consistencyCheck(question) {
  const response1 = await askModel(question);
  const response2 = await askModel(\`Rephrase and answer: \${question}\`);

  // If answers contradict → likely hallucination
  const verifyPrompt = \`
    Answer 1: \${response1}
    Answer 2: \${response2}
    Do these contradict each other? Reply YES or NO only.
  \`;

  const verdict = await askModel(verifyPrompt);
  return verdict.trim() === "NO"; // true = probably consistent
}`}
                </CodeBlock>

                <SubTitle>2. Ask for Confidence</SubTitle>
                <P>Prompt the model to rate its own certainty:</P>
                <CodeBlock label="confidence_prompting.txt">
                    {`Answer this question: "\${userQuestion}"

After your answer, on a new line write:
CONFIDENCE: [HIGH / MEDIUM / LOW]
REASON: [why you're confident or not]`}
                </CodeBlock>

                <SubTitle>3. Source Grounding Check</SubTitle>
                <P>If your agent cites a URL or document, verify it exists programmatically:</P>
                <CodeBlock label="link_validator.js">
                    {`async function verifySource(url) {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // false = hallucinated URL
  } catch {
    return false; // URL doesn't exist
  }
}`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── How to Reduce ── */}
            <Section>
                <SectionTitle>How to Reduce Hallucinations in Your Agent</SectionTitle>

                <SubTitle>Strategy 1: Give It the Facts (RAG)</SubTitle>
                <P>Don't rely on the model's memory. Feed it the actual data from your database or knowledge base.</P>
                <CodeBlock label="grounded_prompt.js">
                    {`// ✅ Good — grounding the model with real data
const policy = await fetchFromDatabase("return_policy");

const response = await askModel(\`
  Using ONLY the policy below, answer the user's question.
  Do not add any information not present in the policy.
  
  POLICY: \${policy}
  
  QUESTION: What is the return policy for electronics?
\`);`}
                </CodeBlock>
                <P>This is the foundation of <Bold>RAG (Section 7)</Bold>.</P>

                <SubTitle>Strategy 2: Explicit "I Don't Know" Instruction</SubTitle>
                <P>Tell the model it's allowed to admit ignorance:</P>
                <CodeBlock label="system_prompt.txt">
                    {`IMPORTANT RULES:
- Only answer based on the provided context.
- If the answer is not in the context, say exactly: 
  "I don't have that information. Let me connect you with a human agent."
- Never make up policies, prices, or product details.`}
                </CodeBlock>

                <SubTitle>Strategy 3: Constrain the Output Format</SubTitle>
                <P>The more structured the output, the less room for drift:</P>
                <CodeBlock label="structured_output.txt">
                    {`Extract from the message and return JSON only:
{
  "issue_type": "billing | shipping | product | other",
  "order_number": "string or null",
  "urgency": "high | medium | low"
}`}
                </CodeBlock>

                <SubTitle>Strategy 4: Temperature 0 for Factual Tasks</SubTitle>
                <P>Low temperature = less creativity = fewer hallucinations.</P>
            </Section>

            <Divider />

            {/* ── The Honest Truth ── */}
            <Section>
                <SectionTitle>The Honest Truth About Hallucinations</SectionTitle>
                <P>You <Bold>cannot eliminate</Bold> hallucinations entirely. Every LLM hallucinations. The goal is to managed them through a defensive design:</P>
                <CodeBlock>
                    {`1. Reduce frequency    → Good prompts, RAG, low temperature
2. Detect when it happens → Consistency checks, confidence scoring
3. Contain the damage    → Human review for high-stakes answers
4. Design around it      → Never trust model output blindly in production`}
                </CodeBlock>
            </Section>

            <Divider />

            {/* ── Key Takeaways ── */}
            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard items={[
                    "Hallucination is confident but factually incorrect output.",
                    "It happens because models predict probability patterns, not facts.",
                    "RAG (Retrieval Augmented Generation) is the strongest mitigation strategy.",
                    "Explicitly allow the model to say 'I don't know' to prevent forced guesses.",
                    "Use Temperature 0 for any task requiring factual accuracy or strict extraction.",
                ]} />
                <DataTable
                    headers={["Concept", "What to Remember"]}
                    rows={[
                        ["Hallucination = confident wrong output", "Model doesn't know it's wrong"],
                        ["Predicting patterns", "Not looking up facts"],
                        ["Types: factual, citation, code, reasoning", "All dangerous in agents"],
                        ["RAG is #1 mitigation", "Give the model the real data"],
                        ["'I don't know' is valid", "Explicitly allow it in prompts"],
                        ["Temperature 0", "Less creativity = less drift"],
                        ["Manage, don't eliminate", "Design agents defensively"],
                    ]}
                />
            </Section>
        </article>
    );
}
