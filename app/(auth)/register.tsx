import React, { useState } from "react";
import { View, Text, TextInput, Image, Button, ScrollView, Alert } from "react-native";
import api from "../../services/api";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await api.post("/api/auth/register", { name, email, password });
      Alert.alert("Success", "Registration successful! Please log in.");
      router.replace("/(auth)/login");
    } catch (err: any) {
      console.error("Registration failed", err);
      Alert.alert("Error", err.userFriendlyMessage || "Registration failed");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 20 }}>
       {/* 🖼️ Login image */}
            <Image
              source={require("../../assets/Mutisya.jpg")} // place your image in /assets/login.png
              style={{ width: "100%", height: 180, resizeMode: "contain", marginBottom: 20 }}
            />
      
            {/* 🧾 Login form */}
            <Text style={{ fontSize: 24, fontWeight: "bold", textAlign: "center", marginBottom: 20 }}>
              Taskify Register
            </Text>

      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
        placeholder="Enter your name"
      />

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text>Password</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 }}
        placeholder="Enter your password"
      />

      <Button title="Register" onPress={handleRegister} />
    </ScrollView>
  );
}
