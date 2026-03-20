// ─────────────────────────────────────────────────────────────────────────────
// TopicContent — Shared UI primitives for rendering topic article content.
// Import these in every topic content component for consistent styling.
// ─────────────────────────────────────────────────────────────────────────────

"use client";

import React, { useState } from "react";

// ── Section / headings ──────────────────────────────────────────────────────

export function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <section className={`mb-12 ${className}`}>{children}</section>;
}

export function SectionTitle({ number, children }: { number?: string | number; children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3 mb-5">
            {number !== undefined && (
                <span className="shrink-0 mt-0.5 w-8 h-8 rounded-lg bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold flex items-center justify-center shadow-sm">
                    {number}
                </span>
            )}
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">{children}</h2>
        </div>
    );
}

export function SubTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <h3 className={`text-lg font-bold text-slate-800 dark:text-slate-200 mt-6 mb-3 ${className}`}>{children}</h3>;
}

// ── Body text ────────────────────────────────────────────────────────────────

export function P({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <p className={`text-slate-600 dark:text-slate-300 leading-relaxed mb-4 text-[15px] ${className}`}>{children}</p>;
}

export function Bold({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return <strong className={`font-semibold text-slate-800 dark:text-slate-200 ${className}`}>{children}</strong>;
}

// ── Lists ────────────────────────────────────────────────────────────────────

export function BulletList({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
    return (
        <ul className={`space-y-2 mb-5 ${className}`}>
            {React.Children.toArray(items).map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[15px] text-slate-600 dark:text-slate-300">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 dark:bg-indigo-500 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function NumberedList({ items, className = "" }: { items: React.ReactNode[]; className?: string }) {
    return (
        <ol className={`space-y-2 mb-5 ${className}`}>
            {React.Children.toArray(items).map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-[15px] text-slate-600 dark:text-slate-300">
                    <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-400 text-xs font-bold flex items-center justify-center">
                        {i + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                </li>
            ))}
        </ol>
    );
}

// ── Callout boxes ────────────────────────────────────────────────────────────

type CalloutVariant = "info" | "tip" | "warning" | "definition";

const calloutStyles: Record<CalloutVariant, { border: string; bg: string; icon: string; label: string; labelColor: string; textColor: string }> = {
    info: {
        border: "border-indigo-200 dark:border-indigo-900/50",
        bg: "bg-indigo-50/60 dark:bg-indigo-900/20",
        icon: "💡",
        label: "Key Insight",
        labelColor: "text-indigo-600 dark:text-indigo-400",
        textColor: "text-slate-700 dark:text-slate-300",
    },
    tip: {
        border: "border-emerald-200 dark:border-emerald-900/50",
        bg: "bg-emerald-50/60 dark:bg-emerald-900/20",
        icon: "✅",
        label: "Tip",
        labelColor: "text-emerald-600 dark:text-emerald-400",
        textColor: "text-slate-700 dark:text-slate-300",
    },
    warning: {
        border: "border-amber-200 dark:border-amber-900/50",
        bg: "bg-amber-50/60 dark:bg-amber-900/20",
        icon: "⚠️",
        label: "Note",
        labelColor: "text-amber-600 dark:text-amber-400",
        textColor: "text-slate-700 dark:text-slate-300",
    },
    definition: {
        border: "border-slate-200 dark:border-slate-800",
        bg: "bg-slate-50/80 dark:bg-slate-800/50",
        icon: "📖",
        label: "Definition",
        labelColor: "text-slate-600 dark:text-slate-400",
        textColor: "text-slate-700 dark:text-slate-300",
    },
};

export function Callout({ variant = "info", title, children, className = "" }: { variant?: CalloutVariant; title?: string; children: React.ReactNode; className?: string }) {
    const s = calloutStyles[variant];
    return (
        <div className={`border ${s.border} ${s.bg} rounded-xl px-5 py-4 mb-5 ${className}`}>
            <p className={`text-xs font-bold uppercase tracking-widest mb-1.5 flex items-center gap-1.5 ${s.labelColor}`}>
                <span>{s.icon}</span>
                {title ?? s.label}
            </p>
            <div className={`text-[15px] ${s.textColor} leading-relaxed`}>{children}</div>
        </div>
    );
}

// ── Code / inline ────────────────────────────────────────────────────────────

export function InlineCode({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <code className={`bg-slate-100 dark:bg-slate-800 text-indigo-700 dark:text-indigo-400 text-[13px] font-mono px-1.5 py-0.5 rounded-md border border-slate-200 dark:border-slate-700 ${className}`}>
            {children}
        </code>
    );
}

export function CodeBlock({ label, children, language, code, className = "" }: { label?: string; children?: React.ReactNode; language?: string; code?: string; className?: string }) {
    const [copied, setCopied] = useState(false);
    const displayLabel = label || language;
    const contentToCopy = code || (typeof children === 'string' ? children : '');

    const handleCopy = async () => {
        if (!contentToCopy) return;
        try {
            await navigator.clipboard.writeText(contentToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className={`mb-5 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm relative group ${className}`}>
            <div className="bg-slate-800 dark:bg-slate-900 px-4 py-2 flex items-center justify-between gap-2">
                {displayLabel && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{displayLabel}</span>
                )}
                {!displayLabel && <div />}
                
                <button
                    onClick={handleCopy}
                    className="p-1 px-2 rounded-md transition-all flex items-center gap-1.5 hover:bg-slate-700/50"
                    title="Copy code"
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="code-block m-0 text-[13px] overflow-x-auto">{children || code}</pre>
        </div>
    );
}

// ── IO block (Input → Output) ─────────────────────────────────────────────────

export function IOBlock({ input, output, inputLabel = "Input", outputLabel = "Output" }: {
    input: React.ReactNode;
    output: React.ReactNode;
    inputLabel?: string;
    outputLabel?: string;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-5">
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div className="bg-slate-100 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">{inputLabel}</span>
                </div>
                <div className="p-4 text-[14px] text-slate-700 dark:text-slate-300 font-mono bg-white dark:bg-slate-900/50 leading-relaxed">{input}</div>
            </div>
            <div className="rounded-xl border border-indigo-100 dark:border-indigo-900/50 overflow-hidden">
                <div className="bg-indigo-50 dark:bg-indigo-900/30 px-4 py-2 border-b border-indigo-100 dark:border-indigo-900/50">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400">{outputLabel}</span>
                </div>
                <div className="p-4 text-[14px] text-slate-700 dark:text-slate-300 font-mono bg-white dark:bg-slate-900/50 leading-relaxed">{output}</div>
            </div>
        </div>
    );
}

// ── Data table ───────────────────────────────────────────────────────────────

export function DataTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
    return (
        <div className="mb-5 rounded-xl overflow-x-auto border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-sm min-w-[600px]">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700">
                        {headers.map((h, i) => (
                            <th key={i} className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                                {h}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, ri) => (
                        <tr key={ri} className="border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                            {row.map((cell, ci) => (
                                <td key={ci} className="px-5 py-3.5 text-[14px] text-slate-700 dark:text-slate-300 font-medium">
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

// ── Step list ────────────────────────────────────────────────────────────────

export function StepList({ steps }: { steps: { title: string; description?: React.ReactNode }[] }) {
    return (
        <div className="space-y-4 mb-5">
            {steps.map((step, i) => (
                <div key={i} className="flex gap-4">
                    <div className="shrink-0 flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white text-sm font-bold flex items-center justify-center shadow-sm">
                            {i + 1}
                        </div>
                        {i < steps.length - 1 && <div className="w-px flex-1 bg-indigo-100 dark:bg-indigo-900 mt-1" />}
                    </div>
                    <div className="pb-4 min-w-0">
                        <p className="font-bold text-slate-800 dark:text-slate-200 mb-1">{step.title}</p>
                        {step.description && (
                            <div className="text-[14px] text-slate-600 dark:text-slate-400 leading-relaxed">{step.description}</div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ── Visual Exhibits ─────────────────────────────────────────────────────────

export function Diagram({ label, children, className = "" }: { label?: string; children: React.ReactNode; className?: string }) {
    return (
        <div className={`mb-8 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50 shadow-sm overflow-hidden ${className}`}>
            {label && (
                <div className="px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</span>
                </div>
            )}
            <div className="p-6">{children}</div>
        </div>
    );
}

export function TerminalOutput({ label = "Terminal", children }: { label?: string; children: React.ReactNode }) {
    const [copied, setCopied] = useState(false);
    const contentToCopy = typeof children === 'string' ? children : '';

    const handleCopy = async () => {
        if (!contentToCopy) return;
        try {
            await navigator.clipboard.writeText(contentToCopy);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy terminal text: ', err);
        }
    };

    return (
        <div className="mb-6 rounded-xl overflow-hidden bg-[#1e1e1e] border border-slate-700 shadow-xl group relative">
            <div className="bg-[#2d2d2d] px-4 py-2 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5 mr-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</span>
                </div>

                <button
                    onClick={handleCopy}
                    className="p-1 px-2 rounded-md transition-all flex items-center gap-1.5 hover:bg-white/5"
                    title="Copy terminal commands"
                >
                    {copied ? (
                        <>
                            <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-tight">Copied!</span>
                        </>
                    ) : (
                        <>
                            <svg className="w-3.5 h-3.5 text-slate-500 group-hover:text-slate-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span className="text-[10px] font-bold text-slate-500 group-hover:text-slate-400 uppercase tracking-tight transition-colors">Copy</span>
                        </>
                    )}
                </button>
            </div>
            <pre className="p-5 font-mono text-[13px] text-zinc-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                {children}
            </pre>
        </div>
    );
}

export function StatBreakdown({ items, total, limit }: {
    items: { label: string; value: number | string; color?: string }[];
    total?: number;
    limit?: number;
}) {
    const percent = total && limit ? Math.min(100, (total / limit) * 100).toFixed(1) : null;
    return (
        <div className="space-y-6">
            <div className="space-y-2.5">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className={`w-1.5 h-6 rounded-full transition-all group-hover:scale-y-110 ${item.color || 'bg-slate-200'}`} />
                            <span className="text-sm font-medium text-slate-700">{item.label}</span>
                        </div>
                        <span className="text-sm font-mono text-slate-500 font-semibold">{item.value.toLocaleString()}</span>
                    </div>
                ))}
            </div>

            {total !== undefined && limit !== undefined && (
                <div className="pt-6 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-2.5">
                        <span className="text-sm font-bold text-slate-800 uppercase tracking-tight">Total Resource Usage</span>
                        <div className="flex items-baseline gap-1.5">
                            <span className="text-lg font-bold text-indigo-600">{total.toLocaleString()}</span>
                            <span className="text-xs text-slate-400 font-medium">/ {limit.toLocaleString()}</span>
                        </div>
                    </div>
                    <div className="relative w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="absolute inset-y-0 left-0 bg-indigo-500 rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${percent}%` }}
                        />
                    </div>
                    <p className="mt-3 text-[11px] text-slate-400 font-medium flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {(limit - total).toLocaleString()} tokens remaining
                        </span>
                        <span>{percent}% utilized</span>
                    </p>
                </div>
            )}
        </div>
    );
}

export function LayerStack({ items }: { items: { label: string; desc?: string; color?: string; tokens?: string | number }[] }) {
    return (
        <div className="space-y-2.5 mb-6 max-w-sm mx-auto">
            {items.map((item, i) => (
                <div
                    key={i}
                    className={`relative p-4 rounded-xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-sm ${item.color || 'border-slate-100 bg-white'}`}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                            <span className="text-[9px] font-bold uppercase tracking-widest opacity-40 block mb-0.5">Layer {items.length - i}</span>
                            <p className="font-bold text-slate-800 text-[14px] leading-tight">{item.label}</p>
                            {item.desc && <p className="text-[11px] mt-1 text-slate-500 font-medium leading-relaxed">{item.desc}</p>}
                        </div>
                        {item.tokens && (
                            <div className="bg-white/60 px-2 py-1 rounded-md border border-black/5 text-[10px] font-mono font-bold text-slate-600 shrink-0">
                                {item.tokens}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ImageBlock({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
    return (
        <div className="mb-8 overflow-hidden">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
                <img src={src} alt={alt} className="w-full h-auto block" />
            </div>
            {caption && <p className="mt-3 text-center text-[13px] text-slate-400 font-medium italic tracking-tight">{caption}</p>}
        </div>
    );
}

// ── Divider ──────────────────────────────────────────────────────────────────

export function Divider({ className = "" }: { className?: string }) {
    return <div className={`border-t border-slate-100 dark:border-slate-800 my-10 ${className}`} />;
}

// ── Summary card ─────────────────────────────────────────────────────────────

export function SummaryCard({ title = "✅ Key Takeaways", items, className = "" }: { title?: string; items: React.ReactNode[]; className?: string }) {
    return (
        <div className={`rounded-2xl bg-gradient-to-br from-indigo-50 to-slate-50 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-100 dark:border-indigo-900/50 p-6 mt-10 ${className}`}>
            <p className="text-sm font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-widest mb-4">{title}</p>
            <ul className="space-y-2.5">
                {React.Children.toArray(items).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-[15px] text-slate-700 dark:text-slate-300">
                        <svg className="w-4 h-4 text-indigo-500 dark:text-indigo-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// ── Accordion ─────────────────────────────────────────────────────────────

export function Accordion({ items, className = "" }: { items: { question: string; answer: React.ReactNode }[]; className?: string }) {
    return (
        <div className={`space-y-3 mb-8 ${className}`}>
            {items.map((item, i) => (
                <details key={i} className="group border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800/80 overflow-hidden shadow-sm open:border-indigo-200 dark:open:border-indigo-800 open:shadow-md transition-all duration-300">
                    <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="text-[15px] font-bold text-slate-800 dark:text-slate-200 pr-4">{item.question}</span>
                        <svg 
                            className="w-5 h-5 shrink-0 text-slate-400 dark:text-slate-500 group-open:rotate-180 transition-transform duration-300" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </summary>
                    <div className="px-4 pb-4 border-t border-slate-50 dark:border-slate-800 bg-slate-50/20 dark:bg-slate-900/20">
                        <div className="text-[15px] text-slate-600 dark:text-slate-400 leading-relaxed pt-4">
                            {item.answer}
                        </div>
                    </div>
                </details>
            ))}
        </div>
    );
}
