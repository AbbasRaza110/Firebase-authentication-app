import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function RootLayout() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  if (loading) return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? <Stack.Screen name="(app)" /> : <Stack.Screen name="(auth)" />}
    </Stack>
  );
}
