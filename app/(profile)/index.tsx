import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Image } from "react-native";
import api from "../../services/api";

export default function Profile() {
  const [profile, setProfile] = useState<any>(null);
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Load profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/user/profile");
        setProfile(res.data);
        setName(res.data.name);
        setAvatarUrl(res.data.avatarUrl || "");
      } catch (err: any) {
        Alert.alert("Error", err.userFriendlyMessage || "Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      await api.put("/api/user/profile", {
        name,
        avatarUrl,
        currentPassword: currentPassword || undefined,
        newPassword: newPassword || undefined,
      });
      Alert.alert("Success", "Profile updated successfully");
    } catch (err: any) {
      Alert.alert("Error", err.userFriendlyMessage || "Update failed");
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/api/user/account", {
        data: { password: currentPassword },
      });
      Alert.alert("Account Deleted", "Your account has been permanently removed.");
    } catch (err: any) {
      Alert.alert("Error", err.userFriendlyMessage || "Delete failed");
    }
  };

  if (!profile) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>👤 User Profile</Text>

      {avatarUrl ? (
        <Image
          source={{ uri: avatarUrl }}
          style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
        />
      ) : null}

      <Text>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
      />

      <Text>Avatar URL</Text>
      <TextInput
        value={avatarUrl}
        onChangeText={setAvatarUrl}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
        placeholder="https://example.com/avatar.png"
      />

      <Text>Current Password (for password change or delete)</Text>
      <TextInput
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
      />

      <Text>New Password (optional)</Text>
      <TextInput
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 }}
      />

      <Button title="Update Profile" onPress={handleUpdate} />
      <View style={{ marginTop: 20 }}>
        <Button title="Delete Account" color="red" onPress={handleDeleteAccount} />
      </View>
    </ScrollView>
  );
}
