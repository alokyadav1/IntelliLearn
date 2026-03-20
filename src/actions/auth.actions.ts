"use server";

import { signIn, signOut } from "@/auth";

/**
 * Handle GitHub Sign In
 */
export async function handleGitHubSignIn() {
  await signIn("github", { redirectTo: "/courses/ai-agents/prerequisites" });
}

/**
 * Handle Sign Out
 */
export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
