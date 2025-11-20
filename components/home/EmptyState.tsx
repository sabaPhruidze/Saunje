import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  isLight: boolean;
}

const { width } = Dimensions.get("window");
const EmptyState = ({ isLight }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="images-outline"
        size={60}
        color={isLight ? "#ccc" : "#555"}
      />
      <Text style={isLight ? styles.textLight : styles.textDark}>ცარიელია</Text>
      <Text style={isLight ? styles.textLight : styles.textDark}>
        იყავი პირველი , ვინც საუნჯეს დაამატებს !
      </Text>
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    opacity: 0.9,
  },
  titleLight: {
    fontSize: 18,
    fontWeight: "600",
    color: "#999999",
    marginTop: 10,
  },
  titleDark: {
    fontSize: 18,
    fontWeight: "600",
    color: "#777777",
    marginTop: 10,
  },
  textLight: {
    fontSize: 14,
    color: "#999999",
    marginTop: 5,
  },
  textDark: {
    fontSize: 14,
    color: "#777777",
    marginTop: 5,
  },
});
