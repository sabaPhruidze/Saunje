// app/_layout.tsx
import ThemeProvider, { useTheme } from "@/context/ThemeContext";
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
  const { theme } = useTheme();
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

        <Stack.Screen
          name="map"
          options={{
            headerShown: false,
            presentation: "modal", //modalად გაიხსნება
            animation: "slide_from_bottom", // შეგვიძლია ანიმაციაც შევუცვალოთ
          }}
        />
      </Stack>
      <StatusBar style={Object.is(theme, "light") ? "dark" : "light"} />
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
