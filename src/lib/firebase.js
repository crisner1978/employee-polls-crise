import { initializeApp } from "firebase/app";
import {
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  increment,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore/lite";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginAuthUser, logoutAuthUser } from "../features/authSlice";
import { FIREBASE } from "./firebaseConfig";

const app = initializeApp(FIREBASE);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const getTimestamp = serverTimestamp;
const addIncrement = increment;

export {
  app,
  auth,
  googleProvider,
  githubProvider,
  getTimestamp,
  addIncrement,
};
export default db;

// TODO Possibly Use with createAsyncThunk
export async function createUser({ user, username }) {
  const userDoc = doc(db, "users", user.uid);
  await setDoc(userDoc, {
    uid: user.uid,
    avatarURL: user.photoURL,
    name: user.displayName,
    username,
  });
  const uDoc = doc(db, "usernames", username);
  await setDoc(uDoc, {
    uid: user.uid,
  });
}

export async function checkIfUsernameTaken(username) {
  const col = collection(db, "users");
  const q = query(col, where("username", "==", `@${username}`));
  const { empty } = await getDocs(q);
  return empty || "Username Taken!";
}

export async function useAuthUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getAuthUser(user) {
      if (!user) {
        dispatch(logoutAuthUser());
      } else {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          dispatch(loginAuthUser(userDoc.data()));
        } else {
          dispatch(logoutAuthUser());
        }
      }
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      getAuthUser(user);
    });
    return () => unsubscribe();
  }, [dispatch]);
}

export async function getDocuments(ref) {
  const snap = await getDocs(ref);
  const docs = snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return docs;
}

export async function getQuestions() {
  const col = collection(db, "questions");
  const q = query(col, orderBy("timestamp", "desc"));
  const questions = await getDocuments(q);
  return questions;
}

export async function getUsers() {
  const col = collection(db, "users");
  const q = query(col);
  const users = await getDocuments(q);
  return users;
}