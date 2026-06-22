import type { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { TaskContext } from "../../context/TaskContext";
import api from "../../services/api";

export default function TaskDetail({ navigation }: { navigation: NavigationProp<ParamListBase> }) {
  const { id } = useLocalSearchParams();
  const taskId = Array.isArray(id) ? id[0] : id;
  const taskContext = useContext(TaskContext);
  if (!taskContext || !taskId) return <Text>Loading...</Text>;
  const { updateTask, deleteTask } = taskContext;
  const [task, setTask] = useState<{
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
  } | null>(null);

  const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : String(error);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await api.get(`/api/tasks/${taskId}`);
        setTask(res.data);
      } catch (err) {
        Alert.alert("Error loading task", getErrorMessage(err));
      }
    };
    fetchTask();
  }, [taskId]);

  const handleComplete = async () => {
    try {
      const res = await api.put(
        `/api/tasks/${taskId}`,
        { completed: true }
      );
      await updateTask(taskId, res.data);
      setTask(res.data);
      Alert.alert("Task marked complete!");
    } catch (err) {
      Alert.alert("Error updating task", getErrorMessage(err));
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/tasks/${taskId}`);
      (deleteTask as (id: string) => void)(taskId);
      navigation.goBack();
    } catch (err) {
      Alert.alert("Error deleting task", getErrorMessage(err));
    }
  };

  if (!task) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>Due: {task.dueDate}</Text>
      <Text>Status: {task.completed ? "Completed" : "Pending"}</Text>
      <Button title="Mark Complete" onPress={handleComplete} />
      <Button title="Delete Task" color="red" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
