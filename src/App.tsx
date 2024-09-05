import React, { Suspense } from "react";
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


import Home from "./components/SignUp/Home";
import SignUp from "./components/SignUp/signUp";
import LoginPage from "./components/SignUp/login"
import CreateBlogPage from "./components/createBlog";
import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <Suspense>
      <Toaster reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateBlogPage />} />
        </Routes>
      </BrowserRouter >
    </Suspense>
  );
};

export default App;

