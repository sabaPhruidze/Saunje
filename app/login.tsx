import { auth } from "@/firebaseConfing";
import React, { useState } from "react";

import AuthLink from "@/components/auth/AuthLink";
import FormButton from "@/components/auth/FormButton";
import FormInput from "@/components/auth/FormInput";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

const LoginScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("შეცდომა", "გთხოვთ შეავსეთ ყველა ველი");
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      Alert.alert("ავტორიზაცია წარმატებით დასრულდა");
    } catch (e) {
      setLoading(false);
      Alert.alert("ავტორიზაციის შეცდომა", "იმეილი ან პაროლი არასწორია");
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={Object.is(theme, "light") ? styles.kavLight : styles.kavDark}
    >
      <StatusBar style={Object.is(theme, "light") ? "dark" : "light"} />
      <ThemeToggle />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={
          Object.is(theme, "light")
            ? styles.containerLight
            : styles.containerDark
        }
        keyboardShouldPersistTaps="handled"
      >
        <Text
          style={
            Object.is(theme, "light") ? styles.titleLight : styles.titleDark
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
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
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
