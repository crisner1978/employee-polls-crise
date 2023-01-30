import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { CreatePoll, Home, LeaderBoard, NotFound, PollDetails } from "./pages";

export default function AuthApp() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="leaderboard" element={<LeaderBoard />} />
        <Route path="add" element={<CreatePoll />} />
        <Route path="questions/:question_id" element={<PollDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
