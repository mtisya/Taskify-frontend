import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function DebugScreen() {
  const { accessToken, refreshToken } = useContext(AuthContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🔍 Debug Tokens</Text>

      <Text style={styles.label}>Access Token:</Text>
      <Text style={styles.value}>
        {accessToken ? accessToken : "⚠️ No access token found"}
      </Text>

      <Text style={styles.label}>Refresh Token:</Text>
      <Text style={styles.value}>
        {refreshToken ? refreshToken : "⚠️ No refresh token found"}
      </Text>
    </ScrollView>
    
  );
  
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
    flexWrap: "wrap",
  },
});
