import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";

export default function CreateSpotScreen() {
  const { theme } = useTheme();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("ნებარვა საჭიროა", "გთხოვთ დაუშვათ წვდომა ფოტო გალერეაზე");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"], // მხოლოდ სურათებს მივიღებ
      allowsEditing: true, // რედაქტირების საშუალება
      aspect: [4, 3], // ასპექტის თანაფარდობა
      quality: 0.7, // ხარისხი (0-დან 1-მდე)
    });
    if (!result.canceled) {
      // თუ მომხმარებელმა სურათი აირჩია, ვინახავთ მის URI-ს state-ში
      setImageUri(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView
      style={
        Object.is(theme, "light") ? styles.containerLight : styles.containerDark
      }
    >
      <Text
        style={Object.is(theme, "light") ? styles.titleLight : styles.titleDark}
      >
        დაამატე ახალი საუნჯე
      </Text>
      <Pressable style={styles.imagePickerButton} onPress={pickImage}>
        <Text style={styles.imagePickerButtonText}>
          {imageUri ? "სურათის შეცვლა" : "სურათის არჩევა"}
        </Text>
      </Pressable>
      <Image source={{ uri: imageUri }} style={styles.previewImage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  containerDark: {
    flex: 1,
    padding: 16,
    backgroundColor: "#121212",
  },
  titleLight: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  titleDark: {
    fontSize: 28,
    fontWeight: "600",
    color: "#ffffff",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  imagePickerButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: 250,
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#E0E0E0",
  },
});
