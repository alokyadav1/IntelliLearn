export default function Prerequisites() {
    return (
        <div className="max-w-5xl mx-auto px-8 py-16 animate-entry">
            <header className="mb-16">
                <div className="label-small text-rose-500 mb-4 tracking-widest">MODULE 01</div>
                <h1 className="text-5xl heading-pro text-slate-900 mb-6 tracking-tight">Prerequisites</h1>
                <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                    Foundational concepts to master before assembling your first autonomous AI structure over an LLM base.
                </p>
            </header>

            <section className="mb-12">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6 flex items-center">
                    <span className="bg-rose-100 text-rose-600 h-8 w-8 rounded-lg flex items-center justify-center mr-4 text-sm">1</span>
                    Large Language Models (LLMs)
                </h2>
                <div className="card p-8 group relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-1 bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                        At the core of any AI agent is a powerful reasoning engine—typically an LLM. Understanding their strengths (pattern recognition, synthesis, reasoning via prompt chaining) and weaknesses (hallucinations, context window limitations, non-determinism) is critical.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-2">Context Window</h3>
                            <p className="text-sm text-slate-500">The maximum amount of tokens an LLM can process at once, dictating memory capacity.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-2">Instruction Tuning</h3>
                            <p className="text-sm text-slate-500">Models optimized to cleanly follow directives rather than just predict the next word.</p>
                        </div>
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                            <h3 className="font-bold text-slate-900 mb-2">Temperature</h3>
                            <p className="text-sm text-slate-500">Parameters controlling the randomness and creativity of the output, crucial for determinism.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6 flex items-center">
                    <span className="bg-rose-100 text-rose-600 h-8 w-8 rounded-lg flex items-center justify-center mr-4 text-sm">2</span>
                    Prompt Engineering & Chaining
                </h2>
                <div className="card p-8 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-full w-1 bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                        Agents don't just use single prompts. They rely on complex prompt architectures built to handle specific stages of an operation: parsing, reasoning, action generation, and reflection.
                    </p>
                    <div className="code-block mt-6 group-hover:shadow-lg transition-shadow">
                        <code>
                            <span className="text-slate-500 block mb-2">// Example of a Chain-of-Thought System Prompt</span>
                            <span className="text-cyan-400">System:</span> <span className="text-teal-300">"Explain your reasoning step-by-step before answering.
                                1. Identify the core entity in the request.
                                2. Determine available tools.
                                3. Formulate the final action plan."</span>
                        </code>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6 flex items-center">
                    <span className="bg-rose-100 text-rose-600 h-8 w-8 rounded-lg flex items-center justify-center mr-4 text-sm">3</span>
                    Vector Databases & RAG
                </h2>
                <div className="card p-8 group relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
                    <div className="absolute right-0 top-0 h-full w-1 bg-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex-1">
                        <p className="text-slate-600 mb-4 leading-relaxed text-lg">
                            To give an agent memory, we use Retrieval-Augmented Generation (RAG) combined with Vector Databases. Information is converted into numerical embeddings and stored so the agent can quickly retrieve context-relevant information during operation.
                        </p>
                        <button className="text-indigo-600 font-semibold text-sm flex items-center label-small tracking-wider mt-6">
                            READ DOCUMENTATION
                            <svg className="w-4 h-4 ml-2 transition-transform hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                    <div className="w-full md:w-64 h-48 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-center bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=')]">
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <svg className="w-12 h-12 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                            </svg>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
