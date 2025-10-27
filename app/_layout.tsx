import { Slot, router } from "expo-router";
import { useEffect, useState } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      router.replace(user ? "/(app)/home.tsx" : "/(auth)/login.tsx");
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Slot />
    </SafeAreaProvider>
  );
}
