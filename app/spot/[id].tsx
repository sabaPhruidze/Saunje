import { useTheme } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SpotData {
  title: string;
  description: string;
  imageUrl: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

const SpotDetailScreen = () => {
  const { theme } = useTheme();
  const [spot, setSpot] = useState<SpotData | null>(null);
  const isLight = theme === "light";
  return (
    <SafeAreaView
      style={[styles.container, isLight ? styles.lightBg : styles.darkBg]}
    >
      <Stack.Screen
        options={{
          headerTitle: spot?.title,
          headerBackTitle: "უკან",
          headerShown: false,
        }}
      />
      <ScrollView>
        <Image source={{ uri: spot?.imageUrl }} style={styles.image} />
        <View style={styles.content}>
          <Text style={isLight ? styles.titleLight : styles.titleDark}>
            {spot?.title}
          </Text>
          {spot?.location && (
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={18} color="4C9A2A" />
              <Text
                style={
                  isLight ? styles.locationTextLight : styles.locationTextDark
                }
              >
                Lat:{spot.location.latitude.toFixed(4)}, Lon:
                {spot.location.longitude.toFixed(4)}
              </Text>
            </View>
          )}
          <Text
            style={isLight ? styles.descriptionLight : styles.descriptionDark}
          >
            {spot?.description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SpotDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { justifyContent: "center", alignItems: "center" },
  lightBg: { backgroundColor: "#fff" },
  darkBg: { backgroundColor: "#121212" },

  image: { width: "100%", height: 300, resizeMode: "cover" },
  content: { padding: 20 },

  titleLight: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  titleDark: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },

  descriptionLight: { fontSize: 16, lineHeight: 24, color: "#444" },
  descriptionDark: { fontSize: 16, lineHeight: 24, color: "#ccc" },

  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  locationTextLight: { marginLeft: 5, color: "#666" },
  locationTextDark: { marginLeft: 5, color: "#aaa" },

  textLight: { color: "#333" },
  textDark: { color: "#fff" },
});
