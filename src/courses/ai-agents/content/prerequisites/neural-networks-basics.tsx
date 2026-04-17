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

export default function NeuralNetworksBasicsContent() {
    return (
        <article>
            <Section>
                <SectionTitle>What Are Neural Networks?</SectionTitle>
                <P>
                    A neural network is a machine learning model made of connected layers that learn patterns from data.
                </P>
                <Callout variant="definition" title="Simple Definition">
                    Neural networks take an input, transform it through multiple layers, and produce an output such as a
                    prediction, classification, or generated result.
                </Callout>
                <P>
                    They are inspired loosely by the idea of connected neurons, but in software they are really just
                    mathematical functions learning useful patterns.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why Do We Use Them?</SectionTitle>
                <P>
                    Some problems are too complex for manual rules or simple models. Neural networks help when the system
                    must learn rich patterns from text, images, audio, or other high-dimensional data.
                </P>
                <IOBlock
                    inputLabel="Problem"
                    outputLabel="Why a Neural Network Helps"
                    input="Recognize whether an image contains a cat."
                    output="Instead of writing thousands of rules for ears, fur, eyes, and poses, the network learns those patterns from examples."
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The Basic Structure</SectionTitle>
                <DataTable
                    headers={["Part", "What it does"]}
                    rows={[
                        ["Input layer", "Receives the raw input features"],
                        ["Hidden layers", "Learn intermediate patterns and representations"],
                        ["Output layer", "Produces the final prediction or result"],
                        ["Weights", "Control how strongly signals affect the next layer"],
                        ["Activation functions", "Add non-linearity so the network can learn complex relationships"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How Learning Happens</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Take an input",
                            description: "For example: an image, a sentence, or a row of customer data.",
                        },
                        {
                            title: "Make a prediction",
                            description: "The network produces an output based on its current weights.",
                        },
                        {
                            title: "Measure the error",
                            description: "Compare the prediction to the correct answer.",
                        },
                        {
                            title: "Update the weights",
                            description: "Training adjusts the weights so future predictions improve.",
                        },
                    ]}
                />
                <Callout variant="info" title="Mental Model">
                    Training is repeated correction. The network makes many guesses, sees how wrong it was, and slowly
                    adjusts itself to do better.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Simple Example</SectionTitle>
                <IOBlock
                    inputLabel="Input"
                    outputLabel="Output"
                    input="Email text with subject, sender reputation, and link count"
                    output="Spam probability: 0.92"
                />
                <P>
                    In this case, the neural network learns how combinations of features relate to spam, instead of relying
                    only on fixed hand-written rules.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Where Neural Networks Are Used</SectionTitle>
                <BulletList
                    items={[
                        "Image recognition",
                        "Speech recognition",
                        "Language models and chat systems",
                        "Recommendation systems",
                        "Fraud and anomaly detection",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Neural networks are not magic</Bold>. They still depend on data quality, training, and evaluation.
                        </>,
                        <>
                            <Bold>Bigger is not always better</Bold>. Larger networks need more compute, more data, and better tuning.
                        </>,
                        <>
                            <Bold>They do not truly understand like humans</Bold>. They learn statistical patterns from examples.
                        </>,
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why This Matters for AI Agents</SectionTitle>
                <P>
                    Modern AI agents often rely on models built with deep neural networks, especially large language models.
                    So understanding neural networks gives you the foundation for understanding how LLMs, embeddings, and
                    reasoning systems are built underneath.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Pick one prediction task",
                            description: "For example: spam detection, sentiment analysis, or image classification.",
                        },
                        {
                            title: "Define the input",
                            description: "What data would the network receive?",
                        },
                        {
                            title: "Define the output",
                            description: "What final prediction or score should it produce?",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Neural networks are layered models that learn patterns from data.",
                        "They are useful for complex tasks where simple rules are not enough.",
                        "Training works by making predictions, measuring error, and updating weights.",
                        "Deep learning is built on neural networks with many layers.",
                    ]}
                />
            </Section>
        </article>
    );
}
