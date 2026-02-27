import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-16 animate-entry">
      <header className="mb-16">
        <div className="label-small text-indigo-600 mb-4">Introduction</div>
        <h1 className="text-5xl heading-pro text-slate-900 mb-6 tracking-tight">
          Welcome to the AI Agents <span className="text-indigo-600">Mastery Portal</span>.
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
          A scientific, comprehensive guide to conceptualizing, designing, and building state-of-the-art autonomous AI agents.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Link href="/prerequisites" className="card p-8 group block relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-opacity group-hover:opacity-100"></div>
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-rose-100 transition-all shadow-sm">
              <svg className="w-6 h-6 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">1. Prerequisites</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Essential concepts, architectures, and foundational knowledge required before deploying autonomous systems.
            </p>
            <div className="text-rose-500 font-semibold text-sm flex items-center label-small tracking-wider">
              START LEARNING
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>

        <Link href="/building-ai-agents" className="card p-8 group block relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50 transition-opacity group-hover:opacity-100"></div>
          <div className="relative">
            <div className="h-12 w-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-100 transition-all shadow-sm">
              <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">2. Building AI Agents</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              Practical implementation guides, tool selection, chain-of-thought processes, and code integration.
            </p>
            <div className="text-indigo-600 font-semibold text-sm flex items-center label-small tracking-wider">
              START ENGINEERING
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </div>

      <div className="card p-8 bg-white glass shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="relative">
          <h3 className="text-xl font-bold text-slate-900 mb-2 tracking-tight">System Initialization</h3>
          <p className="text-slate-600 mb-6">Run the following command to bootstrap your agent environment:</p>
          <div className="code-block flex items-center justify-between">
            <code className="text-sm">
              <span className="text-rose-400">npm</span> <span className="text-slate-300">install</span> <span className="text-cyan-400">@ai-agents/core agent-toolkit</span>
            </code>
            <button className="text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
