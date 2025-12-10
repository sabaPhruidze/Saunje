const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_APP_ID,
};

if (!firebaseConfig.apiKey) {
  if (__DEV__) {
    // development-ში უბრალოდ შეგვაჩეროს, რომ შეცდომა დავინახოთ
    throw new Error("Firebase API_ს გასაღები აკლია.  შეამოწმე .env ფაილი");
  } else {
    // production-ში აპი აღარ უნდა დაექრაშოს მხოლოდ ამის გამო
    console.log("Firebase API key is missing in production build");
  }
}

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { auth };
export const storage = getStorage(app);
