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

export default function OpenSourceVsClosedSourceContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Open-source vs Closed-source Models</SectionTitle>
                <P>
                    AI models are often discussed in two broad categories: <Bold>open-source</Bold> and{" "}
                    <Bold>closed-source</Bold>.
                </P>
                <Callout variant="definition" title="Simple Difference">
                    Open-source models are more transparent and customizable. Closed-source models are controlled by the
                    company that built them and are usually accessed through an API or hosted product.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What Open-source Usually Means</SectionTitle>
                <P>
                    In practice, open-source often means the model weights or code are available for use, fine-tuning, or
                    self-hosting, though the exact license and restrictions can vary.
                </P>
                <BulletList
                    items={[
                        "You may be able to run the model on your own infrastructure",
                        "You may be able to fine-tune or modify it",
                        "You usually have more visibility into how it is packaged and deployed",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What Closed-source Usually Means</SectionTitle>
                <P>
                    Closed-source models are typically provided through APIs or managed platforms. You can use them, but
                    you do not fully control the underlying model internals.
                </P>
                <BulletList
                    items={[
                        "The provider hosts and maintains the model",
                        "You usually interact through API calls",
                        "Customization is more limited to prompts, tools, or provider-supported fine-tuning options",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How They Compare</SectionTitle>
                <DataTable
                    headers={["Aspect", "Open-source", "Closed-source"]}
                    rows={[
                        ["Control", "Higher", "Lower"],
                        ["Ease of use", "Can require more setup", "Usually easier to start"],
                        ["Hosting", "Can self-host", "Usually provider-hosted"],
                        ["Customization", "Often stronger", "Often limited"],
                        ["Operations burden", "Higher", "Lower"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Examples of Available Models</SectionTitle>
                <DataTable
                    headers={["Category", "Example model families"]}
                    rows={[
                        ["Open-source / open-weight", "Llama, Gemma, Mistral Small, Mistral Large 3, Devstral"],
                        ["Closed-source / API-first", "GPT-5.4, Claude, Gemini"],
                    ]}
                />
                <P>
                    These are examples of widely available model families, not a complete list. Exact availability,
                    licensing, and deployment options can change over time.
                </P>
                <Callout variant="info" title="Important Note">
                    Always check the provider&apos;s official documentation before making a production decision, because model
                    access, pricing, licensing, and deployment options change frequently.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example</SectionTitle>
                <IOBlock
                    inputLabel="Problem"
                    outputLabel="Possible Decision"
                    input="A company needs an internal assistant for sensitive documents and wants full deployment control."
                    output="An open-source model may be attractive because the company can self-host and control the environment."
                />
                <P>
                    On the other hand, if a team wants the fastest path to a high-quality assistant with less infrastructure
                    work, a closed-source API may be the better first option.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>When Open-source Can Be Attractive</SectionTitle>
                <BulletList
                    items={[
                        "You need more infrastructure control",
                        "You want to self-host for privacy or compliance reasons",
                        "You want to fine-tune or experiment deeply",
                        "You are optimizing long-term flexibility",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>When Closed-source Can Be Attractive</SectionTitle>
                <BulletList
                    items={[
                        "You want to move fast with minimal setup",
                        "You want strong model quality without managing infrastructure",
                        "You prefer a managed service and support ecosystem",
                        "Your team is small and does not want operational overhead",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Open-source does not always mean free and unrestricted</Bold>. Licensing terms still matter.
                        </>,
                        <>
                            <Bold>Closed-source does not always mean weak customization</Bold>. Many providers still offer tools, system prompts, and integrations.
                        </>,
                        <>
                            <Bold>The best choice depends on the product</Bold>. This is not a simple good-vs-bad decision.
                        </>,
                    ]}
                />
                <Callout variant="info" title="Good Engineering Mindset">
                    Choose based on control, speed, cost, privacy, operational burden, and product requirements, not on ideology alone.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Practice</SectionTitle>
                <StepList
                    steps={[
                        {
                            title: "Pick one AI product idea",
                            description: "For example: internal document assistant, coding assistant, or support chatbot.",
                        },
                        {
                            title: "List the constraints",
                            description: "Think about privacy, speed, budget, compliance, and infrastructure capacity.",
                        },
                        {
                            title: "Choose open-source or closed-source first",
                            description: "Explain which option fits better and why.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Open-source models usually offer more control and flexibility.",
                        "Closed-source models usually offer faster setup and lower operational burden.",
                        "The right choice depends on product requirements, not preference alone.",
                        "Privacy, customization, cost, and infrastructure are some of the biggest decision factors.",
                    ]}
                />
            </Section>
        </article>
    );
}
