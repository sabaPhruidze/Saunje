// components/home/HomeHeader.tsx
import React from "react";
import { StyleSheet, Text } from "react-native";

interface HomeHeaderProps {
  isLight: boolean;
  userEmail?: string | null;
}

const HomeHeader = ({ isLight, userEmail }: HomeHeaderProps) => {
  return (
    <>
      <Text style={isLight ? styles.titleLight : styles.titleDark}>
        საუნჯეები
      </Text>
      <Text style={isLight ? styles.textLight : styles.textDark}>
        შენ დალოგინდი როგორც: {userEmail}
      </Text>
    </>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
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
});
