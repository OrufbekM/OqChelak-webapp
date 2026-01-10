import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register/index";
import Welcome from "./pages/Welcome/index";
import PhoneVerification from "./pages/Register/PhoneVerification";
import VerifyCode from "./pages/Register/VerifyCode";
import NameInput from "./pages/Register/NameInput";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verifyphone" element={<PhoneVerification />}/>
        <Route path="/verifynumber" element={<VerifyCode />}/>
        <Route path="/nameinput" element={<NameInput />}/>
      </Routes>
    </Router>
  );
};

export default App;