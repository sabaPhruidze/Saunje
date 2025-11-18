import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/UserContext";
import { auth, db } from "@/firebaseConfing";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SpotLocation = {
  latitude: number;
  longitude: number;
};

interface Spot {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  location: SpotLocation;
}
const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.8;
export default function HomeScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const router = useRouter();

  const [spots, setSpots] = useState<Spot[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fectchSpots = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const saunjeCollection = collection(db, "Saunje"); // "მომზადე 'Saunje' კოლექცია"
      const querySnapShot = await getDocs(saunjeCollection); // წამოიღე ყველაფერი ამ კოლექციიდან
      const saunjeData = querySnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Spot[];
      setSpots(saunjeData);
      setLoading(false);
    } catch (e: any) {
      Alert.alert(e.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fectchSpots();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // 'router.replace('/login')' აქ არ გვჭირდება! რადგან თვითონ გადადის თავისით
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };
  if (loading) {
    return (
      <View
        style={
          Object.is(theme, "light")
            ? styles.containerLight
            : styles.containerDark
        }
      >
        <ActivityIndicator
          size="large"
          color={Object.is(theme, "light") ? "#333" : "#FFF"}
        />
      </View>
    );
  }
  return (
    <SafeAreaView
      style={
        Object.is(theme, "light") ? styles.containerLight : styles.containerDark
      }
    >
      <ThemeToggle />
      <ScrollView>
        <Text
          style={
            Object.is(theme, "light") ? styles.titleLight : styles.titleDark
          }
        >
          საუნჯეები
        </Text>
        <Text
          style={Object.is(theme, "light") ? styles.textLight : styles.textDark}
        >
          შენ დალოგინდი როგორც: {user?.email}
        </Text>
        <FlatList
          data={spots}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false} //scroll bar რომ არ გამოჩნდეს
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <View
              style={
                Object.is(theme, "light")
                  ? styles.spotCardLight
                  : styles.spotCardDark
              }
            >
              <Image source={{ uri: item.imageUrl }} style={styles.spotImage} />
              <Text
                style={[
                  Object.is(theme, "light")
                    ? styles.spotTitleLight
                    : styles.spotTitleDark,
                  styles.spotCard,
                ]}
              >
                {item.title}
              </Text>
              <Text
                style={
                  Object.is(theme, "light")
                    ? styles.spotDescriptionLight
                    : styles.spotDescriptionDark
                }
              >
                {item.description}
              </Text>
              {item.location && (
                <View style={styles.locationContainer}>
                  <Ionicons
                    name="location"
                    size={14}
                    color={Object.is(theme, "light") ? "#667" : "#CCC"}
                  />
                  <Text
                    style={
                      Object.is(theme, "light")
                        ? styles.locationTextLight
                        : styles.locationTextDark
                    }
                  >
                    {item.location.latitude.toFixed(4)},{" "}
                    {item.location.longitude.toFixed(4)}
                  </Text>
                </View>
              )}
            </View>
          )}
        />
        <View style={styles.footerContainer}>
          <Pressable
            style={styles.addButton}
            onPress={() => router.push("/create")}
          >
            <Text style={styles.addButtonText}>ახალი საუნჯის დამატება</Text>
          </Pressable>
          <Pressable onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>გასვლა</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    position: "relative",
  },
  containerDark: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    position: "relative",
  },
  titleLight: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  titleDark: {
    fontSize: 24,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 10,
    textAlign: "center",
  },
  textLight: {
    fontSize: 16,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  textDark: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 30,
    textAlign: "center",
  },
  logoutButton: {
    backgroundColor: "#D2691E",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  spotCardLight: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
    elevation: 3, // ჩრდილი Android-სთვის
  },
  spotCardDark: {
    backgroundColor: "#252525",
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    marginBottom: 16,
  },
  spotImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 12,
  },
  spotTitleLight: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  spotTitleDark: {
    fontSize: 20,
    fontWeight: "600",
    color: "#ffffff",
  },
  spotDescriptionLight: {
    fontSize: 14,
    color: "#677",
    marginTop: 4,
  },
  spotDescriptionDark: {
    fontSize: 14,
    color: "#CCC",
    marginTop: 4,
  },
  footerContainer: {
    padding: 16,
  },
  addButton: {
    backgroundColor: "#4C9A2A",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  addButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
  listContent: {
    paddingHorizontal: 16,
  },
  spotCard: {
    width: CARD_WIDTH,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    opacity: 0.7, // მკრთალი ცოტათი
  },
  locationTextLight: {
    fontSize: 12,
    color: "#334",
    marginLeft: 4,
  },
  locationTextDark: {
    fontSize: 12,
    color: "#CCC",
    marginLeft: 4,
  },
});
