// components/ui/OfflineNotice.tsx
import { Ionicons } from "@expo/vector-icons";
import { useNetInfo } from "@react-native-community/netinfo";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const OfflineNotice = () => {
  const netInfo = useNetInfo();

  // თუ ინტერნეტი არის (ან ჯერ არ ვიცით), არაფერი არ ვაჩვენოთ
  // netInfo.isConnected შეიძლება იყოს: true, false, ან null (სანამ იტვირთება)
  if (
    netInfo.type !== "unknown" &&
    netInfo.isInternetReachable === false &&
    netInfo.isConnected === false
  ) {
    // ეს არის ყველაზე მკაცრი შემოწმება.
    // ხანდახან მარტივი: "if (netInfo.isConnected === false)"-იც საკმარისია.
  }

  // მოდი მარტივი ვარიანტით დავიწყოთ:
  if (netInfo.isConnected !== false) {
    return null;
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      <View style={styles.contentContainer}>
        <Ionicons
          name="wifi"
          size={20}
          color="#fff"
          style={{ marginRight: 10 }}
        />
        <Text style={styles.text}>ინტერნეტი გათიშულია</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#b52424", // წითელი ფერი
    width: width,
    position: "absolute", // რომ გადაეფაროს სხვა ელემენტებს
    top: 0,
    zIndex: 9999, // ყველაფრის თავზე რომ იყოს
  },
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default OfflineNotice;
