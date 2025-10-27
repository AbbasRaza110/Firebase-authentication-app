import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import auth from "@react-native-firebase/auth";

export default function AppLayout() {
  const isAuth = true;

  useEffect(() => {
    if (isAuth) {
      router.replace("/(app)/login");
    }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="home" />
    </Stack>
  );
}
