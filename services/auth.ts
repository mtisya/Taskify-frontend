import api from "./api";

export const register = async (email: string, password: string, name: string) => {
  const res = await api.post("/api/auth/register", { email, password, name });
  return res.data;
};

export const login = async (email: string, password: string) => {
  const res = await api.post("/api/auth/login", { email, password });
  return res.data; // { accessToken, refreshToken }
};

export const logout = async () => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const socialLogin = async (provider: "google" | "github", payload: any) => {
  const res = await api.post("/api/auth/social", { provider, ...payload });
  return res.data;
};
