import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";

export async function signInWithPhone(phoneNumber: string) {
  const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
  return confirmation;
}

export async function confirmCode(confirmation: any, code: string) {
  const credential = await confirmation.confirm(code);
  const user = credential.user;

  const userRef = firestore().collection("users").doc(user.uid);
  await userRef.set(
    {
      id: user.uid,
      phoneNumber: user.phoneNumber,
      createdAt: firestore.FieldValue.serverTimestamp(),
    },
    { merge: true }
  );

  return user;
}
