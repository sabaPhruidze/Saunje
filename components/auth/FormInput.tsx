import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type FormInputProps = TextInputProps; //სტანდარტული prop

const FormInput = (props: FormInputProps) => {
  return (
    <TextInput
      style={styles.input}
      placeholderTextColor="#AAA" //ფერის დამატება
      {...props} // გადავცეთ ყველა გარედან მიღებული prop-ი (value, onChangeText...)
    />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  input: {
    height: 50,
    backgroundColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 12,
    fontSize: 16,
    color: "#333",
  },
});
