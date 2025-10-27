import { Slot, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { View, ActivityIndicator, Text } from "react-native";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import auth from "@react-native-firebase/auth";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      console.log("Auth state changed:", user ? "User logged in" : "No user");

      if (user) {
        router.replace("/(app)/home");
      } else {
        router.replace("/");
      }
    });
    return unsubscribe;
  }, []);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <Slot />
    </SafeAreaProvider>
  );
}
