import { useTheme } from "@/context/ThemeContext";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateSpotScreen() {
  const { theme } = useTheme();
  return (
    <SafeAreaView
      style={
        Object.is(theme, "light") ? styles.containerLight : styles.containerDark
      }
    >
      <Text
        style={Object.is(theme, "light") ? styles.titleLight : styles.titleDark}
      >
        დაამატე ახალი საუნჯე
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  containerDark: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  titleLight: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  titleDark: {
    fontSize: 28,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
});
