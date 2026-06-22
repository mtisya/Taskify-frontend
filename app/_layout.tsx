import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* You don’t need to declare the group names here */}
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)/login" />
      <Stack.Screen name="(auth)/register" />
      <Stack.Screen name="(tasks)/index" />
      <Stack.Screen name="(tasks)/create" />
      <Stack.Screen name="(profile)/index" />
      
    </Stack>
  );
}
