import { router, Stack } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const isAuth = false;

  useEffect(() => {
    if (isAuth) {
      router.replace("/(app)/home");
    }
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
