import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  UserCredential,
} from "@firebase/auth";
import { auth } from "@/lib/firebase-client";
import { signOut } from "firebase/auth";

export const signUp = (
  email: string,
  password: string
): Promise<UserCredential> =>
  createUserWithEmailAndPassword(auth, email, password);

export const signIn = (
  email: string,
  password: string
): Promise<UserCredential> => signInWithEmailAndPassword(auth, email, password);

export const logOut = () => signOut(auth);
