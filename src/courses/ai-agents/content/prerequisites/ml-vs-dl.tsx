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

export default function MachineLearningVsDeepLearningContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Machine Learning vs Deep Learning</SectionTitle>
                <P>
                    <Bold>Machine Learning (ML)</Bold> is a branch of AI where systems learn patterns from data instead
                    of being programmed with fixed rules for every case.
                </P>
                <P>
                    <Bold>Deep Learning (DL)</Bold> is a branch of machine learning that uses multi-layer neural networks
                    to learn more complex patterns automatically.
                </P>
                <Callout variant="definition" title="Simple Difference">
                    Deep learning is a subset of machine learning. All deep learning is machine learning, but not all
                    machine learning is deep learning.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How They Compare</SectionTitle>
                <DataTable
                    headers={["Aspect", "Machine Learning", "Deep Learning"]}
                    rows={[
                        ["Scope", "Broader category", "Subset of ML"],
                        ["Models", "Regression, trees, SVMs, clustering", "Neural networks with many layers"],
                        ["Feature work", "Often needs manual feature engineering", "Learns many features automatically"],
                        ["Data needs", "Can work well with smaller datasets", "Usually performs best with larger datasets"],
                        ["Compute needs", "Often lighter", "Usually heavier"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example</SectionTitle>
                <IOBlock
                    inputLabel="Problem"
                    outputLabel="Possible Approach"
                    input="Predict whether a customer will churn."
                    output={`ML:
Use historical customer features with a model like XGBoost or logistic regression.

DL:
Use a neural network if the data is large and relationships are complex.`}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>When Deep Learning Became Important</SectionTitle>
                <P>
                    Deep learning became especially powerful when teams had enough <Bold>data</Bold>, <Bold>GPU compute</Bold>,
                    and better neural network architectures. That is why it now powers image recognition, speech systems,
                    and modern LLMs.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Where You See Each One</SectionTitle>
                <BulletList
                    items={[
                        "ML: fraud detection, pricing models, churn prediction, recommendation ranking",
                        "DL: image classification, speech recognition, translation, LLMs, generative AI",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Deep learning is not always better</Bold>. Simpler ML models can be cheaper, faster, and easier to explain.
                        </>,
                        <>
                            <Bold>Machine learning is not only neural networks</Bold>. Many useful ML systems use non-neural models.
                        </>,
                        <>
                            <Bold>More complexity is not always more value</Bold>. The right choice depends on the data and problem.
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
                            title: "Pick a business problem",
                            description: "For example: spam detection, sales forecasting, or image tagging.",
                        },
                        {
                            title: "Estimate the data type and volume",
                            description: "Is it mostly tabular data, text, images, or audio? Is the dataset small or large?",
                        },
                        {
                            title: "Choose a first approach",
                            description: "Decide whether a traditional ML model or a deep learning model sounds more appropriate and explain why.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Machine learning is the broader field of learning patterns from data.",
                        "Deep learning is a subset of machine learning built on multi-layer neural networks.",
                        "Traditional ML is often strong for structured data and smaller problems.",
                        "Deep learning is especially powerful for large, complex data like text, images, and audio.",
                    ]}
                />
            </Section>
        </article>
    );
}
