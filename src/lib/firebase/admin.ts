import { getApps, initializeApp, cert, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

let adminApp: App | null = null;

function initAdminApp(): App | null {
  if (getApps().length > 0) {
    adminApp = getApps()[0]!;
    return adminApp;
  }

  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_JSON) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
      adminApp = initializeApp({
        credential: cert(serviceAccount),
        projectId: projectId ?? serviceAccount.project_id,
      });
      return adminApp;
    } catch {
      return null;
    }
  }

  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    adminApp = initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
    return adminApp;
  }

  return null;
}

export function isFirebaseAdminConfigured(): boolean {
  return initAdminApp() !== null;
}

export function getAdminAuth() {
  const app = initAdminApp();
  if (!app) throw new Error("Firebase Admin not configured");
  return getAuth(app);
}

export function getAdminFirestore() {
  const app = initAdminApp();
  if (!app) throw new Error("Firebase Admin not configured");
  return getFirestore(app);
}
