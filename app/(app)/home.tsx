import React from "react";
import { View, Text, Button } from "react-native";
import auth from "@react-native-firebase/auth";

export default function Home() {
  return (
    <View style={{ padding: 20 }}>
      <Text>Welcome Home! ✅</Text>
      <Button title="Logout" onPress={() => auth().signOut()} />
    </View>
  );
}
