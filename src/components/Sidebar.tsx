"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "@/config/sidebar.config";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 border-r border-slate-200 bg-slate-50/50 glass h-screen sticky top-0 flex flex-col pt-8 pb-4 shrink-0 transition-all duration-300">
            <div className="px-6 mb-10">
                <h1 className="text-2xl heading-pro text-slate-900 tracking-tight">{sidebarConfig.title}</h1>
                <p className="label-small text-indigo-600 mt-2">{sidebarConfig.subtitle}</p>
            </div>
            <nav className="flex-1 px-4 space-y-2">
                {sidebarConfig.links.map((link) => {
                    const isActive = pathname === link.href || (pathname !== "/" && link.href !== "/" && pathname.startsWith(link.href));
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                ? "bg-white text-indigo-700 border-l-4 border-indigo-600 shadow-sm"
                                : "text-slate-600 hover:bg-white/60 hover:text-slate-900 border-l-4 border-transparent"
                                }`}
                        >
                            {link.name}
                        </Link>
                    );
                })}
            </nav>
            <div className="px-6 mt-auto">
                <div className="p-4 rounded-xl bg-slate-100/50 border border-slate-200/50">
                    <p className="text-xs text-slate-500 font-medium tracking-wide">{sidebarConfig.edition}</p>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{sidebarConfig.version}</p>
                </div>
            </div>
        </aside>
    );
}
