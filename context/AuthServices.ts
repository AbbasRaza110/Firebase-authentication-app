import auth, {
  getAuth,
  signInWithPhoneNumber,
} from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export function formatPhoneNumber(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");
  return phoneNumber.startsWith("+") ? phoneNumber : `+${cleaned}`;
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  const e164Regex = /^\+[1-9]\d{1,14}$/;
  return e164Regex.test(phoneNumber);
}

export async function signInWithPhone(phoneNumber: string) {
  const formattedPhone = formatPhoneNumber(phoneNumber);
  if (!isValidPhoneNumber(formattedPhone))
    throw new Error("Invalid phone number format");

  try {
    const confirmation = await signInWithPhoneNumber(getAuth(), formattedPhone);
    return confirmation;
  } catch (error: any) {
    if (error.code === "auth/app-not-authorized") console.log(error.message);
    throw new Error(error.message);
  }
}

export async function confirmCode(confirmation: any, code: string) {
  const credential = await confirmation.confirm(code);
  const user = credential.user;
  const userRef = firestore().collection("users").doc(user.uid);
  const docSnap = await userRef.get();

  if (!docSnap.exists()) {
    await userRef.set({
      id: user.uid,
      phoneNumber: user.phoneNumber,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
  }

  return user;
}
