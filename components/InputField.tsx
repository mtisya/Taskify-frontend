import React from "react";
import { StyleSheet, TextInput, TextInputProps } from "react-native";

type InputFieldProps = Pick<TextInputProps, "value" | "onChangeText" | "placeholder" | "secureTextEntry">;

export default function InputField({ value, onChangeText, placeholder, secureTextEntry = false }: InputFieldProps) {
  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
    />
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 },
});
