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

export default function TransformersArchitectureContent() {
    return (
        <article>
            <Section>
                <SectionTitle>What Is Transformer Architecture?</SectionTitle>
                <P>
                    Transformer architecture is a neural network design that became the foundation for most modern language
                    models, including LLMs.
                </P>
                <Callout variant="definition" title="Simple Definition">
                    A transformer is a model architecture that processes input by learning which parts of the sequence matter
                    most to each other.
                </Callout>
                <P>
                    It became famous because it handled language much better than many earlier approaches, especially on long
                    sequences.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why Transformers Were a Big Deal</SectionTitle>
                <P>
                    Before transformers, many language systems struggled to capture long-range context efficiently. Transformers
                    improved this by using <Bold>attention</Bold> to connect relevant words, even when they are far apart.
                </P>
                <IOBlock
                    inputLabel="Sentence"
                    outputLabel="What the Model Must Understand"
                    input="The trophy did not fit in the suitcase because it was too small."
                    output="The model should understand that 'it' refers to the suitcase, not the trophy."
                />
                <P>
                    Transformers help models track these kinds of relationships more effectively.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>The Core Idea: Attention</SectionTitle>
                <P>
                    The most important idea in transformers is <Bold>self-attention</Bold>. It lets each token look at other
                    tokens in the sequence and decide which ones matter most.
                </P>
                <Callout variant="info" title="Mental Model">
                    Attention is like asking: for this word, which other words should I pay attention to before deciding what it means?
                </Callout>
                <BulletList
                    items={[
                        "A word can use nearby context",
                        "A word can also use far-away context",
                        "Different attention heads can focus on different relationships",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Main Building Blocks</SectionTitle>
                <DataTable
                    headers={["Component", "What it does"]}
                    rows={[
                        ["Token embeddings", "Convert tokens into vectors"],
                        ["Positional encoding", "Helps the model know token order"],
                        ["Self-attention", "Lets tokens look at other tokens"],
                        ["Feed-forward layers", "Transform representations further"],
                        ["Multiple layers", "Build deeper understanding step by step"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How a Transformer Processes Text</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Split text into tokens",
                            description: "The input sentence is broken into smaller units the model can process.",
                        },
                        {
                            title: "Convert tokens to vectors",
                            description: "Each token becomes a numeric representation called an embedding.",
                        },
                        {
                            title: "Add position information",
                            description: "The model needs to know token order because word sequence matters.",
                        },
                        {
                            title: "Apply attention",
                            description: "Each token compares itself with others to gather useful context.",
                        },
                        {
                            title: "Pass through more layers",
                            description: "The representation becomes richer and more context-aware with each layer.",
                        },
                        {
                            title: "Produce an output",
                            description: "The final layers are used for prediction, generation, classification, or another task.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Why Transformers Matter for AI Agents</SectionTitle>
                <P>
                    Most modern agents rely on LLMs, and most modern LLMs are built on transformer architecture. So when
                    you use a chatbot, an embedding model, or a reasoning-capable language model, transformers are often
                    the engine underneath.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Where Transformers Are Used</SectionTitle>
                <BulletList
                    items={[
                        "Large language models",
                        "Machine translation",
                        "Text summarization",
                        "Speech and multimodal systems",
                        "Some modern vision models",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Transformers are not only for chatbots</Bold>. They are used across many language and multimodal tasks.
                        </>,
                        <>
                            <Bold>Attention is not human attention</Bold>. It is a mathematical mechanism, not consciousness.
                        </>,
                        <>
                            <Bold>Transformers do not automatically solve everything</Bold>. They still need good training data, compute, and evaluation.
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
                            title: "Pick a sentence with ambiguity",
                            description: "Use a sentence where understanding one word depends on the rest of the sentence.",
                        },
                        {
                            title: "Ask which words matter most",
                            description: "Which other words should the model attend to in order to interpret it correctly?",
                        },
                        {
                            title: "Connect it to attention",
                            description: "Explain how self-attention would help the model resolve that meaning.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Transformers are the architecture behind most modern LLMs.",
                        "Their key innovation is attention, especially self-attention.",
                        "Attention helps the model relate words across a sequence more effectively.",
                        "Transformers power many systems used in AI agents, language models, and multimodal AI.",
                    ]}
                />
            </Section>
        </article>
    );
}
