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
    return session.user.email;
}

/**
 * Fetch completed topics for a specific course.
 * Firestore path: user_progress/{email}
 * Structure: { courses: { [courseId]: { completedTopics: string[] } } }
 */
export async function getUserProgress(courseId: string): Promise<UserProgress> {
    const userId = await getUserId();
    if (!userId) {
        return { completedTopics: [] };
    }

    try {
        const docRef = db.collection("user_progress").doc(userId);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            const data = docSnap.data();
            const courseData = data?.courses?.[courseId];
            return {
                completedTopics: courseData?.completedTopics ?? [],
            };
        }
        return { completedTopics: [] };
    } catch (error: any) {
        console.warn("Firestore user progress access error:", error?.message || error);
        return { completedTopics: [] };
    }
}

export async function markTopicCompleted(courseId: string, topicId: string): Promise<void> {
    const userId = await getUserId();
    if (!userId) throw new Error("Unauthorized");

    try {
        const docRef = db.collection("user_progress").doc(userId);
        await docRef.set(
            {
                courses: {
                    [courseId]: {
                        completedTopics: FieldValue.arrayUnion(topicId),
                    },
                },
            },
            { merge: true }
        );
        revalidatePath(`/courses/${courseId}`);
    } catch (error: any) {
        console.error(`Error marking topic ${topicId} as completed:`, error?.message || error);
        if (error?.code === 5) {
            console.warn("Firestore database not created yet. Skipping progress update.");
            return;
        }
        throw new Error("Failed to mark topic as completed");
    }
}

export async function resetTopicProgress(courseId: string, topicId: string): Promise<void> {
    const userId = await getUserId();
    if (!userId) throw new Error("Unauthorized");

    try {
        const docRef = db.collection("user_progress").doc(userId);
        await docRef.set(
            {
                courses: {
                    [courseId]: {
                        completedTopics: FieldValue.arrayRemove(topicId),
                    },
                },
            },
            { merge: true }
        );
        revalidatePath(`/courses/${courseId}`);
    } catch (error: any) {
        console.error(`Error resetting progress for topic ${topicId}:`, error?.message || error);
        if (error?.code === 5) {
            console.warn("Firestore database not created yet. Skipping progress reset.");
            return;
        }
        throw new Error("Failed to reset topic progress");
    }
}

export async function resetAllProgress(courseId: string): Promise<void> {
    const userId = await getUserId();
    if (!userId) throw new Error("Unauthorized");

    try {
        const docRef = db.collection("user_progress").doc(userId);
        await docRef.set(
            {
                courses: {
                    [courseId]: {
                        completedTopics: [],
                    },
                },
            },
            { merge: true }
        );
        revalidatePath(`/courses/${courseId}`);
    } catch (error: any) {
        console.error("Error resetting all progress:", error?.message || error);
        if (error?.code === 5) {
            console.warn("Firestore database not created yet. Skipping progress reset.");
            return;
        }
        throw new Error("Failed to reset all progress");
    }
}
