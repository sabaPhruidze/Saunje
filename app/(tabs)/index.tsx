import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>მთავარი ეკრანი (Home)</Text>
      <Link href="/register" style={styles.link}>
        <Text style={styles.linkText}>გადასვლა Register გვერდზე</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  link: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  linkText: {
    color: "white",
  },
});
