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

export default function VectorSimilaritySearchContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Definition: What Is Vector Similarity Search?</SectionTitle>
                <P>
                    Vector similarity search is the process of finding which stored vectors are <Bold>closest</Bold> to
                    a query vector.
                </P>
                <Callout variant="definition" title="Plain-English Version">
                    You turn a user&apos;s question into a vector, compare it with many stored vectors, and return the
                    nearest matches.
                </Callout>
                <P>
                    In AI systems, those vectors usually come from embeddings. So this topic is the natural next step
                    after learning what embeddings are.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Prerequisites: What You Should Know First</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Embeddings</Bold>: text is converted into vectors that represent meaning.
                        </>,
                        <>
                            <Bold>Vectors</Bold>: each vector is an array of numbers such as <InlineCode>[0.12, -0.44, 0.91]</InlineCode>.
                        </>,
                        <>
                            <Bold>Distance or similarity</Bold>: we need a mathematical way to say whether two vectors are close.
                        </>,
                    ]}
                />
                <Callout variant="info" title="Mental Model">
                    If embeddings place meaning on a map, vector similarity search is the act of finding the nearest points
                    on that map.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example: Similar Meaning, Different Words</SectionTitle>
                <P>
                    A user may ask a question that does not share exact keywords with the stored document, but still means
                    the same thing.
                </P>
                <IOBlock
                    inputLabel="User Query"
                    outputLabel="Best Match"
                    input="How can I get my money back for an order?"
                    output={`Closest chunk:
"Refunds are available within 14 days of purchase with proof of payment."`}
                />
                <P>
                    Keyword search might miss this if the document says <Bold>refund</Bold> and the user says{" "}
                    <Bold>money back</Bold>. Vector similarity search helps bridge that wording gap.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How It Works Step by Step</SectionTitle>
                <Diagram label="Similarity Search Flow">
                    <TerminalOutput label="Pipeline">
                        {`User asks a question
  ->
Convert the query into an embedding vector
  ->
Compare that query vector with stored document vectors
  ->
Score each candidate by closeness
  ->
Return the top-k nearest matches`}
                    </TerminalOutput>
                </Diagram>

                <StepList
                    steps={[
                        {
                            title: "Embed the query",
                            description: "Use the same embedding model that was used for the stored documents.",
                        },
                        {
                            title: "Compare against stored vectors",
                            description: "Each document chunk already has a vector representation.",
                        },
                        {
                            title: "Compute similarity",
                            description: "Use a metric like cosine similarity, dot product, or Euclidean distance.",
                        },
                        {
                            title: "Rank results",
                            description: "Sort candidates so the nearest and most relevant matches rise to the top.",
                        },
                        {
                            title: "Return the best few",
                            description: "Most systems return top-k results such as the best 3, 5, or 10 matches.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Similarity Metrics You Will Hear About</SectionTitle>
                <DataTable
                    headers={["Metric", "What it measures", "Beginner intuition"]}
                    rows={[
                        ["Cosine similarity", "Angle between vectors", "Do these vectors point in a similar direction?"],
                        ["Dot product", "Directional similarity with magnitude", "Are they aligned, and how strongly?"],
                        ["Euclidean distance", "Straight-line distance", "How far apart are the two points?"],
                    ]}
                />

                <SubTitle>Which one matters most?</SubTitle>
                <P>
                    In practice, many embedding systems use <Bold>cosine similarity</Bold> because it works well for
                    meaning-based retrieval. But the right metric depends on how the embeddings were trained and how your
                    vector database expects them to be queried.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Application: RAG and Agent Memory</SectionTitle>
                <P>
                    Vector similarity search is one of the most common retrieval mechanisms behind <Bold>RAG systems</Bold>{" "}
                    and long-term memory for AI agents.
                </P>
                <BulletList
                    items={[
                        <>
                            <Bold>RAG</Bold>: retrieve the most relevant document chunks before generating an answer.
                        </>,
                        <>
                            <Bold>Agent memory</Bold>: retrieve past notes, previous actions, or summarized conversations.
                        </>,
                        <>
                            <Bold>Support search</Bold>: find the closest FAQ or knowledge-base answer to a user&apos;s issue.
                        </>,
                    ]}
                />
                <Callout variant="tip" title="Important Distinction">
                    Embeddings create the vectors. Similarity search finds the nearest ones. They are related, but they
                    are not the same step.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Code Example</SectionTitle>
                <P>
                    Many vector databases expose an API where you pass a query vector and ask for the nearest stored vectors.
                </P>
                <CodeBlock label="similarity-search.ts">
                    {`const queryEmbedding = await client.embeddings.create({
  model: "text-embedding-model",
  input: "How do I cancel my subscription?"
});

const queryVector = queryEmbedding.data[0].embedding;

const results = await vectorDb.query({
  vector: queryVector,
  topK: 3,
  includeMetadata: true
});

console.log(results.matches);`}
                </CodeBlock>
                <P>
                    The search result usually includes a score plus metadata like document id, source, title, or chunk text.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Mistakes to Avoid</SectionTitle>
                <NumberedList
                    items={[
                        <>
                            <Bold>Expecting perfect relevance from similarity alone</Bold>. Nearest does not always mean best.
                        </>,
                        <>
                            <Bold>Ignoring chunk quality</Bold>. Bad chunking creates weak vectors and poor matches.
                        </>,
                        <>
                            <Bold>Forgetting metadata filters</Bold>. Similarity is not enough if you also need tenant, date, or permission constraints.
                        </>,
                        <>
                            <Bold>Using the wrong metric</Bold>. Your retrieval quality can drop if the similarity metric does not match the embedding setup.
                        </>,
                        <>
                            <Bold>Returning too many results</Bold>. Too much retrieved context can dilute the final prompt.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <P>
                    Imagine you are building a documentation assistant for your engineering team.
                </P>
                <StepList
                    steps={[
                        {
                            title: "Choose 3 example queries",
                            description: "For example: deployment rollback, database migration, and secret rotation.",
                        },
                        {
                            title: "Choose 5 stored chunks",
                            description: "Pretend each chunk came from a handbook or internal runbook.",
                        },
                        {
                            title: "Predict the top matches",
                            description: "Which chunks should rank highest for each query, even when wording differs?",
                        },
                        {
                            title: "Add one metadata rule",
                            description: "Example: only search documents for the production environment.",
                        },
                    ]}
                />
                <Callout variant="warning" title="What to Notice">
                    Good retrieval is not only about mathematical closeness. It also depends on chunking, filtering, and
                    how many results you send into the model.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Vector similarity search finds the nearest stored vectors to a query vector.",
                        "It is the retrieval step that usually follows embedding generation.",
                        "Semantic search works even when the user and the document use different words.",
                        "Cosine similarity, dot product, and Euclidean distance are common comparison methods.",
                        "For AI agents and RAG, strong similarity search is a core building block for useful retrieval.",
                    ]}
                />
            </Section>
        </article>
    );
}
