import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_MEASUREMENT_ID,
};
if (!firebaseConfig.apiKey) {
  throw new Error("Firebase API_ს გასაღები აკლია.  შეამოწმე .env ფაილი");
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app); // ჩემი პროექტიდან მომცეს DataBase
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
