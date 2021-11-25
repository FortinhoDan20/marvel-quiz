import React from 'react'
import {BrowserRouter as Router, Routes, Route } from "react-router-dom"
import '../../App.css';
import Footer from '../Footer';
import Header from '../Hearder';
import Landing from '../Landing';
import Login from "../Login";
import SignUp from "../SignUp";
import Errorpage from "../Errorpage";
import Welcome from "../Welcome"
import FortgetPassword from '../ForgetPassword';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<Errorpage />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/forgetPassword" element={<FortgetPassword/>} />
      </Routes>
      
      <Footer/>
    </Router>
  );
}

export default App;
