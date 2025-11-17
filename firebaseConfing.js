import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};
if (!firebaseConfig.apiKey) {
  throw new Error("Firebase API_ს გასაღები აკლია.  შეამოწმე .env ფაილი");
}

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); // ჩემი პროექტიდან მომცეს DataBase
export const auth = initializeAuth(app);
export const storage = getStorage(app);
