// api.ts
import axios from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";
import { AuthContext } from "../context/AuthContext";

function getBaseUrl() {
  const envUrl = Constants.expoConfig?.extra?.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;
  if (Platform.OS === "android") return "http://10.0.2.2:3000";
  if (Platform.OS === "ios") return "http://localhost:3000";
  return "http://192.168.100.2:3000";
}

const api = axios.create({
  baseURL: getBaseUrl(),
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Skip auth endpoints
    if (config.url?.startsWith("/api/auth")) {
      return config;
    }

    // Use context state instead of SecureStore
    const token = (AuthContext as any)._currentValue?.getAccessToken?.();
    if (token) {
      config.headers = {
        ...(config.headers as any),
        Authorization: `Bearer ${token}`,
      };
      console.log("🔑 Token attached from context");
    } else {
      console.log("⚠️ No access token in context");
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
