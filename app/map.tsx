import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

function MapScreen() {
  const router = useRouter();
  return (
    <View style={styles.conatiner}>
      <Ionicons
        name="close-circle"
        size={40}
        color="rgba(0,0,0,0.6)"
        onPress={() => router.back()}
        style={styles.closeButton}
      />
    </View>
  );
}

export default MapScreen;

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    left: 16,
    zIndex: 1,
  },
});
