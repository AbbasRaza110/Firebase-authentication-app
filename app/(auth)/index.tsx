import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
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
      const formattedPhone = formatPhoneNumber(phone);

      if (!isValidPhoneNumber(formattedPhone)) {
        setError("Enter valid number with country code (e.g. +1234567890)");
        return;
      }

      const conf = await signInWithPhone(formattedPhone);
      setConfirmation(conf);
      setPhone(formattedPhone);
    } catch (err: any) {
      setError(err.message || "Failed to send code");
      Alert.alert("Error", err.message || "Failed to send code");
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    try {
      setLoading(true);
      setError("");
      if (confirmation) {
        const user = await confirmCode(confirmation, code);
        console.log("Logged in:", user.phoneNumber);
      }
    } catch (err: any) {
      setError(err.message || "Invalid verification code");
      Alert.alert("Error", err.message || "Invalid verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>🔥 Firebase Phone Auth</Text>
        <View style={styles.card}>
          {!confirmation ? (
            <>
              <Text style={styles.title}>Sign-In</Text>
              <Text style={styles.subtitle}>
                Enter your phone number with country code
              </Text>

              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="+1234567890"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={(t) => {
                  setPhone(t);
                  setError("");
                }}
                editable={!loading}
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity
                style={[styles.button, loading && styles.disabled]}
                onPress={sendCode}
                disabled={loading || !phone.trim()}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Send Code</Text>
                )}
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.title}>Verify Code</Text>
              <Text style={styles.subtitle}>
                Code sent to <Text style={styles.phone}>{phone}</Text>
              </Text>

              <TextInput
                style={[styles.input, error && styles.inputError]}
                placeholder="123456"
                keyboardType="number-pad"
                value={code}
                maxLength={6}
                onChangeText={(t) => {
                  setCode(t);
                  setError("");
                }}
                editable={!loading}
              />

              {error ? <Text style={styles.error}>{error}</Text> : null}

              <TouchableOpacity
                style={[styles.button, loading && styles.disabled]}
                onPress={verifyCode}
                disabled={loading || !code.trim()}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Verify</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setConfirmation(null);
                  setCode("");
                  setError("");
                }}
                disabled={loading}
              >
                <Text style={styles.link}>Change Phone Number</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 20,
    color: "#2158BC",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  phone: {
    color: "#2158BC",
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  inputError: {
    borderColor: "#ff4d4d",
  },
  button: {
    backgroundColor: "#2158BC",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  disabled: {
    opacity: 0.6,
  },
  link: {
    textAlign: "center",
    color: "#2158BC",
    marginTop: 15,
    fontWeight: "500",
  },
  error: {
    color: "#ff4d4d",
    textAlign: "center",
    marginBottom: 10,
  },
});
