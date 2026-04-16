import {
    Section, SectionTitle, SubTitle, P, Bold, BulletList, NumberedList,
    Callout, CodeBlock, IOBlock, DataTable, StepList, Divider, SummaryCard, InlineCode,
} from "@/components/TopicContent";

export default function LargeLanguageModelsContent() {
    return (
        <article>
            {/* ── 1 ── */}
            <Section>
                <SectionTitle number={1}>What is a Large Language Model (LLM)?</SectionTitle>
                <P>
                    A Large Language Model (LLM) is a type of machine learning model designed to understand,
                    generate, and work with human language.
                </P>
                <Callout variant="definition" title="In Simple Terms">
                    An LLM is a program trained on massive amounts of text so it can predict and generate
                    human-like language.
                </Callout>
                <SubTitle>Examples of tasks LLMs can perform</SubTitle>
                <BulletList items={[
                    "Answer questions",
                    "Generate text",
                    "Write code",
                    "Translate languages",
                    "Summarize documents",
                    "Chat with users",
                    "Extract information from text",
                ]} />
                <IOBlock
                    inputLabel="User Input"
                    outputLabel="LLM Output"
                    input="Explain Docker in simple terms"
                    output="Docker is a platform that packages applications and their dependencies into containers so they can run consistently across environments."
                />
            </Section>

            <Divider />

            {/* ── 2 ── */}
            <Section>
                <SectionTitle number={2}>Why is it called Large Language Model?</SectionTitle>
                <P>There are two reasons.</P>

                <SubTitle>1️⃣ Huge training data</SubTitle>
                <P>LLMs are trained on massive datasets of text collected from:</P>
                <BulletList items={["Websites", "Books", "Articles", "Code repositories", "Documentation"]} />
                <Callout variant="info">
                    Sometimes this training data can be <Bold>terabytes or petabytes</Bold> of text.
                </Callout>

                <SubTitle>2️⃣ Huge number of parameters</SubTitle>
                <P>
                    LLMs contain <Bold>millions to trillions of parameters</Bold>. Parameters are basically
                    numbers inside the neural network that represent learned patterns in language.
                </P>
                <DataTable
                    headers={["Model", "Parameters"]}
                    rows={[
                        ["GPT-2", "1.5B"],
                        ["GPT-3", "175B"],
                        ["GPT-4", "Hundreds of billions (estimated)"],
                    ]}
                />
                <Callout variant="info">
                    More parameters → more complex language understanding.
                </Callout>
            </Section>

            <Divider />

            {/* ── 3 ── */}
            <Section>
                <SectionTitle number={3}>Technology Behind LLMs</SectionTitle>
                <P>LLMs are built using <Bold>Deep Learning</Bold> and <Bold>Neural Networks</Bold>. The most important architecture used today is:</P>
                <Callout variant="definition" title="Transformer Architecture">
                    Most modern LLMs use a <Bold>Transformer</Bold> neural network — introduced in the 2017
                    paper <em>Attention is All You Need</em>.
                </Callout>
                <SubTitle>Examples of Transformer-based LLMs</SubTitle>
                <BulletList items={["GPT", "LLaMA", "Claude", "PaLM", "Mistral"]} />
                <P>Transformers are good at:</P>
                <BulletList items={[
                    "Understanding context across long sequences",
                    "Capturing relationships between words",
                    "Processing text in parallel (fast training)",
                ]} />
            </Section>

            <Divider />

            {/* ── 4 ── */}
            <Section>
                <SectionTitle number={4}>How LLMs Actually Work</SectionTitle>
                <Callout variant="definition" title="Core Idea">
                    LLMs predict the <Bold>next word</Bold> (or token) in a sequence. This simple objective,
                    applied at massive scale, produces powerful language understanding.
                </Callout>

                <CodeBlock label="Training Example">
                    {`Input:  "The sky is blue and the grass is __"\n\nModel learns → "green" is the most likely next word.`}
                </CodeBlock>

                <SubTitle>Step-by-step process</SubTitle>
                <StepList steps={[
                    {
                        title: "Tokenization",
                        description: (
                            <>
                                <p className="mb-2">Text is broken into tokens.</p>
                                <CodeBlock>{`"ChatGPT is amazing"\n→ ["Chat", "GPT", "is", "amazing"]\n\n"playing"\n→ ["play", "ing"]  ← sub-word tokens`}</CodeBlock>
                            </>
                        ),
                    },
                    {
                        title: "Convert tokens to numbers",
                        description: (
                            <>
                                <p className="mb-2">Computers don&apos;t understand words. Tokens become <Bold>vectors</Bold> (arrays of numbers). This is called an <Bold>embedding</Bold>.</p>
                                <CodeBlock>{`"dog" → [0.23, 0.98, 0.12, ...]`}</CodeBlock>
                            </>
                        ),
                    },
                    {
                        title: "Neural network processing",
                        description: (
                            <>
                                <p className="mb-2">The transformer network processes these vectors and learns relationships:</p>
                                <CodeBlock>{`king - man + woman ≈ queen`}</CodeBlock>
                            </>
                        ),
                    },
                    {
                        title: "Predict next token",
                        description: (
                            <>
                                <p className="mb-2">The model calculates probabilities for the next token:</p>
                                <CodeBlock>{`Input: "I like to drink"\n\ncoffee → 0.35\ntea    → 0.30\nwater  → 0.20\nmilk   → 0.15`}</CodeBlock>
                                <p className="text-[14px] text-slate-600 dark:text-slate-400">It picks the most likely token.</p>
                            </>
                        ),
                    },
                    {
                        title: "Generate output",
                        description: (
                            <CodeBlock>{`I like to drink coffee in the morning`}</CodeBlock>
                        ),
                    },
                ]} />
            </Section>

            <Divider />

            {/* ── 5 ── */}
            <Section>
                <SectionTitle number={5}>How LLMs Are Trained</SectionTitle>
                <P>Training an LLM typically happens in <Bold>three stages</Bold>.</P>
                <StepList steps={[
                    {
                        title: "Stage 1 — Pretraining",
                        description: (
                            <>
                                <P>The model reads <Bold>massive text datasets</Bold> and learns language patterns.</P>
                                <Callout variant="definition" title="Training Objective">
                                    Predict the next word.
                                    <CodeBlock label="Example">{`"Artificial intelligence is transforming the ____"\n\n→ world / industry / economy`}</CodeBlock>
                                </Callout>
                            </>
                        ),
                    },
                    {
                        title: "Stage 2 — Fine-tuning",
                        description: (
                            <>
                                <P>After pretraining, the model is tuned with <Bold>specific datasets</Bold> — customer support conversations, coding datasets, medical texts — to make it better for particular tasks.</P>
                            </>
                        ),
                    },
                    {
                        title: "Stage 3 — Human Feedback (RLHF)",
                        description: (
                            <>
                                <P>Models are further improved using <Bold>Reinforcement Learning from Human Feedback</Bold>. Humans rank model responses so the model learns to prefer better ones.</P>
                                <IOBlock
                                    inputLabel="Prompt"
                                    outputLabel="Human Rating"
                                    input="Explain Kubernetes"
                                    output={"Response A → ranked better\nResponse B → ranked worse\n\nModel learns to prefer A-style responses."}
                                />
                            </>
                        ),
                    },
                ]} />
            </Section>

            <Divider />

            {/* ── 6 ── */}
            <Section>
                <SectionTitle number={6}>What LLMs Are Good At</SectionTitle>
                <DataTable
                    headers={["Capability", "Examples"]}
                    rows={[
                        ["📝 Text generation", "ChatGPT, copywriting, email generation"],
                        ["❓ Question answering", `"Who discovered gravity?" → Isaac Newton`],
                        ["💻 Code generation", "GitHub Copilot, ChatGPT"],
                        ["📄 Text summarization", "20-page report → 1-paragraph summary"],
                        ["🌐 Translation", "English → French"],
                        ["🏷️ Classification", "Email: Spam / Not Spam"],
                    ]}
                />
            </Section>

            <Divider />

            {/* ── 7 ── */}
            <Section>
                <SectionTitle number={7}>Examples of Popular LLMs</SectionTitle>
                <DataTable
                    headers={["Model", "Organization"]}
                    rows={[
                        ["GPT", "OpenAI"],
                        ["LLaMA", "Meta"],
                        ["Claude", "Anthropic"],
                        ["PaLM", "Google"],
                        ["Mistral", "Mistral AI"],
                    ]}
                />
                <Callout variant="info">
                    These are often called <Bold>Foundation Models</Bold> because many AI applications are
                    built on top of them.
                </Callout>
            </Section>

            <Divider />

            {/* ── 8 ── */}
            <Section>
                <SectionTitle number={8}>Real-World Applications</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { emoji: "🎧", title: "Customer Support", desc: "Chatbots that answer user queries — \"Where is my order?\"" },
                        { emoji: "💻", title: "Software Development", desc: "Write code, explain code, generate tests." },
                        { emoji: "🔍", title: "Search Engines", desc: "AI-generated summaries (e.g. Google AI Overview)." },
                        { emoji: "✍️", title: "Content Creation", desc: "Blog writing, marketing content, ad copy." },
                        { emoji: "📊", title: "Data Analysis", desc: "Analyze customer reviews and generate insights." },
                    ].map((app) => (
                        <div key={app.title} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 p-4 hover:shadow-sm transition-shadow">
                            <p className="text-2xl mb-2">{app.emoji}</p>
                            <p className="font-bold text-slate-800 dark:text-slate-200 text-[15px] mb-1">{app.title}</p>
                            <p className="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed">{app.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Divider />

            {/* ── 9 ── */}
            <Section>
                <SectionTitle number={9}>Limitations of LLMs</SectionTitle>
                <div className="space-y-3">
                    {[
                        {
                            label: "Hallucinations",
                            desc: "LLMs can generate incorrect information confidently — invented facts, fake citations.",
                            color: "border-red-200 dark:border-red-900/50 bg-red-50/60 dark:bg-red-900/20",
                            badge: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/50",
                        },
                        {
                            label: "Bias",
                            desc: "Training data may contain gender, cultural, or political bias that the model inherits.",
                            color: "border-amber-200 dark:border-amber-900/50 bg-amber-50/60 dark:bg-amber-900/20",
                            badge: "text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/50",
                        },
                        {
                            label: "High Cost",
                            desc: "Training large models requires thousands of GPUs and millions of dollars.",
                            color: "border-orange-200 dark:border-orange-900/50 bg-orange-50/60 dark:bg-orange-900/20",
                            badge: "text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/50",
                        },
                        {
                            label: "Lack of Real Understanding",
                            desc: "LLMs predict patterns in text but do not truly understand concepts.",
                            color: "border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/20",
                            badge: "text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800",
                        },
                    ].map((item) => (
                        <div key={item.label} className={`rounded-xl border p-4 ${item.color}`}>
                            <span className={`text-xs font-bold uppercase tracking-widest px-2 py-0.5 rounded ${item.badge}`}>{item.label}</span>
                            <p className="mt-2 text-[14px] text-slate-700 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Section>

            <Divider />

            {/* ── 10 ── */}
            <Section>
                <SectionTitle number={10}>Key Concepts Related to LLMs</SectionTitle>
                <div className="space-y-3">
                    {[
                        { term: "Tokens", def: "Pieces of words processed by the model.", example: `"ChatGPT" → ["Chat", "GPT"]` },
                        { term: "Embeddings", def: "Vector representations of words. Used to measure semantic similarity.", example: `"dog" → [0.23, 0.98, 0.12, ...]` },
                        { term: "Context Window", def: "The amount of text the model can read at once.", example: "GPT-4: 128K tokens" },
                        { term: "Inference", def: "Running the trained model to generate output.", example: "You asking ChatGPT → inference." },
                    ].map((item) => (
                        <div key={item.term} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 px-5 py-4">
                            <p className="font-bold text-indigo-700 dark:text-indigo-400 mb-1">{item.term}</p>
                            <p className="text-[14px] text-slate-600 dark:text-slate-400 mb-1.5">{item.def}</p>
                            <InlineCode>{item.example}</InlineCode>
                        </div>
                    ))}
                </div>
            </Section>

            <Divider />

            {/* ── 11 ── */}
            <Section>
                <SectionTitle number={11}>LLMs vs Traditional NLP</SectionTitle>
                <P>Before LLMs, NLP relied on rule-based or statistical methods:</P>
                <BulletList items={["Bag of words", "TF-IDF", "n-grams"]} />
                <P>Problems with these approaches:</P>
                <BulletList items={[
                    "Required manual feature engineering",
                    "Limited context understanding",
                    "Could not handle nuanced language well",
                ]} />
                <Callout variant="tip">
                    LLMs solve this by <Bold>learning language patterns automatically</Bold> from raw text —
                    no manual feature engineering required.
                </Callout>
            </Section>

            <Divider />

            {/* ── 12 ── */}
            <Section>
                <SectionTitle number={12}>LLMs and AI Agents</SectionTitle>
                <Callout variant="info" title="Important for You">
                    Since you are learning AI agents, LLMs are the <Bold>core brain</Bold> of agents.
                </Callout>
                <CodeBlock label="Agent Architecture">
                    {`User\n  ↓\nAI Agent\n  ↓\nLLM (reasoning)\n  ↓\nTools / APIs\n  ↓\nOutput`}
                </CodeBlock>
                <IOBlock
                    inputLabel="Agent Input"
                    outputLabel="Agent Output"
                    input={"Generate Cypress test for login page"}
                    output={"1. LLM understands requirement\n2. Tool reads DOM\n3. Test script generated"}
                />
            </Section>

            <Divider />

            {/* ── 13 ── */}
            <Section>
                <SectionTitle number={13}>Why LLMs Became Popular Recently</SectionTitle>
                <NumberedList items={[
                    <><Bold>Transformer architecture (2017)</Bold> — Paper: <em>Attention is All You Need</em></>,
                    <><Bold>Massive compute (GPUs)</Bold> — Training now leverages thousands of GPUs in parallel</>,
                    <><Bold>Large internet datasets</Bold> — Huge text corpora from the web became accessible</>,
                ]} />
            </Section>

            <Divider />

            {/* ── 14 ── */}
            <Section>
                <SectionTitle number={14}>Simple Analogy</SectionTitle>
                <Callout variant="tip" title="Think of an LLM like...">
                    <Bold>Autocorrect on steroids.</Bold>
                    <div className="mt-3 space-y-2">
                        <div className="flex items-start gap-3 text-[14px]">
                            <span className="shrink-0 font-bold text-slate-500 dark:text-slate-400 w-24">Your phone:</span>
                            <span><InlineCode>I love →</InlineCode> you</span>
                        </div>
                        <div className="flex items-start gap-3 text-[14px]">
                            <span className="shrink-0 font-bold text-slate-500 dark:text-slate-400 w-24">An LLM:</span>
                            <span><InlineCode>I love →</InlineCode> programming because it allows developers to build scalable systems that solve real-world problems at scale.</span>
                        </div>
                    </div>
                    <p className="mt-3 text-[13px] text-slate-500 dark:text-slate-400">Same idea — predicting next words — but with massive scale and intelligence.</p>
                </Callout>
            </Section>

            <Divider />

            {/* ── Summary ── */}
            <Section>
                <SectionTitle number={15}>Summary</SectionTitle>
                <Callout variant="definition" title="A Large Language Model is">
                    A <Bold>deep learning model</Bold>, trained on <Bold>massive text datasets</Bold>, built
                    using <Bold>Transformer neural networks</Bold>, capable of generating and understanding
                    human language. Core idea: learn language patterns → predict next tokens → generate text.
                </Callout>
                <SummaryCard items={[
                    "LLMs understand natural language and generate human-like text",
                    "They are trained in 3 stages: Pretraining → Fine-tuning → RLHF",
                    "Built on Transformer architecture — revolutionary since 2017",
                    "Parameters (millions to trillions) encode learned language patterns",
                    "They power modern AI applications including chatbots, search, and coding assistants",
                    "LLMs are the core reasoning engine inside every AI agent",
                ]} />
            </Section>
        </article>
    );
}
