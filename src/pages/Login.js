import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import db, { auth, googleProvider, githubProvider } from "../lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useNavigate } from "react-router-dom";

export default function Login({ setNewUser, setUser }) {
  const navigate = useNavigate();

  async function signIn(provider) {
    const data = await signInWithPopup(auth, provider);
    if (data) {
      await checkUsername(data.user.uid);
      setUser(data.user);
      navigate("/", { replace: true });
    }
  }

  async function checkUsername(uid) {
    const col = collection(db, "usernames");
    const q = query(col, where("uid", "==", uid));
    const { empty } = await getDocs(q);
    setNewUser(empty);
  }

  return (
    <div className="w-80 mx-auto">
      <header className="pt-20 mb-8 text-center">
        <h1 className="font-bold text-xl">Sign Up for Employee Polls</h1>
      </header>

      <div className="space-y-4">
        <LoginOption
          Icon={FcGoogle}
          onClick={() => signIn(googleProvider)}
          text="Continue with Google"
        />
        <LoginOption
          Icon={FaGithub}
          onClick={() => signIn(githubProvider)}
          text="Continue with Github"
        />
      </div>
    </div>
  );
}

function LoginOption({ Icon, onClick, text }) {
  return (
    <div
      className="flex items-center cursor-pointer bg-white hover:bg-gray-100 rounded-[5px] border border-gray-300 h-14"
      onClick={onClick}>
      <div className="rounded-l-[5px] px-3">
        <Icon className="h-5 w-5 mx-2" />
      </div>
      <div className="border-l border-gray-300 rounded-r-[5px] p-4 h-12 w-full flex justify-center items-center">
        <h3 className="font-medium">{text}</h3>
      </div>
    </div>
  );
}
