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

export default function WhatIsAIContent() {
    return (
        <article>
            <Section>
                <SectionTitle>What Is Artificial Intelligence?</SectionTitle>
                <P>
                    Artificial Intelligence, or <Bold>AI</Bold>, is the field of building systems that can perform tasks
                    that normally require human intelligence.
                </P>
                <Callout variant="definition" title="Simple Definition">
                    AI is software that can learn patterns, make decisions, understand language, or solve problems in a way
                    that feels intelligent.
                </Callout>
                <P>
                    But that raises an important question: <Bold>how do we actually make a system intelligent?</Bold>
                    AI is the big goal. The techniques under AI are the tools we use to reach that goal.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Start with a Real Problem</SectionTitle>
                <P>
                    Imagine we are building an email system that should automatically detect spam.
                </P>
                <IOBlock
                    inputLabel="Problem"
                    outputLabel="What We Want"
                    input="Thousands of emails arrive every hour, and humans cannot manually check every message."
                    output="We want the system to intelligently identify which emails are spam and which are safe."
                />
                <P>
                    This is what people usually mean when they say <Bold>make the system intelligent</Bold>. We want the
                    system to behave in a useful, decision-making way instead of following only simple fixed rules.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>AI Is the Umbrella</SectionTitle>
                <P>
                    AI is the broad umbrella that covers many approaches for making systems act intelligently.
                </P>
                <DataTable
                    headers={["Area", "What problem it helps solve"]}
                    rows={[
                        ["Artificial Intelligence", "The broad goal: make systems behave intelligently"],
                        ["Machine Learning", "Learn patterns from data instead of hardcoding every rule"],
                        ["Deep Learning", "Handle more complex patterns using neural networks"],
                        ["Natural Language Processing", "Work with human language like text and speech"],
                        ["Computer Vision", "Understand images and video"],
                        ["Robotics / Planning", "Make decisions and take actions in the physical or digital world"],
                    ]}
                />
                <P>
                    So AI is not one single technique. It is a <Bold>collection of ideas and methods</Bold> used to solve
                    different kinds of intelligence problems.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How Do We Make the System Intelligent?</SectionTitle>
                <P>
                    Let&apos;s go back to the spam example. One option is to write manual rules like:
                </P>
                <BulletList
                    items={[
                        "If the email contains 'win money now', mark it as spam",
                        "If the sender is unknown, increase suspicion",
                        "If the message has too many links, flag it",
                    ]}
                />
                <P>
                    That helps a little, but real-world data changes too much. Spammers change wording, formats, and tricks
                    constantly. Rule-based logic starts to break.
                </P>
                <Callout variant="info" title="Why Machine Learning Appears">
                    When writing every rule by hand becomes too hard, we let the system <Bold>learn patterns from examples</Bold>.
                    That is where machine learning comes in.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Problem First, Then the Topic That Solves It</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Problem: Too many cases to hardcode",
                            description: "We cannot manually write reliable rules for every spam email, fraud case, or recommendation scenario.",
                        },
                        {
                            title: "Solution topic: Machine Learning",
                            description: "Use past examples so the system can learn patterns from data.",
                        },
                        {
                            title: "Problem: Patterns become very complex",
                            description: "Images, speech, video, and language contain richer patterns than simple tabular data.",
                        },
                        {
                            title: "Solution topic: Deep Learning",
                            description: "Use neural networks with many layers to learn more complex representations automatically.",
                        },
                        {
                            title: "Problem: The system must understand text",
                            description: "A chatbot, assistant, or agent must interpret human language and generate useful responses.",
                        },
                        {
                            title: "Solution topic: NLP and LLMs",
                            description: "Use language-focused AI methods, including modern large language models.",
                        },
                        {
                            title: "Problem: The system must decide and act",
                            description: "An AI agent must plan, choose tools, and move toward a goal.",
                        },
                        {
                            title: "Solution topic: Agent systems",
                            description: "Combine reasoning, memory, tools, and workflows to produce goal-directed behavior.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What Kinds of Tasks Count as AI?</SectionTitle>
                <BulletList
                    items={[
                        "Recognizing images or speech",
                        "Answering questions in natural language",
                        "Recommending products or content",
                        "Detecting fraud or anomalies",
                        "Planning actions for an agent or robot",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>One More Example: Recommendation Systems</SectionTitle>
                <IOBlock
                    inputLabel="Business Problem"
                    outputLabel="AI Path"
                    input="A shopping app wants to show each user products they are likely to buy."
                    output={`AI goal:
Make recommendations intelligently.

How we do it:
Use machine learning to learn user behavior patterns.

If data becomes richer and more complex:
Use deep learning for better representation learning.`}
                />
                <P>
                    This is the pattern you should remember: <Bold>start with the real problem</Bold>, then choose the
                    AI subfield or technique that helps solve it.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Where AI Shows Up in Real Life</SectionTitle>
                <BulletList
                    items={[
                        "Chatbots and coding assistants",
                        "Search ranking and recommendation systems",
                        "Self-driving and driver-assist systems",
                        "Medical image analysis",
                        "Spam filtering and fraud detection",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>AI is not magic</Bold>. It works through models, data, rules, and engineering.
                        </>,
                        <>
                            <Bold>AI is not always learning live</Bold>. Many systems only use what they were trained or configured with.
                        </>,
                        <>
                            <Bold>AI is not always correct</Bold>. It can be biased, wrong, or overconfident.
                        </>,
                        <>
                            <Bold>AI is not one thing</Bold>. It is an umbrella that includes machine learning, deep learning, language systems, vision systems, and more.
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
                            title: "Pick one real-world problem",
                            description: "For example: spam detection, movie recommendations, fraud detection, or voice assistants.",
                        },
                        {
                            title: "Describe the intelligence needed",
                            description: "Ask what the system should do that feels intelligent: predict, rank, classify, understand language, or plan.",
                        },
                        {
                            title: "Choose the likely AI subfield",
                            description: "Would this problem be approached with machine learning, deep learning, NLP, computer vision, or agents?",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "AI is the broad field of making systems perform tasks that seem intelligent.",
                        "AI is an umbrella, and machine learning, deep learning, NLP, computer vision, and agents sit under that umbrella.",
                        "We usually start with a real-world problem first, then choose the AI technique that best solves it.",
                        "Machine learning appears when hardcoded rules are not enough and the system must learn from data.",
                        "AI appears in language systems, recommendations, detection systems, and automation tools.",
                        "AI systems can be useful, but they are not automatically correct or trustworthy.",
                    ]}
                />
            </Section>
        </article>
    );
}
