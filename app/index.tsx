import { useContext } from "react";
import { Redirect } from "expo-router";
import { AuthContext } from "../context/AuthContext";

export default function Index() {
  const { accessToken } = useContext(AuthContext);
  return accessToken ? <Redirect href="/(tasks)/index" /> : <Redirect href="/(auth)/login" />;
}
