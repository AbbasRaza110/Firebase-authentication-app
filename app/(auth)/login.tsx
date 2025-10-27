import React, { useState } from "react";
import { View, TextInput, Button, Text, Alert, StyleSheet } from "react-native";
import {
  confirmCode,
  signInWithPhone,
  formatPhoneNumber,
  isValidPhoneNumber,
} from "../../context/AuthServices";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmation, setConfirmation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendCode = async () => {
    try {
      setLoading(true);
      setError("");

      // Format the phone number
      const formattedPhone = formatPhoneNumber(phone);

      // Validate the phone number
      if (!isValidPhoneNumber(formattedPhone)) {
        setError(
          "Please enter a valid phone number with country code (e.g., +1234567890)"
        );
        return;
      }

      const conf = await signInWithPhone(formattedPhone);
      setConfirmation(conf);
      setPhone(formattedPhone); // Update the input with formatted number
    } catch (err: any) {
      setError(err.message || "Failed to send verification code");
      Alert.alert("Error", err.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setLoading(true);
      setError("");

      if (confirmation) {
        console.log("Confirmation:", confirmation);

        const user = await confirmCode(confirmation, code);
        console.log("Logged in:", user.phoneNumber);
      }
    } catch (err: any) {
      setError(err.message || "Failed to verify code");
      Alert.alert("Error", err.message || "Failed to verify code");
    } finally {
      setLoading(false);
    }
  };
  return (
    <View style={styles.container}>
      {!confirmation ? (
        <>
          <Text style={styles.title}>Sign in with Phone Number </Text>
          <Text style={styles.subtitle}>
            Enter your phone number with country code (e.g., +1234567890)
          </Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="+1234567890"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={(text) => {
              setPhone(text);
              setError(""); // Clear error when user types
            }}
            editable={!loading}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button
            title={loading ? "Sending..." : "Send Code"}
            onPress={sendCode}
            disabled={loading || !phone.trim()}
            color={"#2158BC"}
          />
        </>
      ) : (
        <>
          <Text style={styles.title}>Enter Verification Code</Text>
          <Text style={styles.subtitle}>
            We sent a verification code to {phone}
          </Text>
          <TextInput
            style={[styles.input, error && styles.inputError]}
            placeholder="123456"
            keyboardType="number-pad"
            value={code}
            onChangeText={(text) => {
              setCode(text);
              setError(""); // Clear error when user types
            }}
            editable={!loading}
            maxLength={6}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <Button
            title={loading ? "Verifying..." : "Verify Code"}
            onPress={verifyCode}
            disabled={loading || !code.trim()}
          />
          <Button
            title="Change Phone Number"
            onPress={() => {
              setConfirmation(null);
              setCode("");
              setError("");
            }}
            disabled={loading}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginVertical: 10,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#ff4444",
  },
  errorText: {
    color: "#ff4444",
    fontSize: 14,
    marginBottom: 10,
    textAlign: "center",
  },
});
