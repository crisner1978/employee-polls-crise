import React from 'react'
import { Routes } from 'react-router-dom';
import Navbar from './components/Navbar';

export default function AuthApp() {
   return (
    <>
      <Navbar />
      <h1>React/Redux Employee Polls Application</h1>
      {/* Navbar w/ Links */}
      <Routes>

        {/* Setup Routes w/Routes */}
        {/* UnAuth Route Signup And/Or Login Page */}

        {/* Authenticated Routes */}
        {/* Route Leaderboard */}
        {/* Route HomePage Answered Questions / UnAnswered Questions */}
        {/* Route Question */}
        {/* Route Form to Create Question and Answers */}
      </Routes>
    </>
  );
}
