import React, { useState, useContext } from "react";
import { View, Text, TextInput, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import api from "../../services/api";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "expo-router";

export default function Login() {
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await api.post("/api/auth/login", { email, password });
    console.log("Login response:", res.data);

    // Save tokens
    await login(res.data.accessToken, res.data.refreshToken);

    console.log("✅ Tokens persisted, waiting 10s before navigation...");

    // Delay navigation by 10 seconds (10,000 ms)
    router.replace("/LifecycleDemo");
  } catch (err: any) {
    console.error("Login failed", err.userFriendlyMessage || err.message);
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
        Taskify Login
      </Text>

      <Text>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
        placeholder="Enter your email"
      />

      <Text>Password</Text>
      <TextInput
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 }}
        placeholder="Enter your password"
      />

      <Button title="Login" onPress={handleLogin} />

      {/* 🔗 Register button */}
      <TouchableOpacity
        onPress={() => router.push("/(auth)/register")}
        style={{ marginTop: 20, alignItems: "center" }}
      >
        <Text style={{ color: "#007AFF", fontWeight: "600" }}>New user? Register here</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
