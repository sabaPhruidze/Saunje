import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface AuthLinkProps {
  linkText: string;
  onPress: () => void;
}

const AuthLink = ({ linkText, onPress }: AuthLinkProps) => {
  const { theme } = useTheme();
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text
        style={
          Object.is(theme, "light") ? styles.linkTextLight : styles.linkTextDark
        }
      >
        {linkText}
      </Text>
    </Pressable>
  );
};

export default AuthLink;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 16,
    marginTop: 20,
    fontSize: 16,
  },
  linkTextLight: {
    color: "#8b4513",
    textAlign: "center",
    fontSize: 16,
  },
  linkTextDark: {
    color: "#D2691E",
    fontSize: 16,
    textAlign: "center",
  },
});
