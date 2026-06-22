import { useRouter } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Button, FlatList, Text, View } from "react-native";
import { AuthContext } from "../../context/AuthContext";
import api from "../../services/api";

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();
  const { logout } = useContext(AuthContext);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
  // Only run if we have a token
  if (!accessToken) {
    console.log("⏳ Waiting for access token before fetching tasks...");
    return;
  }

  let isMounted = true; // guard against state updates after unmount

  const fetchTasks = async () => {
    try {
      const res = await api.get<Task[]>("/api/tasks");
      if (isMounted) {
        setTasks(res.data);
      }
    } catch (err: any) {
      console.error("❌ Failed to load tasks:", err.userFriendlyMessage || err.message);
    }
  };

  fetchTasks();

  // cleanup to avoid memory leaks
  return () => {
    isMounted = false;
  };
}, [accessToken]);

//  if (!accessToken) {
//   return <Text>⏳ Waiting for authentication…</Text>;
// }


  return (
    <View style={{ flex: 1, padding: 50 }}>
      <Text style={{ fontSize: 22, fontWeight: "bold", marginBottom: 10 }}>✅ Task Dashboard</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderColor: "#ccc" }}>
            <Text style={{ fontWeight: "600" }}>{item.title}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />

      {/* Navigation buttons */}
      <View style={{ marginTop: 20 }}>
        <Button title="Profile" onPress={() => router.push("/(profile)/index")} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Logout" color="red" onPress={async () => {
          await logout();
          router.replace("/(auth)/login");
        }} />
      </View>

      <View style={{ marginTop: 10 }}>
        <Button title="Create Task" onPress={() => router.push("/(tasks)/create")} />
      </View>
    </View>
  );
}
