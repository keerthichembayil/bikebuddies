import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import VerifyOtp from "./pages/OtpVerification";
import 'bootstrap/dist/css/bootstrap.min.css';
const App=()=>{
  return(
    <BrowserRouter>
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/" element={<SignUp />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
    </Routes>
  </BrowserRouter>
  )
}
export default App