import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { auth } from "@/firebaseConfing";
import { signOut } from "firebase/auth";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  const theme = useTheme();
  const isLight = Object.is(theme, "light");

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // 'router.replace('/login')' აქ არ გვჭირდება! რადგან თვითონ გადადის თავისით
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };
  return (
    <View style={isLight ? styles.containerLight : styles.containerDark}>
      <ThemeToggle />
      <Text style={isLight ? styles.titleLight : styles.titleDark}>
        კეთილი იყოს შენი მობრძანება
      </Text>
      <Text style={isLight ? styles.textLight : styles.textDark}>
        შენ დალოგინდი როგორც :
      </Text>
      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>გასვლა</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  containerDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    position: "relative",
  },
  titleLight: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 10,
  },
  titleDark: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  textLight: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
  },
  textDark: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 30,
  },
  logoutButton: {
    backgroundColor: "#D2691E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
