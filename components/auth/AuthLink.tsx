import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface AuthLinkProps {
  linkText: string;
  onPress: () => void;
}

const AuthLink = ({ linkText, onPress }: AuthLinkProps) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.linkText}>{linkText}</Text>
    </Pressable>
  );
};

export default AuthLink;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  linkText: {
    color: "#8b4513",
    textAlign: "center",
    fontSize: 16,
  },
});
