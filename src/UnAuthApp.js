import React, { useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

export default function UnAuthApp() {
  const [isNewUser, setNewUser] = useState(false);
  const [user, setUser] = useState(null);

  // Authentication and Login
  return isNewUser ? (
    <SignUp user={user} />
  ) : (
    <Login setNewUser={setNewUser} setUser={setUser} />
  );
}
