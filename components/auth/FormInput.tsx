import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type FormInputProps = TextInputProps; //სტანდარტული prop

const FormInput = ({ style, ...props }: FormInputProps) => {
  const { theme } = useTheme();
  const inputStyle = theme === "light" ? styles.inputLight : styles.inputDark;
  return (
    <TextInput
      style={[inputStyle, style]}
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
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#444",
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
});
