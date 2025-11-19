import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface HomeFooterProps {
  onAddPress: () => void;
  onLogoutPress: () => void;
}
const HomeFooter = ({ onAddPress, onLogoutPress }: HomeFooterProps) => {
  return (
    <View style={styles.footerContainer}>
      <Pressable style={styles.addButton} onPress={onAddPress}>
        <Text style={styles.addButtonText}>ახალი საუნჯის დამატება</Text>
      </Pressable>
      <Pressable style={styles.logoutButton} onPress={onLogoutPress}>
        <Text style={styles.logoutButtonText}>გასვლა</Text>
      </Pressable>
    </View>
  );
};
export default HomeFooter;

const styles = StyleSheet.create({
  footerContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: "#4C9A2A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
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
    textAlign: "center",
  },
});
