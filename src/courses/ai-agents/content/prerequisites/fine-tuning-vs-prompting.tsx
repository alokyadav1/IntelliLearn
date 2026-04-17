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

export default function FineTuningVsPromptingContent() {
    return (
        <article>
            <Section>
                <SectionTitle>Fine-tuning vs Prompting</SectionTitle>
                <P>
                    Both <Bold>prompting</Bold> and <Bold>fine-tuning</Bold> are ways to make a model behave the way you
                    want, but they work very differently.
                </P>
                <Callout variant="definition" title="Simple Difference">
                    Prompting changes the <Bold>instructions you give the model at runtime</Bold>. Fine-tuning changes
                    the <Bold>model itself through additional training</Bold>.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What Is Prompting?</SectionTitle>
                <P>
                    Prompting means guiding the model using system prompts, user instructions, examples, formatting rules,
                    and retrieved context.
                </P>
                <IOBlock
                    inputLabel="Prompting"
                    outputLabel="Effect"
                    input="You are a support assistant. Answer in JSON. Be brief and professional."
                    output="The model changes its output style and format for this request."
                />
                <P>
                    Prompting is usually the <Bold>first thing teams try</Bold> because it is fast, cheap, and flexible.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>What Is Fine-tuning?</SectionTitle>
                <P>
                    Fine-tuning means taking an already trained model and training it further on a custom dataset so it
                    learns a more specialized behavior.
                </P>
                <IOBlock
                    inputLabel="Fine-tuning"
                    outputLabel="Effect"
                    input="Train the model on thousands of support examples that follow your exact response style."
                    output="The model becomes more naturally aligned to that style and task."
                />
                <P>
                    Fine-tuning is usually considered when prompting alone is not enough.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>How They Compare</SectionTitle>
                <DataTable
                    headers={["Aspect", "Prompting", "Fine-tuning"]}
                    rows={[
                        ["Speed to try", "Very fast", "Slower setup"],
                        ["Cost", "Usually cheaper", "Usually more expensive"],
                        ["Flexibility", "Easy to change anytime", "Requires retraining for major changes"],
                        ["Best for", "Instructions, format, tone, task guidance", "Stable specialized behavior"],
                        ["Data requirement", "Little or none", "Needs a training dataset"],
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>When Prompting Is Enough</SectionTitle>
                <BulletList
                    items={[
                        "You want to change tone, structure, or format",
                        "You want the model to follow instructions for a specific task",
                        "You can solve the problem with examples, schemas, or RAG",
                        "The task changes often and needs flexibility",
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>When Fine-tuning May Help</SectionTitle>
                <BulletList
                    items={[
                        "You need highly consistent specialized outputs",
                        "You have a strong labeled dataset",
                        "The behavior is stable and worth training into the model",
                        "Prompting alone is too weak, too long, or too expensive",
                    ]}
                />
                <Callout variant="warning" title="Important Reminder">
                    Fine-tuning does not replace RAG when the issue is missing knowledge. If the model needs current or
                    private facts, retrieval is often the better solution.
                </Callout>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Example</SectionTitle>
                <IOBlock
                    inputLabel="Problem"
                    outputLabel="Better First Move"
                    input="I want my support bot to answer politely, in JSON, and include a confidence score."
                    output="Start with prompting, structured outputs, and examples before considering fine-tuning."
                />
                <P>
                    If the model still fails after strong prompting and repeated examples, then fine-tuning may become a
                    reasonable next step.
                </P>
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Common Misunderstandings</SectionTitle>
                <BulletList
                    items={[
                        <>
                            <Bold>Fine-tuning is not always the advanced answer</Bold>. Often prompting plus RAG is enough.
                        </>,
                        <>
                            <Bold>Prompting is not weak</Bold>. Good prompt design can solve many real production problems.
                        </>,
                        <>
                            <Bold>Fine-tuning does not magically add fresh knowledge</Bold>. It teaches patterns and behavior, not live facts.
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
                            description: "For example: support replies, document classification, or code review suggestions.",
                        },
                        {
                            title: "List what needs changing",
                            description: "Is it mostly tone, format, and instructions, or does it need stable specialized behavior?",
                        },
                        {
                            title: "Choose prompting or fine-tuning first",
                            description: "Explain which approach you would try first and why.",
                        },
                    ]}
                />
            </Section>

            <Divider />

            <Section>
                <SectionTitle>Key Takeaways</SectionTitle>
                <SummaryCard
                    items={[
                        "Prompting changes how you instruct the model at runtime.",
                        "Fine-tuning changes the model through additional training.",
                        "Prompting is usually the first and most flexible approach.",
                        "Fine-tuning is better for stable, specialized behavior when prompting is not enough.",
                        "If the issue is missing knowledge, RAG is often more appropriate than fine-tuning.",
                    ]}
                />
            </Section>
        </article>
    );
}
