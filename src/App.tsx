import React from "react";
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from "../Home";
import SignUp from "./components/SignUp/signUp";
import LoginPage from "./components/SignUp/login"

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter >
  );
};

export default App;

