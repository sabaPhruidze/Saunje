import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const MapButton = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const isLight = Object.is(theme, "light");
  return (
    <Pressable onPress={() => router.push("/map")} style={styles.button}>
      <Ionicons name="map" size={24} color={isLight ? "#333" : "#fff"} />
    </Pressable>
  );
};

export default MapButton;

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
    padding: 5,
    backgroundColor: "rgba(0,0,0,0.05)", // ოდნავ ფონი რომ ჰქონდეს
    borderRadius: 20,
  },
});
