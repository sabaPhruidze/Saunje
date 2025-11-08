import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

interface FormButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const FormButton = ({ title, onPress, loading }: FormButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={[styles.button, loading && styles.buttonDisabled]}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
};

export default FormButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#8b4513",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#AE8E7A",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
