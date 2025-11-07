import React from "react";
import { StyleSheet, Text, View } from "react-native";

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>RegisterScreen</Text>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
});
