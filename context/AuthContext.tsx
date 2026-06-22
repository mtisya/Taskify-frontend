// AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { saveToken, getToken, deleteToken } from "../utils/storage";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getAccessToken: () => string | null; // 👈 new helper
}

export const AuthContext = createContext<AuthContextType>({
  accessToken: null,
  refreshToken: null,
  login: async () => {},
  logout: async () => {},
  getAccessToken: () => null,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  useEffect(() => {
    const loadTokens = async () => {
      const storedAccess = await getToken("accessToken");
      const storedRefresh = await getToken("refreshToken");
      setAccessToken(storedAccess);
      setRefreshToken(storedRefresh);
    };
    loadTokens();
  }, []);

  const login = async (email: string, password: string) => {
    // call your apiLogin here
    // persist tokens with saveToken
    // setAccessToken / setRefreshToken
  };

  const logout = async () => {
    await deleteToken("accessToken");
    await deleteToken("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
  };

  const getAccessToken = () => accessToken;

  return (
    <AuthContext.Provider value={{ accessToken, refreshToken, login, logout, getAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};
