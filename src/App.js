import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthApp from "./AuthApp";
import Navbar from "./components/Navbar";
import UnAuthApp from "./UnAuthApp";

function App() {
  const user = ""

  return user ? <AuthApp /> : <UnAuthApp />
 
}

export default App;
