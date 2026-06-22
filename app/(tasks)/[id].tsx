import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, ScrollView, Alert, Switch } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import api from "../../services/api";

export default function TaskDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completed, setCompleted] = useState(false);

  // Load task details
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/api/tasks/${id}`);
        const task = res.data;
        setTitle(task.title);
        setDescription(task.description || "");
        setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
        setCompleted(task.completed || false);
      } catch (err: any) {
        Alert.alert("Error", err.userFriendlyMessage || "Failed to load task");
      }
    };
    fetchTask();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await api.put(`/api/tasks/${id}`, {
        title,
        description,
        dueDate: dueDate ? new Date(dueDate).toISOString() : undefined,
        completed,
      });
      Alert.alert("Success", "Task updated successfully!");
      router.replace("/(tasks)"); // back to dashboard
    } catch (err: any) {
      Alert.alert("Error", err.userFriendlyMessage || "Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/tasks/${id}`);
      Alert.alert("Deleted", "Task removed successfully!");
      router.replace("/(tasks)");
    } catch (err: any) {
      Alert.alert("Error", err.userFriendlyMessage || "Delete failed");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 50 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>✏️ Edit Task</Text>

      <Text>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
      />

      <Text>Description</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
      />

      <Text>Due Date (YYYY-MM-DD)</Text>
      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10, marginBottom: 15 }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ marginRight: 10 }}>Completed</Text>
        <Switch value={completed} onValueChange={setCompleted} />
      </View>

      <Button title="Update Task" onPress={handleUpdate} />
      <View style={{ marginTop: 20 }}>
        <Button title="Delete Task" color="red" onPress={handleDelete} />
      </View>
    </ScrollView>
  );
}
