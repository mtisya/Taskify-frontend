import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert } from "react-native";
import api from "../../services/api";
import { useRouter } from "expo-router";
import { AuthContext } from "../../context/AuthContext";

export default function CreateTask() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

const { accessToken } = useContext(AuthContext);

const handleCreate = async () => {

  try {
    await api.post("/api/tasks", {
      title,
      description,
      dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
    });
    Alert.alert("Success", "Task created successfully!");
    router.replace("/(tasks)");
  } catch (err: any) {
    console.error("Create task failed", err.userFriendlyMessage || err.message);
    Alert.alert("Error", err.userFriendlyMessage || "Failed to create task");
  }
};
// if (!accessToken) {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Loading authentication…</Text>
//     </View>
//   );
// }

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 50 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>📝 Create Task</Text>

      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
        placeholder="Enter task title"
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
        placeholder="Enter task description"
      />

      <Text>Due Date (YYYY-MM-DD)</Text>
      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 20 }}
        placeholder="2026-06-21"
      />

      <Button title="Create Task" onPress={handleCreate} />
    </ScrollView>
  );
}
