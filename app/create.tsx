import FormInput from "@/components/auth/FormInput";
import { useTheme } from "@/context/ThemeContext";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

interface SpotLocation {
  latitude: number;
  longitude: number;
}

export default function CreateSpotScreen() {
  const { theme } = useTheme();
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [locationLoading, setLocationLoading] = useState<boolean>(false);
  const [location, setLocation] = useState<SpotLocation | null>(null);

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
  const getLocation = async () => {
    setLocationLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("ნებართვა საჭიროა", "გთხოვთ, დაუშვათ წვდომა ლოცაკიაზე");
      setLocationLoading(false);
      return;
    }
    try {
      const locationResult = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation({
        latitude: locationResult.coords.latitude,
        longitude: locationResult.coords.longitude,
      });
    } catch (e) {
      Alert.alert("შეცდომა", "ლოცაკიის დამახსოვრება ვერ მოხერხდა");
    }
    setLocationLoading(false);
  };

  const handleSubmit = async () => {
    if (!imageUri || !title || !description || !location) {
      Alert.alert("შეცდომა", "შეავსეთ ყველა ველი და აირჩიე სურათი");
      return;
    }
    setLoading(true);
    console.log("Submitting:", { imageUri, title, description, location });
    setLoading(false);
  };
  return (
    <SafeAreaView
      style={
        Object.is(theme, "light") ? styles.containerLight : styles.containerDark
      }
      edges={["top", "right", "left", "bottom"]}
    >
      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss}
        accessible={false}
      >
        <View style={styles.flex}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Object.is(Platform.OS, "ios") ? "padding" : "height"}
          >
            <ScrollView
              style={
                Object.is(theme, "light")
                  ? styles.containerLight
                  : styles.containerDark
              }
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              <Text
                style={
                  Object.is(theme, "light")
                    ? styles.titleLight
                    : styles.titleDark
                }
              >
                დაამატე ახალი საუნჯე
              </Text>
              <Pressable style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerButtonText}>
                  {imageUri ? "სურათის შეცვლა" : "სურათის არჩევა"}
                </Text>
              </Pressable>
              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
              )}
              <Pressable
                style={styles.locationButton}
                onPress={getLocation}
                disabled={locationLoading}
              >
                {locationLoading ? (
                  <ActivityIndicator
                    color={Object.is(theme, "light") ? "#fff" : "#000"}
                    size={20}
                  />
                ) : (
                  <Text style={styles.locationButtonText}>
                    {location ? "ლოკაციის განახლება" : "ლოკაციის აღება"}
                  </Text>
                )}
              </Pressable>

              {location && (
                <Text
                  style={
                    Object.is(theme, "light")
                      ? styles.locationTextLight
                      : styles.locationTextDark
                  }
                >
                  Lat: {location.latitude.toFixed(4)}, Lon:{" "}
                  {location.longitude.toFixed(4)}
                </Text>
              )}
              <FormInput
                placeholder="სათაური"
                value={title}
                onChangeText={setTitle}
              />
              <FormInput
                placeholder="აღწერა"
                numberOfLines={4} //საწყისი სიმაღლე რამხელა იყოს
                value={description}
                multiline //რამდენიმე ხაზიანი რომ იყოს
                onChangeText={setDescription}
                style={
                  Object.is(theme, "light")
                    ? styles.inputDark
                    : styles.inputLight
                }
              />
              <Pressable
                style={[
                  styles.submitButton,
                  loading && styles.submitButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={loading}
              >
                <Text style={styles.submitButtonText}>
                  {loading ? "იტვირთება" : "საუნჯე დაემატა"}
                </Text>
              </Pressable>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
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
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  submitButtonDisabled: {
    backgroundColor: "#A5C9A5",
  },
  submitButton: {
    backgroundColor: "#4C9A2A",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  inputDark: {
    height: 150,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderColor: "#DDD",
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
  inputLight: {
    height: 150,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
  },
  locationButton: {
    backgroundColor: "#D2691E",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  locationButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  locationTextLight: {
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  locationTextDark: {
    color: "#CCC",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
});
