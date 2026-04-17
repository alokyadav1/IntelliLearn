import {
    Section,
    SectionTitle,
    P,
    Bold,
    BulletList,
    Callout,
    DataTable,
    StepList,
    Divider,
    SummaryCard,
    IOBlock,
} from "@/components/TopicContent";

export default function ModelEvaluationMetricsContent() {
    return (
        <article>
            <Section>
                <SectionTitle>What Are Model Evaluation Metrics?</SectionTitle>
                <P>
                    Model evaluation metrics are ways to measure how well a model is performing on a task.
                </P>
                <Callout variant="definition" title="Simple Definition">
                    Metrics turn model quality into something you can compare, track, and improve.
                </Callout>
                <P>
                    Without evaluation, a model may <Bold>look impressive</Bold> in a demo but still fail badly in real use.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why Evaluation Matters</SectionTitle>
                <IOBlock
                    inputLabel="Problem"
                    outputLabel="Why Metrics Help"
                    input="Two prompts or two models both seem 'good' in casual testing."
                    output="Metrics help you compare them more systematically instead of guessing from a few examples."
                />
                <P>
                    Evaluation is especially important for LLM systems because answers can sound fluent even when they are
                    wrong, incomplete, or unsafe.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Metrics You Will Hear About</SectionTitle>
                <DataTable
                    headers={["Metric", "What it measures", "Where it is useful"]}
                    rows={[
                        ["Accuracy", "How often the prediction is correct", "Classification tasks"],
                        ["Precision", "How many predicted positives were actually correct", "Spam, fraud, safety filters"],
                        ["Recall", "How many real positives were found", "Detection and retrieval tasks"],
                        ["F1 Score", "Balance of precision and recall", "When both matter"],
                        ["Latency", "How fast the model responds", "User-facing systems"],
                        ["Cost", "How expensive each call is", "Production systems"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>LLM-Specific Evaluation Ideas</SectionTitle>
                <BulletList
                    items={[
                        "Correctness: Is the answer factually right?",
                        "Groundedness: Does the answer stay consistent with the provided context?",
                        "Relevance: Does it actually answer the user's question?",
                        "Format adherence: Did it follow the required JSON or schema?",
                        "Safety: Did it avoid harmful or disallowed output?",
                    ]}
                />
                <P>
                    These are often more useful for LLM apps than one single score, because real systems care about more
                    than just one dimension of quality.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example</SectionTitle>
                <IOBlock
                    inputLabel="Task"
                    outputLabel="Useful Metrics"
                    input="Build an LLM support assistant that answers from company policy docs."
                    output={`Correctness:
Is the answer right?

Groundedness:
Did it stay within the retrieved docs?

Latency:
Did it answer fast enough?

Format:
Did it follow the expected response structure?`}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why One Metric Is Not Enough</SectionTitle>
                <P>
                    A model can score well on one metric and still be poor in production.
                </P>
                <BulletList
                    items={[
                        "High accuracy but slow response time",
                        "Good format adherence but low factual correctness",
                        "Fast answers but weak grounding",
                        "Low cost but poor user experience",
                    ]}
                />
                <Callout variant="info" title="Important Reminder">
                    Good evaluation usually means tracking a <Bold>set of metrics</Bold>, not hunting for one perfect number.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How Teams Usually Evaluate</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Define the task clearly",
                            description: "Know what success means for your app: correct answers, safe answers, fast answers, or all three.",
                        },
                        {
                            title: "Create a test set",
                            description: "Use representative examples that reflect the real use case.",
                        },
                        {
                            title: "Choose metrics",
                            description: "Pick the measures that match the product goal.",
                        },
                        {
                            title: "Compare versions",
                            description: "Use the same test set to compare prompts, models, or retrieval changes.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Fluent does not mean correct</Bold>. LLMs can sound confident while being wrong.
                        </>,
                        <>
                            <Bold>Offline scores are not everything</Bold>. Real users may behave differently from your test set.
                        </>,
                        <>
                            <Bold>More metrics is not always better</Bold>. Choose the ones that actually reflect product quality.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Pick one AI feature",
                            description: "For example: a chatbot, classifier, or document QA system.",
                        },
                        {
                            title: "List 3 quality goals",
                            description: "Examples: correctness, latency, cost, safety, or format adherence.",
                        },
                        {
                            title: "Choose 2 or 3 matching metrics",
                            description: "Explain why those metrics fit the task better than others.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Evaluation metrics help you measure and compare model quality.",
                        "Different tasks need different metrics.",
                        "LLM systems often need multi-dimensional evaluation, including correctness, grounding, safety, and latency.",
                        "One strong-looking metric does not guarantee a good production system.",
                    ]}
                />
            </Section>
        </article>
    );
}
