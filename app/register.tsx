import { auth } from "@/firebaseConfing";
import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const RegisterScreen = () => {
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.title}>სარეგისტრაციო სივრცე</Text>
        <TextInput
          placeholder="მეილი"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
        />
        <TextInput
          placeholder="პაროლი (მინ. 6 სიმბოლო)"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <Pressable
          onPress={handleRegister}
          disabled={loading}
          style={[styles.button, loading && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            {loading ? "მიმდინარეობს ანგარიშის შექმნა ..." : "ანგარიშის შექმნა"}
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/login")}
          style={styles.linkButton}
        >
          <Text style={styles.linkText}>
            თუ გაქვს ანგარიში შექმნილი ,გადადი ამ გვერდზე შესასვლელად
          </Text>
        </Pressable>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#333",
  },
  input: {
    height: 50,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#8b4513",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: "#AE8E7A",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  linkButton: {
    marginTop: 20,
  },
  linkText: {
    color: "#8b4513",
    textAlign: "center",
    fontSize: 16,
  },
});
