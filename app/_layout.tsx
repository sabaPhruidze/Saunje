// app/_layout.tsx
import ThemeProvider from "@/context/ThemeContext";
import { UserProvider, useAuth } from "@/context/UserContext";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";

export const unstable_settings = { anchor: "(tabs)" };

function AppContent() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    router.replace(user ? "/(tabs)" : "/login");
  }, [user, loading, router]);

  return (
    <>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="login"
          options={{ title: "login", headerShown: false }}
        />
        <Stack.Screen
          name="register"
          options={{ title: "register", headerShown: false }}
        />
        <Stack.Screen
          name="create"
          options={{
            headerShown: false,
            presentation: "modal",
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <UserProvider>
        <AppContent />
      </UserProvider>
    </ThemeProvider>
  );
}
