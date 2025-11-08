import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface FormButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const FormButton = ({ title, onPress, loading }: FormButtonProps) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[
        Object.is(theme, "light") ? styles.buttonLight : styles.buttonDark,
        loading &&
          (Object.is(theme, "light")
            ? styles.buttonDisabledLight
            : styles.buttonDisabledDark),
      ]}
    >
      <Text
        style={
          Object.is(theme, "light")
            ? styles.buttonTextLight
            : styles.buttonTextDark
        }
      >
        {title}
      </Text>
    </Pressable>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  buttonLight: {
    backgroundColor: "#8B4513",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDark: {
    backgroundColor: "#A0522D",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabledLight: {
    backgroundColor: "#AE8E7A",
  },

  buttonDisabledDark: {
    backgroundColor: "#5C3317",
  },

  buttonTextLight: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  buttonTextDark: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
