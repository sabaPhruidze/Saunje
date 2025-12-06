import { db } from "@/firebaseConfing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

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

  if (loading) {
    <View style={styles.loadingContainer}>
      <ActivityIndicator size={40} color="#4C9A2A" />
    </View>;
  }
  return (
    <View style={styles.conatiner}>
      {/*სტატუს ბარი შავი გავხადე რადგან ვიზუალურად არ შეესაბამებოდა ისე რუკის ფერს და იკარგებოდა */}
      <StatusBar style="dark" />
      <Ionicons
        name="close-circle"
        size={40}
        color="rgba(0,0,0,0.6)"
        onPress={() => router.back()}
        style={styles.closeButton}
      />
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 41.7151, // თბილისის კოორდინატები
          longitude: 44.8271,
          latitudeDelta: 0.0922, // ზუმი
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        mapPadding={{ top: 30, right: 10, bottom: 0, left: 0 }}
      >
        {spots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{
              latitude: spot.location.latitude,
              longitude: spot.location.longitude,
            }}
            title={spot.title}
            description={spot.description}
          />
        ))}
      </MapView>
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
