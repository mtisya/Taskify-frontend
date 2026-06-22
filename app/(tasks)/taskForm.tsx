import React, { useState, useContext } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { TaskContext } from "../../context/TaskContext";
import api from "../../services/api";

interface TaskContextType {
  token: string;
  addTask: (task: any) => void;
}

interface TaskFormProps {
  navigation: any;
}

export default function TaskForm({ navigation }: TaskFormProps) {
  const context = useContext(TaskContext);
  const { token, addTask } = context as unknown as TaskContextType;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await api.post(
        "/api/tasks",
        { title, description, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      addTask(res.data);
      Alert.alert("Task created!");
      navigation.goBack();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      Alert.alert("Error creating task", message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
      <TextInput placeholder="Description" value={description} onChangeText={setDescription} style={styles.input} />
      <TextInput placeholder="Due Date (YYYY-MM-DD)" value={dueDate} onChangeText={setDueDate} style={styles.input} />
      <Button title="Save Task" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: { borderWidth: 1, marginVertical: 8, padding: 10, borderRadius: 5 },
});
