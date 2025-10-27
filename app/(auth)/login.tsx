import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { confirmCode, signInWithPhone } from "../../context/AuthServices";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);

  const sendCode = async () => {
    const conf = await signInWithPhone(phone);
    setConfirmation(conf);
  };

  const verifyCode = async () => {
    if (confirmation) {
      await confirmCode(confirmation, code);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {!confirmation ? (
        <>
          <Text>Enter Phone Number:</Text>
          <TextInput
            style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
            placeholder="+92XXXXXXXXXX"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <Button title="Send Code" onPress={sendCode} />
        </>
      ) : (
        <>
          <Text>Enter Verification Code:</Text>
          <TextInput
            style={{ borderWidth: 1, marginVertical: 10, padding: 8 }}
            placeholder="123456"
            keyboardType="number-pad"
            value={code}
            onChangeText={setCode}
          />
          <Button title="Verify Code" onPress={verifyCode} />
        </>
      )}
    </View>
  );
}
