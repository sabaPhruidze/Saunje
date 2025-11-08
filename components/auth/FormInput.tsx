import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type FormInputProps = TextInputProps; //სტანდარტული prop

const FormInput = (props: FormInputProps) => {
  const { theme } = useTheme();
  return (
    <TextInput
      style={Object.is(theme, "light") ? styles.inputLight : styles.inputDark}
      placeholderTextColor={theme === "light" ? "#AAA" : "#777"} //ფერის დამატება
      {...props} // გადავცეთ ყველა გარედან მიღებული prop-ი (value, onChangeText...)
    />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  inputDark: {
    height: 50,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    borderColor: "#DDD",
    fontSize: 16,
    color: "#333",
  },
  inputLight: {
    height: 50,
    backgroundColor: "#252525",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    color: "#FFFFFF",
  },
});
