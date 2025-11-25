import { useTheme } from "@/context/ThemeContext";
import { db } from "@/firebaseConfing";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
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
  const { id } = useLocalSearchParams(); //ვიღებთ ID_ს კონრეტული ბმულის
  const { theme } = useTheme();
  const [spot, setSpot] = useState<SpotData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isLight = theme === "light";

  useEffect(() => {
    const fetchSpot = async () => {
      if (!id) return;
      try {
        // წამოვიღე კონკრეტული დოკუმენტი ID-ის მიხედვით
        const docRef = await doc(db, "Saunje", id as string);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setSpot(docSnap.data() as SpotData);
        }
      } catch (e) {
        console.error("ინფორმაციის წამოღებისას", ` მოხდა შეცდომა ${e}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSpot();
  }, [id]);

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          isLight ? styles.lightBg : styles.darkBg,
          styles.center,
        ]}
      >
        <ActivityIndicator size={30} color="#4C9A2A" />
      </View>
    );
  }

  if (!spot) {
    return (
      <View
        style={[
          styles.container,
          isLight ? styles.lightBg : styles.darkBg,
          styles.center,
        ]}
      >
        <Text style={isLight ? styles.textLight : styles.textDark}>
          საუნჯე ვერ მოიძებნა
        </Text>
      </View>
    );
  }

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
