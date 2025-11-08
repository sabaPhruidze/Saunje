import React, { createContext, useContext, useState } from "react";
import { useColorScheme } from "react-native";

type Theme = "light" | "dark";

interface ThemeContextData {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextData | undefined>(undefined);

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const colorScheme = useColorScheme() ?? "light"; // რა mode იც უყენია მომხმარებელს იმ სტილში წარმოაჩენს
  const [theme, setTheme] = useState<Theme>(colorScheme);

  const toggleTheme = () => {
    setTheme((prevTheme) => (Object.is(prevTheme, "light") ? "dark" : "light"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = (): ThemeContextData => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useTheme აუცილებლად უნდა გამოვიყენო ThemeProvider ის შიგნით"
    );
  }
  return context;
};
