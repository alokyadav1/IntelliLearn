import * as admin from "firebase-admin";

function initializeApp() {
    if (admin.apps.length > 0) {
        return admin.app();
    }

    let serviceAccountKeyStr = process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!serviceAccountKeyStr) {
        throw new Error("Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable. If using .env.local, make sure it's loaded.");
    }

    try {
        if (serviceAccountKeyStr.startsWith("'") && serviceAccountKeyStr.endsWith("'")) {
            serviceAccountKeyStr = serviceAccountKeyStr.slice(1, -1);
        } else if (serviceAccountKeyStr.startsWith('"') && serviceAccountKeyStr.endsWith('"')) {
            serviceAccountKeyStr = serviceAccountKeyStr.slice(1, -1);
        }

        // Try parsing directly
        let serviceAccount;
        try {
            serviceAccount = JSON.parse(serviceAccountKeyStr);
        } catch (e) {
            // Next.js dotenv parser sometimes struggles with literal newlines in multi-line strings.
            // Attempt to unescape newlines if it fails.
            const sanitizedStr = serviceAccountKeyStr.replace(/\n/g, '\\n');
            serviceAccount = JSON.parse(sanitizedStr);
        }

        return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
        });
    } catch (error) {
        console.error("Firebase Admin Initialization Error:", error);
        throw new Error("Failed to initialize Firebase Admin. Please check the FIREBASE_SERVICE_ACCOUNT_KEY JSON format.");
    }
}

// Initialize immediately so db is available
initializeApp();

export const db = admin.firestore();
