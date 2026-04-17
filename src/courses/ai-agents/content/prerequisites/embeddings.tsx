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
    Diagram,
    TerminalOutput,
} from "@/components/TopicContent";

export default function EmbeddingsContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Definition: What Is an Embedding?</SectionTitle>
                <P>
                    An embedding is a way to turn text, images, or other data into a <Bold>list of numbers</Bold>
                    that captures meaning.
                </P>
                <Callout variant="definition" title="Plain-English Version">
                    Words stay readable for humans. Embeddings turn meaning into math so software can compare ideas.
                </Callout>
                <P>
                    If two pieces of text mean similar things, their embeddings should end up <Bold>close together</Bold>
                    in vector space. If they mean different things, they should be farther apart.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Prerequisites: What You Should Know First</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Tokens</Bold>: text is first broken into model-friendly chunks.
                        </>,
                        <>
                            <Bold>Vectors</Bold>: a vector is just an ordered list of numbers.
                        </>,
                        <>
                            <Bold>Similarity</Bold>: closeness in vector space is used as a proxy for semantic relatedness.
                        </>,
                    ]}
                />
                <Callout variant="info" title="Mental Model">
                    Think of embeddings like map coordinates for meaning. Similar ideas land in nearby neighborhoods.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example: From Text to Meaning Vectors</SectionTitle>
                <P>
                    These sentences use different words, but they express almost the same idea:
                </P>
                <IOBlock
                    inputLabel="Sentences"
                    outputLabel="What the Model Tries to Capture"
                    input={`1. "I want a refund for my order"
2. "Please return my purchase and give my money back"
3. "What is the weather in Mumbai?"`}
                    output={`1 and 2 -> similar embeddings
3 -> far away from 1 and 2`}
                />
                <P>
                    The model does not store a human-readable explanation inside the vector. It stores a numeric pattern
                    that helps systems compare meaning quickly.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How Embeddings Are Used in Real Systems</SectionTitle>
                <DataTable
                    headers={["Use Case", "How embeddings help"]}
                    rows={[
                        ["Semantic search", "Find documents with similar meaning, not just keyword matches"],
                        ["RAG", "Retrieve relevant chunks before asking the model to answer"],
                        ["Recommendations", "Suggest similar products, articles, or videos"],
                        ["Clustering", "Group related feedback, tickets, or conversations"],
                        ["Deduplication", "Detect near-duplicate content"],
                    ]}
                />

                <SubTitle>Why this matters for agents</SubTitle>
                <P>
                    Agents often need memory and retrieval. Embeddings are one of the main tools that let an agent
                    search past knowledge by meaning instead of exact wording.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Application: The Basic Embedding Pipeline</SectionTitle>
                <Diagram label="Embedding Workflow">
                    <TerminalOutput label="Pipeline">
                        {`Raw documents
  ->
Chunk the text into smaller pieces
  ->
Generate an embedding for each chunk
  ->
Store vectors in a vector database
  ->
Embed the user's query
  ->
Compare query vector to stored vectors
  ->
Return the closest matches`}
                    </TerminalOutput>
                </Diagram>

                <StepList
                    steps={[
                        {
                            title: "Chunk the data",
                            description: "Split large documents into smaller pieces that still preserve meaning.",
                        },
                        {
                            title: "Create embeddings",
                            description: "Run each chunk through an embedding model to get a numeric vector.",
                        },
                        {
                            title: "Store vectors",
                            description: "Save them in a vector database or an indexed store built for similarity search.",
                        },
                        {
                            title: "Embed the query",
                            description: "Turn the user's question into another vector using the same embedding model.",
                        },
                        {
                            title: "Retrieve similar chunks",
                            description: "Use cosine similarity or another distance metric to find the closest matches.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Code Example</SectionTitle>
                <P>
                    The exact SDK varies, but the overall flow stays the same: send input text, receive a vector, then
                    store or compare it.
                </P>
                <CodeBlock label="embedding-example.ts">
                    {`const text = "How do I reset my password?";

const response = await client.embeddings.create({
  model: "text-embedding-model",
  input: text
});

const vector = response.data[0].embedding;

console.log(vector.length); // example: 1536
console.log(vector.slice(0, 5));`}
                </CodeBlock>
                <Callout variant="tip" title="Important Rule">
                    Store document vectors and query vectors from the <Bold>same embedding model</Bold>. Mixing models
                    usually makes similarity results unreliable.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Mistakes to Avoid</SectionTitle>
                <NumberedList
                    items={[
                        <>
                            <Bold>Treating embeddings like magic memory</Bold>. They help retrieval, but they do not
                            replace good chunking, ranking, or prompt design.
                        </>,
                        <>
                            <Bold>Using chunks that are too large</Bold>. Huge chunks dilute meaning and reduce retrieval quality.
                        </>,
                        <>
                            <Bold>Mixing embedding models</Bold>. Query and stored vectors should come from the same model family.
                        </>,
                        <>
                            <Bold>Assuming &quot;closest&quot; always means &quot;correct&quot;</Bold>. Retrieval can still bring back irrelevant text.
                        </>,
                        <>
                            <Bold>Ignoring metadata</Bold>. Source, timestamp, tenant, and permissions often matter just as much as similarity.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <P>
                    Imagine you are building an internal company assistant that answers HR policy questions.
                </P>
                <StepList
                    steps={[
                        {
                            title: "Pick 3 documents",
                            description: "For example: leave policy, reimbursement policy, and work-from-home policy.",
                        },
                        {
                            title: "Decide chunk boundaries",
                            description: "Break each document into sections that can stand on their own.",
                        },
                        {
                            title: "Write 3 user queries",
                            description: "Example: 'How many sick leaves do I get each year?'",
                        },
                        {
                            title: "Reason about retrieval",
                            description: "Which chunks should be closest to each query, and why?",
                        },
                    ]}
                />
                <Callout variant="warning" title="Check Your Understanding">
                    If a query uses different words but means the same thing, a keyword search may fail. An
                    embedding-based search should still have a chance to retrieve the right chunk.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Embeddings convert meaning into vectors so software can compare ideas mathematically.",
                        "Similar text should produce vectors that are close together in vector space.",
                        "Embeddings power semantic search, RAG, clustering, and recommendation systems.",
                        "Good retrieval depends on more than embeddings alone: chunking, metadata, and ranking also matter.",
                        "For AI agents, embeddings are a foundation for memory and knowledge retrieval.",
                    ]}
                />
            </Section>
        </article>
    );
}
