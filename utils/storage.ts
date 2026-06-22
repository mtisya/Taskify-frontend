import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

/**
 * Save a token securely.
 * Uses SecureStore on native, localStorage on web.
 */
export async function saveToken(key: string, value: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  } catch (err) {
    console.error(`❌ Failed to save ${key}:`, err);
  }
}

/**
 * Get a token securely.
 * Uses SecureStore on native, localStorage on web.
 */
export async function getToken(key: string): Promise<string | null> {
  try {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  } catch (err) {
    console.error(`❌ Failed to get ${key}:`, err);
    return null;
  }
}

/**
 * Delete a token securely.
 * Uses SecureStore on native, localStorage on web.
 */
export async function deleteToken(key: string) {
  try {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  } catch (err) {
    console.error(`❌ Failed to delete ${key}:`, err);
  }
}
