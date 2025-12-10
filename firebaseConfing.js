import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
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

console.log("FIREBASE CONFIG IN JS:", firebaseConfig);

if (!firebaseConfig.apiKey) {
  if (__DEV__) {
    throw new Error("Firebase API_ს გასაღები აკლია.  შეამოწმე .env ფაილი");
  } else {
    console.log("Firebase API key is missing in production build");
  }
}

// app – ინიციალიზდება მხოლოდ ერთხელ
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// აქ ვზრუნავთ, რომ auth მხოლოდ ერთხელ შეიქმნას persistence-ით
let authInstance;

if (getApps().length === 1) {
  // პირველად ვქნათ initializeAuth
  authInstance = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
} else {
  // თუ უკვე არის app, auth-ს უბრალოდ getAuth-ით ვიღებთ
  authInstance = getAuth(app);
}

export const auth = authInstance;
export const db = getFirestore(app);
export const storage = getStorage(app);
