export default function BuildingAIAgents() {
    return (
        <div className="max-w-5xl mx-auto px-8 py-16 animate-entry">
            <header className="mb-16">
                <div className="label-small text-indigo-600 mb-4 tracking-widest">MODULE 02</div>
                <h1 className="text-5xl heading-pro text-slate-900 mb-6 tracking-tight">Building AI Agents</h1>
                <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
                    The art and science of stringing together LLMs, tools, memory, and logic to create systems that act autonomously to achieve goals.
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="card p-8 col-span-1 lg:col-span-2 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-full w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-4">The Agent Architecture</h2>
                    <p className="text-slate-600 mb-6 text-lg leading-relaxed">
                        An autonomous agent typically consists of a loop: <strong className="text-indigo-600 font-bold bg-indigo-50 px-2 py-1 rounded">Observe &rarr; Think &rarr; Act</strong> (often called the ReAct framework). The engine acts as the brain, determining which tool to use next, based on the observations collected from previous tools.
                    </p>
                    <p className="text-slate-600 text-lg leading-relaxed">
                        Memory limits and context overflow are the primary engineering bottlenecks when building deep sequential agents. State management is imperative.
                    </p>
                </div>
                <div className="card p-8 bg-indigo-600 border-none text-white relative overflow-hidden shadow-lg shadow-indigo-200">
                    <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                    <h3 className="text-xl font-bold mb-6 tracking-tight relative z-10">Key Components</h3>
                    <ul className="space-y-4 relative z-10">
                        <li className="flex items-start">
                            <div className="bg-indigo-500/50 rounded-lg p-2 mr-4 mt-0.5 border border-white/20">
                                🧠
                            </div>
                            <div>
                                <strong className="block text-indigo-50 font-bold text-sm label-small tracking-wider mb-1 mt-1">LLM BRAIN</strong>
                                <span className="text-indigo-100 text-sm">The reasoning and decision core.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-indigo-500/50 rounded-lg p-2 mr-4 mt-0.5 border border-white/20">
                                🛠️
                            </div>
                            <div>
                                <strong className="block text-indigo-50 font-bold text-sm label-small tracking-wider mb-1 mt-1">TOOL ABSTRACTIONS</strong>
                                <span className="text-indigo-100 text-sm">Functions the agent can trigger.</span>
                            </div>
                        </li>
                        <li className="flex items-start">
                            <div className="bg-indigo-500/50 rounded-lg p-2 mr-4 mt-0.5 border border-white/20">
                                💾
                            </div>
                            <div>
                                <strong className="block text-indigo-50 font-bold text-sm label-small tracking-wider mb-1 mt-1">STATE & MEMORY</strong>
                                <span className="text-indigo-100 text-sm">Short-term and persistent indexing.</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <section className="mb-12">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">Defining a Tool Interface</h2>
                <div className="card p-0 overflow-hidden group">
                    <div className="p-8 pb-6 border-b border-slate-100 relative">
                        <div className="absolute right-0 top-0 h-full w-1 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-slate-600 text-lg leading-relaxed">
                            To give an agent capabilities, you must provide it with precise JSON schema definitions for tools. A well-documented tool definition helps the model understand exactly when and how to invoke it, similar to an API definition.
                        </p>
                    </div>
                    <div className="code-block rounded-none rounded-b-xl px-8 py-6 m-0 border-t-0 border-x-0 border-b-0 shadow-inner overflow-x-auto">
                        <pre className="text-sm">
                            <code><span className="text-slate-400">const</span> <span className="text-rose-400">webSearchTool</span> <span className="text-slate-400">=</span> {'{'}
                                <span className="text-cyan-400">name:</span> <span className="text-teal-300">"search_web"</span>,
                                <span className="text-cyan-400">description:</span> <span className="text-teal-300">"Performs a web search to gather recent information on a topic."</span>,
                                <span className="text-cyan-400">parameters:</span> {'{'}
                                <span className="text-cyan-400">type:</span> <span className="text-teal-300">"object"</span>,
                                <span className="text-cyan-400">properties:</span> {'{'}
                                <span className="text-cyan-400">query:</span> {'{'} <span className="text-cyan-400">type:</span> <span className="text-teal-300">"string"</span>, <span className="text-cyan-400">description:</span> <span className="text-teal-300">"The search terminology."</span> {'}'}
                                {'}'},
                                <span className="text-cyan-400">required:</span> [<span className="text-teal-300">"query"</span>]
                                {'}'}
                                {'}'};</code>
                        </pre>
                    </div>
                </div>
            </section>

            <section className="mb-12">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 mb-6">The ReAct Loop Optimization</h2>
                <div className="card p-8 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 h-full w-1 bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                            <p className="text-slate-600 leading-relaxed text-lg mb-4">
                                In the execution phase, the agent receives a task, analyzes it, picks a tool, executes it, and reviews the output. This loop continues until the agent hits an exit condition or solves the user's objective.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg pb-4">
                                Mastering this loop involves managing token limits efficiently, formatting tool outputs cleanly, and providing explicit instructions on when to stop.
                            </p>
                        </div>
                        <div className="w-full md:w-64">
                            <div className="flex flex-col items-center gap-2 p-6 bg-slate-50 border border-slate-200 rounded-xl relative">
                                <div className="w-full bg-white border border-slate-200 rounded-lg p-3 text-center text-sm font-bold text-slate-700 shadow-sm">Think</div>
                                <div className="w-px h-4 bg-slate-300"></div>
                                <div className="w-full bg-white border border-indigo-200 rounded-lg p-3 text-center text-sm font-bold text-indigo-700 shadow-sm ring-1 ring-indigo-100">Act (Tool Call)</div>
                                <div className="w-px h-4 bg-slate-300"></div>
                                <div className="w-full bg-white border border-slate-200 rounded-lg p-3 text-center text-sm font-bold text-slate-700 shadow-sm">Observe</div>
                                <div className="absolute inset-y-0 right-2 w-8 border-r-2 border-dashed border-slate-300 rounded-r-3xl my-6 pointer-events-none"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
