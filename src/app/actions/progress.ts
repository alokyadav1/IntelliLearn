"use server";

import { auth } from "@/auth";
import { db } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";
import { revalidatePath } from "next/cache";

export interface UserProgress {
    completedTopics: string[];
}

async function getUserId(): Promise<string | null> {
    const session = await auth();
    if (!session || !session.user || !session.user.email) {
        return null;
    }
    return session.user.email; // Using email as the unique identifier for simplicity
}

export async function getUserProgress(): Promise<UserProgress> {
    const userId = await getUserId();
    if (!userId) {
        return { completedTopics: [] };
    }

    try {
        const docRef = db.collection("user_progress").doc(userId);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data() as UserProgress;
            return {
                completedTopics: data.completedTopics || [],
            };
        } else {
            return { completedTopics: [] };
        }
    } catch (error: any) {
        // If the database has not been provisioned on Firebase yet, it throws a grpc NOT_FOUND (5).
        // To prevent Next.js from displaying a full-screen runtime error for this console message,
        // we use console.warn instead of console.error.
        console.warn("Firestore user progress access error:", error?.message || error);
        return { completedTopics: [] };
    }
}

export async function markTopicCompleted(topicId: string): Promise<void> {
    const userId = await getUserId();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const docRef = db.collection("user_progress").doc(userId);
        await docRef.set(
            {
                completedTopics: FieldValue.arrayUnion(topicId),
            },
            { merge: true }
        );
        revalidatePath("/prerequisites");
        revalidatePath(`/prerequisites/${topicId}`);
    } catch (error: any) {
        console.error(`Error marking topic ${topicId} as completed:`, error?.message || error);
        // If the database has not been provisioned on Firebase yet, it throws a grpc NOT_FOUND (5).
        if (error?.code === 5) {
            console.warn("Firestore database not created yet. Skipping progress update.");
            return;
        }
        throw new Error("Failed to mark topic as completed");
    }
}

export async function resetTopicProgress(topicId: string): Promise<void> {
    const userId = await getUserId();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const docRef = db.collection("user_progress").doc(userId);
        await docRef.set(
            {
                completedTopics: FieldValue.arrayRemove(topicId),
            },
            { merge: true }
        );
        revalidatePath("/prerequisites");
        revalidatePath(`/prerequisites/${topicId}`);
    } catch (error: any) {
        console.error(`Error resetting progress for topic ${topicId}:`, error?.message || error);
        if (error?.code === 5) {
            console.warn("Firestore database not created yet. Skipping progress reset.");
            return;
        }
        throw new Error("Failed to reset topic progress");
    }
}

export async function resetAllProgress(): Promise<void> {
    const userId = await getUserId();
    if (!userId) {
        throw new Error("Unauthorized");
    }

    try {
        const docRef = db.collection("user_progress").doc(userId);
        await docRef.set({ completedTopics: [] }, { merge: true });
        revalidatePath("/prerequisites");
    } catch (error: any) {
        console.error("Error resetting all progress:", error?.message || error);
        if (error?.code === 5) {
            console.warn("Firestore database not created yet. Skipping progress reset.");
            return;
        }
        throw new Error("Failed to reset all progress");
    }
}
