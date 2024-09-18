import React, { Suspense } from "react";
import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Home from "./components/Home";
import SignUp from "./components/SignUp/signUp";
import LoginPage from "./components/SignUp/login"
import CreateBlogPage from "./components/Posts/createBlog";
import { Toaster } from "react-hot-toast";
import ForgetPassword from "./components/SignUp/forgetPassoword";
import ResetPassword from "./components/SignUp/resetPassword";
import ProfilePage from "./components/Profile/profile";
import Explore from "./components/Posts/Explore";
import SettingsPage from "./components/Profile/setting";
import BlogPostDetail from "./components/Posts/postById";
import GoogleLogin from "./components/SignUp/googleLogin";



const App = () => {

  // const DeafultRoute = () => {
  //   const token = localStorage.getItem("authToken");
  //   return token ? <Navigate to='/home' /> : <Navigate to='/login' />
  // }

  return (
    <Suspense>
      <Toaster reverseOrder={false} />
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<DeafultRoute />} /> */}
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/oauth/callback" element={<GoogleLogin />} />
          <Route path="/create" element={<CreateBlogPage />} />
          <Route path="/forgetPassword" element={<ForgetPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/posts" element={<Explore />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/post/:id" element={<BlogPostDetail />} />
        </Routes>
      </BrowserRouter >
    </Suspense>
  );
};

export default App;

