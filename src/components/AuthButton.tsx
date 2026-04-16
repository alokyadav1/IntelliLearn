"use client";

import Image from "next/image";
import { handleSignIn, handleSignOut } from "@/lib/auth-actions";
import type { Session } from "next-auth";

interface AuthButtonProps {
    session: Session | null;
}

export default function AuthButton({ session }: AuthButtonProps) {
    if (session?.user) {
        return (
            // Always flex-row — avatar + name pill stays inline on all screen sizes
            <div className="flex flex-row items-center gap-2">
                <div className="flex items-center gap-2 px-2 py-1.5 border border-border/60 bg-card rounded-xl shadow-sm transition-colors">
                    {session.user.image ? (
                        <Image
                            src={session.user.image}
                            alt={session.user.name || "User"}
                            width={24}
                            height={24}
                            className="rounded-full border border-border shadow-sm shrink-0 transition-colors"
                        />
                    ) : (
                        <div className="w-6 h-6 shrink-0 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-bold border border-border shadow-sm text-[10px] transition-colors">
                            {(session.user.name || "U").charAt(0).toUpperCase()}
                        </div>
                    )}
                    {/* Name: hidden on mobile (xs), visible on sm+ */}
                    <span className="hidden sm:block text-xs font-bold text-foreground tracking-tight truncate max-w-[90px] transition-colors">
                        {session.user.name}
                    </span>
                </div>

                {/* Sign Out: hidden on mobile, visible on sm+ */}
                <form action={handleSignOut}>
                    <button
                        type="submit"
                        className="hidden sm:block text-muted-foreground hover:text-rose-600 dark:hover:text-rose-400 font-medium text-xs transition-colors px-2 py-1 whitespace-nowrap"
                    >
                        Sign Out
                    </button>
                </form>
            </div>
        );
    }

    return (
        <form action={handleSignIn}>
            {/* Full button on sm+, icon-only square on mobile */}
            <button
                type="submit"
                className="hidden sm:flex items-center gap-2 bg-foreground text-background hover:opacity-90 font-semibold py-2 px-4 rounded-lg transition-all text-sm shadow-sm border border-border"
            >
                <GitHubIcon />
                Sign in with GitHub
            </button>
            <button
                type="submit"
                aria-label="Sign in with GitHub"
                className="sm:hidden w-9 h-9 flex items-center justify-center bg-foreground text-background hover:opacity-90 rounded-lg transition-all shadow-sm border border-border"
            >
                <GitHubIcon />
            </button>
        </form>
    );
}

function GitHubIcon() {
    return (
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
    );
}
