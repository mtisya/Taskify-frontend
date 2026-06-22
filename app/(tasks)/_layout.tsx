import { Stack } from "expo-router";

export default function TasksLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true, // show headers for task screens
        headerTitleAlign: "center",
      }}
    >
      {/* Dashboard (task list) */}
      <Stack.Screen
        name="index"
        options={{ title: "My Tasks" }}
      />

      {/* Create Task screen */}
      <Stack.Screen
        name="create"
        options={{ title: "Create Task" }}
      />

      {/* Update/View Task screen */}
      <Stack.Screen
        name="[id]"
        options={{ title: "Task Details" }}
      />
    </Stack>
  );
}
