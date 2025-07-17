import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Onboarding from './Pages/Onboarding';
import Signup1 from './Pages/Signup-1';
import HomePage from './Pages/Home';
import OtpVerification from './Pages/Otp-Verification-Page'; // ✅ Import the OTP page
import SignupForm from './Pages/Signup-Form'; // ✅ Import the Signup Form page
import Confirmation from './Pages/Confirmation'; // ✅ Import the Confirmation page
import Login from './Pages/Login'; // ✅ Import the Login page
import LoginOtp from './Pages/Login-Otp'; // ✅ Import the Login OTP page
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/home-Page" element={<HomePage />} />
        <Route path="/Signup-Page" element={<Signup1 />} />
        <Route path="/Otp-Verification" element={<OtpVerification />} />
        <Route path="/Signup-Form" element={<SignupForm />} />
        <Route path="/Confirmation" element={<Confirmation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-otp" element={<LoginOtp />} />
        
      </Routes>
    </Router>
  )
}

export default App
