"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { PLATFORM_NAME, PLATFORM_EDITION } from "@/config/platform.config";
import { handleSignOut } from "@/lib/auth-actions";
import AuthButton from "./AuthButton";
import type { Session } from "next-auth";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Courses", href: "/#courses" },
];

import ThemeToggle from "./ThemeToggle";

export default function Header({ session }: { session: Session | null }) {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md glass transition-colors duration-300">
            <div className="max-w-[1440px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                {/* Left: Logo + desktop nav */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-indigo-700 transition-colors">
                            A
                        </div>
                        <div className="hidden sm:block">
                            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100 block leading-none">
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
                                        ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900"
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Right: Auth + mobile menu button */}
                <div className="flex items-center gap-2 sm:gap-4">
                    <ThemeToggle />
                    <AuthButton session={session} />

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`block w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
                    </button>
                </div>
            </div>

            {/* Mobile nav dropdown */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pb-4 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? "text-indigo-600 bg-indigo-50 dark:bg-indigo-950/30"
                                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-900"
                                    }`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}

                    {session?.user && (
                        <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                            <form action={handleSignOut}>
                                <button
                                    type="submit"
                                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-all"
                                >
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
}
