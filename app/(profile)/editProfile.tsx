import React, { useContext, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

export default function EditProfile() {
  // AuthContext's type may not expose `user` in typings; cast to any to access runtime value
  const auth = useContext(AuthContext) as any;
  const { user, logout } = auth;
  const [name, setName] = useState(user?.name || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdate = async () => {
    try {
      await api.put(
        "/api/user/profile",
        { name, avatarUrl, currentPassword, newPassword }
      );
      Alert.alert("Profile updated successfully");
    } catch (err) {
      Alert.alert("Error updating profile", (err as Error).message);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(
        "/api/user/account",
        {
          data: { password: currentPassword },
        }
      );
      logout();
    } catch (err) {
      Alert.alert("Error deleting account", (err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Edit Profile</Text>
      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Avatar URL" value={avatarUrl} onChangeText={setAvatarUrl} style={styles.input} />
      <TextInput placeholder="Current Password" secureTextEntry value={currentPassword} onChangeText={setCurrentPassword} style={styles.input} />
      <TextInput placeholder="New Password" secureTextEntry value={newPassword} onChangeText={setNewPassword} style={styles.input} />
      <Button title="Update Profile" onPress={handleUpdate} />
      <Button title="Delete Account" color="red" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 },
});
