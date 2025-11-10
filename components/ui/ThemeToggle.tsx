import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isLight = Object.is(theme, "light");
  return (
    <Pressable style={styles.container} onPress={toggleTheme}>
      <Ionicons
        name={isLight ? "moon" : "sunny"}
        size={24}
        color={isLight ? "#333" : "#fff"}
      />
    </Pressable>
  );
};

export default ThemeToggle;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 30,
    right: 16,
    zIndex: 1,
    padding: 5,
  },
});
