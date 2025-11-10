import { auth } from "@/firebaseConfing";
import React, { useState } from "react";

import AuthLink from "@/components/auth/AuthLink";
import FormButton from "@/components/auth/FormButton";
import FormInput from "@/components/auth/FormInput";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const LoginScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("შეცდომა", "გთხოვთ შეავსეთ ყველა ველი");
    } else {
      setLoading(true);
      try {
        await signInWithEmailAndPassword(auth, email, password);
        setLoading(false);
        Alert.alert("ავტორიზაცია წარმატებით დასრულდა");
        router.replace("/(tabs)");
      } catch (e: any) {
        setLoading(false);
        Alert.alert("ავტორიზაციის შეცდომა", "იმეილი ან პაროლი არასწორია");
        console.log(e.name, e.message, e.stack);
      }
    }
  };

  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const keyboardVerticalOffset =
    Platform.OS === "ios" ? headerHeight + insets.top : 0;
  return (
    <SafeAreaView
      style={Object.is(theme, "light") ? styles.safeLight : styles.safeDark}
      edges={["top", "right", "left", "bottom"]}
    >
      <StatusBar style={Object.is(theme, "light") ? "dark" : "light"} />

      <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss}
        accessible={false}
      >
        <View style={styles.flex}>
          <KeyboardAvoidingView
            style={styles.flex}
            behavior={Object.is(Platform.OS, "ios") ? "padding" : "height"}
            keyboardVerticalOffset={keyboardVerticalOffset}
          >
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={
                Object.is(theme, "light")
                  ? styles.containerLight
                  : styles.containerDark
              }
              keyboardShouldPersistTaps="handled"
            >
              <ThemeToggle />
              <Text
                style={
                  Object.is(theme, "light")
                    ? styles.titleLight
                    : styles.titleDark
                }
              >
                ავტორიზაცია
              </Text>
              <FormInput
                placeholder="მეილი"
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <FormInput
                placeholder="პაროლი"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
              />
              <FormButton
                onPress={handleLogin}
                loading={loading}
                title={loading ? "მოწმდება თქვენი მონაცემები ... " : "შესვლა"}
              />
              <AuthLink
                onPress={() => router.push("/register")}
                linkText="თუ არ გაქვთ ანგარიში შექმნილი გადადი ამ გვერდზე დასარეგისტრირებლად "
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeLight: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  safeDark: {
    flex: 1,
    backgroundColor: "#121212",
  },
  flex: {
    flex: 1,
  },
  kavLight: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    position: "relative",
  },
  kavDark: {
    flex: 1,
    backgroundColor: "#121212",
    position: "relative",
  },
  containerLight: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  containerDark: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#121212",
  },

  titleLight: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  titleDark: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#FFFFFF",
  },
});
