import {
    Section,
    SectionTitle,
    SubTitle,
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

export default function RetrievalAugmentedGenerationContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Definition: What Is Retrieval-Augmented Generation (RAG)?</SectionTitle>
                <P>
                    Retrieval-Augmented Generation, or <Bold>RAG</Bold>, is a pattern where an AI system first
                    <Bold> retrieves relevant information</Bold> from an external knowledge source and then uses that
                    retrieved context to <Bold>generate a grounded answer</Bold>.
                </P>
                <Callout variant="definition" title="Plain-English Version">
                    Don&apos;t ask the model to answer from memory alone. First give it the right notes, then let it answer.
                </Callout>
                <P>
                    This is one of the most important architectures in applied AI because it helps models answer questions
                    using <Bold>current, domain-specific, and verifiable information</Bold>.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why RAG Exists</SectionTitle>
                <P>
                    A base model has broad knowledge, but it has limits. It may not know your internal docs, your latest
                    product changes, or your company policies. It can also hallucinate when asked for facts it has not seen
                    clearly enough.
                </P>
                <BulletList
                    items={[
                        <>
                            <Bold>LLMs are not live databases</Bold>. Their internal knowledge is frozen at training time.
                        </>,
                        <>
                            <Bold>Business knowledge changes constantly</Bold>. Policies, pricing, and docs evolve.
                        </>,
                        <>
                            <Bold>You need grounding</Bold>. Answers should come from actual source material, not guesses.
                        </>,
                        <>
                            <Bold>You need citations or traceability</Bold>. Teams often want to know where the answer came from.
                        </>,
                    ]}
                />
                <Callout variant="info" title="Core Value of RAG">
                    RAG turns a model from a smart guesser into a system that can answer from evidence.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Prerequisites: What You Should Know First</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Embeddings</Bold>: documents and queries need vector representations.
                        </>,
                        <>
                            <Bold>Vector similarity search</Bold>: the system needs a way to find the nearest relevant chunks.
                        </>,
                        <>
                            <Bold>Context windows</Bold>: only a limited amount of retrieved content can fit into the final prompt.
                        </>,
                        <>
                            <Bold>Hallucinations</Bold>: RAG is one of the strongest ways to reduce factual guessing.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example: Without RAG vs With RAG</SectionTitle>
                <IOBlock
                    inputLabel="User Question"
                    outputLabel="Why RAG Helps"
                    input="What is our refund window for annual subscriptions?"
                    output={`Without RAG:
The model may guess based on generic refund policies.

With RAG:
The system retrieves the real billing policy doc first,
then answers using the company's actual rule.`}
                />
                <P>
                    That difference is the heart of RAG. The model no longer answers from vague prior knowledge. It answers
                    from the <Bold>specific material you retrieved</Bold>.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The Full RAG Pipeline</SectionTitle>
                <Diagram label="End-to-End RAG Flow">
                    <TerminalOutput label="RAG Workflow">
                        {`Offline indexing phase
  ->
Collect documents
  ->
Clean and chunk them
  ->
Generate embeddings
  ->
Store vectors + metadata

Online question-answering phase
  ->
User asks a question
  ->
Embed the query
  ->
Retrieve top-k relevant chunks
  ->
Optional: rerank/filter/compress
  ->
Build prompt with retrieved context
  ->
LLM generates grounded answer`}
                    </TerminalOutput>
                </Diagram>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 1: Ingest and Prepare Your Data</SectionTitle>
                <P>
                    RAG quality starts before retrieval. If your source data is messy, outdated, duplicated, or badly
                    chunked, the final answer quality will suffer no matter how strong the model is.
                </P>
                <StepList
                    steps={[
                        {
                            title: "Collect source documents",
                            description: "Examples: PDFs, Notion docs, support articles, internal runbooks, product manuals, tickets.",
                        },
                        {
                            title: "Normalize the content",
                            description: "Strip noise, preserve headings, clean formatting, and separate distinct sections clearly.",
                        },
                        {
                            title: "Attach metadata",
                            description: "Store source, title, owner, tenant, date, permissions, version, and document type.",
                        },
                        {
                            title: "Decide freshness rules",
                            description: "Plan how new or changed documents will be re-indexed so search stays current.",
                        },
                    ]}
                />
                <Callout variant="warning" title="Common Beginner Mistake">
                    Teams often focus on the model first and ignore the data pipeline. In practice, weak data preparation is
                    one of the biggest reasons RAG systems feel unreliable.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 2: Chunk the Documents</SectionTitle>
                <P>
                    Large documents usually need to be split into smaller chunks before embedding. The chunk should be
                    <Bold>small enough to be precise</Bold>, but <Bold>large enough to preserve meaning</Bold>.
                </P>
                <DataTable
                    headers={["Chunking choice", "Why it matters", "Typical tradeoff"]}
                    rows={[
                        ["Very small chunks", "More precise retrieval", "Can lose surrounding context"],
                        ["Very large chunks", "More context per result", "Can dilute relevance"],
                        ["Section-based chunks", "Aligns with document structure", "Needs good parsing"],
                        ["Sliding-window chunks", "Preserves overlap", "Adds storage and duplicate retrieval"],
                    ]}
                />
                <SubTitle>Good chunking questions</SubTitle>
                <BulletList
                    items={[
                        "Can this chunk stand on its own if retrieved?",
                        "Does it preserve the heading or topic label?",
                        "Would a human understand this excerpt without the entire document?",
                        "Is the chunk short enough to fit alongside several other retrieved chunks?",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 3: Create Embeddings and Index the Chunks</SectionTitle>
                <P>
                    Each chunk is converted into an embedding vector and stored in a vector database or indexed store.
                    This is what makes semantic retrieval possible.
                </P>
                <CodeBlock label="index-documents.ts">
                    {`for (const chunk of chunks) {
  const embedding = await client.embeddings.create({
    model: "text-embedding-model",
    input: chunk.text
  });

  await vectorDb.upsert({
    id: chunk.id,
    vector: embedding.data[0].embedding,
    metadata: {
      source: chunk.source,
      title: chunk.title,
      section: chunk.section,
      updated_at: chunk.updatedAt
    }
  });
}`}
                </CodeBlock>
                <Callout variant="tip" title="Production Rule">
                    Store metadata with every chunk. Similarity search by itself is rarely enough for real systems.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 4: Retrieve Relevant Context at Question Time</SectionTitle>
                <P>
                    When the user asks a question, the system embeds the query and searches for the most relevant chunks.
                </P>
                <CodeBlock label="retrieve.ts">
                    {`const queryEmbedding = await client.embeddings.create({
  model: "text-embedding-model",
  input: userQuestion
});

const matches = await vectorDb.query({
  vector: queryEmbedding.data[0].embedding,
  topK: 5,
  includeMetadata: true,
  filter: { tenant_id: "acme" }
});`}
                </CodeBlock>
                <P>
                    Retrieval is not just about top-<InlineCode>k</InlineCode>. It is also about filtering by tenant,
                    permissions, time, language, or product area so the context is not only similar, but also <Bold>allowed
                    and relevant</Bold>.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 5: Improve the Retrieved Set</SectionTitle>
                <P>
                    Basic RAG stops after vector retrieval. Better systems often add a second quality layer before the
                    final answer is generated.
                </P>
                <DataTable
                    headers={["Technique", "What it does", "Why teams use it"]}
                    rows={[
                        ["Reranking", "Re-sorts retrieved chunks with a stronger relevance model", "Improves precision"],
                        ["Metadata filtering", "Removes chunks outside allowed scope", "Prevents bad or unsafe matches"],
                        ["Deduplication", "Removes nearly identical chunks", "Reduces wasted context window"],
                        ["Compression / summarization", "Shrinks retrieved text", "Fits more evidence into the prompt"],
                        ["Hybrid search", "Combines vector search and keyword search", "Catches exact terms and semantic matches"],
                    ]}
                />
                <Callout variant="info" title="Important Reality">
                    A lot of modern RAG performance comes from better retrieval and reranking, not just from a bigger model.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Step 6: Build the Prompt for the Generator</SectionTitle>
                <P>
                    After retrieval, you construct a prompt that tells the LLM how to use the retrieved context. The prompt
                    should clearly separate <Bold>instructions</Bold>, <Bold>user question</Bold>, and <Bold>retrieved evidence</Bold>.
                </P>
                <CodeBlock label="rag-prompt.txt">
                    {`You are a support assistant.
Answer using only the retrieved context below.
If the answer is not contained in the context, say you do not have enough information.

User question:
How do annual subscription refunds work?

Retrieved context:
[Chunk 1] Annual subscriptions are refundable within 7 days...
[Chunk 2] Refunds are processed back to the original payment method...`}
                </CodeBlock>
                <BulletList
                    items={[
                        "Tell the model to prefer retrieved evidence over guesses.",
                        "Tell it what to do when the evidence is insufficient.",
                        "Ask for citations or source references when needed.",
                        "Keep the prompt structure consistent across requests.",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What a Good RAG Answer Looks Like</SectionTitle>
                <IOBlock
                    inputLabel="Retrieved Evidence"
                    outputLabel="Grounded Answer"
                    input={`Annual subscriptions are refundable within 7 days of purchase.
Refunds are issued to the original payment method.
Refunds are not available after the 7-day window.`}
                    output={`Annual subscriptions can be refunded within 7 days of purchase.
The refund is sent back to the original payment method.
After 7 days, the subscription is not refundable.`}
                />
                <P>
                    Notice what makes this answer strong: it is concise, it directly reflects the retrieved text, and it
                    does not invent extra policy details that were never provided.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Where RAG Is Used in Real Work</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Internal knowledge assistants</Bold>: answer questions from handbooks, runbooks, and SOPs.
                        </>,
                        <>
                            <Bold>Support copilots</Bold>: retrieve help-center content before drafting replies.
                        </>,
                        <>
                            <Bold>Developer assistants</Bold>: search code docs, API docs, and incident history.
                        </>,
                        <>
                            <Bold>Legal or compliance assistants</Bold>: answer from approved policy documents only.
                        </>,
                        <>
                            <Bold>Agent memory systems</Bold>: retrieve previous plans, observations, and results.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common RAG Failure Modes</SectionTitle>
                <NumberedList
                    items={[
                        <>
                            <Bold>Bad chunks</Bold>. If the retrieved units are incoherent, the answer will be weak even if search works.
                        </>,
                        <>
                            <Bold>Wrong top-k</Bold>. Too few chunks can miss the answer; too many can flood the prompt with noise.
                        </>,
                        <>
                            <Bold>No metadata filtering</Bold>. Users may see irrelevant or unauthorized information.
                        </>,
                        <>
                            <Bold>Blind trust in retrieval</Bold>. Retrieved text can still be stale, duplicated, or only partially relevant.
                        </>,
                        <>
                            <Bold>Poor prompt instructions</Bold>. The model may still hallucinate if you do not tell it how to behave when context is incomplete.
                        </>,
                        <>
                            <Bold>No evaluation loop</Bold>. Teams ship RAG without measuring recall, precision, groundedness, or answer quality.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How to Think About RAG Quality</SectionTitle>
                <P>
                    A weak answer may come from multiple places, so debugging RAG means isolating the stage that failed.
                </P>
                <DataTable
                    headers={["Stage", "Question to ask when debugging"]}
                    rows={[
                        ["Data ingestion", "Was the right source document indexed at all?"],
                        ["Chunking", "Was the relevant fact split badly or buried in a huge chunk?"],
                        ["Embedding", "Were the right model and preprocessing rules used?"],
                        ["Retrieval", "Did the correct chunks appear in the top results?"],
                        ["Reranking / filtering", "Did a useful chunk get pushed out or filtered incorrectly?"],
                        ["Generation", "Did the model actually use the evidence provided?"],
                    ]}
                />
                <Callout variant="warning" title="Deep Insight">
                    Many teams say &quot;the model answered badly&quot; when the real problem was retrieval quality. In RAG systems,
                    generation is only one part of the chain.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Basic RAG vs Better RAG</SectionTitle>
                <DataTable
                    headers={["System", "What it does", "Typical outcome"]}
                    rows={[
                        ["Naive RAG", "Chunk -> embed -> retrieve -> prompt", "Works on simple demos"],
                        ["Production RAG", "Adds metadata filters, reranking, evaluation, freshness, and safeguards", "More reliable and safer"],
                        ["Agentic RAG", "Lets an agent reformulate queries, retry retrieval, or inspect multiple sources", "More flexible for hard tasks"],
                    ]}
                />
                <SubTitle>Why this matters</SubTitle>
                <P>
                    A tutorial demo can work with naive RAG. Real systems usually need much more care around relevance,
                    permissions, and observability.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Minimal End-to-End Example</SectionTitle>
                <CodeBlock label="simple-rag.ts">
                    {`async function answerQuestion(userQuestion) {
  const queryEmbedding = await client.embeddings.create({
    model: "text-embedding-model",
    input: userQuestion
  });

  const results = await vectorDb.query({
    vector: queryEmbedding.data[0].embedding,
    topK: 4,
    includeMetadata: true
  });

  const context = results.matches
    .map((match, index) => \`[Chunk \${index + 1}] \${match.metadata.text}\`)
    .join("\\n\\n");

  const prompt = \`
You are a helpful assistant.
Answer only from the retrieved context.
If the answer is not present, say so clearly.

Question:
\${userQuestion}

Retrieved context:
\${context}
\`;

  const response = await client.responses.create({
    model: "gpt-4.1",
    input: prompt
  });

  return response.output_text;
}`}
                </CodeBlock>
                <P>
                    This is intentionally simple, but it shows the heart of the architecture: retrieve first, generate second.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Mistakes to Avoid When Teaching or Building RAG</SectionTitle>
                <BulletList
                    items={[
                        "Do not describe RAG as just 'vector search plus ChatGPT' and stop there.",
                        "Do not assume better embeddings automatically fix poor chunking.",
                        "Do not feed the model unbounded retrieved text with no prompt discipline.",
                        "Do not skip access control just because the retrieval feels internal.",
                        "Do not measure only answer fluency; measure retrieval quality too.",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <P>
                    Design a small RAG assistant for an employee handbook.
                </P>
                <StepList
                    steps={[
                        {
                            title: "Choose source material",
                            description: "Pick 3 documents such as leave policy, travel policy, and reimbursement policy.",
                        },
                        {
                            title: "Define chunk boundaries",
                            description: "Write down how you would split each document into searchable units.",
                        },
                        {
                            title: "Choose metadata",
                            description: "Decide which fields matter: department, date, policy version, country, or audience.",
                        },
                        {
                            title: "Write 5 realistic queries",
                            description: "Example: 'Can I claim internet reimbursement while working from home?'",
                        },
                        {
                            title: "Evaluate failure cases",
                            description: "Where could retrieval go wrong, and what would you change first?",
                        },
                    ]}
                />
                <Callout variant="tip" title="Strong Practice Goal">
                    If you can explain which stage failed when the answer is wrong, you are starting to think like a real RAG engineer.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "RAG retrieves external evidence first, then asks the model to answer from that evidence.",
                        "It is one of the strongest ways to reduce hallucinations and use current domain knowledge.",
                        "Good RAG depends on data quality, chunking, metadata, retrieval, reranking, and prompt design.",
                        "A bad RAG answer is often a retrieval problem, not just a model problem.",
                        "Production RAG is a full system design problem, not a single API call.",
                    ]}
                />
            </Section>
        </article>
    );
}
