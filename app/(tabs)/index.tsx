import SpotCard, { Spot } from "@/components/spots/SpotCard";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/UserContext";
import { auth, db } from "@/firebaseConfing";
import { useFocusEffect, useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { theme } = useTheme();
  const isLight = theme === "light";
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
  const handleDelete = (spotId: string) => {
    Alert.alert("წაშლა", "ნამდვილად გსურთ ამ საუნჯის წაშლა?", [
      { text: "გაუქმება", style: "cancel" },
      {
        text: "წაშლა",
        style: "destructive",
        onPress: async () => {
          try {
            setLoading(true);
            await deleteDoc(doc(db, "Saunje", spotId));
            setSpots((prevSpots) =>
              prevSpots.filter((spot) => spot.id !== spotId)
            );
            setLoading(false);
            Alert.alert("წარმატება", "საუნჯე წაიშალა");
          } catch (e: any) {
            setLoading(false);
            Alert.alert("შეცდომა", e.message);
          }
        },
      },
    ]);
  };
  useFocusEffect(
    useCallback(() => {
      if (user) {
        fectchSpots();
      }
    }, [user])
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
            <SpotCard
              item={item}
              isLight={isLight}
              handleDelete={handleDelete}
            />
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
});
