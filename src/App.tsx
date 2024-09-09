import React, { Suspense } from "react";
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./components/Home";
import SignUp from "./components/SignUp/signUp";
import LoginPage from "./components/SignUp/login"
import CreateBlogPage from "./components/createBlog";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./components/SignUp/forgetPassoword";
import ResetPassword from "./components/SignUp/resetPassword";



const App = () => {

  const DeafultRoute = () => {
    const token = localStorage.getItem("token");
    return token ? <Navigate to='/home' /> : <Navigate to='/login' />
  }

  return (
    <Suspense>
      <Toaster reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DeafultRoute />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<CreateBlogPage />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter >
    </Suspense>
  );
};

export default App;

