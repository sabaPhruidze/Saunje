import { auth } from "@/firebaseConfing";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

import AuthLink from "@/components/auth/AuthLink";
import FormButton from "@/components/auth/FormButton";
import FormInput from "@/components/auth/FormInput";
import { useTheme } from "@/context/ThemeContext";

const RegisterScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleRegister = async () => {
    if (!email || !password) {
      Alert.alert("შეცდომა", "გთხოვთ , შეავსოთ ყველა ველი");
      return;
    }
    setLoading(true); //ამ დროს დაიწყებს ჩატვირთვას
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      Alert.alert(
        "წარმატება",
        "ანგარიში შეიქმნა. გთხოვთ, გაიაროთ ავტორიზაცია. "
      );
    } catch (e: any) {
      setLoading(false);
      Alert.alert(
        "რეგისტრაციის შეცდომა",
        "მომხმარებელი მითითებული მეილით რეგისტრირებულია"
      );
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      //თუ ანდროიდზე გამოიყენება სიმაღლეს შეუცვლის , ხოლო თუ აიფონზე padding
      style={{ flex: 1 }}
    >
      <StatusBar style={Object.is(theme, "light") ? "dark" : "light"} />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View
          style={
            Object.is(theme, "light")
              ? styles.containerLight
              : styles.containerDark
          }
        >
          <Text
            style={
              Object.is(theme, "light") ? styles.titleLight : styles.titleDark
            }
          >
            სარეგისტრაციო სივრცე
          </Text>
          <FormInput
            placeholder="მეილი"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <FormInput
            placeholder="პაროლი (მინ. 6 სიმბოლო)"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          <FormButton
            onPress={handleRegister}
            loading={loading}
            title={
              loading ? "მიმდინარეობს ანგარიშის შექმნა ..." : "ანგარიშის შექმნა"
            }
          />
          <AuthLink
            linkText=" თუ გაქვს ანგარიში შექმნილი ,გადადი ამ გვერდზე შესასვლელად"
            onPress={() => router.push("/login")}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  containerLight: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  containerDark: {
    flex: 1,
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
