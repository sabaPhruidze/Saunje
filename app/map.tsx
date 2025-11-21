import { db } from "@/firebaseConfing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

interface SpotLocation {
  latitude: number;
  longitude: number;
}

interface Spot {
  id: string;
  title: string;
  description: string;
  location: SpotLocation;
}

function MapScreen() {
  const router = useRouter();
  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const querySnapShoot = await getDocs(collection(db, "Saunje"));
        const spotsData = querySnapShoot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Spot[];
        setSpots(spotsData);
      } catch (e) {
        Alert.alert("შეცდომა", "backend სერვერზე წვდომა შეზღუდულია");
      } finally {
        setLoading(false);
      }
    };
    fetchSpots();
  }, []);
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
