import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import SignUp from "./SignUp";
import Login from "./Login";
import CreateProfile from "./CreateProfile";
import { AuthProvider } from "../contexts/AuthContext";
import ChatApp from "./ChatApp";



export default function AppRouter() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/app" element={<ChatApp/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}
