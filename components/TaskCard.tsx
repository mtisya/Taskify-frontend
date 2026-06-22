import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

interface TaskCardProps {
  task: { title: string; description: string; completed: boolean };
  onPress: () => void;
}

export default function TaskCard({ task, onPress }: TaskCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>Status: {task.completed ? "✅ Done" : "⏳ Pending"}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderWidth: 1, borderRadius: 8, marginVertical: 8 },
  title: { fontSize: 16, fontWeight: "bold" },
});
