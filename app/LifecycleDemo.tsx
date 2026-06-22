import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet } from "react-native";
import { register, login, logout } from "../services/auth";
import { createTask, getTasks, getTaskById, deleteTask } from "../services/tasks";
import api from "../services/api";
import { saveToken, deleteToken } from "../utils/storage";

export default function LifecycleDemo() {
  const [log, setLog] = useState<string[]>([]);
  const [taskId, setTaskId] = useState<string | null>(null);

  const appendLog = (msg: string) => setLog((prev) => [...prev, msg]);

  const handleRegister = async () => {
    try {
      await register("demo@example.com", "Password123!", "Demo User");
      appendLog("✅ Registered demo@example.com");
    } catch (err: any) {
      appendLog("❌ Register failed: " + (err.userFriendlyMessage || err.message));
    }
  };

  const handleLogin = async () => {
    try {
      const { accessToken, refreshToken } = await login("alice@example.com", "Password123!");
      await saveToken("accessToken", accessToken);
      await saveToken("refreshToken", refreshToken);
      appendLog("✅ Logged in, tokens saved");
    } catch (err: any) {
      appendLog("❌ Login failed: " + (err.userFriendlyMessage || err.message));
    }
  };

  const handleCreateTask = async () => {
    try {
      const task = await createTask({ title: "Write tests", description: "Add integration tests" });
      setTaskId(task.id);
      appendLog("✅ Task created: " + JSON.stringify(task));
    } catch (err: any) {
      appendLog("❌ Create task failed: " + (err.userFriendlyMessage || err.message));
    }
  };

  const handleListTasks = async () => {
    try {
      const tasks = await getTasks();
      appendLog("📋 Tasks: " + JSON.stringify(tasks));
    } catch (err: any) {
      appendLog("❌ List tasks failed: " + (err.userFriendlyMessage || err.message));
    }
  };

  const handleGetTask = async () => {
    if (!taskId) return appendLog("⚠️ No taskId set yet");
    try {
      const task = await getTaskById(taskId);
      appendLog("🔎 Task detail: " + JSON.stringify(task));
    } catch (err: any) {
      appendLog("❌ Get task failed: " + (err.userFriendlyMessage || err.message));
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      await deleteToken("accessToken");
      await deleteToken("refreshToken");
      appendLog("👋 Logged out, tokens cleared");
    } catch (err: any) {
      appendLog("❌ Logout failed: " + (err.userFriendlyMessage || err.message));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("/api/user/account", {
        data: { password: "Password123!" },
      });
      appendLog("🗑️ Account deleted");
    } catch (err: any) {
      appendLog("❌ Delete account failed: " + (err.userFriendlyMessage || err.message));
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lifecycle Demo</Text>
      <Button title="Register" onPress={handleRegister} />
      <Button title="Login" onPress={handleLogin} />
      <Button title="Create Task" onPress={handleCreateTask} />
      <Button title="List Tasks" onPress={handleListTasks} />
      <Button title="Get Task Detail" onPress={handleGetTask} />
      <Button title="Logout" onPress={handleLogout} />
      <Button title="Delete Account" color="red" onPress={handleDeleteAccount} />
      <Text style={styles.logTitle}>Logs:</Text>
      {log.map((line, idx) => (
        <Text key={idx} style={styles.logLine}>{line}</Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  logTitle: { marginTop: 20, fontSize: 18, fontWeight: "bold" },
  logLine: { marginVertical: 4 },
});
