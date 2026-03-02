"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PLATFORM_NAME, PLATFORM_EDITION } from "@/config/platform.config";
import AuthButton from "./AuthButton";
import type { Session } from "next-auth";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Courses", href: "/" },
];

export default function Header({ session }: { session: Session | null }) {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md glass">
            <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-indigo-700 transition-colors">
                            A
                        </div>
                        <div>
                            <span className="text-lg font-bold tracking-tight text-slate-900 block leading-none">
                                {PLATFORM_NAME}
                            </span>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mt-0.5 block leading-none">
                                {PLATFORM_EDITION}
                            </span>
                        </div>
                    </Link>

                    <nav className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
                                        ? "text-indigo-600 bg-indigo-50"
                                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                <div className="flex items-center gap-4">
                    <AuthButton session={session} />
                </div>
            </div>
        </header>
    );
}
